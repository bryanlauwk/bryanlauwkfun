import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  email: string | null;
  category: string;
  created_at: string;
}

// Fetch guest book entries for admin
export function useAdminGuestBook(enabled: boolean = true) {
  return useQuery({
    queryKey: ["guest-book", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guest_book")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as GuestBookEntry[];
    },
    enabled,
  });
}

// Delete guest book entry
export function useDeleteGuestBookEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("guest_book")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guest-book"] });
    },
  });
}
