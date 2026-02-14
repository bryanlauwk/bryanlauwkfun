import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Radio, Send, MessageSquare, Lightbulb, Handshake, Lock } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { toast } from "sonner";
import { z } from "zod";

const categories = [
  { value: "feedback", label: "Feedback", icon: MessageSquare },
  { value: "idea", label: "Idea", icon: Lightbulb },
  { value: "sponsorship", label: "Sponsorship", icon: Handshake },
  { value: "private", label: "Private", icon: Lock },
] as const;

type Category = (typeof categories)[number]["value"];

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long (max 1000 chars)"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long").optional().or(z.literal("")),
  category: z.enum(["feedback", "idea", "sponsorship", "private"]),
});

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  email: string | null;
  category: string;
  created_at: string;
}

export function GuestBook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category>("feedback");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { playElectricalCrackle, playPowerSurge } = useStrangerSFX();
  const queryClient = useQueryClient();

  const needsEmail = category === "private" || category === "sponsorship";

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["guest-book"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guest_book")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as GuestBookEntry[];
    },
  });

  // Only show public entries (feedback + idea)
  const publicEntries = entries.filter((e) => e.category === "feedback" || e.category === "idea");

  const mutation = useMutation({
    mutationFn: async (entry: { name: string; message: string; email?: string; category: string }) => {
      const response = await supabase.functions.invoke("submit-guest-book", { body: entry });
      if (response.error) throw response.error;
      if (response.data?.error) throw new Error(response.data.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guest-book"] });
      setName("");
      setMessage("");
      setEmail("");
      setErrors({});
      playPowerSurge();
      const successMsg = needsEmail
        ? "Bryan will receive your message soon."
        : "Your message has been logged.";
      toast.success("Message sent", { description: successMsg });
    },
    onError: (error) => {
      const msg = error instanceof Error && error.message.includes("Too many")
        ? "Too many submissions. Please wait before posting again."
        : "Try again later.";
      toast.error("Failed to send", { description: msg });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      message,
      email: needsEmail ? email : undefined,
      category,
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      // Email required for private/sponsorship
      if (needsEmail && !email.trim()) {
        fieldErrors.email = "Email is required for this message type";
      }
      setErrors(fieldErrors);
      return;
    }

    if (needsEmail && !email.trim()) {
      setErrors({ email: "Email is required for this message type" });
      return;
    }

    mutation.mutate({
      name: result.data.name,
      message: result.data.message,
      email: needsEmail ? email.trim() : undefined,
      category: result.data.category,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const placeholderMap: Record<Category, string> = {
    feedback: "Share your thoughts...",
    idea: "Describe your idea...",
    sponsorship: "Tell us about your brand and what you're looking for...",
    private: "Your private message to Bryan...",
  };

  return (
    <section className="mt-12 md:mt-24">
      {/* Section header */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <h2 className="font-serif text-xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider flex items-center gap-2 md:gap-3">
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 animate-electrical-flicker" />
          Say Something
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Unified form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-card/80 backdrop-blur-sm border border-border rounded-sm p-6 mb-8"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Radio className="w-3 h-3 animate-electrical-flicker text-primary" />
            Drop a message
          </div>

          {/* Category selector */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setCategory(cat.value);
                    playElectricalCrackle();
                    setErrors({});
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border transition-all duration-200 ${
                    isActive
                      ? "border-primary/60 bg-primary/10 text-primary stranger-glow"
                      : "border-border/50 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Privacy note for private/sponsorship */}
          {needsEmail && (
            <p className="text-xs text-muted-foreground font-mono mb-4 border-l-2 border-primary/30 pl-3">
              {category === "sponsorship"
                ? "Interested in sponsoring? This message goes directly to Bryan's inbox."
                : "This message is private and goes directly to Bryan's inbox."}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Your name (or codename)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50"
                maxLength={50}
              />
              {errors.name && <p className="text-xs text-destructive mt-1 font-mono">{errors.name}</p>}
            </div>

            {/* Email field - shown for private & sponsorship */}
            {needsEmail && (
              <div>
                <Input
                  type="email"
                  placeholder="Your email (for reply)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50"
                  maxLength={255}
                />
                {errors.email && <p className="text-xs text-destructive mt-1 font-mono">{errors.email}</p>}
              </div>
            )}

            <div>
              <Textarea
                placeholder={placeholderMap[category]}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50 min-h-[100px]"
                maxLength={1000}
              />
              {errors.message && <p className="text-xs text-destructive mt-1 font-mono">{errors.message}</p>}
              <div className="text-xs text-muted-foreground/50 text-right mt-1 font-mono">
                {message.length}/1000
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full font-mono uppercase tracking-widest text-xs"
            >
              {mutation.isPending ? (
                <span className="animate-electrical-flicker">Sending...</span>
              ) : (
                <>
                  <Send className="w-3 h-3 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Public entries list */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="font-mono text-sm text-muted-foreground animate-electrical-flicker">
                Loading messages...
              </div>
            </div>
          ) : publicEntries.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-border/50 rounded-sm">
              <div className="font-mono text-sm text-muted-foreground">
                No messages yet. Be the first to leave one.
              </div>
            </div>
          ) : (
            publicEntries.map((entry, index) => {
              const catMeta = categories.find((c) => c.value === entry.category);
              const CatIcon = catMeta?.icon ?? MessageSquare;
              return (
                <div
                  key={entry.id}
                  className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <CatIcon className="w-3 h-3 text-primary/60" />
                      <div className="font-serif text-sm font-semibold text-foreground">
                        {entry.name}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground/70">
                      {formatDate(entry.created_at)}
                    </div>
                  </div>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
