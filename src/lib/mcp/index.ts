import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listDrops from "./tools/list-drops";
import getDrop from "./tools/get-drop";
import submitMessage from "./tools/submit-message";

// Direct supabase.co issuer required by RFC 8414 §3.3 — mcp-js rejects tokens
// whose configured issuer doesn't match discovery. Build from the project ref
// (Vite inlines this at build time; safe at cold start and manifest extract).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "bryanlauwk-fun-mcp",
  title: "bryanlauwk.fun",
  version: "0.1.0",
  instructions:
    "Tools for bryanlauwk.fun — a collection of playable art and creative web experiments. Use `list_drops` to browse drops, `get_drop` to fetch details of a specific drop, and `submit_message` to send feedback, ideas, or sponsorship inquiries.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listDrops, getDrop, submitMessage],
});
