import type { Project } from "@/hooks/useProjects";

// Public catalogue recorded in project-journey.test.tsx on 2026-09-22.
// Used only until the live public catalogue is available; never used by admin writes.
const catalogue = [
  ["Badminton Clash", "https://www.yuqiuren.fun/", "Badminton Lovers", "A fast browser badminton game for quick rallies — pick a side, time your smashes, and outlast the rally before your reflexes give up."],
  ["Elemental Block Blast", "https://elemental-block-blast.lovable.app", "Casual Gamers", "A casual puzzle game where you blast blocks charged with elements — chain the right combos and watch the board clear in satisfying bursts."],
  ["Infinite Kitchen", "https://infinitekitchen.bryanlauwk.fun/", "Foodies", "An endless cooking playground: keep the orders coming, juggle ingredients, and see how long your kitchen survives the dinner rush."],
  ["马年新年歌排行榜", "https://cny2026.bryanlauwk.fun/", "Trend Watcher", "A living chart of Chinese New Year songs for the Year of the Horse — browse the rankings and see which festive track is winning the season."],
  ["Inflation Chart", "https://inflationchart.bryanlauwk.fun/", "Data Nerds", "An interactive chart that makes inflation feel tangible — watch everyday prices climb over the years and compare what your money used to buy."],
  ["Cafe Rush", "https://zusrush.bryanlauwk.fun/", "Coffee lovers", "A hectic cafe simulator: take orders, brew fast, and keep the queue happy before the morning crowd turns on you."],
  ["Cartridge", "https://cartridge-pod.lovable.app", "Merchandise", "A small experiment in physical merchandise — a cartridge-style object that turns a digital idea into something you can actually hold."],
  ["Artoy", "https://artoy.bryanlauwk.fun", "Art", "An art-toy project exploring playful character design — part sculpture, part experiment in giving a digital personality a physical form."],
  ["画啦猜啦", "https://chineseskribbl.bryanlauwk.fun", "Drawing game", "A Chinese drawing-and-guessing party game — one player sketches, everyone else races to guess the word before the timer runs out."],
  ["Farm-direct platform", "https://secai-marche.bryanlauwk.fun", "", "A farm-direct marketplace concept connecting growers straight to buyers — browse fresh produce without the middlemen in between."],
  ["Boringg", "https://clickerlab.bryanlauwk.fun", "", "A deliberately boring clicker experiment — an oddly addictive study in how little a game needs to keep you clicking."],
  ["Giant Durian Run", "https://kldex.bryanlauwk.fun", "Gamers", "A runner game starring a giant durian — dodge, roll, and smash through the streets in this week's featured cover story."],
] as const;

export const bundledPublicProjects: Project[] = catalogue.map(([title, href, tag, description], index) => ({
  id: title === "画啦猜啦" ? "f7f395c8" : title === "马年新年歌排行榜" ? "4337d134" : `bundled-${index}`,
  title, href, tag, description, image_url: null, color: "#ff0000",
  display_order: index, is_visible: true, show_text_overlay: false,
  created_at: "", updated_at: "",
}));
