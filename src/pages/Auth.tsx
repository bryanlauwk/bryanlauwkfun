import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";

/**
 * Only accept a same-origin relative path as the post-login redirect target.
 * This is what lets the OAuth consent route send unauthenticated users through
 * sign-in and get them back to /.lovable/oauth/consent?authorization_id=…
 * instead of dropping them on /admin.
 */
function safeNext(raw: string | null): string | null {
  if (!raw) return null;
  if (!raw.startsWith("/") || raw.startsWith("//")) return null;
  return raw;
}

export default function Auth() {
  useSEO({
    title: "Sign in — Bryan Lau",
    description: "Sign in to manage drops, guest book messages and sponsors on bryanlauwk.fun.",
    canonical: "https://www.bryanlauwk.fun/auth",
    noindex: true,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const next = safeNext(searchParams.get("next"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      toast({ title: "Signed in successfully!" });
      if (next) {
        // OAuth consent (or another same-origin flow) is waiting for us.
        window.location.href = next;
      } else {
        navigate("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Sign In</CardTitle>
          <CardDescription>Sign in to manage your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
