# Reset 1.0 projects to website preview screenshots

Replace every current Browser Experiment image with a fresh, consistent screenshot of its linked project, then make those screenshots the visual focus of the 1.0 gallery.

## Scope

- Capture all 10 existing project URLs at a consistent desktop viewport and crop them to a shared wide aspect ratio.
- Use the actual rendered project page as the image—no decorative browser frame, generated art, or manual poster treatment.
- Upload the optimized screenshots to the existing project-image storage and update each project’s `image_url`.
- Treat this as a one-time reset only; no scheduled recapturing or screenshot service will be added.

## Gallery presentation

- Update each Browser Experiment card to show its screenshot as a stable, edge-to-edge preview area above the existing title, tag, description, and CTA.
- Keep the current light/dark dossier styling, hover behavior, numbering, and typography around the preview.
- Use a consistent aspect ratio and `object-cover` treatment so the 10-card grid remains aligned and does not shift while images load.
- Add useful alt text and lazy loading; retain the current graphic fallback if a screenshot cannot load.

## Capture and data update

- Visit each stored project `href`, wait for the main page to settle, and capture a clean first-viewport preview without browser chrome.
- Optimize screenshots to web-friendly WebP files before upload.
- Upload each file with a stable project-specific name, then update only that project’s `image_url`; titles, descriptions, links, tags, order, and visibility remain unchanged.
- If an external project cannot render, times out, or requires access, preserve its existing image where available and report that specific project rather than replacing it with a broken asset.

## Verification

- Confirm all project records point to reachable preview images.
- Check the homepage grid in light and dark modes at desktop and mobile widths for crop quality, loading behavior, readable overlays, and consistent card heights.
- Open representative experiment detail pages to confirm their social metadata now uses the same refreshed preview image.

## Technical notes

- Existing `projects.image_url` and the existing `project-images` storage are sufficient; no schema or access-policy changes are needed.
- Main frontend change: `src/components/StrangerThingsCard.tsx`.
- The database update is limited to the `image_url` values for the 10 current projects.
