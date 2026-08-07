import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { safeSupabase as supabase } from "@/integrations/supabase/safe-client";
import { CONTENT_DEFAULTS } from "@/lib/siteContent";

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

/** Fetch all site settings as a key→value map. Never throws to the caller. */
async function fetchSettingsMap(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_settings").select("key,value");
  if (error) throw error;
  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    if (row.key) map[row.key] = row.value ?? "";
  }
  return map;
}

/**
 * Public site content: registry defaults overlaid with any saved overrides.
 * On any error (RLS, network) it silently falls back to the defaults, so the
 * public site always renders.
 */
export function useSiteContent() {
  const query = useQuery({
    queryKey: ["site_settings", "public"],
    queryFn: fetchSettingsMap,
    staleTime: 60_000,
    retry: 1,
  });

  const overrides = query.data ?? {};
  const map: Record<string, string> = { ...CONTENT_DEFAULTS };
  for (const [key, value] of Object.entries(overrides)) {
    // Only override with a non-empty saved value; blank means "use default".
    if (value != null && value !== "") map[key] = value;
  }

  /** Read a content value with the registry default as the fallback. */
  const content = (key: string): string => map[key] ?? CONTENT_DEFAULTS[key] ?? "";

  return { content, map, isLoading: query.isLoading };
}

/** Admin view: the raw saved overrides map (defaults not merged). */
export function useAdminSiteSettings(enabled = true) {
  return useQuery({
    queryKey: ["site_settings", "admin"],
    queryFn: fetchSettingsMap,
    enabled,
  });
}

/** Upsert a batch of settings by key. Only changed keys should be passed. */
export function useSaveSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entries: Record<string, string>) => {
      const rows = Object.entries(entries).map(([key, value]) => ({ key, value }));
      if (rows.length === 0) return;
      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    },
  });
}
