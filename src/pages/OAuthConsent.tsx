import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { safeSupabase as supabase } from "@/integrations/supabase/safe-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

// Typed wrapper — supabase-js exposes auth.oauth in a beta namespace that
// TypeScript may not surface. Keep the wrapper local so we still call the
// installed client methods (never reach into node_modules or hand-roll requests).
type OAuthClient = { name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type AuthOAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};
const authOAuth = (supabase.auth as unknown as { oauth: AuthOAuthApi }).oauth;

export default function OAuthConsent() {
  useSEO({
    title: "Authorize app — Bryan LauWK",
    description: "Authorize an application to access your bryanlauwk.fun account.",
    canonical: "https://www.bryanlauwk.fun/.lovable/oauth/consent",
    noindex: true,
  });

  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        // Preserve the full consent URL so sign-in returns the user here.
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user?.email ?? null);
      const { data, error: detErr } = await authOAuth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detErr) {
        setError(detErr.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error: decErr } = approve
      ? await authOAuth.approveAuthorization(authorizationId)
      : await authOAuth.denyAuthorization(authorizationId);
    if (decErr) {
      setBusy(false);
      setError(decErr.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authorization error</CardTitle>
            <CardDescription>Could not load this authorization request.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <p className="text-sm text-muted-foreground">Loading authorization request…</p>
      </div>
    );
  }

  const clientName = details.client?.name ?? "an app";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Connect {clientName} to bryanlauwk.fun</CardTitle>
          <CardDescription>
            This lets {clientName} use bryanlauwk.fun tools as you
            {userEmail ? ` (${userEmail})` : ""}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              {clientName} will be able to call this app's enabled MCP tools while you are signed in.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Share your basic profile</li>
              <li>Share your email address</li>
            </ul>
            <p className="text-xs">
              This does not bypass this app's permissions or backend policies.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
              Approve
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              disabled={busy}
              onClick={() => decide(false)}
            >
              Cancel connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
