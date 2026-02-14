import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export type SponsorInsert = Omit<Sponsor, "id" | "created_at" | "updated_at">;
export type SponsorUpdate = Partial<SponsorInsert> & { id: string };

export function usePublicSponsors() {
  return useQuery({
    queryKey: ["sponsors", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Sponsor[];
    },
  });
}

export function useAdminSponsors(enabled = true) {
  return useQuery({
    queryKey: ["sponsors", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Sponsor[];
    },
    enabled,
  });
}

export function useCreateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sponsor: Omit<SponsorInsert, "display_order">) => {
      const { data: existing } = await supabase
        .from("sponsors")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1);
      const maxOrder = existing?.[0]?.display_order ?? -1;
      const { data, error } = await supabase
        .from("sponsors")
        .insert({ ...sponsor, display_order: maxOrder + 1 })
        .select()
        .single();
      if (error) throw error;
      return data as Sponsor;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

export function useUpdateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: SponsorUpdate) => {
      const { data, error } = await supabase
        .from("sponsors")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Sponsor;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

export function useDeleteSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("sponsors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

export function useReorderSponsors() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sponsors: { id: string; display_order: number }[]) => {
      const updates = sponsors.map((s) =>
        supabase.from("sponsors").update({ display_order: s.display_order }).eq("id", s.id)
      );
      const results = await Promise.all(updates);
      const error = results.find((r) => r.error)?.error;
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sponsors"] }),
  });
}

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadSponsorLogo(file: File): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES[file.type]) {
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB limit.");
  }
  const fileExt = ALLOWED_IMAGE_TYPES[file.type];
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage.from("sponsor-logos").upload(fileName, file);
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("sponsor-logos").getPublicUrl(fileName);
  return data.publicUrl;
}
