# Exhibition base + "Browser Experiments" rename + 2.0 brewing teaser

Keep the current Exhibition dossier homepage exactly as it looks now. Two changes: relabel the works section, and add a mystery teaser section for the 2.0 direction.

## 1. Rename "Drops" to "Browser Experiments"

Visible copy only — routes stay `/drops/:slug`, database and admin keep the "Drops" naming, so SEO, sitemap, prerender and the MCP tools are untouched.

Homepage Room 02:
- Title: `Browser Experiments`
- Support line: `Games, simulations, charts, and small toys you can play with right here. Please touch the art. Break it. Tell me what happened.`
- Room label stays `Room 02 · Interactive works`

Filter chips gain type-based grouping so visitors can scan by kind: `All`, `New`, then the existing tags rendered with friendlier labels (`Game`, `Simulation`, `Chart`, `Toy`, plus whatever tags exist in the data). Search placeholder becomes `Search experiments…`.

Other copy touchpoints updated for consistency: card CTA and empty/loading states, the drop detail page's breadcrumb/back link ("Back to experiments"), header subtitle, and `public/llms.txt`. Page `<title>` and meta descriptions get "browser experiments" phrasing without dropping the existing keyword coverage.

## 2. New section: Room 03 — "Something is brewing"

Placed after Browser Experiments, before the footer. Pure mystery, no names, no dates, no email capture.

Content:
- Room label: `Room 03 · Under construction` with a slow-pulsing red dot
- Heading: `2.0 — off the screen.`
- One line of copy: `The next ones don't live in a browser tab. Interactive installations — fun, creative, playable tech you can walk into.`
- Three redacted placeholder tiles on paper plates: each shows a case number (`No. 10 / 11 / 12`), a fully blacked-out title bar, and a category chip that is itself partly redacted (e.g. `INSTALLATION · ███`, `SENSOR · ███`, `PHYSICAL · ███`)
- A red evidence-tape strip across the section corner reading `Embargoed`
- Footer line of the section: `No launch date. No details. It'll be obvious when it lands.`

Visual language reuses what already exists — `paper-plate`, `torn-edge`, `evidence-tape`, `dossier-stamp`, `exhibit-label`, `barcode`, and the redaction bar — so it reads as one exhibition, not a bolt-on. Tiles are non-interactive (no links), with a subtle hover that lifts the redaction bar a few pixels and reveals nothing.

## Technical notes

- `src/pages/Index.tsx`: rename Room 02 copy, add a new `<ScrollSection>` for Room 03.
- New `src/components/BrewingTeaser.tsx` holding the Room 03 markup; static content, no data fetch.
- `src/components/ProjectGrid.tsx`: search placeholder, tag-label prettifier, empty-state copy.
- `src/components/StrangerThingsCard.tsx`, `src/pages/DropDetail.tsx`, `src/components/CinematicHeader.tsx`: label copy only.
- `index.html` static shell tagline + `public/llms.txt` + `useSEO` strings kept in sync so first paint still matches the hydrated UI (`scripts/verify-first-paint.py` expectations updated accordingly).
- No schema, route, or backend changes.
