/**
 * Live preview screenshots.
 *
 * Exhibit thumbnails are captured on demand by thum.io instead of being stored
 * as static files, so the image refreshes automatically whenever the linked
 * site changes. `maxAge` tells the service how many hours a cached capture may
 * be reused before it re-shoots the page.
 */

const CAPTURE_MAX_AGE_HOURS = 12;

/**
 * Stored auto-captures live under this storage folder. Supabase public URLs may
 * encode the slash, so both spellings are matched.
 */
const AUTO_CAPTURE_MARKERS = ["/previews/", "previews%2f"];

export function isStoredAutoCapture(imageUrl: string | null | undefined) {
  if (!imageUrl) return false;
  const lower = imageUrl.toLowerCase();
  return AUTO_CAPTURE_MARKERS.some((m) => lower.includes(m));
}

export function livePreviewUrl(
  href: string,
  opts: { width?: number; crop?: number; version?: string | null } = {}
): string | null {
  const { width = 1200, crop = 750, version } = opts;
  try {
    const url = new URL(href);
    if (!/^https?:$/.test(url.protocol)) return null;
    // A version stamp taken from the exhibit's last edit makes the capture URL
    // unique, so any change triggers a fresh screenshot instead of reusing the
    // cached one.
    if (version) url.searchParams.set("_p", version);
    // Most exhibits render client-side, so give the page time to finish
    // loading before the shot is taken — otherwise we capture a loading state.
    return `https://image.thum.io/get/width/${width}/crop/${crop}/noanimate/wait/${CAPTURE_WAIT_SECONDS}/maxAge/${CAPTURE_MAX_AGE_HOURS}/${url.toString()}`;
  } catch {
    return null;
  }
}

/** Turn a timestamp into a short, stable version stamp. */
function versionStamp(updatedAt?: string | null) {
  if (!updatedAt) return null;
  const t = Date.parse(updatedAt);
  return Number.isNaN(t) ? null : String(Math.floor(t / 1000));
}

/**
 * Resolve the image to show for an exhibit.
 * A hand-picked `image_url` wins; previously stored auto-captures and empty
 * values fall back to a freshly captured live screenshot.
 */
export function previewSrcFor(
  project: { image_url: string | null; href: string; updated_at?: string | null },
  opts?: { width?: number; crop?: number }
): string | null {
  if (project.image_url && !isStoredAutoCapture(project.image_url)) {
    return project.image_url;
  }
  return livePreviewUrl(project.href, {
    ...opts,
    version: versionStamp(project.updated_at),
  });
}
