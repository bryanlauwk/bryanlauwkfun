# Make the "2.0 — off the screen" section actually playable

Right now the section is a static dossier: a slowly spinning crate plus a spec sheet. Since the whole positioning is playable technology, the section itself should be touchable — a small piece of playable tech, not a picture of one.

## What changes

**1. The crate becomes a toy, not a decoration**
- Drag anywhere on the crate to spin it in 3D (pointer/touch), with momentum that eases back into the slow idle rotation when released.
- Click/tap the crate to "knock" it: a short jolt animation, the neon seams flare, and one deadpan line cycles under it ("still sealed.", "you heard something.", "nope."). Nothing is disclosed.
- Keyboard accessible: the crate is focusable, arrow keys nudge rotation, Enter/Space knocks. Visible focus ring.
- Reduced-motion: idle spin stays off, drag and knock still work but without the jolt.

**2. A tiny playable element beside it — "reward mechanism" demo**
Tied to the actual first physical experiment (playable pet feeder). A small mono-styled panel with a paw/trigger button: press it and a pellet drops down a short track into a bowl, with a click tick and a counter incrementing (`TREATS DISPENSED: 007`). Purely CSS/JS animation, no data, no sound by default (respects the site's global mute state if trivial — otherwise silent).
This turns the abstract "play · feed · reward" spec row into something the visitor performs with their own hand.

**3. Live signal, not static bar**
The "Build progress" bar becomes a subtle animated telemetry line (pulsing sealed status + a bar that creeps a pixel or two) so the panel reads as running hardware.

**4. Copy refresh for the new positioning**
- Section label: `Physical work` → `Playable tech · in development`
- Heading stays `2.0 — off the screen.`
- Body: shift from "escaping the browser" toward "things you press, feed, and provoke" — one tight line about building playable machines for people and pets.
- The "Play for pets" block gets an instruction line inviting interaction: e.g. `Press the button. That's the whole idea.`
- Spec sheet rows retuned to mechanism-first language; add `Interaction: press · drop · repeat`.
- Handwritten scribble near the crate changes from "don't ask" to something that invites poking, e.g. `try shaking it`.

## Technical notes

- `src/components/BrewingTeaser.tsx`: add pointer-drag state (rotation X/Y refs applied via CSS custom properties on `.neon-crate`), knock state, message cycling, and the new dispenser sub-component. All local `useState`/`useRef`, no data layer.
- `src/index.css`: switch `.neon-crate` idle rotation to read `--crate-rx` / `--crate-ry` custom properties so JS drag can drive it while the idle animation still runs when untouched; add `.crate-knock` keyframes, focus-visible ring, and `.pellet-drop` track/pellet animation. Existing `prefers-reduced-motion` block extended.
- No routing, schema, SEO, or backend changes. Copy edits stay inside this section (homepage hero and `index.html` shell untouched).
