## Goal
Replace the current "sketch on bone-white plate" hero portrait with a treated version of your real photo, styled as an investigative "exposé" collage that reads as part of the dark Exhibition base — torn paper, evidence tape, halftone, redaction, handwritten scribbles.

## Source photo prep
Use your uploaded selfie (`user-uploads://7225e5fd-...jpg`) and run it through `imagegen--edit_image` with a prompt that:
- Removes the badminton jersey (replace with a plain dark tee or high-contrast shirt so the collarline reads as a photo fragment, not sportswear).
- Removes the "Bryan" name label and paw print.
- Removes the red/green radial background so the subject is isolated on a clean neutral field (transparent PNG output).
- Keeps the face recognizable — no stylization of the face itself. Any "artistic" treatment happens in CSS, not in the source photo, so it still reads as *you*, not an illustration.

Output: `src/assets/hero-portrait-photo.png` (transparent, ~1200px).

## Collage treatment (CSS + layered fragments, no new libraries)
Rebuild the right column of the hero in `src/pages/Index.tsx` as a small pinned "case file" instead of a framed print. All pieces are real DOM layers so they animate and stay crisp:

1. **Base photo fragment** — the treated portrait, clipped with an SVG `clip-path` into a torn-edge polygon (irregular top/bottom edges). Apply `filter: grayscale(1) contrast(1.15)` and a CSS halftone dot overlay (repeating radial-gradient) at ~20% opacity so it reads as newsprint, not a clean headshot.
2. **Torn paper backing** — an off-white paper rectangle behind the photo, rotated ~-3°, with a subtle paper-fiber texture (existing film-grain works) and hard shadow. This is the "evidence plate."
3. **Red evidence tape** — two short diagonal strips using `hsl(var(--primary))` with slight opacity + inner shadow, crossing one corner of the photo. Reuses the site's signal red.
4. **Evidence tag** — small kraft-colored rectangle with a punched hole (CSS `radial-gradient` circle) and mono text: `EXHIBIT · A / SUBJECT: LAU, B. / 侦查中`. Bilingual EN/中 mirrors the poster.
5. **Fingerprint mark** — a single SVG fingerprint (inline, hand-drawn look) tucked in a corner at low opacity in signal red.
6. **Handwritten scribble** — one short handwritten note (e.g. "not to be trusted with a keyboard") rendered in a handwriting Google font (Caveat or Kalam — one new font import in `index.html`), rotated ~4°, in muted foreground color.
7. **Redaction bar** — one black bar across the shirt/collar area, reinforcing the "expose" language and hiding any remaining jersey seam.
8. **Barcode + case number strip** — reuse existing `.barcode` utility under the plate with `NO. 01 · FIG. 01 · LAU B.`

All pieces sit inside one relatively-positioned figure so the whole collage tilts as a unit and keeps the current hero grid layout.

## What stays
- Hero copy, headline, "Now showing" stamp, exhibit labels, grid layout, hero image column position/size — untouched.
- Existing `certified dumb` stamp — kept as one of the collage elements (it already fits the language).
- Portrait import name stays `heroPortrait` so nothing else in the codebase breaks; the old sketch file is left in place unused.

## Files changed
- `src/pages/Index.tsx` — replace the `<figure>` block in the hero right column with the collage composition.
- `src/index.css` — add small utilities: `.torn-edge` (clip-path), `.halftone` (radial-gradient overlay), `.handwritten` (font-family).
- `index.html` — add one Google Font link for the handwriting font.
- `src/assets/hero-portrait-photo.png` — new treated photo asset (via imagegen edit).

## Not doing
- No new npm packages.
- No changes to Drops section, header, footer, or routing.
- No AI-generated "illustration" of you — the face stays photographic so it reads real.
