/**
 * Live preview screenshots.
 *
 * Exhibit thumbnails are captured on demand by thum.io instead of being stored
 * as static files, so the image refreshes automatically whenever the linked
 * site changes. `maxAge` tells the service how many hours a cached capture may
 * be reused before it re-shoots the page.
 */

const CAPTURE_MAX_AGE_HOURS = 12;

/** Stored auto-captures live under this storage prefix and are considered stale. */
const AUTO_CAPTURE_MARKER = "/previews/";

export function isStoredAutoCapture(imageUrl: string | null | undefined) {
  return !!imageUrl && imageUrl.includes(AUTO_CAPTURE_MARKER);
}

export function livePreviewUrl(
  href: string,
  opts: { width?: number; crop?: number } = {}
): string | null {
  const { width = 1200, crop = 750 } = opts;
  try {
    const url = new URL(href);
    if (!/^https?:$/.test(url.protocol)) return null;
    return `https://image.thum.io/get/width/${width}/crop/${crop}/noanimate/maxAge/${CAPTURE_MAX_AGE_HOURS}/${url.toString()}`;
  } catch {
    return null;
  }
}

/**
 * Resolve the image to show for an exhibit.
 * A hand-picked `image_url` wins; previously stored auto-captures and empty
 * values fall back to a freshly captured live screenshot.
 */
export function previewSrcFor(
  project: { image_url: string | null; href: string },
  opts?: { width?: number; crop?: number }
): string | null {
  if (project.image_url && !isStoredAutoCapture(project.image_url)) {
    return project.image_url;
  }
  return livePreviewUrl(project.href, opts);
}
