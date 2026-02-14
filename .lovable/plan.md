
# Make Ad Placeholders Visible and Non-Overlapping

## Problems
1. The placeholders are at 30% opacity (`opacity-30` on the wrapper) with already-low SVG fill opacities (0.12-0.4), making them nearly invisible against the dark background
2. Positions overlap with the centered headline ("Late Nights, Wild Ideas") which sits roughly at 20-40% from top

## Changes

### 1. `src/components/FloatingAdPlaceholder.tsx`

**Boost visibility** while keeping the atmospheric feel:
- Change wrapper opacity from `opacity-30` to `opacity-60`, hover from `opacity-60` to `opacity-90`
- Increase SVG fill opacities across all three variants (balloon gradient stops from 0.4/0.25 to 0.6/0.45, stroke opacities from 0.3 to 0.5, text opacity from 0.5 to 0.7, etc.)
- Increase broom handle and bristle opacities similarly
- Increase lantern body fill and glow opacities
- Scale up SVG sizes slightly (balloon from 160x144 to 200x180, broom from 176x112 to 210x134, lantern from 128x144 to 160x180) for better presence in the sky

### 2. `src/components/HeroAdPlaceholders.tsx`

**Reposition to avoid the headline** (headline is centered, roughly 15-45% from top):
- Balloon: move to far left edge of sky -- `left: "3%", top: "30%"` (left side, beside the headline not behind it)
- Broom: move to right side -- `left: "72%", top: "8%"` (upper right, above headline)
- Lantern: move to far right -- `left: "85%", top: "45%"` (right side, below headline level)
- Mobile: only show one placeholder, positioned at `left: "5%", top: "55%"` (below the headline area)

This spreads them into the "sky" margins around the centered content, like atmospheric elements drifting at the edges of the frame.

### 3. `src/index.css` (minor)
- Increase animation travel distances slightly for more visible movement (balloon vertical bob from 10px to 15px, broom horizontal drift from 8px to 12px)

## Summary

| File | Change |
|------|--------|
| `src/components/FloatingAdPlaceholder.tsx` | Boost SVG opacities, increase sizes |
| `src/components/HeroAdPlaceholders.tsx` | Reposition to margins around headline |
| `src/index.css` | Slightly larger animation travel |
