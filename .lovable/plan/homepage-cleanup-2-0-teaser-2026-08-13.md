# Homepage cleanup + 2.0 teaser

Simplify the homepage: fewer, clearer sections, less abstract/exhibition tone, and a new "something is brewing" teaser for bryanlauwk.fun 2.0.

## New page order

```text
Hero  ->  Something is brewing (2.0)  ->  Browser experiments  ->  Let's build / About / Leave a message  ->  Footer
```

## 1. Hero — new 2.0 copy

Headline: "Making Curiosity Playable."

Body: "I build interactive experiments across screens, spaces and the physical world — mixing AI, science, art and creative technology."

Line under it: "Made to touch. Made to try. Made to wonder."

The three output chips become SCREEN / SPACE / STUFF (keeping the honest "Playable now" / "Exploring" labels). Layout, artwork and the cursor-reactive frame stay as they are.

## 2. New section — Something is brewing

Placed directly between hero and the experiments grid. Teaser only, no CTA.

- Eyebrow: "Something is brewing · bryanlauwk.fun 2.0"
- Headline: "Creative Interactive Stuff."
- Subline: "Objects, machines and experiments that respond to humans — sometimes usefully, usually unnecessarily."
- A single SCREEN → SPACE → STUFF strip as the visual anchor.

Quiet, confident panel styling consistent with the existing system — no fake progress bars, dates or product claims.

## 3. Browser experiments — one clean section

Keep every existing project in this one section, exactly once. Add a subheadline: "Web games, simulations, experiments." Keep the newest project featured, keep real titles, tags, descriptions and routes untouched.

## 4. Remove

- "How I make wonder" (four creative moves)
- "On the bench" (open questions)
- The abstract "One idea, more than one form" loop diagram and its form studies — the SCREEN → SPACE → STUFF strip now carries that idea far more simply.

## 5. Combine into one closing section

Collaboration + About + Guest book merge into a single section, "Let's make something curious":
- Short collaboration line and the Studio CTA
- Short about paragraph and the real Studio / GitHub / X / LinkedIn links
- Guest book, still collapsed by default, in the same block

Navigation reduces to: Play · What's next · About, plus the existing CTA button. Mobile keeps the non-overflowing row.

## Technical notes

- Copy changes live in `src/lib/siteContent.ts` (new `play.brewing.*` keys; remove the moves/bench/loop keys).
- New `src/components/playable/Brewing.tsx`; delete `IdeaSystem.tsx`, `CreativeMoves.tsx`, `OnTheBench.tsx`; merge `BuildTogether.tsx` into `ClosingAbout.tsx`.
- `src/pages/Index.tsx` and `PlayNav.tsx` updated for the new order and anchors.
- Styles reused from the existing `.playable` scope in `src/index.css`; unused rules for removed sections cleaned up.
- No data, route, backend or drop-detail changes. Verify at 1440px and 390px, zero horizontal overflow, then run typecheck, tests and build. Preview only.
