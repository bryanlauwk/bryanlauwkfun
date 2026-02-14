

# Equalize Balloon Visibility and Resize to L/M/M/M/S

## Problem
Currently the 4 balloons have decreasing opacity (85% down to 35%), making the smaller/farther ones nearly invisible. The user wants all balloons equally bright so ad text is readable on every one. Additionally, the size distribution should be 1 Large, 3 Medium, and 1 Small (5 balloons total instead of 4).

## Changes

### `src/components/HeroAdPlaceholders.tsx`

Update the layout array from 4 items to 5, with uniform high opacity and the requested size tiers:

| # | Size | Scale | Opacity | Position | Parallax |
|---|------|-------|---------|----------|----------|
| 1 | L | 1.0 | 0.9 | left: 2%, top: 30% | 0.15 |
| 2 | M | 0.7 | 0.9 | left: 72%, top: 8% | 0.2 |
| 3 | M | 0.7 | 0.9 | left: 40%, top: 55% | 0.25 |
| 4 | M | 0.7 | 0.9 | left: 80%, top: 42% | 0.3 |
| 5 | S | 0.45 | 0.9 | left: 55%, top: 5% | 0.35 |

All balloons share the same opacity (0.9) so every ad is equally visible. Staggered animation delays (0s through 6s) remain for a natural feel. Different parallax speeds still provide subtle depth motion without sacrificing readability.

Mobile layout: show 2 balloons (1 M, 1 S) both at 0.9 opacity.

### Technical Detail
- Only `HeroAdPlaceholders.tsx` needs editing
- The `FloatingAdPlaceholder` component itself stays unchanged -- it already accepts `scale` and renders at whatever opacity the parent sets
- Sponsor name cycling logic (`getName`) already handles any count via modulo

