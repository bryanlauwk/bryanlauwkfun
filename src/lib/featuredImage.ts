/**
 * Single source of truth for a project's featured image.
 *
 * Both the admin backend and the public site resolve featured images through
 * this one function, so what an admin sees in the dashboard is exactly what a
 * visitor sees on the homepage — they can never drift apart again.
 *
 * Resolution order:
 *   1. `project.image_url` — the image managed in the admin (uploaded to the
 *      `project-images` storage bucket). This always wins.
 *   2. A bundled default artwork, matched from the project title, for the
 *      seasons that shipped with dedicated art but no uploaded image yet.
 *   3. `null` — the caller falls back to the project's colour gradient.
 */
import artoy from "@/assets/drops/artoy.jpg";
import badminton from "@/assets/drops/badminton.jpg";
import cartridge from "@/assets/drops/cartridge.jpg";
import hualacaila from "@/assets/drops/hualacaila.jpg";
import inflation from "@/assets/drops/inflation.jpg";
import kldex from "@/assets/drops/kldex.jpg";
import zusrush from "@/assets/drops/zusrush.jpg";

interface FeaturedImageInput {
  title: string;
  image_url?: string | null;
}

/** Bundled fallback artwork, keyed by a matcher against the project title. */
const DEFAULT_ARTWORK: Array<{ match: RegExp; src: string }> = [
  { match: /badminton/i, src: badminton },
  { match: /inflation|chart/i, src: inflation },
  { match: /zus|coffee/i, src: zusrush },
  { match: /cartridge|pod/i, src: cartridge },
  { match: /artoy|art\s*toy/i, src: artoy },
  { match: /kldex|king of fruits|durian/i, src: kldex },
  { match: /画啦|猜啦|skribbl|hua.?la.?cai/i, src: hualacaila },
];

/** A non-empty, trimmed image_url or null. Treats "" as "no image". */
function normalizedImageUrl(project: FeaturedImageInput): string | null {
  const url = project.image_url?.trim();
  return url ? url : null;
}

/** The bundled default artwork for a project, if one exists. */
export function defaultArtworkFor(project: FeaturedImageInput): string | null {
  return DEFAULT_ARTWORK.find((d) => d.match.test(project.title))?.src ?? null;
}

/**
 * The featured image to display for a project, or `null` when there is none
 * (caller should render the colour gradient instead).
 */
export function featuredImageFor(project: FeaturedImageInput): string | null {
  return normalizedImageUrl(project) ?? defaultArtworkFor(project);
}

/** Where a project's displayed featured image comes from. */
export type FeaturedImageSource = "custom" | "default" | "none";

export function featuredImageSource(project: FeaturedImageInput): FeaturedImageSource {
  if (normalizedImageUrl(project)) return "custom";
  if (defaultArtworkFor(project)) return "default";
  return "none";
}
