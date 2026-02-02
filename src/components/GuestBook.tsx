import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Radio, Send, MessageSquare, Mail } from "lucide-react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { toast } from "sonner";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const guestBookSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  message: z.string().trim().min(1, "Message is required").max(500, "Message too long (max 500 chars)")
});
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(100, "Email too long"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long (max 1000 chars)")
});
interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}
export function GuestBook() {
  // Guest book state
  const [gbName, setGbName] = useState("");
  const [gbMessage, setGbMessage] = useState("");
  const [gbErrors, setGbErrors] = useState<{
    name?: string;
    message?: string;
  }>({});

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactErrors, setContactErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const {
    playElectricalCrackle,
    playPowerSurge
  } = useStrangerSFX();
  const queryClient = useQueryClient();
  const {
    data: entries = [],
    isLoading
  } = useQuery({
    queryKey: ["guest-book"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("guest_book").select("*").order("created_at", {
        ascending: false
      }).limit(50);
      if (error) throw error;
      return data as GuestBookEntry[];
    }
  });
  const guestBookMutation = useMutation({
    mutationFn: async (entry: {
      name: string;
      message: string;
    }) => {
      const {
        error
      } = await supabase.from("guest_book").insert([entry]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guest-book"]
      });
      setGbName("");
      setGbMessage("");
      setGbErrors({});
      playPowerSurge();
      toast.success("Message received", {
        description: "Your message has been logged."
      });
    },
    onError: () => {
      toast.error("Failed to send", {
        description: "Try again later."
      });
    }
  });
  const contactMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      const response = await supabase.functions.invoke("send-contact-email", {
        body: data
      });
      if (response.error) throw response.error;
      return response.data;
    },
    onSuccess: () => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactErrors({});
      playPowerSurge();
      toast.success("Message sent", {
        description: "Bryan will receive your message soon."
      });
    },
    onError: () => {
      toast.error("Failed to send", {
        description: "Try again later or leave a public message instead."
      });
    }
  });
  const handleGuestBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = guestBookSchema.safeParse({
      name: gbName,
      message: gbMessage
    });
    if (!result.success) {
      const fieldErrors: {
        name?: string;
        message?: string;
      } = {};
      result.error.errors.forEach(err => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "message") fieldErrors.message = err.message;
      });
      setGbErrors(fieldErrors);
      return;
    }
    guestBookMutation.mutate({
      name: result.data.name,
      message: result.data.message
    });
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({
      name: contactName,
      email: contactEmail,
      message: contactMessage
    });
    if (!result.success) {
      const fieldErrors: {
        name?: string;
        email?: string;
        message?: string;
      } = {};
      result.error.errors.forEach(err => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "message") fieldErrors.message = err.message;
      });
      setContactErrors(fieldErrors);
      return;
    }
    contactMutation.mutate({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message
    });
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return <section className="mt-16 md:mt-24">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <h2 className="font-serif text-2xl md:text-3xl font-semibold stranger-glow uppercase tracking-wider flex items-center gap-3">Say Something<MessageSquare className="w-6 h-6 animate-electrical-flicker" />
          ​
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="guestbook" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card/50 border border-border/50">
            <TabsTrigger value="guestbook" className="font-mono text-xs uppercase tracking-widest data-[state=active]:stranger-glow" onClick={playElectricalCrackle}>
              <MessageSquare className="w-3 h-3 mr-2" />
              Guest Book
            </TabsTrigger>
            <TabsTrigger value="contact" className="font-mono text-xs uppercase tracking-widest data-[state=active]:stranger-glow" onClick={playElectricalCrackle}>
              <Mail className="w-3 h-3 mr-2" />
              Direct Line
            </TabsTrigger>
          </TabsList>

          {/* Guest Book Tab */}
          <TabsContent value="guestbook">
            <form onSubmit={handleGuestBookSubmit} className="relative bg-card/80 backdrop-blur-sm border border-border rounded-sm p-6 mb-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <Radio className="w-3 h-3 animate-electrical-flicker text-primary" />
                Drop a message
              </div>

              <div className="space-y-4">
                <div>
                  <Input placeholder="Your name (or codename)" value={gbName} onChange={e => setGbName(e.target.value)} className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50" maxLength={50} />
                  {gbErrors.name && <p className="text-xs text-destructive mt-1 font-mono">{gbErrors.name}</p>}
                </div>

                <div>
                  <Textarea placeholder="Your message to the void..." value={gbMessage} onChange={e => setGbMessage(e.target.value)} className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50 min-h-[100px]" maxLength={500} />
                  {gbErrors.message && <p className="text-xs text-destructive mt-1 font-mono">{gbErrors.message}</p>}
                  <div className="text-xs text-muted-foreground/50 text-right mt-1 font-mono">
                    {gbMessage.length}/500
                  </div>
                </div>

                <Button type="submit" disabled={guestBookMutation.isPending} className="w-full font-mono uppercase tracking-widest text-xs">
                  {guestBookMutation.isPending ? <span className="animate-electrical-flicker">Sending...</span> : <>
                      <Send className="w-3 h-3 mr-2" />
                      Send
                    </>}
                </Button>
              </div>
            </form>

            {/* Entries list */}
            <div className="space-y-4">
              {isLoading ? <div className="text-center py-8">
                  <div className="font-mono text-sm text-muted-foreground animate-electrical-flicker">
                    Loading messages...
                  </div>
                </div> : entries.length === 0 ? <div className="text-center py-8 border border-dashed border-border/50 rounded-sm">
                  <div className="font-mono text-sm text-muted-foreground">
                    No messages yet. Be the first to leave one.
                  </div>
                </div> : entries.map((entry, index) => <div key={entry.id} className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm p-4 animate-fade-in-up" style={{
              animationDelay: `${index * 50}ms`
            }}>
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
                  </div>)}
            </div>
          </TabsContent>

          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <form onSubmit={handleContactSubmit} className="relative bg-card/80 backdrop-blur-sm border border-border rounded-sm p-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <Mail className="w-3 h-3 animate-electrical-flicker text-primary" />
                Private message to Bryan
              </div>

              <p className="text-sm text-muted-foreground font-mono mb-6">
                Have an idea? Want to collaborate? This message goes directly to my inbox.
              </p>

              <div className="space-y-4">
                <div>
                  <Input placeholder="Your name" value={contactName} onChange={e => setContactName(e.target.value)} className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50" maxLength={50} />
                  {contactErrors.name && <p className="text-xs text-destructive mt-1 font-mono">{contactErrors.name}</p>}
                </div>

                <div>
                  <Input type="email" placeholder="Your email (for reply)" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50" maxLength={100} />
                  {contactErrors.email && <p className="text-xs text-destructive mt-1 font-mono">{contactErrors.email}</p>}
                </div>

                <div>
                  <Textarea placeholder="Your message..." value={contactMessage} onChange={e => setContactMessage(e.target.value)} className="bg-background/50 border-border/50 font-mono text-sm placeholder:text-muted-foreground/50 min-h-[120px]" maxLength={1000} />
                  {contactErrors.message && <p className="text-xs text-destructive mt-1 font-mono">{contactErrors.message}</p>}
                  <div className="text-xs text-muted-foreground/50 text-right mt-1 font-mono">
                    {contactMessage.length}/1000
                  </div>
                </div>

                <Button type="submit" disabled={contactMutation.isPending} className="w-full font-mono uppercase tracking-widest text-xs">
                  {contactMutation.isPending ? <span className="animate-electrical-flicker">Sending...</span> : <>
                      <Mail className="w-3 h-3 mr-2" />
                      Send
                    </>}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>;
}