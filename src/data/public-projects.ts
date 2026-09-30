import type { Project } from "@/hooks/useProjects";

// Public catalogue recorded in project-journey.test.tsx on 2026-09-22.
// Used only until the live public catalogue is available; never used by admin writes.
const catalogue = [
  ["Badminton Clash", "https://www.yuqiuren.fun/", "Badminton Lovers"],
  ["Elemental Block Blast", "https://elemental-block-blast.lovable.app", "Casual Gamers"],
  ["Infinite Kitchen", "https://infinitekitchen.bryanlauwk.fun/", "Foodies"],
  ["马年新年歌排行榜", "https://cny2026.bryanlauwk.fun/", "Trend Watcher"],
  ["Inflation Chart", "https://inflationchart.bryanlauwk.fun/", "Data Nerds"],
  ["Cafe Rush", "https://zusrush.bryanlauwk.fun/", "Coffee lovers"],
  ["Cartridge", "https://cartridge-pod.lovable.app", "Merchandise"],
  ["Artoy", "https://artoy.bryanlauwk.fun", "Art"],
  ["画啦猜啦", "https://chineseskribbl.bryanlauwk.fun", "Drawing game"],
  ["Farm-direct platform", "https://secai-marche.bryanlauwk.fun", ""],
  ["Boringg", "https://clickerlab.bryanlauwk.fun", ""],
  ["Giant Durian Run", "https://kldex.bryanlauwk.fun", "Gamers"],
];

export const bundledPublicProjects: Project[] = catalogue.map(([title, href, tag], index) => ({
  id: title === "画啦猜啦" ? "f7f395c8" : title === "马年新年歌排行榜" ? "4337d134" : `bundled-${index}`,
  title, href, tag, description: null, image_url: null, color: "#ff0000",
  display_order: index, is_visible: true, show_text_overlay: false,
  created_at: "", updated_at: "",
}));
