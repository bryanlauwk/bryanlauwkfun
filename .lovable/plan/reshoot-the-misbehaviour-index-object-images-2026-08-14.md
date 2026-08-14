# Reshoot the Misbehaviour Index object images

Goal: replace the ten object feature images in "The 2.0 Misbehaviour Index" so they read as HTX Studio-style creative-tech films — real-looking, oversized, absurdly engineered objects photographed in use — with Malaysian Chinese people interacting, and with no concept that duplicates an actual HTX Studio project.

## What changes

1. **Reference check first.** Research HTX Studio's published projects and note their signature visual language (glossy oversized props, bold flat colour sets, wide cinematic framing, deadpan human reactions, everyday object taken to an unreasonable extreme). Log which of their real builds must be avoided so our ten concepts stay clearly original. Any concept that lands too close gets swapped for a fresh one in the same tone.

2. **New feature image per concept (10 total).** Same file names in `src/assets/curiosity/`, so no layout or import changes:
   - Malaysian Chinese cast — a mix of ages and genders, never a white male lead.
   - The object is the hero: over-engineered, glossy, believable hardware — servos, sensors, cables, mounting plates visible.
   - One clear misbehaviour caught mid-action, with a genuine human reaction (recoil, delight, disbelief).
   - Wide cinematic set-piece framing on a built colour set, shallow depth, crisp studio lighting — set-build energy that reads as a live brand activation, not a product render.
   - Consistent palette across all ten so the grid feels like one series (the existing red / yellow / blue / green accent system per card).
   - The first two cards are the featured wide slots, so those get the most staged, widest compositions.

3. **Copy pass on the affected concepts only.** For any concept swapped out during step 1, rewrite name, hook, object, personality, behaviour and surprise in the existing voice, and update the alt text of every image to describe the new photograph and the person in it.

4. **Section framing.** Keep the kicker "THE 2.0 MISBEHAVIOUR INDEX" and the concept-study disclaimer, and tighten the intro note so the section reads as brand-ready live-experience concepts rather than desk toys.

## Technical notes

- Images are generated at wide aspect and saved as `.webp` at the existing paths in `src/assets/curiosity/`, replacing the current files; `ConceptGallery.tsx` imports stay untouched apart from alt text and any swapped concept's copy.
- No backend, routing or data changes. Preview only — nothing is published.
- Verification: view every generated image, check the grid at 1440px and 390px for framing and crop behaviour, and confirm typecheck and build pass.
