import type { Project } from "@/hooks/useProjects";

// Offline snapshot refreshed October 2026. Category and editorial summary are
// explicit metadata, independent of a project's display title.
export const catalogue = [
  [
    "Badminton Clash",
    "https://www.yuqiuren.fun/",
    "Badminton Lovers",
    "Track badminton matches, revisit results, and explore player performance.",
    "Web experiences",
    null
  ],
  [
    "Elemental Block Blast",
    "https://elemental-block-blast.lovable.app",
    "Casual Gamers",
    "Build elemental combinations and trigger chain reactions in a browser puzzle.",
    "Games",
    "elemental-block-blast"
  ],
  [
    "Infinite Kitchen",
    "https://infinitekitchen.bryanlauwk.fun/",
    "Foodies",
    "Explore ingredients and cooking methods in a calm, never-ending kitchen.",
    "Web experiences",
    "infinite-kitchen"
  ],
  [
    "马年新年歌排行榜",
    "https://cny2026.bryanlauwk.fun/",
    "Trend Watcher",
    "Explore the songs climbing the 2026 Chinese New Year charts.",
    "Web experiences",
    "cny-song-chart"
  ],
  [
    "Inflation Chart",
    "https://inflationchart.bryanlauwk.fun/",
    "Data Nerds",
    "Explore how everyday food prices are changing in Malaysia.",
    "Web experiences",
    "inflation-chart"
  ],
  [
    "Cafe Rush",
    "https://zusrush.bryanlauwk.fun/",
    "Coffee lovers",
    "Tap, hold, and serve your way through a busy café shift.",
    "Games",
    "cafe-rush"
  ],
  [
    "Cartridge",
    "https://cartridge-pod.lovable.app",
    "Merchandise",
    "Explore a merchandise platform built around turning creative work into products.",
    "Objects",
    "cartridge"
  ],
  [
    "Artoy",
    "https://artoy.bryanlauwk.fun",
    "Art",
    "Explore how a character drawing can become a world of collectible objects.",
    "Objects",
    null
  ],
  [
    "画啦猜啦",
    "https://chineseskribbl.bryanlauwk.fun",
    "Drawing game",
    "Draw a Chinese word while your friends race to guess it.",
    "Games",
    null
  ],
  [
    "Farm-direct platform",
    "https://secai-marche.bryanlauwk.fun",
    "",
    "An independent Secai Marche redesign exploring farm-to-table produce discovery.",
    "Web experiences",
    "secai-marche"
  ],
  [
    "Boringg",
    "https://boringg.bryanlauwk.fun",
    "",
    "A one-button experiment. Click it and see what happens.",
    "Web experiences",
    null
  ],
  [
    "Giant Durian Run",
    "https://kldex.bryanlauwk.fun",
    "Gamers",
    "Dodge giant durians in a browser runner made for the KL Durian Experience Centre.",
    "Games",
    null
  ],
  [
    "Type A Disaster",
    "https://typeadisaster.bryanlauwk.fun/",
    "Gamers",
    "A city simulation you can play in your browser.",
    "Games",
    "type-a-disaster-20261018"
  ],
  [
    "Little Originals",
    "https://littleoriginal.bryanlauwk.fun/",
    "",
    "Explore a shop concept that turns children’s drawings into personalised merchandise.",
    "Objects",
    null
  ]
] as const;

export const bundledPublicProjects: Project[] = catalogue.map(([title, href, tag, description, category, preview], index) => ({
  id: title === "画啦猜啦" ? "f7f395c8" : title === "马年新年歌排行榜" ? "4337d134" : `bundled-${index}`,
  title, href, tag, description, category,
  image_url: preview ? `https://ywirnyuvvpenzajaajkg.supabase.co/storage/v1/object/public/project-images/previews%2F${preview}.webp` : null,
  color: "#ff0000", display_order: index, is_visible: true, show_text_overlay: false,
  created_at: "", updated_at: "",
}));
