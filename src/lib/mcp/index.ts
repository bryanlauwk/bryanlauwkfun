import { defineMcp } from "@lovable.dev/mcp-js";
import listDrops from "./tools/list-drops";
import getDrop from "./tools/get-drop";
import submitMessage from "./tools/submit-message";

export default defineMcp({
  name: "bryanlauwk-fun-mcp",
  title: "bryanlauwk.fun",
  version: "0.1.0",
  instructions:
    "Tools for bryanlauwk.fun — a collection of playable art and creative web experiments. Use `list_drops` to browse drops, `get_drop` to fetch details of a specific drop, and `submit_message` to send feedback, ideas, or sponsorship inquiries.",
  tools: [listDrops, getDrop, submitMessage],
});
