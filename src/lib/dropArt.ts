import hualacaila from "@/assets/drops/hualacaila.jpg";
import kldex from "@/assets/drops/kldex.jpg";
import artoy from "@/assets/drops/artoy.jpg";
import cartridge from "@/assets/drops/cartridge.jpg";
import zusrush from "@/assets/drops/zusrush.jpg";
import badminton from "@/assets/drops/badminton.jpg";
import inflation from "@/assets/drops/inflation.jpg";

/** Keyword → locally generated artwork. First match wins. */
const ART_RULES: Array<[RegExp, string]> = [
  [/画啦|猜啦|skribbl|draw/i, hualacaila],
  [/kldex|durian/i, kldex],
  [/artoy|toy/i, artoy],
  [/cartridge|pod|merch/i, cartridge],
  [/zus|coffee|rush/i, zusrush],
  [/badminton|yuqiu|羽/i, badminton],
  [/inflation|chart|data/i, inflation],
];

/**
 * Resolve the best artwork for a drop: a real uploaded image wins, otherwise a
 * locally generated cinematic piece, otherwise null (caller draws a fallback).
 */
export function artFor(project: {
  title: string;
  tag?: string | null;
  image_url?: string | null;
}): string | null {
  const url = (project.image_url ?? "").trim();
  if (url) return url;
  const hay = `${project.title} ${project.tag ?? ""}`;
  for (const [re, art] of ART_RULES) {
    if (re.test(hay)) return art;
  }
  return null;
}
