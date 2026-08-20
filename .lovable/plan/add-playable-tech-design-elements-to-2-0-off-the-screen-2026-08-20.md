# Add playable-tech design elements to "2.0 — off the screen"

The actual 2.0 object is still taking shape — likely a slot-machine-style food feeder for cats — so the section should stay a teaser, not an interactive prototype. The goal is to make the section *look and read* like playable technology without requiring the real object to be finished.

## Copy direction

Keep the section mysterious and playful, but drop the "engineering lab / maker lab / science lab" posture. Avoid words like *lab*, *prototype*, *mechanism*, *sensor*, *engineering*, *invention*, *build notes*, *telemetry*. The tone should be closer to "I made a strange toy for my cat" than "I am running a hardware startup."

- Section label: `Physical work` → `Playable tech · in development`
- Heading stays `2.0 — off the screen.`
- Body: one tight line about the work moving into physical things you can touch, press, and watch a cat figure out. Emphasize *play* and *curiosity*, not fabrication.
- The "Play for pets" block: keep it vague but human. Mention the object is for cats and still being tested, e.g. `The first one is for cats. It involves a button, a snack, and a small betrayal of trust.`
- Spec sheet rows: reframe the data to feel like a product card or shipping label, not a parts list. Use plain language: `Purpose: make snack time weird`, `Status: not ready`, `Behavior: button · snack · repeat`.
- Handwritten scribble: keep inviting, e.g. `try shaking it` or `not for public paws yet`.
- Remove any line that says "build notes released on X" or "follow the progress" — the object is still a secret.

## Visual design elements

Since the section shouldn't be fully interactive, add static/atmospheric tech details that make it feel like a real product-in-progress:

**1. Crate remains the hero, but with more product-like detail**
- Keep the single slow-spinning 3D neon crate as-is.
- Add a small status pill beneath it: `STATUS: SEALED` with a pulsing dot, and a deadpan one-liner that rotates slowly (`still under wraps`, `cat has not approved`, `do not open`).

**2. Spec sheet styled like a printed product card**
- Keep the existing grid-paper panel, tape corners, and red "DO NOT OPEN" stamp.
- Replace the current rows with friendlier, object-first labels and add a fake barcode + serial number (`BL-2.0-001`).
- Add a thin progress line that reads as a manufacturing status bar, but keep it subtle and non-interactive.

**3. One extra "hardware detail" to sell the physical idea**
Beside or below the crate, add a small schematic-style sticker that hints at the slot machine / feeder concept without showing it: a minimal line drawing of a button, a chute, and a bowl, with a redacted part in the middle. This is visual world-building only, not an interactive demo.

**4. Keep accessibility**
- The crate stays a decorative element (no drag/knock). It remains a single `aria-hidden` visual, with a `sr-only` summary.
- No keyboard interaction required beyond normal scrolling.
- Reduced-motion remains respected: the idle spin is paused for those users.

## Technical notes

- `src/components/BrewingTeaser.tsx`: update the copy, swap the spec sheet rows, add a status pill with a rotating message, and add the schematic sticker as an inline SVG.
- `src/index.css`: add a `.status-pill` utility and a gentle rotation keyframe for the deadpan line (unless reduced motion is on). Keep the existing crate and dossier styles; no drag or dispenser code needed.
- No routing, schema, SEO, backend, or new data dependencies.
