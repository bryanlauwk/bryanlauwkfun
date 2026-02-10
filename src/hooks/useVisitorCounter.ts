import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        // Call the increment function which returns the new count
        const { data, error } = await supabase.rpc("increment_page_view", {
          p_page_path: "/",
        });

        if (error) {
          console.error("Error incrementing page view:", error);
          // Fallback to just reading the current count via secure RPC
          const { data: fallbackData } = await supabase.rpc("get_page_view_count", {
            p_page_path: "/",
          });

          if (fallbackData !== null) {
            setCount(fallbackData as number);
          }
        } else {
          setCount(data as number);
        }
      } catch (err) {
        console.error("Error with visitor counter:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Only increment once per session
    const sessionKey = "visitor-counted";
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true");
      incrementAndFetch();
    } else {
      // Just fetch the current count without incrementing via secure RPC function
      const fetchCount = async () => {
        const { data, error } = await supabase.rpc("get_page_view_count", {
          p_page_path: "/",
        });

        if (!error && data !== null) {
          setCount(data as number);
        }
        setIsLoading(false);
      };
      fetchCount();
    }
  }, []);

  return { count, isLoading };
}
