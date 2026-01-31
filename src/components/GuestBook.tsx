import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Radio, Send, MessageSquare } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { toast } from "sonner";
import { z } from "zod";

const guestBookSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  message: z.string().trim().min(1, "Message is required").max(500, "Message too long (max 500 chars)"),
});

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export function GuestBook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const { playElectricalCrackle, playPowerSurge } = useStrangerSFX();
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: async (entry: { name: string; message: string }) => {
      const { error } = await supabase.from("guest_book").insert([entry]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guest-book"] });
      setName("");
      setMessage("");
      setErrors({});
      playPowerSurge();
      toast.success("Transmission received", {
        description: "Your message has been logged.",
      });
    },
    onError: () => {
      toast.error("Transmission failed", {
        description: "Try again later.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = guestBookSchema.safeParse({ name, message });
    if (!result.success) {
      const fieldErrors: { name?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "message") fieldErrors.message = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    mutation.mutate({ name: result.data.name, message: result.data.message });
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

  return (
    <section className="mt-16 md:mt-24">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <h2 className="font-serif text-2xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider flex items-center gap-3">
          <MessageSquare className="w-6 h-6 animate-electrical-flicker" />
          Guest Book
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Entry form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-card/80 backdrop-blur-sm border border-border rounded-sm p-6 mb-8"
          onMouseEnter={playElectricalCrackle}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Radio className="w-3 h-3 animate-electrical-flicker text-primary" />
            Leave a transmission
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Your name (or codename)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50"
                maxLength={50}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.name}</p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="Your message to the void..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50 min-h-[100px]"
                maxLength={500}
              />
              {errors.message && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.message}</p>
              )}
              <div className="text-xs text-muted-foreground/50 text-right mt-1 font-mono">
                {message.length}/500
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full font-mono uppercase tracking-widest text-xs"
            >
              {mutation.isPending ? (
                <span className="animate-electrical-flicker">Transmitting...</span>
              ) : (
                <>
                  <Send className="w-3 h-3 mr-2" />
                  Send Transmission
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Entries list */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="font-mono text-sm text-muted-foreground animate-electrical-flicker">
                Receiving transmissions...
              </div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-border/50 rounded-sm">
              <div className="font-mono text-sm text-muted-foreground">
                No transmissions yet. Be the first to leave a message.
              </div>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry.id}
                className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm p-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="font-serif text-sm font-semibold text-foreground">
                    {entry.name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground/70">
                    {formatDate(entry.created_at)}
                  </div>
                </div>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
