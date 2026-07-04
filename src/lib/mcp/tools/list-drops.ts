import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_drops",
  title: "List drops",
  description: "List public drops (creative playable art & experiments) from bryanlauwk.fun.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(20).describe("Max drops to return."),
    tag: z.string().optional().describe("Optional tag filter (exact match)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ limit, tag }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!;
    const supabase = createClient(url, key, { auth: { persistSession: false } });

    let query = supabase
      .from("projects")
      .select("title, description, href, tag, color, updated_at")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
      .limit(limit);
    if (tag) query = query.eq("tag", tag);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { drops: data ?? [] },
    };
  },
});
