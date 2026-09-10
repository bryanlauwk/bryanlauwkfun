# MELT section — make it match the site's dossier layout

## Goal
The MELT section is currently a bare full-width image. Restructure `src/components/BrewingTeaser.tsx` so it follows the same section grammar as the hero and "1.0 · Browser Experiments" — label row, headline, description, framed media with dossier accents.

## What changes

### 1. Section header (matches the 1.0 section exactly)
- Exhibit-label row above the content:
  - Left: `2.0 · Off the screen`
  - Right (desktop): pulsing primary dot + "Coming soon" (mirrors the "Live" indicator on 1.0)
- Headline in `font-display` uppercase black weight, e.g. `MELT.` with a short supporting line like "Same brain. Different skins."
- `h-1 w-24 bg-primary` accent bar under the headline (same as 1.0 section)
- Mono description paragraph: short copy about playable tech leaving the screen — interactive objects made to be noticed, followed, and played with.

### 2. Framed banner (dossier treatment instead of raw image)
- Wrap the MELT banner in a `paper-plate` frame with padding + border + elevated shadow, matching the hero portrait plate.
- Keep the banner image full-bleed inside the plate, `w-full h-auto`, lazy-loaded.
- Add restrained dossier accents (theme-aware, reusing existing CSS classes):
  - One red `evidence-tape` strip across a top corner
  - A rotated `dossier-stamp` like "Specimen M-01" or "Classified · MELT" overlapping a corner
  - Case strip under the image inside the plate: exhibit-label "Record · 2026" left, `barcode` span right — same as the hero portrait plate
- Optional handwritten scribble note (`.handwritten`) tucked near the frame, e.g. "it watches back ↗"

### 3. Cohesion checks
- Section id/aria-label stays (`#physical-work` anchor is linked from hero CTAs and scroll cue — must not break).
- Verify light + dark mode: tape, stamp, plate and shadows all use existing semantic classes.
- Confirm spacing rhythm matches neighboring sections (`section-band-even` wrapper already exists in Index.tsx; inner max-width/padding unchanged).
- Build check with `bun run build`.

## Technical details
- Single file edit: `src/components/BrewingTeaser.tsx` (plus no CSS changes unless a missing utility is needed — all classes already exist: `paper-plate`, `evidence-tape`, `dossier-stamp`, `exhibit-label`, `barcode`, `handwritten`).
- Banner asset import (`@/assets/melt-banner.png.asset.json`) stays as-is.
- No copy inventions beyond one short headline + one-line description, listed above for your approval.
