# Match the reference homepage

Rebuild the homepage composition, copy and section rhythm to match the uploaded reference, while keeping the existing season-based nav labels and all real drop data.

## What changes

**1. Hero (centered, reference-exact)**
- Center the title block over the world instead of the current left-aligned layout.
- Copy: `The Living Playground` / `Interactive art × playful technology × AI experiences` / `A digital world of experiments, stories, and playful systems built by Bryan Lau.`
- The luminous orb sits centered on the horizon with concentric water ripples radiating outward, glowing shoreline grasses left and right, and a gold-and-cyan particle field.
- Under the orb: `Move closer. Something responds.` plus a downward chevron.
- Nav keeps the current labels (Current Season / Past Seasons / Artifact / About) with the reference's active-dot indicator styling.

**2. Featured Worlds (new section)**
- Five circular "world orbs" in a row, each a code-generated illustration: Playable Worlds, Interactive Web Experiments, Mini Games, AI Playground, Generative Ideas.
- Categories and their counts are derived from real drop tags, so the row reflects actual work rather than invented content.

**3. Featured Experiences (replaces the current Drop / Archive layout)**
- Four-across image cards with title, one-line description and a circular arrow button, exactly like the reference.
- Painted cinematic artwork is generated per drop and stored as project assets. Drops that already have a real image keep it.
- The latest drop (画啦猜啦) stays first and is still linked as the current one.

**4. Ideas Forest (new section)**
- Six growth stages along a glowing curve — Spark, Seed, Sprout, Sapling, Tree, Forest — as line-art SVG plants that scale up left to right.
- Copy: `Tiny thoughts. Wild branches. Infinite forests.` / `Ideas grow into essays, experiments, and stories.`
- Stage labels/captions are mapped from drop tags so the forest reflects the real body of work.

**5. Dream Archive (new section)**
- Six icon nodes on a connecting line over a moonlit horizon: Marketer, Builder, Experimenter, Creative Technologist, Curious Human, Next?
- Reference copy, with the archive linking through to real drops.

**6. About Bryan + Bryan's Mind**
- Left: particle-portrait head silhouette. Center: three pillars (Marketer / Builder / Curious Human) with the reference's copy.
- Right: a bordered "Bryan's Mind" panel with the glowing two-eyed orb, a `Show me something weird.` speech bubble and `I'm listening...`.

**7. Footer**
- `Thanks for exploring. / See you next season.` with a small heart glyph.
- The "Leave a Message in the Sky" form from the reference is skipped, as requested.

**8. Removed / retired**
- The current Upcoming Season cocoon band and the standalone Artifact vault are folded into the new structure so the page reads like the reference rather than layering two systems.

## Technical notes

- New components under `src/components/playground/`: `FeaturedWorlds.tsx`, `FeaturedExperiences.tsx`, `IdeasForest.tsx`, `DreamArchive.tsx`, `AboutBryan.tsx`; `ArrivalSection.tsx` and `HeroWorld.tsx` recomposed to centered layout with ripple rings.
- Drop artwork generated with the image tool into `src/assets/drops/` and mapped by project id, with the existing `MiniWorld` engine as fallback for any drop without art.
- Tag-to-category and tag-to-stage mapping extends `src/lib/lpWorld.ts`; no schema or data changes.
- Palette shifts from the current violet-led scheme to the reference's teal/emerald/gold on near-black, updated in the `.living-playground` scope in `src/index.css`.
- Scroll-entry reveal (`useReveal`) applied to each new section; responsive down to 390px; no publish or backend changes.
