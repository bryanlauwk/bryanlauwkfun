import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, and message are required");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

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
        subject: `[Portfolio Contact] Message from ${name}`,
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
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></div>
              </div>
              
              <div class="message">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${message}</div>
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

    console.log("Contact email sent successfully:", data);

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
