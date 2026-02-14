
# Improve Mobile Balloon Layout and Add Dynamic Roaming Animation

## Problem
On mobile, the single balloon sits at `left: 60%, top: 12%` which overlaps with the hero headline ("Late Nights, Wild Ideas"). The current `balloon-float` animation has very subtle movement (max -18px vertical, 6px horizontal), making it feel static.

## Solution

### 1. Reposition the mobile balloon to avoid headline overlap
Move the mobile balloon to the top-right corner area where it won't interfere with the headline text.

**File: `src/components/HeroAdPlaceholders.tsx`**
- Change `mobileLayout` from `{ left: "60%", top: "12%" }` to `{ left: "65%", top: "2%" }` -- pushes it to the upper-right sky area, well above the headline
- Reduce scale from `0.7` to `0.55` so it feels like a distant balloon in the sky

### 2. Create a new dynamic roaming animation for mobile
Replace the subtle `balloon-float` with a more dramatic `balloon-roam` animation that drifts left/right, up/down, and scales slightly (closer/further effect).

**File: `src/index.css`**
- Add a new `@keyframes balloon-roam` with wider movement range:
  - Horizontal drift: -20px to +25px (roaming left and right)
  - Vertical drift: 0 to -30px (floating up and settling back)
  - Scale oscillation: 0.95 to 1.08 (closer/further depth effect)
  - Slight rotation: -1deg to 1deg (natural wind sway)
- Duration: ~18s for a slow, organic feel
- Add `.animate-balloon-roam` class

### 3. Apply the roaming animation on mobile only
**File: `src/components/HeroAdPlaceholders.tsx`**
- Add a `className` field to the mobile layout config
- Use `animate-balloon-roam` for mobile balloons instead of the default `animate-balloon-float`

**File: `src/components/FloatingAdPlaceholder.tsx`**
- Accept an optional `animationClass` prop to override the default `animate-balloon-float`

## Technical Details

### New keyframes (index.css)
```css
@keyframes balloon-roam {
  0%   { transform: translateY(0)    translateX(0)    scale(1)    rotate(0deg);   }
  15%  { transform: translateY(-12px) translateX(20px)  scale(1.05) rotate(0.8deg); }
  30%  { transform: translateY(-25px) translateX(8px)   scale(0.97) rotate(-0.5deg);}
  50%  { transform: translateY(-15px) translateX(-18px) scale(1.06) rotate(0.6deg); }
  70%  { transform: translateY(-28px) translateX(12px)  scale(0.95) rotate(-0.8deg);}
  85%  { transform: translateY(-8px)  translateX(-10px) scale(1.03) rotate(0.3deg); }
  100% { transform: translateY(0)    translateX(0)    scale(1)    rotate(0deg);   }
}
```

### Mobile layout update
```typescript
const mobileLayout = [
  { left: "65%", top: "2%", scale: 0.55, opacity: 0.85, delay: "0s", speed: "18s", parallax: 0.15 },
];
```

### FloatingAdPlaceholder prop addition
- Add `animationClass?: string` prop, default to `"animate-balloon-float"`
- Apply it to the wrapper element instead of hardcoded class

### Files changed
1. `src/index.css` -- add `balloon-roam` keyframes and class
2. `src/components/HeroAdPlaceholders.tsx` -- reposition mobile balloon, pass animation class
3. `src/components/FloatingAdPlaceholder.tsx` -- accept and use custom animation class
