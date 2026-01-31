

## Plan: Immersive Scroll-Driven Visual Journey

### Vision
Transform the website into a captivating single-page visual experience where scrolling becomes the primary interaction. Inspired by the reference image's mysterious deep-sea/cosmic aesthetic with illustrated elements, symbols, and dynamic animations that reveal content through scroll progression.

### Design Concept

**Theme**: "Creative Abyss" - A journey through an illustrated cosmic/deep-sea world
- Deep teal/dark background with illustrated floating elements
- Hand-drawn SVG illustrations that animate on scroll
- Parallax layers creating depth and dimension
- Content reveals progressively as users scroll
- Subtle constellation patterns and mystical symbols in background

---

### Core Technical Approach

**Scroll-Driven Animation Methods**:
1. **Native CSS scroll-timeline** for performant scroll-linked animations (with fallbacks)
2. **Intersection Observer API** for section reveal animations
3. **Custom scroll hooks** for parallax and progress tracking
4. **CSS transforms with scroll progress** for smooth transitions

**No External Libraries Required** - Using native browser APIs and CSS for performance.

---

### Architecture Changes

#### 1. New Scroll Context & Hooks

**File: `src/hooks/useScrollProgress.ts`** (New)
- Track overall page scroll progress (0-1)
- Track individual section visibility
- Provide scroll velocity for dynamic animations
- Handle scroll direction detection

**File: `src/hooks/useIntersection.ts`** (New)
- Reusable intersection observer hook
- Configurable threshold and root margin
- Returns visibility state and progress within viewport

#### 2. Background Layer System

**File: `src/components/ImmersiveBackground.tsx`** (New - replaces DoodleBackground)

Three-layer parallax system:
- **Layer 1 (Distant)**: Constellation patterns, small stars, mystical symbols - moves slowest
- **Layer 2 (Middle)**: Larger illustrated elements (floating objects, creatures) - medium speed
- **Layer 3 (Near)**: Ambient particles, closer decorations - fastest parallax

SVG Illustrations to include:
- Constellation line patterns with glowing dots
- Floating illustrated objects (clock, lantern, compass, scroll)
- Organic shapes (tentacle curves, bubble clusters)
- Mystical symbols and glyphs scattered subtly

