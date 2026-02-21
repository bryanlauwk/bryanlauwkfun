
# Redesign Particles: Crispy Glass Bubbles (Idea Light Bulbs)

## Concept

Replace the three particle types (embers, pixel dust, ash) with a single unified theme: **crispy glass bubbles** -- translucent, hollow-looking circles that float upward like ideas rising from the mind. They evoke light bulbs / thought bubbles and tie directly to the "experiments and wild ideas" identity.

## Changes

### File: `src/components/UpsideDownParticles.tsx`

**Strip down to one particle type** -- remove the ember/pixel/ash split entirely.

**Glass bubble properties:**
- **Count**: ~20 bubbles (fewer but more visible)
- **Size**: 6-18px diameter (much bigger than current 1-4px)
- **Shape**: `rounded-full` with a transparent center and a thin colored border (no `backgroundColor` -- use `border` instead to create the hollow glass look)
- **Border colors**: Mix of warm amber `hsl(40 80% 65%)`, soft gold `hsl(45 70% 70%)`, and faint crimson `hsl(350 60% 60%)` -- like warm light bulb filament glow
- **Opacity**: 0.2 - 0.5 (significantly more visible than current 0.05-0.4)
- **Speed**: 10-22s float duration (leisurely rise)
- **Drift**: -40px to +40px horizontal wander
- **Inner highlight**: A tiny pseudo-highlight via `box-shadow: inset` to simulate glass refraction -- a small bright spot inside each bubble

**Rendering change:**
- Instead of `backgroundColor`, each bubble uses:
  - `border: 1px solid <color>` (the glass edge)
  - `boxShadow: inset 2px -2px 4px <color at 0.15>, 0 0 6px <color at 0.1>` (inner highlight + outer glow)
  - `backgroundColor: transparent`
- This creates the hollow, crispy glass look

**Simplify types:** Remove the `ParticleType` union and color arrays. Single `Bubble` interface with `borderColor` instead of `color`.

### No CSS changes needed
Reuses existing `animate-spore-float` keyframe for the upward float motion.
