

# Stranger Things Hot Air Balloons with Depth Effect

Replace all three placeholder variants (balloon, broom, lantern) with a single detailed Stranger Things-style hot air balloon, then render 3-4 instances at different sizes and opacities to create a cinematic depth/parallax illusion.

---

## Concept

All ad placeholders become eerie, glowing hot air balloons drifting in the dark sky. Each balloon is the same design but rendered at different scales to simulate distance:

| Balloon | Size | Opacity | Position | Feel |
|---------|------|---------|----------|------|
| Foreground | 1.0x (240px) | 85% | Left, mid-height | Close, detailed |
| Mid-ground | 0.7x (170px) | 65% | Upper right | Medium distance |
| Background 1 | 0.45x (110px) | 45% | Center-left, high | Far away |
| Background 2 | 0.35x (85px) | 35% | Far right, low | Very far, silhouette-like |

The 4th balloon reuses the first sponsor name or cycles if fewer sponsors exist.

---

## Visual Design: Stranger Things Balloon

Each balloon SVG will feature:

- **Neon crimson glow aura** radiating from the balloon envelope (radial gradient with animated pulse)
- **Vertical panel stripes** in alternating crimson/purple, matching the site's primary/secondary palette
- **VHS-style scanline texture** across the envelope (thin horizontal lines at low opacity)
- **Glowing basket fire** with an animated warm glow underneath
- **Rope details** with slight sag curves instead of straight lines
- **Brand text** rendered on the balloon body using the serif font, with a neon text-shadow glow
- **Floating spore particles** around each balloon (2-3 tiny circles drifting)
- **Film grain dot pattern** overlay on the envelope for texture

The overall feel: a balloon you might see drifting over Hawkins, lit from below by an otherworldly fire.

---

## File Changes

### 1. `src/components/FloatingAdPlaceholder.tsx` -- Full Rewrite

- Remove `FlyingBroom` and `FloatingLantern` components entirely
- Redesign `HotAirBalloon` with the detailed Stranger Things aesthetic described above
- Each balloon gets a unique gradient ID based on a passed `id` prop to avoid SVG ID conflicts when rendering multiple instances
- Accept a `scale` prop (0.35 to 1.0) that controls the rendered width/height
- The wrapper opacity is controlled by the parent, not internally
- Remove the "Ad Space" label text -- the balloons speak for themselves

### 2. `src/components/HeroAdPlaceholders.tsx` -- Depth Layout

- Define 4 balloon positions with scale, opacity, and animation delay:
  - Position 1 (foreground): `left: 2%, top: 35%, scale: 1.0, opacity: 0.85`
  - Position 2 (mid-ground): `left: 75%, top: 6%, scale: 0.7, opacity: 0.65`
  - Position 3 (background): `left: 40%, top: 12%, scale: 0.45, opacity: 0.45`
  - Position 4 (deep background): `left: 88%, top: 50%, scale: 0.35, opacity: 0.35`
- Cycle sponsor names if fewer than 4 sponsors exist (e.g., 3 sponsors maps to indices 0,1,2,0)
- Each balloon gets a staggered animation delay (0s, 1.5s, 3s, 4.5s) for natural feel
- Mobile: show only 2 smaller balloons to avoid clutter

### 3. `src/index.css` -- Animation Updates

- Remove `broom-drift` and `lantern-rise` keyframes and their classes (no longer needed)
- Enhance `balloon-float` with more organic movement (add slight rotation wobble)
- Add `balloon-glow-pulse` keyframe for the neon aura pulsing effect on each balloon's glow circle
- Keep existing reduced-motion support

---

## Depth Illusion Technique

The 3D depth is achieved purely through size + opacity + animation speed:

- **Closer balloons**: larger, more opaque, slower animation (bigger objects move slower relative to viewer)
- **Farther balloons**: smaller, more transparent, slightly faster float cycle (parallax effect)
- Combined with the fixed positioning against scrolling content, this creates a convincing layered sky

