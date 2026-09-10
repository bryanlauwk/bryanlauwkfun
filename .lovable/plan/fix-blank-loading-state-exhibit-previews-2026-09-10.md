# Fix blank / loading-state exhibit previews

Two exhibit cards still show an empty skeleton and "Setting up the shop..." instead of the finished page. The outside screenshot service takes the shot before those pages finish drawing, and once it does that the bad shot is cached and keeps coming back.

## Approach

Stop depending on the outside service for the finished look. Capture the previews here, where we can wait until the page is genuinely done, store them, and only fall back to the live service when no stored shot exists.

1. Re-capture every exhibit in the sandbox with a real browser: load the linked site, wait for network to settle plus a short settle delay, and confirm the page is not still showing a loading state before shooting.
2. Save each shot as an optimised WebP in the existing previews folder and point the exhibit's image at it. Nothing else about the exhibit (title, text, link, tags, order) is touched.
3. Keep the live service only as a last resort for exhibits with no stored shot, and drop the fragile wait/cache tricks that are producing loading-state images.
4. Make the admin "Recapture preview now" button request a fresh capture for a single exhibit rather than clearing the image and leaving a blank card.

## Verification

- Re-open the exhibits grid in both light and dark mode and confirm no card shows a skeleton, spinner, or "Setting up the shop..." state.
- Confirm the Inflation Chart card matches the finished grocery scene.

## Technical notes

- Capture script: Playwright, 1440x900 viewport, `wait_until="networkidle"` + ~4s settle, plus a check that the DOM contains real content before shooting.
- Upload to the `project-images` bucket under `previews/`, update only `projects.image_url`.
- `src/lib/preview.ts`: `previewSrcFor` prefers any stored `image_url` (including auto-captures) and only calls `livePreviewUrl` when the field is empty; keep the `updated_at` version stamp for cache-busting.
- `src/pages/Admin.tsx`: recapture action triggers a new stored capture instead of nulling `image_url`.
