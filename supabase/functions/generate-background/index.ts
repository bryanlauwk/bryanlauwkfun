import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

const DAY_PROMPT = `A warm sunlit cosmic underwater scene, ultra high resolution 16:9 aspect ratio hero image. A mystical octopus in a bright coral reef bathed in golden sunlight. Sun rays pierce through crystal-clear water from above, creating god rays. Warm amber and golden tones dominate. Floating lanterns drift upward like jellyfish. The text "bryanlauwk.fun" appears elegantly at the top center in decorative script lettering, glowing warmly. Scattered constellations visible even in daylight. Hand-drawn illustration style with magical warm atmosphere. The octopus holds a vintage pocket watch in one tentacle. Tropical fish and sea butterflies add life and color.`;

const NIGHT_PROMPT = `A dark mystical deep-sea cosmic abyss, ultra high resolution 16:9 aspect ratio hero image. A mystical octopus is the central figure in a moonlit underwater void. Deep teal (#0D5F5F) and indigo color palette with bioluminescent accents. A massive moon visible through the water surface above. Glowing jellyfish and bioluminescent creatures illuminate the darkness. The text "bryanlauwk.fun" appears elegantly at the top center in decorative script lettering, glowing with cool blue light. Starfield and mystical symbols scattered in the dark background. Hand-drawn illustration style with eerie magical atmosphere. The octopus holds a vintage pocket watch in one tentacle. Floating lanterns cast soft warm pools of light against the cold deep.`;

serve(async (req) => {
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

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Parse timeOfDay from body
    const body = await req.json();
    const timeOfDay = body.timeOfDay === "day" ? "day" : "night";

    // Build cache key based on date + time of day
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const cacheFileName = `bg-${timeOfDay}-${today}.png`;

    // Check cache first if we have storage access
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      // Check if cached image exists
      const { data: existingFile } = await supabase.storage
        .from('backgrounds')
        .list('', { search: cacheFileName });

      if (existingFile && existingFile.length > 0) {
        const { data: publicUrl } = supabase.storage
          .from('backgrounds')
          .getPublicUrl(cacheFileName);

        console.log("Returning cached background:", publicUrl.publicUrl);
        return new Response(
          JSON.stringify({ success: true, imageUrl: publicUrl.publicUrl, cached: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Generate new image
    const prompt = timeOfDay === "day" ? DAY_PROMPT : NIGHT_PROMPT;
    console.log(`Generating ${timeOfDay} background with gemini-3-pro-image-preview...`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageData) {
      console.error("No image data in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "No image generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upload to storage with cache filename
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

        const { error: uploadError } = await supabase.storage
          .from('backgrounds')
          .upload(cacheFileName, imageBytes, {
            contentType: 'image/png',
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicUrl } = supabase.storage
            .from('backgrounds')
            .getPublicUrl(cacheFileName);

          console.log("Image uploaded to storage:", publicUrl.publicUrl);

          return new Response(
            JSON.stringify({
              success: true,
              imageUrl: publicUrl.publicUrl,
              cached: false,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } else {
          console.error("Upload error:", uploadError);
        }
      } catch (storageError) {
        console.error("Storage error:", storageError);
      }
    }

    // Fallback: return base64
    return new Response(
      JSON.stringify({ success: true, base64: imageData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("generate-background error:", error);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
