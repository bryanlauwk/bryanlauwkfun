

# Grunge + Absurdist Terror -- Visual Only, Text Preserved

## Approach

Add gritty, distressed visual textures and unsettling micro-animations **without changing any user-facing text**. All existing copy stays exactly as-is. The grunge and terror come through purely via CSS effects, textures, and subtle motion.

---

## Changes

### 1. New CSS Classes (`src/index.css`)

Add ~70 lines of new keyframes and utility classes:

- **Grunge textures**:
  - `.torn-edge-top` / `.torn-edge-bottom` -- jagged SVG clip-path on section dividers (replaces clean gradient lines)
  - `.ink-splatter` -- pseudo-element ink blot in a corner, positioned via CSS custom property
  - `.scratched-surface` -- faint diagonal scratch marks overlay via repeating SVG pattern
  - `.grunge-border` -- rough, uneven border using CSS box-shadow stacking

- **Terror micro-animations**:
  - `@keyframes breathe` -- slow scale 1.0 to 1.015 and back (4s cycle, barely perceptible)
  - `@keyframes twitch` -- sudden 1px jolt every ~5 seconds, then settle
  - `@keyframes eye-blink` -- brief opacity dip simulating something watching (used on decorative dots)
  - `.animate-breathe`, `.animate-twitch`, `.animate-eye-blink`

- **Grunge divider**: `.grunge-divider` -- replaces smooth gradient `h-px` with rough ink-stroke look

### 2. Hero Section (`src/pages/Index.tsx`)

- Add `.animate-breathe` to the hero `<h1>` container so the headline subtly pulses
- Add `.scratched-surface` overlay on the subtitle box
- Replace the two smooth gradient dividers around "Drops" heading with `.grunge-divider`
- Add a faint ink-splatter pseudo-element behind the TypewriterMotto area
- **No text changes** -- "Late Nights, Wild Ideas", subtitle, and motto all stay identical

### 3. Project Cards (`src/components/StrangerThingsCard.tsx`)

- Add `.grunge-border` to the card wrapper (rough edge feel)
- On hover, apply `.animate-twitch` briefly to the monogram letter
- Add `.ink-splatter` pseudo-element in alternating corners per card (via index-based CSS custom property)
- **No text changes** -- titles, descriptions, CTAs, "Drop #XX" all stay identical

### 4. Guest Book (`src/components/GuestBook.tsx`)

- Add `.animate-breathe` to the "Say Something" heading
- Add `.scratched-surface` overlay on the form container
- **No text changes** -- all labels, placeholders, empty state message stay identical

### 5. Footer (`src/components/CinematicFooter.tsx`)

- Replace the top border with `.torn-edge-bottom` clip-path (jagged edge)
- Add `.animate-twitch` to the skull icons (sudden micro-jolt every few seconds)
- **No text changes** -- "Don't die out there", copyright, all stay identical

### 6. New Component: `CrypticWhisper` (`src/components/CrypticWhisper.tsx`)

A small decorative element placed below the TypewriterMotto:
- Shows a random short phrase at very low opacity (0.12-0.18) in monospace
- Applies `.animate-breathe` and occasional opacity fade
- Phrases are atmospheric flavor text, not instructions or calls-to-action, so they won't confuse anyone. Examples:
  - "the signal persists"
  - "something shifted"
  - "still transmitting"
  - "signal detected"
  - "frequency locked"
- Rendered so faintly it reads as texture, not content

---

## Technical Notes

- **No new dependencies** -- all pure CSS
- All animations use `transform` and `opacity` only (GPU-composited, no layout thrashing)
- Existing `prefers-reduced-motion` rule in `index.css` automatically disables all new animations
- SVG textures are inline data URIs (no network requests)
- `CrypticWhisper` uses `useMemo` for stable random phrase selection

### Files Modified
1. `src/index.css` -- new grunge/terror CSS classes
2. `src/pages/Index.tsx` -- apply grunge classes, add CrypticWhisper
3. `src/components/StrangerThingsCard.tsx` -- grunge border, twitch, ink splatter
4. `src/components/GuestBook.tsx` -- breathe, scratched surface
5. `src/components/CinematicFooter.tsx` -- torn edge, twitch skulls

### Files Created
1. `src/components/CrypticWhisper.tsx`

