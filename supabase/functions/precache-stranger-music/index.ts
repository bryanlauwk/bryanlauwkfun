import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
