import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_message",
  title: "Submit guest book message",
  description:
    "Send a public feedback or idea message to bryanlauwk.fun's guest book. For private/sponsorship inquiries include an email.",
  inputSchema: {
    name: z.string().trim().min(1).max(50).describe("Sender name (1-50 chars)."),
    message: z.string().trim().min(1).max(1000).describe("Message body (1-1000 chars)."),
    category: z
      .enum(["feedback", "idea", "sponsorship", "private"])
      .default("feedback")
      .describe("Message category."),
    email: z.string().email().max(255).optional().describe("Required for private/sponsorship."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async ({ name, message, category, email }) => {
    if ((category === "private" || category === "sponsorship") && !email) {
      return {
        content: [{ type: "text", text: "Email is required for private and sponsorship messages." }],
        isError: true,
      };
    }
    const url = process.env.SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { error } = await supabase.from("guest_book").insert([
      { name, message, category, email: email ?? null },
    ]);

    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return { content: [{ type: "text", text: "Message received. Thanks for writing in." }] };
  },
});
