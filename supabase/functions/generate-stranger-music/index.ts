import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
  
  if (!ELEVENLABS_API_KEY) {
    console.error("ELEVENLABS_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Music service not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Stranger Things-inspired music prompt
    const prompt = "Dark ambient synth music, 80s horror movie soundtrack style, deep bass drones, eerie atmospheric pads, minor key, slow tempo, mysterious and suspenseful, Stranger Things inspired, John Carpenter style synthesizer, haunting and ethereal";
    const duration = 30; // 30 seconds of ambient music

    console.log("Generating Stranger Things-style music...");

    const response = await fetch(
      "https://api.elevenlabs.io/v1/music",
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          duration_seconds: duration,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      throw new Error(`Music generation failed: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Music generated successfully, size:", audioBuffer.byteLength);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error: unknown) {
    console.error("Error generating music:", error);
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
