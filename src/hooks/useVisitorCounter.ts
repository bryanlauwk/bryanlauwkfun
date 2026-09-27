import { useEffect, useState } from "react";
import { safeSupabase as supabase } from "@/integrations/supabase/safe-client";

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("track-view", {
          body: { path: "/" },
        });

        if (error) {
          console.error("Error incrementing page view:", error);
          await fetchCount();
        } else if (data && typeof (data as { count?: number }).count === "number") {
          setCount((data as { count: number }).count);
        }
      } catch (err) {
        console.error("Error with visitor counter:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCount = async () => {
      try {
        const { data, error } = await supabase.rpc("get_page_view_count", {
          p_path: "/",
        });

        if (!error && typeof data === "number") {
          setCount(data);
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const sessionKey = "visitor-counted";
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true");
      incrementAndFetch();
    } else {
      fetchCount();
    }
  }, []);

  return { count, isLoading };
}
