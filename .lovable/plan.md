

# Fine-Tune Floating Particles to Match the Site's Essence

## Current State

The `UpsideDownParticles` component renders:
- **40 round "spore" dots** (2-6px, float upward over 8-20s)
- **15 flat "ash" rectangles** (4-12px wide, float upward over 12-20s)

Both use generic `bg-muted-foreground` coloring and simple round/rectangular shapes. They feel like a Stranger Things "Upside Down" effect but don't specifically evoke "experiments, games, and things that crawled out of late nights."

## Proposed Changes

All changes happen in a single file: `src/components/UpsideDownParticles.tsx`

### A. Retheme the Particle Types

Replace the two generic particle types with three thematic ones:

1. **Embers / Sparks** (the main dots) -- tiny glowing points in crimson/amber tones, like sparks from a late-night soldering iron or dying campfire. Use `bg-primary` (crimson) and `bg-amber-500` with low opacity. Smaller (1-3px), faster (6-14s), slight upward drift with random horizontal wander.

2. **Code Fragments / Pixel Dust** -- tiny square particles (not round) representing the digital/experimental side. Use `bg-accent` (lightning blue) at very low opacity. Small (2-4px), slow float (10-18s). Square shape via `rounded-none` instead of `rounded-full`.

3. **Ash / Debris** (keep but refine) -- larger, slower, elongated shapes representing the "crawled out of late nights" residue. Slightly more visible. Keep rectangular shape. Use `bg-foreground` at very low opacity.

### B. Tune the Physics

- **Reduce total count** from 55 to ~35 particles for a cleaner, more intentional feel
  - 18 embers, 10 pixel-dust squares, 7 ash pieces
- **Vary the drift** more dramatically -- some particles should wander left/right significantly (-50px to +50px) instead of floating mostly straight up
- **Stagger timing** better -- spread delays across 0-20s so particles don't cluster at startup
- **Slow the largest particles** down (15-25s) so the layering feels like depth

### C. Add Subtle Color Variation

Instead of all particles being the same muted gray, introduce a color pool:
- 50% crimson/primary tones (the "wild ideas" fire)
- 30% accent/blue tones (the "experiments" tech glow)
- 20% warm amber (the "late nights" warmth)

Each particle randomly picks from this pool via inline style.

### D. Vary Opacity Curves

Currently all particles have a flat 0.2-0.6 opacity. Adjust to:
- Embers: 0.15-0.4 (subtle glow)
- Pixel dust: 0.08-0.2 (barely visible, ghostly)
- Ash: 0.05-0.15 (atmospheric haze)

This creates depth layers -- bright sparks in front, faint digital noise behind.

## Technical Details

### File Modified
- `src/components/UpsideDownParticles.tsx` -- restructure particle generation with three typed categories, new color assignments, and adjusted sizing/timing

### No CSS Changes Needed
The existing `animate-spore-float` and `animate-ash-float` keyframes in `index.css` already handle the motion. We only change the particle properties (color, size, count, shape, opacity, timing) in the component.

### Performance
- Fewer total particles (35 vs 55) means less DOM nodes
- All animations remain GPU-composited (transform + opacity only)
- `useMemo` keeps particle configs stable across re-renders

