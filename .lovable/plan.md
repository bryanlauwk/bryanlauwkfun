

# UI Improvements for Project Cards ("Drops")

Three improvements to make the project cards more polished and inviting.

---

## 1. Gold audience tag on each card

Inspired by the uploaded reference image (the gold "Oscar Nominee" label), each card will display a gold-bordered tag at the top indicating the target audience (e.g., "Gamers", "Foodies", "Data Nerds").

**Database change**: Add a `tag` column to the `projects` table (nullable text, default null). This allows setting tags per project via the admin panel.

```sql
ALTER TABLE public.projects ADD COLUMN tag text DEFAULT NULL;
```

**Card UI**: In `StrangerThingsCard.tsx`, render the tag (when present) as a small gold-bordered label in the card header, styled like the reference image:
- Gold border with subtle gold text
- Uppercase, small mono font, tracking-wide
- Positioned in the header bar next to "Drop #01"

**Admin panel**: Add a "Tag" text input to the project create/edit form so you can set labels like "Gamers", "Foodies", "Data", "Music Lovers", etc.

---

## 2. More visible card borders

Currently the card border is very subtle (`border-border`). Improve the default (non-hovered) state to be more inviting:

- Change default border from `border-border` to `border-border/60` with a subtle `ring-1 ring-primary/10` glow
- Add a faint gradient shimmer along the top edge of the card (a 2px line using `bg-gradient-to-r from-transparent via-primary/20 to-transparent`)
- This signals interactivity without being aggressive

---

## 3. Varied CTAs instead of repeating "Check it out"

Replace the identical "Check it out" on every card with varied, contextual CTAs that rotate based on the card index:

```typescript
const CTA_VARIANTS = [
  "Explore",
  "Dive in",
  "Take a look",
  "See more",
  "Open it up",
];
```

Each card picks its CTA based on `index % CTA_VARIANTS.length`, so adjacent cards always show different text. This keeps the section feeling dynamic rather than copy-pasted.

---

## Summary of file changes

| File | Change |
|------|--------|
| Migration SQL | Add `tag` column to `projects` table |
| `src/components/StrangerThingsCard.tsx` | Gold tag label, improved borders, varied CTAs |
| `src/pages/Admin.tsx` | Add "Tag" field to project form |
| `src/hooks/useProjects.ts` | Add `tag` to Project type and mutations |

## Technical notes

- The `tag` column is nullable so existing projects without tags render fine (no tag shown)
- The `types.ts` file will auto-update after the migration runs
- The gold label styling uses Tailwind utilities: `border border-amber-500/60 text-amber-400 bg-amber-500/10`
- No new dependencies required

