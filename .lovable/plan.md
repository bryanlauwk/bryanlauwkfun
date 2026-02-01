
# Fix Contrast, Headline Spacing & Replace OG Image

## Overview
This plan addresses three UI/UX issues and performs cleanup:
1. **Subtitle contrast**: Add a semi-transparent backdrop behind the subtitle text to improve readability
2. **Headline spacing**: Increase margin between "Is Happening" and the subtitle
3. **OG image replacement**: Generate a new cinematic E.T. bicycle scene without "strange flight" text
4. **Cleanup**: Remove legacy `favicon.ico` file

---

## Changes

### 1. Improve Subtitle Contrast
**File:** `src/pages/Index.tsx`

Add a backdrop blur and semi-transparent background to the subtitle paragraph for better readability against the busy hero background:

```tsx
{/* Before */}
<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono mb-8">

{/* After */}
<p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-mono mb-8 px-4 py-3 bg-background/60 backdrop-blur-sm rounded-sm">
```

**Why this works:**
- `bg-background/60` adds a dark translucent overlay
- `backdrop-blur-sm` softens the background through the overlay
- `text-foreground/90` uses brighter text instead of muted
- Padding and rounded corners create a contained "transmission box" aesthetic

---

### 2. Fix Headline Spacing
**File:** `src/pages/Index.tsx`

Increase the bottom margin on the h1 to push the subtitle further down:

```tsx
{/* Before */}
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">

{/* After */}
<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-10 leading-tight">
```

**Why:** `mb-8` on mobile and `mb-10` on desktop provides more breathing room between the headline and subtitle.

---

### 3. Generate New OG Image
**File:** `public/og-image.png`

Generate a new cinematic OG image featuring:
- Silhouetted Asian male character on a bicycle flying across a moonlit sky
- "Upside Down" atmosphere: deep indigo/purple sky, floating spores, atmospheric fog
- Large glowing moon as the focal point
- Neon crimson backlighting from below (matching the brand colors)
- Film grain texture for 80s aesthetic
- **NO TEXT** - pure visual storytelling

The favicon will be used as character reference to maintain brand consistency.

---

### 4. Cleanup Legacy Files
**Delete:** `public/favicon.ico`

This file is not referenced anywhere in the codebase and is superseded by `favicon.png`.

---

## Summary of Files to Modify

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Modify - add backdrop to subtitle, increase headline spacing |
| `public/og-image.png` | Replace - generate new E.T. bicycle scene without text |
| `public/favicon.ico` | Delete - unused legacy file |

---

## Technical Details

### CSS Classes Used
- `bg-background/60` - 60% opacity dark background
- `backdrop-blur-sm` - subtle blur effect (4px)
- `text-foreground/90` - 90% opacity bright text
- `mb-8 md:mb-10` - responsive bottom margin (32px/40px)

### Image Generation Prompt
The new OG image will use the existing favicon as a reference for the character and generate a cinematic scene with:
- 16:9 aspect ratio (1200x630 optimal for social sharing)
- No text overlays
- Dark fantasy color palette (deep indigo, crimson accents)
- Atmospheric elements (fog, spores, moonlight)
