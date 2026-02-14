import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const ALLOWED_ORIGINS = [
  "https://bryanlauwkfun.lovable.app",
  "https://id-preview--44adb1a5-8dc4-4101-bcfc-cde96ffcb1a4.lovable.app"
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

const RATE_LIMIT_WINDOW_MS = 600000;
const MAX_REQUESTS_PER_WINDOW = 3;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) rateLimitStore.delete(ip);
  }
}

const VALID_CATEGORIES = ["feedback", "idea", "sponsorship", "private"];

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  cleanupRateLimitStore();

  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                   req.headers.get("cf-connecting-ip") || "unknown";

  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many submissions. Please try again later.", retryAfter: rateLimitResult.retryAfter }),
      { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(rateLimitResult.retryAfter), ...corsHeaders } }
    );
  }

  try {
    const body = await req.json();
    const { name, message, email, category } = body;

    // Validate required fields
    if (!name || !message) {
      return new Response(JSON.stringify({ error: "Name and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (typeof name !== "string" || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input types" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const trimmedEmail = email?.trim() || null;
    const validCategory = VALID_CATEGORIES.includes(category) ? category : "feedback";

    if (trimmedName.length < 1 || trimmedName.length > 50) {
      return new Response(JSON.stringify({ error: "Name must be between 1 and 50 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    if (trimmedMessage.length < 1 || trimmedMessage.length > 1000) {
      return new Response(JSON.stringify({ error: "Message must be between 1 and 1000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Validate email if provided
    if (trimmedEmail) {
      if (trimmedEmail.length > 255) {
        return new Response(JSON.stringify({ error: "Email too long" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail) || trimmedEmail.includes("\n") || trimmedEmail.includes("\r")) {
        return new Response(JSON.stringify({ error: "Invalid email address" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }

    // Require email for private and sponsorship messages
    if ((validCategory === "private" || validCategory === "sponsorship") && !trimmedEmail) {
      return new Response(JSON.stringify({ error: "Email is required for private and sponsorship messages" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Insert into guest_book
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: insertError } = await supabase.from("guest_book").insert([{
      name: trimmedName,
      message: trimmedMessage,
      email: trimmedEmail,
      category: validCategory,
    }]);

    if (insertError) {
      console.error("Guest book insert error:", insertError);
      if (insertError.message?.includes("Rate limit exceeded")) {
        return new Response(JSON.stringify({ error: "Too many submissions. Please wait before posting again." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
      throw insertError;
    }

    // For private/sponsorship messages, also send email notification
    if ((validCategory === "private" || validCategory === "sponsorship") && RESEND_API_KEY) {
      const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      const safeName = escapeHtml(trimmedName);
      const safeEmail = escapeHtml(trimmedEmail!);
      const safeMessage = escapeHtml(trimmedMessage);
      const categoryLabel = validCategory === "sponsorship" ? "🤝 Sponsorship Inquiry" : "📡 Private Message";

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Contact Form <onboarding@resend.dev>",
            to: ["bryanlauwk@gmail.com"],
            subject: `[${validCategory === "sponsorship" ? "Sponsorship" : "Private"}] Message from ${safeName}`,
            reply_to: trimmedEmail!,
            html: `
              <!DOCTYPE html><html><head><style>
                body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #e5e5e5; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 20px; }
                .header { border-bottom: 1px solid #dc2626; padding-bottom: 10px; margin-bottom: 20px; }
                .header h1 { color: #dc2626; font-size: 24px; margin: 0; }
                .field { margin-bottom: 15px; }
                .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
                .value { color: #fff; margin-top: 5px; }
                .message { background: #111; padding: 15px; border-left: 3px solid #dc2626; margin-top: 20px; }
                .footer { margin-top: 30px; font-size: 12px; color: #666; }
              </style></head><body>
                <div class="container">
                  <div class="header"><h1>${categoryLabel}</h1></div>
                  <div class="field"><div class="label">From</div><div class="value">${safeName}</div></div>
                  <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${safeEmail}" style="color: #dc2626;">${safeEmail}</a></div></div>
                  <div class="message"><div class="label">Message</div><div class="value" style="white-space: pre-wrap; margin-top: 10px;">${safeMessage}</div></div>
                  <div class="footer">Sent from the void · bryanlauwk.lovable.app</div>
                </div>
              </body></html>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email notification failed (entry still saved):", emailErr);
      }
    }

    console.log(`Guest book entry added [${validCategory}] from IP: ${clientIP}`);
    return new Response(JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });

  } catch (error: unknown) {
    console.error("Error in submit-guest-book function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
};

serve(handler);
