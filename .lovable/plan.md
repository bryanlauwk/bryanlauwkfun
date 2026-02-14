

# Illustrated Floating Ad-Space Placeholders

Replace the generic dashed-border ad placeholders with animated SVG illustrations that naturally blend into the dark fantasy aesthetic. Each placeholder features a different floating vehicle carrying the brand text.

---

## Concept

Three distinct illustrated ad slots, each with a unique floating object:

1. **Hot Air Balloon** — A balloon drifting gently upward with the brand/ad text on the balloon envelope
2. **Flying Broom** — A witch's broom trailing a banner with the ad text (fits the dark fantasy theme)
3. **Floating Lantern** — A glowing paper lantern rising with text inscribed on it (atmospheric, matches the spore/particle vibe)

Each illustration is a lightweight inline SVG with CSS animations (gentle floating, swaying, glowing). The sponsor name from the database is embedded directly into the SVG as text, so when an admin replaces the placeholder with a real sponsor, the logo image takes over seamlessly.

---

## 1. New component: `FloatingAdPlaceholder.tsx`

A component that takes the sponsor name and a variant index (0, 1, 2) and renders one of three SVG illustrations:

- **Variant 0 — Hot Air Balloon**: Oval balloon shape with subtle striped pattern, basket below, sponsor name curved along the balloon body. Gentle float-up-and-down animation.
- **Variant 1 — Flying Broom**: Silhouette broom with a trailing ribbon/banner containing the sponsor text. Slow horizontal drift animation.
- **Variant 2 — Floating Lantern**: Glowing lantern shape with sponsor name as inscription. Soft pulsing glow + float animation.

All rendered in muted tones (matching `muted-foreground` and `primary` CSS variables) at low opacity (~30%) with hover brightening to ~60%, consistent with how real logos behave.

A small "Ad Space" label sits below each illustration.

## 2. Update `SponsorStrip.tsx`

When a sponsor has no `logo_url`, render `FloatingAdPlaceholder` instead of the current dashed-border box. Pass the sponsor's index to determine which variant to show.

## 3. CSS animations in `index.css`

Add three new keyframe animations:

- `balloon-float`: gentle vertical bob + slight horizontal sway
- `broom-drift`: slow horizontal glide with slight vertical wave
- `lantern-rise`: slow upward drift with soft glow pulse

These use the same reduced-motion media query already in place.

## 4. Update seeded placeholder names

Update the 3 existing placeholder sponsors to have more fitting names for the illustrations:

| Current Name | New Name | Illustration |
|---|---|---|
| Your Brand Here | Your Brand Here | Hot Air Balloon |
| Ad Space Available | Ad Space Available | Flying Broom |
| Sponsor This Project | Sponsor This Project | Floating Lantern |

(Names stay the same since they already work well — the visual treatment changes.)

---

## Summary of file changes

| File | Change |
|------|--------|
| `src/components/FloatingAdPlaceholder.tsx` | New component with 3 SVG illustration variants |
| `src/components/SponsorStrip.tsx` | Use `FloatingAdPlaceholder` for sponsors without logos |
| `src/index.css` | Add balloon-float, broom-drift, lantern-rise keyframes |

## Technical notes

- All illustrations are inline SVGs (no external assets needed), keeping bundle size minimal
- SVG text elements use `currentColor` and CSS variables for consistent theming
- Each SVG is roughly 200x160px viewport, scaled responsively
- The sponsor name from the database is rendered as an SVG `<text>` element, so it updates automatically when the admin edits it
- Hover behavior: opacity transitions from 30% to 60%, matching the real logo treatment
- No new dependencies required — pure SVG + CSS animations

