# Project card copy polish + 2-column sketchbook on mobile

## 1. Card descriptions (one short line each, no repeated "Explore")

| Project | New line |
|---|---|
| Badminton Clash | Every rally, result and rival, on record. |
| Elemental Block Blast | Mix the elements. Start a chain reaction. |
| Infinite Kitchen | A kitchen that never closes, or ends. |
| 马年新年歌排行榜 | The songs ruling Chinese New Year 2026. |
| Inflation Chart | What your nasi lemak cost last year, and now. |
| Cafe Rush | Tap, hold, serve. Survive the morning rush. |
| Cartridge | Turning creative work into things you can buy. |
| Artoy | One drawing, a whole shelf of collectibles. |
| 画啦猜啦 | Draw the word. Friends race to guess. |
| Farm-direct platform | A Secai Marche redesign, from farm to table. |
| Boringg | One button. Press it. |
| Giant Durian Run | Dodge the durians. Survive if you can. |
| Type A Disaster | Build a city. Watch it go wrong. |
| Little Originals | Kids' drawings, made into real merch. |

Titles, links, tags and categories stay unchanged. Detail pages and search previews pick up the new lines automatically.

Note: Giant Durian Run reuses the homepage's featured line on purpose; tell me if you'd rather it differ.

## 2. Sketchbook gallery ("Not Yet Real") on phones
- Show the six sketches in 2 columns on phones instead of 1, with tighter gaps and smaller captions, cutting the scroll length by about half.
- Tablet (2 columns) and desktop (3 columns) unchanged.

## Technical details
- `src/data/public-projects.ts`: replace description strings.
- `src/styles/studio.css`: base `.studio-concepts-grid` to `repeat(2,minmax(0,1fr))` with `gap:20px 12px`; caption h3 14px under 600px.
- Update any tests asserting old descriptions; run vitest and the first-paint check.
