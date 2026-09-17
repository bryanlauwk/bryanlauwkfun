# Homepage copy rewrite — motto as headline

## Goal
Promote the brand motto to the hero headline and rewrite the homepage copy end-to-end so every section speaks with one irreverent, self-aware voice. No layout or styling changes — text only (plus matching metadata).

## New copy

### Hero (`src/pages/Index.tsx`)
- Headline (stacked display lines, marker underline on the last line):
  `Good luck,` / `have fun,` / `don't die.`
- Subhead (absorbs the old headline): "Playable experiments by Bryan Lau — for the curious. Beginning in the browser, moving off it."
- Stamp: "Now showing" → "On display"
- Primary CTA: "See what's being built" → "See the evidence" (points to the 2.0 teaser)
- Secondary CTA: "Bring a strange idea" → keep (mirrors the footer card)
- Scribble, evidence tag, stamp ("Certified curious"), scroll cue: keep as-is

### 1.0 · In the browser (`src/pages/Index.tsx`)
- Headline: "Things to play with." → "Pick something up."
- Blurb: "Games, small toys, and curious machines you can touch right here. Break something — then tell me what happened."

### 2.0 · Off the screen (`src/components/BrewingTeaser.tsx`)
- Headline and MELT description: keep ("Something weird is melting." / "Part robot, part resin experiment…")
- Small tweak only if the section reads flat next to the new hero; no structural changes.

### Footer (`src/components/CinematicFooter.tsx`)
- The bottom motto line now duplicates the hero headline → replace with "Thanks for not dying." (same uppercase tracking treatment)
- Headline "Something strange should exist." and support line: keep
- Card labels and social icons: keep

### Header (`src/components/CinematicHeader.tsx`)
- Nav labels (Interactive / Browser / Collaborate), "Attendance" counter: keep

## Metadata
- `src/pages/Index.tsx` useSEO: title → "Bryan LauWK — Playable experiments & interactive art" (under 60 chars), description → motto-voiced line mentioning playable browser experiments and upcoming interactive objects (under 160 chars).
- `index.html`: update static title, meta description, og:title/og:description to match the new positioning (og:image untouched).

## Verification
- `bun run build` passes.
- Playwright: screenshot hero, 1.0, 2.0 and footer in light and dark mode to confirm the new copy renders cleanly (no overflow from the longer stacked headline) and the underline marker sits on "don't die."

## Out of scope
- `/drops/*` detail pages, admin, guest book, layout/visual styling, hrefs.
