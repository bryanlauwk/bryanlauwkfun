/**
 * Shared resolver for the Objects Catalogue previews, so the admin dashboard
 * and the public site always show the same image for each building block.
 *
 * Resolution order per object id:
 *   1. an uploaded override URL (stored in site_settings as `artifacts.<id>.image`)
 *   2. the bundled default preview cropped from the still life
 *   3. null → the catalogue renders an icon placeholder
 */
import coin from "@/assets/artifacts/coin.jpg";
import key from "@/assets/artifacts/key.jpg";
import stone from "@/assets/artifacts/stone.jpg";
import chart from "@/assets/artifacts/chart.jpg";

/** Bundled default preview per object id (ids match the CMS content keys). */
export const OBJECT_DEFAULT_IMAGES: Record<string, string> = {
  coin,
  key,
  stone,
  paper: chart,
};

/** The image to show for a catalogue object, or null (→ icon placeholder). */
export function objectImageFor(id: string, override?: string | null): string | null {
  const url = override?.trim();
  if (url) return url;
  return OBJECT_DEFAULT_IMAGES[id] ?? null;
}

/** Where the shown image comes from — drives the admin status badge. */
export function objectImageSource(id: string, override?: string | null): "custom" | "default" | "none" {
  if (override?.trim()) return "custom";
  if (OBJECT_DEFAULT_IMAGES[id]) return "default";
  return "none";
}
