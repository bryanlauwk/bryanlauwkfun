import { useQuery } from "@tanstack/react-query";
import { safeSupabase as supabase } from "@/integrations/supabase/safe-client";

export interface StampReactionSummary {
  label: string;
  page_path: string;
  area_key: string;
  reaction_count: number;
}

export async function recordStampReaction(label: string, pagePath: string, areaKey: string) {
  const { error } = await supabase.from("stamp_reactions").insert({
    label,
    page_path: pagePath,
    area_key: areaKey,
  });

  if (error) throw error;
}

export function useAdminStampReactions(enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "stamp-reactions"],
    queryFn: async (): Promise<StampReactionSummary[]> => {
      const { data, error } = await supabase.rpc("get_stamp_reaction_summary");
      if (error) throw error;
      return data ?? [];
    },
    enabled,
    staleTime: 30_000,
  });
}
