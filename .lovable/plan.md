

# Pivot to "Swing Up" Aesthetic — Bright Editorial Sport

## Reference Analysis

The uploaded mockup shows a radically different visual language:
- **Background**: Warm off-white `#FAFAF7` (cream paper)
- **Accent**: Electric lime green `#C6FF2E` used as a solid block behind the headline
- **Ink**: Near-black `#0A0E0A` for type and line work
- **Type**: Heavy 900-weight sans-serif (Archivo / similar) — punchy, oversized, editorial
- **Illustration**: Flat, minimal line drawings (badminton racquet, phone mockup) with thick 6px strokes
- **Mood**: Sporty, modern, confident, daylight — opposite of the current "80s dark fantasy"

## Confirmation Needed

This is a **complete aesthetic overhaul**, not a tweak. It will replace:
- The dark indigo + crimson + glow palette
- Stranger Things / horror motifs (Christmas lights, electrical flicker, fog, lightning, Memory Orbs)
- Serif drama type with sans-serif editorial type
- All the grunge / film grain / vignette / VHS effects

I'll proceed assuming you want the **full pivot**. If you only want the *new color/type system* but want to keep the dark fantasy weirdness somewhere, stop me and say so.

---

## Plan

### 1. Design Tokens (`src/index.css`)
Replace `:root` and `.dark` HSL variables:
- `--background`: `60 20% 97%` (cream)
- `--foreground`: `120 15% 5%` (near-black)
- `--primary`: `75 100% 59%` (lime `#C6FF2E`); `--primary-foreground`: dark green `120 65% 14%`
- `--card`: pure white; `--border`: soft warm gray
- `--accent`: same lime; `--secondary`: dark ink
- Remove crimson, electric purple, lightning blue
Remove/neutralize atmospheric utilities: `film-grain`, `vignette`, `fog-layer`, `stranger-glow`, `grunge-divider`, `ink-splatter`, `animate-lightning`, `animate-shimmer`, `animate-breathe`, `animate-twitch`, `animate-electrical-flicker`, `animate-christmas-light`. Keep them as no-ops or strip class usages.

### 2. Typography (`tailwind.config.ts` + `index.html`)
- Add Google Fonts link: **Archivo** (700/900) for display, **Inter** (400/500/600) for body, drop the existing serif/mono dramatics
- Map `font-serif` → Archivo Black, `font-sans` → Inter, `font-mono` → keep as small editorial caption only

### 3. Hero (`src/pages/Index.tsx`)
- Remove `heroImage`, film-grain, vignette, fog-layer, lightning, `UpsideDownParticles`, `HeroAdPlaceholders`, `CrypticWhisper`, `TypewriterMotto` from the hero composition (we can keep them as easter eggs elsewhere or delete — see Q below)
- New hero structure:
  - Left: a **lime green block** (`bg-primary` rounded-2xl) containing the headline "I make things / for fun" in `font-serif` (Archivo Black) `text-7xl/none` dark green
  - Right: a small flat-line illustration (inline SVG) — a stylized phone/badminton-style mark, but themed to "things I make" (e.g., a controller + cursor + sparkle in 6px black strokes)
  - Below: short editorial subtitle in Inter medium: "games · experiments · rabbit holes"
- Generous whitespace, left-aligned (not centered)

### 4. Section Headings & Cards
- "Drops" heading: Archivo Black, oversized, left-aligned, with a small lime underline accent instead of grunge dividers
- `StrangerThingsCard.tsx` → simplified to a clean white card with thick black border, Archivo title, lime hover-accent on the line and CTA arrow. Remove Christmas lights, monogram ghost, blue overlay, electrical flicker. Keep the lift+shadow polish.

### 5. Header & Footer
- `CinematicHeader`: white/cream sticky bar, black logo wordmark in Archivo, lime hover underline on nav links
- `CinematicFooter`: cream background, simple black icons, lime hover

### 6. Guest Book
- White card on cream, lime focus rings (already primary-themed so it'll inherit), black type

### 7. Background ambience
- Remove all dark-fantasy background layers (orbs, grain, vignette, fog, lightning)
- Add a single subtle grid or paper-texture noise at ~3% opacity for warmth — optional

---

## Files Changed

| File | Change |
|---|---|
| `src/index.css` | New cream/lime palette, neutralize atmospheric utilities |
| `tailwind.config.ts` | Archivo + Inter font families |
| `index.html` | Google Fonts link |
| `src/pages/Index.tsx` | New hero with lime block + flat SVG, remove dark-fantasy layers |
| `src/components/StrangerThingsCard.tsx` | Strip horror effects, clean editorial card |
| `src/components/CinematicHeader.tsx` | Light theme styling |
| `src/components/CinematicFooter.tsx` | Light theme styling |
| `src/components/GuestBook.tsx` | Light theme adjustments |

---

## One Open Question

What happens to the **dark fantasy easter eggs** (Konami code → Upside Down, CrypticWhisper, Memory Orbs, sound effects)? I'll keep them wired up but disabled by default unless you say otherwise — they can still trigger via Konami code as a hidden mode.

