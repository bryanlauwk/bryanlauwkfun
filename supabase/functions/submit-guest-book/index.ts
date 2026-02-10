import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Allowed origins for CORS
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

// Rate limiting: 3 entries per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 600000; // 10 minutes
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
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  cleanupRateLimitStore();

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                   req.headers.get("cf-connecting-ip") ||
                   "unknown";

  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    console.warn(`Guest book rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({
        error: "Too many submissions. Please try again later.",
        retryAfter: rateLimitResult.retryAfter
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter),
          ...corsHeaders
        }
      }
    );
  }

  try {
    const { name, message } = await req.json();

    // Validate required fields
    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: "Name and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate types
    if (typeof name !== "string" || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid input types" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side length validation
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 1 || trimmedName.length > 50) {
      return new Response(
        JSON.stringify({ error: "Name must be between 1 and 50 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (trimmedMessage.length < 1 || trimmedMessage.length > 500) {
      return new Response(
        JSON.stringify({ error: "Message must be between 1 and 500 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Insert using service role (bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error } = await supabase
      .from("guest_book")
      .insert([{ name: trimmedName, message: trimmedMessage }]);

    if (error) {
      console.error("Guest book insert error:", error);
      // Check if it's the DB-level rate limit trigger
      if (error.message?.includes("Rate limit exceeded")) {
        return new Response(
          JSON.stringify({ error: "Too many submissions. Please wait before posting again." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw error;
    }

    console.log("Guest book entry added from IP:", clientIP);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in submit-guest-book function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
