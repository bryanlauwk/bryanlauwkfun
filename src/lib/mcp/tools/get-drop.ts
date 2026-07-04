import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_drop",
  title: "Get drop",
  description: "Fetch a single visible drop by its title (case-insensitive contains match).",
  inputSchema: {
    title: z.string().min(1).describe("Full or partial drop title."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ title }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!;
    const supabase = createClient(url, key, { auth: { persistSession: false } });

    const { data, error } = await supabase
      .from("projects")
      .select("title, description, href, tag, color, updated_at")
      .eq("is_visible", true)
      .ilike("title", `%${title}%`)
      .limit(1)
      .maybeSingle();

    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    if (!data) {
      return { content: [{ type: "text", text: `No drop found matching "${title}".` }] };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { drop: data },
    };
  },
});
