import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Allowed origins for CORS - restrict to production domain
const ALLOWED_ORIGINS = [
  "https://bryanlauwkfun.lovable.app",
  "https://id-preview--44adb1a5-8dc4-4101-bcfc-cde96ffcb1a4.lovable.app"
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed.replace('https://', 'https://')))
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3; // 3 emails per hour per IP

// In-memory rate limiting store (resets on function cold start)
// For production, consider using Redis or a database table
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // First request or window expired - allow and start new window
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment count
  record.count++;
  return { allowed: true };
}

// Clean up expired entries periodically (prevent memory leak)
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

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Clean up expired rate limit entries
  cleanupRateLimitStore();

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";

  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ 
        error: "Too many requests. Please try again later.",
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

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { name, email, message }: ContactRequest = await req.json();

    // Validate required fields with length limits
    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, and message are required");
    }

    // Server-side length validation (prevent abuse)
    if (name.length > 100) {
      throw new Error("Name must be less than 100 characters");
    }
    if (email.length > 255) {
      throw new Error("Email must be less than 255 characters");
    }
    if (message.length > 2000) {
      throw new Error("Message must be less than 2000 characters");
    }

    // Sanitize inputs - prevent HTML/script injection
    const sanitizedName = name.replace(/[<>]/g, "").trim();
    const sanitizedMessage = message.replace(/[<>]/g, "").trim();

    // Basic email validation with additional security checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    // Prevent email header injection
    if (email.includes("\n") || email.includes("\r")) {
      throw new Error("Invalid email address");
    }

    // Escape HTML entities for safe email rendering
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(sanitizedName);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(sanitizedMessage);

    // Send email using Resend API directly
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: ["bryanlauwk@gmail.com"],
        subject: `[Portfolio Contact] Message from ${safeName}`,
        reply_to: email,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #e5e5e5; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 20px; }
              .header { border-bottom: 1px solid #dc2626; padding-bottom: 10px; margin-bottom: 20px; }
              .header h1 { color: #dc2626; font-size: 24px; margin: 0; }
              .field { margin-bottom: 15px; }
              .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; }
              .value { color: #fff; margin-top: 5px; }
              .message { background: #111; padding: 15px; border-left: 3px solid #dc2626; margin-top: 20px; }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📡 New Transmission Received</h1>
              </div>
              
              <div class="field">
                <div class="label">From</div>
                <div class="value">${safeName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${safeEmail}" style="color: #dc2626;">${safeEmail}</a></div>
              </div>
              
              <div class="message">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${safeMessage}</div>
              </div>
              
              <div class="footer">
                Sent from the void · bryanlauwk.lovable.app
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Contact email sent successfully from IP:", clientIP);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
