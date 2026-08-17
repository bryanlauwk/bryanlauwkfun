# 2.0 section: real 3D crate + MSCHF-style dressing

## What changes

**The crate becomes a proper 3D box**
Right now it's a CSS cube built from six flat faces with a flat gradient. It reads as a cube but not as an *object*. Upgrade it to look physical:

- Slightly wider rotation (a tilted, isometric-feeling axis) so two faces and the top are visible at all times instead of faces flipping edge-on.
- Per-face shading: top face lighter, side faces progressively darker, so the box has a light source instead of six identical panels.
- Neon edge treatment on the cube edges themselves (thin glowing seams) plus a soft ground glow / contact shadow under the box, so it sits on a surface rather than floating.
- Question-mark stencils sized per face, with the glow slightly stronger on the front-facing side and dimmer as faces turn away.
- Continues to respect reduced-motion (static tilted pose).

**MSCHF-inspired dressing to complement the 2.0 block** (pick-and-mix, all inside the existing section)

- Grid-paper background inside the 2.0 panel (reuses the existing `.bg-grid-paper`) so it reads as a spec sheet rather than a plain card.
- A red "EMBARGOED" / "DO NOT OPEN" stamp rotated over the panel corner using the existing dossier-stamp style.
- Black tape strips pinning the panel corners (existing dossier-tape language).
- A monospace shipping-label block beside the crate: fake case number, crate dimensions, weight, "CONTENTS: [REDACTED]", "QTY: 1 OF ?" — the deadpan spec-sheet humor MSCHF uses.
- A thin barcode strip along the bottom of the panel with the case number under it.
- A blinking status line: `STATUS: SEALED` with a pulsing dot, and a fake progress bar that is deliberately unlabeled.
- One handwritten scribble annotation (existing `.handwritten`) pointing at the crate, e.g. "don't ask".

No new copy that discloses anything — no names, no dates, no links, matching the current embargo tone.

## Technical notes

- `src/index.css`: rework the `.neon-crate` / `.crate-*` face rules for shaded faces, edge glow, contact shadow, and adjust the `crate-spin` keyframe axis. Add `.crate-shadow`, `.barcode-strip` utilities. All colors via existing `--primary` / `--foreground` tokens.
- `src/components/BrewingTeaser.tsx`: add grid-paper background, tape corners, stamp, spec-label block (2-column layout on desktop: crate left, spec sheet right; stacked on mobile), barcode footer, scribble.
- No routing, data, or SEO changes.
