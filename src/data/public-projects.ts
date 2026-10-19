import type { Project } from "@/hooks/useProjects";

// Offline snapshot refreshed October 2026. Category and editorial summary are
// explicit metadata, independent of a project's display title.
export const catalogue = [
  [
    "Badminton Clash",
    "https://www.yuqiuren.fun/",
    "Badminton Lovers",
    "Every rally, result and rival, on record.",
    "Web experiences",
    null
  ],
  [
    "Elemental Block Blast",
    "https://elemental-block-blast.lovable.app",
    "Casual Gamers",
    "Mix the elements. Start a chain reaction.",
    "Games",
    "elemental-block-blast"
  ],
  [
    "Infinite Kitchen",
    "https://infinitekitchen.bryanlauwk.fun/",
    "Foodies",
    "A kitchen that never closes, or ends.",
    "Web experiences",
    "infinite-kitchen"
  ],
  [
    "马年新年歌排行榜",
    "https://cny2026.bryanlauwk.fun/",
    "Trend Watcher",
    "The songs ruling Chinese New Year 2026.",
    "Web experiences",
    "cny-song-chart"
  ],
  [
    "Inflation Chart",
    "https://inflationchart.bryanlauwk.fun/",
    "Data Nerds",
    "What your nasi lemak cost last year, and now.",
    "Web experiences",
    "inflation-chart"
  ],
  [
    "Cafe Rush",
    "https://zusrush.bryanlauwk.fun/",
    "Coffee lovers",
    "Tap, hold, serve. Survive the morning rush.",
    "Games",
    "cafe-rush"
  ],
  [
    "Cartridge",
    "https://cartridge-pod.lovable.app",
    "Merchandise",
    "Turning creative work into things you can buy.",
    "Objects",
    "cartridge"
  ],
  [
    "Artoy",
    "https://artoy.bryanlauwk.fun",
    "Art",
    "One drawing, a whole shelf of collectibles.",
    "Objects",
    null
  ],
  [
    "画啦猜啦",
    "https://chineseskribbl.bryanlauwk.fun",
    "Drawing game",
    "Draw the word. Friends race to guess.",
    "Games",
    null
  ],
  [
    "Farm-direct platform",
    "https://secai-marche.bryanlauwk.fun",
    "",
    "A Secai Marche redesign, from farm to table.",
    "Web experiences",
    "secai-marche"
  ],
  [
    "Boringg",
    "https://boringg.bryanlauwk.fun",
    "",
    "One button. Press it.",
    "Web experiences",
    null
  ],
  [
    "Giant Durian Run",
    "https://kldex.bryanlauwk.fun",
    "Gamers",
    "Dodge the durians. Survive if you can.",
    "Games",
    null
  ],
  [
    "Type A Disaster",
    "https://typeadisaster.bryanlauwk.fun/",
    "Gamers",
    "Build a city. Watch it go wrong.",
    "Games",
    "type-a-disaster-20261018"
  ],
  [
    "Little Originals",
    "https://littleoriginal.bryanlauwk.fun/",
    "",
    "Kids’ drawings, made into real merch.",
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
