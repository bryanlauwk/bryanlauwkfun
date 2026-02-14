import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://bryanlauwkfun.lovable.app",
  "https://id-preview--44adb1a5-8dc4-4101-bcfc-cde96ffcb1a4.lovable.app",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
};

// Rate limiting: 1 request per 5 minutes per IP
const RATE_LIMIT_WINDOW_MS = 300000;
const MAX_REQUESTS_PER_WINDOW = 1;
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

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  cleanupRateLimitStore();

  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                   req.headers.get("cf-connecting-ip") ||
                   "unknown";

  const rateLimitResult = checkRateLimit(clientIP);
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter),
          ...corsHeaders,
        },
      }
    );
  }

  const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!ELEVENLABS_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing required environment variables");
    return new Response(
      JSON.stringify({ error: "Service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Check if music already exists
    const { data: existingFile } = await supabase.storage
      .from("audio-assets")
      .list("", { search: "stranger-music.mp3" });

    if (existingFile && existingFile.length > 0) {
      const { data: urlData } = supabase.storage
        .from("audio-assets")
        .getPublicUrl("stranger-music.mp3");

      return new Response(
        JSON.stringify({ 
          message: "Music already cached", 
          url: urlData.publicUrl,
          cached: true 
        }),
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate new music
    const prompt = "Dark ambient electronic music, deep bass drones and pulsing synthesizers, eerie atmospheric pads in minor key, slow tempo around 60bpm, mysterious and suspenseful mood, haunting ethereal textures, retro analog synth sounds, cinematic and immersive";
    const duration = 30;

    console.log("Generating dark ambient synth music for cache...");

    const response = await fetch("https://api.elevenlabs.io/v1/music", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        duration_seconds: duration,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ElevenLabs API error:", response.status, JSON.stringify(errorData));
      throw new Error(`Music generation failed: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Music generated, size:", audioBuffer.byteLength);

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("audio-assets")
      .upload("stranger-music.mp3", audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from("audio-assets")
      .getPublicUrl("stranger-music.mp3");

    console.log("Music cached successfully at:", urlData.publicUrl);

    return new Response(
      JSON.stringify({ 
        message: "Music generated and cached", 
        url: urlData.publicUrl,
        cached: false 
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