Color palette shift:
- Deep teal (#0D4F5F) as primary background
- Cream/gold (#D4AF37) for accents
- Soft cyan glow effects
- Dark navy gradients

#### 3. Hero Section Redesign

**File: `src/components/HeroSection.tsx`** (New - replaces Header hero logic)

- Full viewport height hero with centered branding
- Title animates in with staggered letter reveal
- Subtitle fades up with delay
- Scroll indicator at bottom (animated chevron/mouse icon)
- Background gradient shifts subtly as user scrolls
- Illustrated mascot floats with parallax offset

Hero elements:
- Large elegant typography for "bryan.fun"
- Animated tagline with typing effect (existing)
- Floating illustrated decorations around title
- Gentle pulsing glow behind logo

#### 4. Scroll-Triggered Section Reveals

**File: `src/components/ScrollSection.tsx`** (New)

Wrapper component for content sections:
- Fade + slide up on enter viewport
- Optional parallax offset
- Stagger children animations
- Customizable animation timing

#### 5. Projects Gallery with Scroll Animations

**File: `src/components/ProjectsGallery.tsx`** (New - enhances current grid)

- Cards appear with staggered entrance as section enters view
- Each card has subtle float animation
- Hover still triggers 3D tilt effect
- Section title animates in before cards
- Optional: cards scale slightly based on scroll position in viewport

#### 6. Narrative Sections Between Projects

**File: `src/components/StorySection.tsx`** (New)

Add optional narrative sections between project cards:
- Large typography quotes or statements
- Illustrated dividers
- Background color/gradient transitions on scroll
- Creates "chapters" in the scroll journey

#### 7. Footer as Finale

**File: `src/components/Footer.tsx`** (Enhance)

- Appears as final "destination" of the journey
- Elements fade/slide in as footer enters view
- Social links animate in sequence
- Optional: subtle starfield or particle effect

#### 8. Floating Navigation Indicator

**File: `src/components/ScrollProgress.tsx`** (New)

- Minimal progress bar or dots on side of screen
- Shows current scroll position
- Optional: section markers for quick reference
- Hides during inactivity, appears on scroll

---

### Page Structure

```text
+------------------------------------------+
|            IMMERSIVE BACKGROUND          |
|  (3-layer parallax, always visible)      |
+------------------------------------------+
|                                          |
|              HERO SECTION                |
|         Full viewport height             |
|    - Animated logo reveal                |
|    - Floating illustrations              |
|    - Scroll indicator at bottom          |
|                                          |
+------------------------------------------+
|                                          |
|           INTRO STATEMENT                |
|    "A playground for web experiments"    |
|    (Large typography, fade on scroll)    |
|                                          |
+------------------------------------------+
|                                          |
|          PROJECTS GALLERY                |
|    - Section title animates in           |
|    - Cards stagger reveal                |
|    - 2-column layout                     |
|                                          |
+------------------------------------------+
|                                          |
|              FOOTER                      |
|    - Final destination styling           |
|    - Social links animate in             |
|                                          |
+------------------------------------------+
```

---

### CSS & Styling Updates

**File: `src/index.css`** (Enhance)

New CSS custom properties:
- `--scroll-progress`: Dynamic value 0-1 for scroll position
- `--section-progress`: Per-section scroll progress
- Deep teal color palette additions
- Glow/blur utility classes
- Scroll-driven animation keyframes

New animations:
- `reveal-up`: Fade + translate for section reveals
- `float-gentle`: Subtle floating motion for decorations
- `glow-pulse`: Pulsing glow effect
- `parallax-slow/medium/fast`: Different parallax speeds

**File: `tailwind.config.ts`** (Enhance)

Add custom animations:
- `reveal-up`, `reveal-scale`, `reveal-left`, `reveal-right`
- `float-slow`, `float-medium`, `float-fast`
- `glow-pulse`
- Extended color palette with deep teals and golds

---

### Files Summary

**New Files**:
1. `src/hooks/useScrollProgress.ts` - Scroll tracking hooks
2. `src/hooks/useIntersection.ts` - Intersection observer hook
3. `src/components/ImmersiveBackground.tsx` - 3-layer parallax background
4. `src/components/HeroSection.tsx` - Full-height animated hero
5. `src/components/ScrollSection.tsx` - Animated section wrapper
6. `src/components/ScrollProgress.tsx` - Scroll progress indicator
7. `src/components/FloatingIllustrations.tsx` - SVG illustration components

**Modified Files**:
1. `src/pages/Index.tsx` - Restructure for scroll journey
2. `src/components/Footer.tsx` - Add entrance animations
3. `src/index.css` - New color palette, animations, utilities
4. `tailwind.config.ts` - Extended animations and colors

**Deprecated** (can be removed or repurposed):
1. `src/components/DoodleBackground.tsx` - Replaced by ImmersiveBackground
2. `src/components/Header.tsx` - Logic merged into HeroSection

---

### Animation Specifications

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Hero title | Page load | Letter stagger reveal | 1.2s |
| Hero subtitle | Page load + 0.5s | Fade up | 0.6s |
| Scroll indicator | Page load + 1.5s | Fade in + bounce | 0.5s + infinite |
| Background layers | Scroll | Parallax (0.1x, 0.3x, 0.6x) | Continuous |
| Section titles | Enter viewport | Fade up + scale | 0.8s |
| Project cards | Section in view | Staggered fade up | 0.6s each, 100ms stagger |
| Footer elements | Enter viewport | Staggered fade | 0.5s each |

---

### Technical Considerations

**Performance**:
- Use CSS transforms only (no layout-triggering properties)
- Throttle scroll event handlers
- Use `will-change` sparingly and remove after animation
- Intersection Observer for visibility checks (no scroll listeners for visibility)
- Use `requestAnimationFrame` for smooth scroll-linked updates

**Accessibility**:
- Respect `prefers-reduced-motion` - disable parallax and reduce animations
- Ensure all content is accessible without animations
- Maintain keyboard navigation
- Keep sufficient color contrast on dark backgrounds

**Browser Support**:
- Native CSS scroll-timeline has limited support - use JS fallback
- Intersection Observer is well-supported
- CSS transforms and transitions are universal

---

### Color Palette Shift

**Light Mode** (becomes secondary):
- Keep current warm cream background for reduced motion preference

**Dark Mode / Default** (new primary):
- Background: Deep teal-navy gradient (#0A2E38 to #0D3D4A)
- Primary accent: Warm gold (#D4AF37)
- Secondary accent: Soft cyan (#6FFFE9)
- Text: Cream white (#F5F5DC)
- Muted: Teal-gray (#4A7A8C)

This creates the mysterious "abyss" aesthetic from the reference image while maintaining readability.

---

### Implementation Order

1. Create scroll hooks (`useScrollProgress`, `useIntersection`)
2. Build `ImmersiveBackground` with SVG illustrations
3. Create `ScrollSection` wrapper component
4. Build `HeroSection` with animated entrance
5. Update `Index.tsx` with new structure
6. Update color palette in `index.css` and `tailwind.config.ts`
7. Add `ScrollProgress` indicator
8. Enhance `Footer` with reveal animations
9. Test and refine animation timings
10. Add `prefers-reduced-motion` fallbacks

This transformation creates an immersive scroll-driven experience that captivates visitors through dynamic animations and subtle interactions, revealing your creative world progressively as they journey through the page.

