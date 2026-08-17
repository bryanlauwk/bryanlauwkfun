# Footer cleanup + simplified 2.0 teaser

## 1. Remove "The Studio · my idea engine"

Drop that link block from the footer entirely. Social icons, motto line, and copyright stay as they are, with spacing tightened so the column still reads balanced.

## 2. Move 2.0 teaser above Browser Experiments

New order on the homepage: Hero (Room 01) → 2.0 teaser (Room 02) → Browser Experiments (Room 03). Room labels renumber accordingly so the exhibition numbering stays sequential.

## 3. Redesign the teaser — mystery boxes

Simpler than the current three redacted paper plates. The section becomes:

- Small room label + slow-pulsing dot, `Embargoed` kept as a compact tag rather than a rotated tape strip
- Heading: `2.0 — off the screen.`
- One line: `The next ones don't live in a browser tab. Interactive installations — fun, creative, playable tech you can walk into.`
- Three black mystery boxes in a row, each a crate-like cube with a large neon-red question mark

Box treatment, matching the reference:
- Dark near-black face with a thin glowing crimson outline on all visible edges
- Question mark rendered as a stencil cutout: the glyph is knocked out of the dark face with a neon-red glow bleeding through, plus a soft outer bloom on the surrounding surface
- Subtle isometric depth (a lighter top face and a side face) so it reads as a physical crate, not a flat tile
- Hover: glow intensifies and the box lifts a few pixels; still non-interactive, no links, no reveal
- Reduced-motion and low-power friendly — glow is CSS box/text shadow, no canvas or animation loops beyond a slow pulse

- Closing line stays: `No launch date. No details. It'll be obvious when it lands.`

## Technical notes

- `src/components/CinematicFooter.tsx`: remove the Studio anchor and the now-unused `Sprout` import.
- `src/pages/Index.tsx`: move `<BrewingTeaser />` between the hero and the Browser Experiments section; update `Room 02` / `Room 03` labels.
- `src/components/BrewingTeaser.tsx`: rewritten with the mystery-box layout; drops the paper-plate/barcode/redaction markup.
- `src/index.css`: add `.neon-crate` / `.stencil-glyph` utilities using existing crimson tokens (no hardcoded hex), so the glow follows the theme.
- Content only — no routes, data, or backend changes.
