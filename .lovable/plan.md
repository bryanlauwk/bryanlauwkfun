# Finish the Living Playground homepage

The lower half of the page currently reads as unfinished: big empty black bands between sections, an archive of near-black spheres on first view, and one section that still looks like a wireframe next to the painterly ones.

## What's actually wrong (verified in the live preview)

1. **Archive orbs look black on arrival.** The nine capsules do render their painted worlds correctly once scrolled into view — but they lazy-load and fade in only on reveal, so at first paint you see empty dark glass balls with a highlight. That's the state captured in the screenshot.
2. **Dead vertical space.** Roughly 250–400px of empty black sits between Artifacts → Next Season, Next Season → Past Seasons, and Past Seasons → Bryan's Mind. Nothing occupies those bands.
3. **Artifacts section has a hole.** The still-life art stops at 66% height and the copy is pushed down with a large `pt-[30rem]`, leaving a blank gap between the caption block and the tag list.
4. **Next Season is the odd one out.** It's a flat rounded rectangle with a CSS/SVG cocoon, floating in a gutter — visually a wireframe compared to the painted, edge-to-edge sections around it.
5. **Archive last row is orphaned.** 5 + 4 across a 5-column grid leaves an obvious empty cell.

## Fix

**Capsules load solid, not black**
- Eagerly decode the shared capsule painting (single image, already one request) so the crops are painted before reveal; keep the fade for polish but start capsules at a visible base opacity instead of 0.
- Give the glass a faint painted interior tint so any pre-decode frame still reads as a world, not a void.

**Close the empty bands**
- Cut section padding on Artifacts, Next Season and Past Seasons so consecutive sections share one continuous dark gradient instead of separated blocks.
- Bleed the Next Season interlude and the closing landscape into their neighbours with top/bottom seam gradients, matching how Hero → Current Drop already melts together.

**Repair the Artifacts composition**
- Extend the still life lower and reduce the copy offset so the caption plate overlaps the bottom of the painting rather than sitting in a gap below it.
- Move the four piece names inline with the plate so the section ends on content.

**Bring Next Season up to the painterly standard**
- Make it full-bleed like its neighbours: dark atmospheric field, larger volumetric cocoon glow, no visible card border or gutter. Keep the existing copy and the "date unknown" line.

**Balance the archive grid**
- Use a 3/4-column rhythm at the relevant breakpoints so the nine capsules distribute evenly with no orphan cell, and tighten the row gap.

## Technical notes

Frontend/CSS only — `src/index.css` plus `PastSeasons.tsx`, `ArtifactsRow.tsx`, `UpcomingSeason.tsx`, and small spacing edits in `Index.tsx`. No data, routes, schema, or copy meaning changes; all nine archive links and the current drop stay exactly as they are. Motion stays transform/opacity and keeps the `prefers-reduced-motion` guards. Verified after with desktop + mobile renders.
