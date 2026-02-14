

# Ad Space Placeholders + Optional Logo Upload

Show 3 default "ad placeholder" slots in the sponsor strip so visitors see available ad space even before any real sponsors exist. Also make the logo upload optional so placeholder sponsors can use a text-based fallback.

---

## 1. Database: Make `logo_url` nullable

The `logo_url` column is currently `NOT NULL`. Change it to nullable so sponsors can be created without a logo image (they'll show a styled text placeholder instead).

```sql
ALTER TABLE public.sponsors ALTER COLUMN logo_url DROP NOT NULL;
```

## 2. Seed 3 default ad-space placeholders

Insert 3 placeholder sponsors into the database that act as "ad available" previews:

```sql
INSERT INTO public.sponsors (name, logo_url, website_url, display_order, is_visible)
VALUES
  ('Your Brand Here', NULL, NULL, 0, true),
  ('Ad Space Available', NULL, NULL, 1, true),
  ('Sponsor This Project', NULL, NULL, 2, true);
```

These show up immediately on the homepage as styled placeholder slots.

## 3. Update `SponsorStrip.tsx` -- placeholder rendering

When a sponsor has no `logo_url`, render a stylish placeholder card instead of an image:

- A dashed-border box with the sponsor name displayed as text (e.g., "Your Brand Here")
- Styled to match the atmospheric aesthetic: muted text, subtle border, same grayscale/blend treatment
- On hover: border brightens slightly, text becomes more visible
- Optionally show a small "Inquire" or envelope icon to signal it's available ad space
- A subtle "Ad Space" label beneath

This makes it clear to visitors: "this is where your brand could be."

## 4. Update `Admin.tsx` -- make logo optional

- Change the "Logo *" label to just "Logo (optional)"
- Remove the validation that blocks submission when no logo is provided
- When no logo is uploaded and none exists, pass `null` for `logo_url`
- The form still works the same for real sponsors who upload logos

## 5. Update `useSponsors.ts` -- type alignment

Update the `Sponsor` interface so `logo_url` is `string | null` to match the new nullable column.

---

## Summary of changes

| File | Change |
|------|--------|
| Migration SQL | Make `logo_url` nullable + seed 3 placeholder sponsors |
| `src/hooks/useSponsors.ts` | Update `logo_url` type to `string \| null` |
| `src/components/SponsorStrip.tsx` | Render placeholder card when no logo exists |
| `src/pages/Admin.tsx` | Remove logo-required validation, update label |

## Technical notes

- Placeholder styling: `border border-dashed border-muted-foreground/20 text-muted-foreground/40` with hover brightening
- The 3 seeded placeholders can be edited or replaced by the admin at any time via the dashboard
- Real sponsors with uploaded logos render exactly as before (image with grayscale blend)
- No new dependencies needed

