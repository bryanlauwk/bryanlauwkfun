## Goal
Tone down the MSCHF-borrowed copy, strip the reference quote and screenshot sticker, and remove the Guest Book so the page reads as a portfolio of playable art & experiments.

## Changes

### 1. Hero (`src/pages/Index.tsx`)
- Remove `StampBadge` "Built to be screenshotted".
- Remove the Gabe Whaley / MSCHF quote block and its attribution.
- Rename dossier strip: `Dossier // Internal Distribution Only` → `Field Notes · Ongoing`. Keep file id but change to `Studio Log — bryan.fun`.
- Keep the "Confidential" stamp? → replace with a subtler `In Progress` tag to reduce MSCHF mimicry.
- Change tagline `games · experiments · rabbit holes` → `playable art · small experiments · things I had to make`.
- Headline stays ("I build dumb ideas. They keep working.") — it's the user's voice.

### 2. Drops section (`src/pages/Index.tsx`)
- Section label: `Section 02 // Field Reports` → `Now Playing`.
- Stamp `Evidence` → removed (or replaced with quiet `Live` dot).
- Subcopy: rewrite from "shipped on a whim, kept because they worked" → "Small playable things. Click one. Break it. Tell me what happened."

### 3. Guest Book — remove entirely
- Delete the third `ScrollSection` wrapper and `<GuestBook />` usage from `Index.tsx`.
- Remove the import.
- Leave `src/components/GuestBook.tsx`, `useGuestBook`, and `submit-guest-book` edge function in place (unused) so no backend/auth churn. Note: private/sponsorship contact path is gone from the UI — flag for user.

### 4. Footer (`src/components/CinematicFooter.tsx`)
- `End of File — 001` → `Studio · 2026`.
- `Distribution: Anyone weird enough` → remove (too MSCHF).
- Keep motto "Good luck, have fun, don't die" (core brand per memory) but drop the red marker-tape treatment → render as plain small caps mono so it's not styled like an MSCHF redaction.

### 5. Header (`src/components/CinematicHeader.tsx`)
- Subtitle `File 001 · Web collective` → `Playable art & experiments`.
- Keep visitor counter but change `VIS·0000` format label → drop the file-tag styling; keep as a plain count.
- Remove the "Classified" stamp.

### 6. Project cards (`src/components/StrangerThingsCard.tsx`)
- Remove hover "Confidential / Eyes Only / Restricted" classification stamps.
- Keep case-number meta but relabel: `BL-2026-01` → `No. 01` style.
- Remove the barcode footer and "redaction" meta bar; replace with a single quiet line: tag + year.
- Keep tape corner + hard shadow (that's the site's own language now, not MSCHF-specific).

### 7. Kept intentionally
- Grid-paper backgrounds, tape corners, hard shadows, Archivo/mono type — these now belong to the site, not MSCHF.
- Konami easter egg + audio system.
- Admin, Auth, SEO hooks.

## Open question flagged
Removing Guest Book also removes the only public contact/sponsorship path. If you want a replacement (simple mailto, or a lighter "Get in touch" card), say so and I'll add it in build mode; otherwise I'll ship without it.