# Re-shoot the Misbehaviour Index as finished products, not lab rigs

The current ten images read as engineering prototypes: exposed servos, oversized rigs, cable bundles, workshop energy. The references (soft glowing silicone creatures, the pink-and-teal finished robot, the tidy pastel sleep box) all share one thing: the object looks **manufactured, handheld and ready to ship** — a real product you could put on a plinth at an activation tomorrow.

## New art direction (applies to all ten)

- **Finished industrial design.** Injection-moulded soft-touch shells, seamless matte or satin surfaces, rounded CMF, subtle parting lines, hidden fasteners. No breadboards, no exposed servo horns, no jumper wires, no aluminium extrusion, no gaffer tape.
- **Handy scale.** Desk-sized or hand-held. The object fits in one palm or sits comfortably on a table — no room-scale contraptions.
- **Character through form, not clutter.** Personality comes from silhouette, one glowing element, one moving part, and a restrained face or light cue.
- **CMF palette.** Two-tone bodies pulled from the site accents (electric cyan, hot coral, acid-lime, off-white, deep charcoal) with one soft internal glow.
- **Photography.** Clean studio product photography: seamless sweep or minimal styled surface, soft key light plus a crisp rim, shallow depth, wide 16:9 crop, editorial and premium — MSCHF drop photography, not maker-space documentation.
- **People.** Malaysian Chinese subject where a person is shown, hands or a deadpan half-face interacting naturally with the object. No white male leads. Several shots become pure product shots with no person at all, for pacing.

## Per-object treatment

Each concept keeps its name, hook and behaviour copy. Only the visual is re-imagined as a product:

| # | Object | Product form |
|---|---|---|
| 01 | Needy Plant | Glossy ceramic-look pot with a hidden tilt base and a soft glow ring |
| 02 | Judgemental Bin | Compact matte bin, flush lid, one small status display |
| 03 | Overreacting Bell | Palm-sized chrome-and-coral bell puck on a minimal base |
| 04 | Shy Cup | Soft-touch tumbler on a slim motorised coaster disc |
| 05 | Sleep Monster | Silicone glowing creature, pebble-soft, like the reference lamps |
| 06 | Snack Sniper | Small tabletop dispenser, clean chute, satin shell |
| 07 | Procrastination Printer | Toy-scale thermal printer with a tidy paper curl |
| 08 | Applause Microwave | Compact pastel appliance with a single mic grille detail |
| 09 | Petty Coat Hook | Sculptural wall hook, one visible rotating joint |
| 10 | Alibi Lamp | Slim articulated desk lamp with a focused warm beam |

## Technical work

1. Generate ten new 16:9 images with the direction above (premium tier for product-grade fidelity).
2. Convert to optimised `.webp` and replace the files in `src/assets/curiosity/` — same filenames, so no import changes.
3. Update `imageAlt` strings in `src/components/playable/ConceptGallery.tsx` to describe the new product shots.
4. Soften the section intro line so it reads as a product catalogue of activation-ready objects rather than a workshop bench.
5. Verify grid framing at 1440px and 390px.

Uploaded references are used as style guidance only; nothing is embedded.
