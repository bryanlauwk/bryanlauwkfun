import { useEffect, useState } from "react";
import { safeSupabase as supabase } from "@/integrations/supabase/safe-client";

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        const { data, error } = await supabase.rpc("increment_page_view", {
          p_page_path: "/",
        });

        if (error) {
          console.error("Error incrementing page view:", error);
        } else {
          setCount(data as number);
        }
      } catch (err) {
        console.error("Error with visitor counter:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCount = async () => {
      try {
        const { data, error } = await supabase
          .from("page_views")
          .select("view_count")
          .eq("page_path", "/")
          .maybeSingle();

        if (!error && data?.view_count !== undefined) {
          setCount(data.view_count);
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
