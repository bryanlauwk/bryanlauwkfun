

# Fix Small Balloon Readability and Improve Mobile Ad Presentation

## Problem Analysis

The Small (S) balloon at `scale: 0.45` renders the SVG at only 108x126 pixels. Since the text inside the SVG uses fixed font sizes (14px for brand name, 9px for price, 8px for subtitle), scaling to 0.45 shrinks them to roughly 6px, 4px, and 3.5px respectively -- essentially unreadable. The price tag pill also becomes a tiny smudge.

On mobile, the same issue is worse: limited screen real estate plus small balloons means ads fail to communicate.

## Recommendations

### 1. Raise the Small (S) scale from 0.45 to 0.6

This keeps S visually distinct from M (0.7) while making all text legible. At 0.6, the rendered size becomes 144x168px -- the brand name renders at ~8.4px effective size, which is the minimum for readability.

### 2. Redesign mobile layout: single well-sized balloon

Instead of cramming 2 floating balloons onto a small screen (where they overlap hero text and feel cluttered), show just 1 Medium-sized balloon (scale 0.7) positioned in a non-obtrusive corner. This gives the ad proper visibility without fighting the hero content.

## Changes

### `src/components/HeroAdPlaceholders.tsx`

**Desktop layout** -- update the S balloon scale:

| # | Size | Scale | Position | Notes |
|---|------|-------|----------|-------|
| 1 | L | 1.0 | left: 2%, top: 30% | Unchanged |
| 2 | M | 0.7 | left: 72%, top: 8% | Unchanged |
| 3 | S | **0.6** | left: 55%, top: 50% | Was 0.45, now readable |

**Mobile layout** -- simplify to 1 balloon:

| # | Size | Scale | Position | Notes |
|---|------|-------|----------|-------|
| 1 | M | 0.7 | left: 60%, top: 12% | Single balloon, top-right area, clear of hero text |

### `src/components/FloatingAdPlaceholder.tsx`

No changes needed. The SVG component already renders correctly at any scale -- the fix is purely in the scale value passed to it.

## Technical Notes

- Only `HeroAdPlaceholders.tsx` is modified
- The price tier logic (`getPrice`) still works correctly since 0.6 falls into the "Small" bracket (less than 0.7)
- The mailto link logic also maps correctly for the same reason

