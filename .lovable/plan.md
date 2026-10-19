# Homepage copy proofread and polish

Goal: one calm, confident voice (132.studio restraint, a little MSCHF wit). Cut repeats of "curious/curiosity", "playable/playful" and "things", and drop lines that explain the obvious. Your new hero and About lines stay exactly as you wrote them.

## Changes (current → new)

### Hero
- Headline: "Curiosity, made into things." (keep)
- Subheadline: "Unconventional objects. Playable ideas." (keep)
- Lede: "881230.studio turns curious ideas into things people can play with, explore, and hold." → "Built to be played with, poked at, and held."
- Photo caption: "Ideas on the workbench. More on the way." → "On the workbench."

### Featured project
- Eyebrow: "Start here · a playable project" → "Start here"
- Body: "A browser runner made for the KL Durian Experience Centre. Dodge giant durians and see how far you get." → "A browser runner for the KL Durian Experience Centre. Dodge the durians. Survive if you can."

### Selected work
- Note: "Pick something that makes you curious. Projects open in a new tab." → "Each opens in a new tab."

### About
- Heading, roles line and bio: keep as you wrote them.

### Sketchbook gallery
- Heading: "Things That Could Exist" → "Could Exist" is too short; use "What If" ... final: "Not Yet Real"
- Description: "Concept sketches, imaginary objects, and playful possibilities." → "Sketches and objects that don't exist. Yet."
- Captions: "Curious company" → "Odd company"; "Good ideas. Playful detours." → "Detours worth taking"; others keep.

### Contact
- Heading: "Have something curious in mind? Let's make it." → "Got a strange idea? Let's make it."
- Body: "Games, interactive experiences, or an unusual object. Tell me what you're thinking." → "A game, an installation, an object nobody asked for."

### Header / footer
- Keep. Footer "Made in Kuala Lumpur" stays the single Kuala Lumpur mention.

## Technical details
- Edit `src/pages/StudioPreview.tsx`, `src/components/ConceptGallery.tsx`.
- Mirror hero/about wording in the `index.html` static shell; keep first-paint check phrases passing.
- Run `scripts/verify-first-paint.py` and vitest.
