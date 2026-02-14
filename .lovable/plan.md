
# Move Ad Placeholders into the Hero Sky

Relocate the floating ad placeholders from the "Supported by" strip (between cards and guest book) into the hero background area, so they appear as atmospheric elements drifting in the dark fantasy sky. Remove the "Supported by" section entirely.

---

## Changes

### 1. `src/pages/Index.tsx`

- **Remove** the `<SponsorStrip />` component from between ProjectGrid and GuestBook (line 74)
- **Add** a new `<HeroAdPlaceholders />` layer inside the hero background `div` (the `fixed inset-0 z-0` container), positioned with `absolute` so the floating illustrations appear scattered across the sky portion of the hero image
- The placeholders render with `pointer-events-none` so they don't interfere with scrolling, but each individual ad has `pointer-events-auto` on hover for potential click interaction

### 2. New component: `src/components/HeroAdPlaceholders.tsx`

A lightweight wrapper that fetches sponsors without logos and renders `FloatingAdPlaceholder` instances at scattered positions across the viewport:

- Uses `usePublicSponsors()` to get sponsors without `logo_url`
- Positions each placeholder using `absolute` with predefined coordinates that place them in the "sky" area of the hero (upper portion of the screen):
  - Balloon: top-left area (~10% from left, ~15% from top)
  - Broom: right side (~65% from left, ~25% from top)
  - Lantern: center-left (~35% from left, ~8% from top)
- Each has staggered animation delays for natural feel
- Container is `fixed inset-0 z-[1] pointer-events-none` so it floats above the background image but below all content

### 3. `src/components/SponsorStrip.tsx`

- **Keep the file** but update it to only render sponsors that **have** a `logo_url` (real sponsors with uploaded logos). If none exist, it returns null — effectively hiding the entire "Supported by" row when only placeholders exist
- This way, when real sponsors are added later, the strip reappears between cards and guest book

### 4. No CSS changes needed

The balloon-float, broom-drift, and lantern-rise animations already exist in `index.css`.

---

## Summary

| File | Change |
|------|--------|
| `src/components/HeroAdPlaceholders.tsx` | New — renders ad placeholders scattered in the hero sky |
| `src/pages/Index.tsx` | Add HeroAdPlaceholders in the hero bg area; remove SponsorStrip from content flow |
| `src/components/SponsorStrip.tsx` | Filter to only show sponsors with logos (hide when only placeholders exist) |

## Technical notes

- Placeholders use `fixed` positioning to stay in the sky as the user scrolls, creating a parallax-like feel against the scrolling content
- The `z-[1]` layering places them above the hero image but below the main content (`z-10`), so they peek through naturally
- On mobile, positions adjust to avoid overlapping the hero headline
- Real sponsors with logos still appear in the "Supported by" strip if/when added via admin
