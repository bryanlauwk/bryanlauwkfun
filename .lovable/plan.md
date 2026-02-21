

# Replace Glass Bubbles with Inside Out Memory Orbs

## Concept

Transform the floating particles into glowing, solid-colored spheres inspired by the Memory Orbs from Disney Pixar's Inside Out. Each orb represents an emotion with its signature color, glowing softly as it floats upward -- like memories rising from the mind.

## Changes

### File: `src/components/UpsideDownParticles.tsx`

**Color palette** -- the five core emotion colors:
- **Joy**: `hsl(48 95% 60%)` -- warm golden yellow
- **Sadness**: `hsl(210 70% 55%)` -- soft blue
- **Anger**: `hsl(0 80% 50%)` -- fiery red
- **Disgust**: `hsl(140 60% 45%)` -- vivid green
- **Fear**: `hsl(270 60% 55%)` -- rich purple

**Orb styling** (replacing hollow glass borders with solid glowing spheres):
- `backgroundColor` set to the emotion color
- `border` removed (no more hollow look)
- `boxShadow` changed to a multi-layer radial glow:
  - Inner: `inset 0 -3px 6px rgba(0,0,0,0.2)` (depth/roundness)
  - Inner highlight: `inset 2px 2px 4px rgba(255,255,255,0.3)` (glossy surface reflection)
  - Outer glow: `0 0 12px <color at 0.5>, 0 0 24px <color at 0.25>` (soft ambient glow)
- This creates a translucent, luminous orb that looks like it's glowing from within

**Size and count stay similar:**
- ~20 orbs, 6-18px diameter
- 10-22s float duration, -40px to +40px drift
- Opacity bumped slightly to 0.3-0.6 so the colors read clearly

### No CSS changes needed
Reuses existing `animate-spore-float` keyframe.

