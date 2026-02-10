

# Three Changes: Label, Loading Screen, and Headline

## 1. Add "Web collective" label

Add a subtle descriptor under the "Bryan Lau" name in the header, styled as a small mono-font tag.

**File**: `src/components/CinematicHeader.tsx`
- Below the "Bryan Lau" span (line 31), add a small label:
  ```
  Web collective
  ```
- Styled with `font-mono text-[10px] md:text-xs text-muted-foreground/70 uppercase tracking-[0.2em]`
- Visible on all screen sizes, sits neatly under the name

## 2. Remove the loading screen

Completely remove the `StaticLoadingScreen` from rendering to eliminate the 2-second friction on every page load.

**File**: `src/pages/Index.tsx`
- Remove the `StaticLoadingScreen` import (line 6)
- Remove the `<StaticLoadingScreen />` component usage (line 14)

The `StaticLoadingScreen.tsx` file itself can stay in the codebase (no harm), but it will no longer be rendered.

## 3. Replace the headline

The current "Something Strange / Is Happening" is too close to Stranger Things. Replace with something that fits the brand voice ("Good luck, have fun, don't die") -- slightly irreverent, experimental, inviting.

**File**: `src/pages/Index.tsx`

Replace lines 46-47:
```
<span className="block text-foreground">Something Strange</span>
<span className="block animate-shimmer">Is Happening</span>
```

With:
```
<span className="block text-foreground">Late Nights,</span>
<span className="block animate-shimmer">Wild Ideas</span>
```

This headline:
- Matches the subtitle ("things that crawled out of late nights")
- Feels personal and self-aware rather than imitating a TV show
- Keeps the two-line rhythm and visual weight

---

## Summary

| Change | File | What |
|--------|------|------|
| Add "Web collective" | `CinematicHeader.tsx` | Small label under the logo name |
| Remove loading screen | `Index.tsx` | Delete import and component render |
| New headline | `Index.tsx` | "Late Nights, Wild Ideas" |

