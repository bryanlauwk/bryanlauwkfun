# Asymmetrical experiments bento + MELT removal

## What will change

- Replace the uniform three-column experiments grid with an asymmetrical bento layout.
- Keep the current dossier-inspired cards, exhibit numbers, live previews, red accents, mischievous copy, search, and filters.
- Use a repeating desktop rhythm of featured wide cards, tall cards, and standard cards; collapse to a clean single column on mobile and two columns on tablet.
- Let featured cards use larger imagery and type while preserving readable descriptions and stable card proportions.
- Remove the entire MELT / “The weird is escaping the screen” section.
- Remove the now-obsolete “Brewing” navigation link and any homepage/search metadata that promises work “off screen” or “soon off it.”
- Keep project routes, saved previews, admin controls, and project data unchanged.

## Validation

- Check the homepage at desktop and mobile sizes for balanced card placement, no gaps or overlaps, readable text, and intact search/filter behavior.
- Confirm all available experiments render and the MELT section/navigation link are gone.
- Run the focused homepage checks and production build.

## Technical details

- Add a deterministic size pattern in `ProjectGrid` based on the filtered card index so filtering and searching reflow cleanly.
- Pass the selected bento treatment into `StrangerThingsCard` to adjust spans, image ratio, and content scale without duplicating card markup.
- Update homepage/header/static first-paint copy where MELT or the removed section is referenced.
