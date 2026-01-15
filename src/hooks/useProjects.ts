import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  href: string;
  color: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert> & { id: string };

// Fetch visible projects (public)
export function usePublicProjects() {
  return useQuery({
    queryKey: ["projects", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
}

// Fetch all projects (admin)
export function useAdminProjects() {
  return useQuery({
    queryKey: ["projects", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Omit<ProjectInsert, "display_order">) => {
      // Get max order
      const { data: existing } = await supabase
        .from("projects")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1);

      const maxOrder = existing?.[0]?.display_order ?? -1;

      const { data, error } = await supabase
        .from("projects")
        .insert({ ...project, display_order: maxOrder + 1 })
        .select()
        .single();

      if (error) throw error;
      return data as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ProjectUpdate) => {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// Upload project image
export async function uploadProjectImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
