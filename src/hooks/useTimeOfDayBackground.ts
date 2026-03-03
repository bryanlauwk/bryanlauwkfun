import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type TimeOfDay = "day" | "night";

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function useTimeOfDayBackground() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    let cancelled = false;

    async function loadBackground() {
      const today = getTodayDate();
      const cacheFileName = `bg-${timeOfDay}-${today}.png`;

      // 1. Check if cached image exists in storage
      try {
        const { data: publicUrl } = supabase.storage
          .from("backgrounds")
          .getPublicUrl(cacheFileName);

        // Try fetching the URL to see if it actually exists
        const headResp = await fetch(publicUrl.publicUrl, { method: "HEAD" });
        if (headResp.ok && !cancelled) {
          setBackgroundUrl(publicUrl.publicUrl);
          setIsLoading(false);
          return;
        }
      } catch {
        // Not cached, continue to generate
      }

      // 2. Call edge function to generate
      try {
        const { data, error } = await supabase.functions.invoke("generate-background", {
          body: { timeOfDay },
        });

        if (cancelled) return;

        if (error) {
          console.error("Edge function error:", error);
          setIsLoading(false);
          return;
        }

        if (data?.imageUrl) {
          setBackgroundUrl(data.imageUrl);
        } else if (data?.base64) {
          setBackgroundUrl(data.base64);
        }
      } catch (err) {
        console.error("Failed to generate background:", err);
      }

      if (!cancelled) setIsLoading(false);
    }

    loadBackground();
    return () => { cancelled = true; };
  }, [timeOfDay]);

  return { backgroundUrl, isLoading, timeOfDay };
}
