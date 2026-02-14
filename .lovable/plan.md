

# Sponsor Brand Logos — Admin-Managed, Background-Blended

Add a "Sponsors" strip to the homepage where brand logos float subtly in the background, blending with the dark fantasy aesthetic. Admins can fully manage these logos from the dashboard.

---

## How It Works

Logos appear in a horizontal strip (between Drops and Guest Book, or below the hero), rendered at low opacity with a grayscale + blend-mode treatment so they feel like part of the atmosphere rather than intrusive ads. On hover, they gently reveal in full color.

---

## 1. Database: New `sponsors` table

Create a new table to store sponsor data:

```text
sponsors
  - id (uuid, PK)
  - name (text, not null)
  - logo_url (text, not null) — URL from storage bucket
  - website_url (text, nullable) — optional link
  - display_order (integer, default 0)
  - is_visible (boolean, default true)
  - created_at (timestamptz)
  - updated_at (timestamptz)
```

RLS policies:
- SELECT: anyone can view visible sponsors (public)
- INSERT/UPDATE/DELETE: admin only (using existing `has_role` function)

Also create a `sponsor-logos` storage bucket (public) for logo uploads.

## 2. New component: `SponsorStrip.tsx`

A horizontal row of logos styled to blend into the background:

- Logos rendered at ~20-30% opacity, grayscale filter, with `mix-blend-mode: luminosity`
- On hover: opacity rises to 70%, grayscale drops, subtle glow appears
- Wrapped in optional `<a>` tags if a website URL exists
- Section header: a subtle "Supported by" label in mono font, matching the existing divider style
- Responsive: horizontal scroll on mobile, centered grid on desktop

Placement in `Index.tsx`: between the Drops section and the Guest Book section.

## 3. Data hooks: `useSponsors.ts`

Following the existing `useProjects.ts` pattern:

- `usePublicSponsors()` — fetches visible sponsors ordered by display_order
- `useAdminSponsors()` — fetches all sponsors (admin)
- `useCreateSponsor()` / `useUpdateSponsor()` / `useDeleteSponsor()` — mutations
- `uploadSponsorLogo(file)` — uploads to `sponsor-logos` bucket with same validation pattern as project images

## 4. Admin panel: New "Sponsors" tab

Add a third tab to the Admin dashboard alongside "Projects" and "Guest Book":

- List of sponsors with drag-to-reorder (same pattern as projects)
- Create/edit dialog with fields: Name, Logo (file upload), Website URL, Visible toggle
- Logo preview thumbnail in the list
- Delete with confirmation

## 5. Integration in `Index.tsx`

Add the `SponsorStrip` component between the Drops and Guest Book sections:

```text
  Drops
  ──────────
  [Project Cards]

  Supported by
  ──────────
  [Logo] [Logo] [Logo] [Logo]

  Guest Book
  ──────────
```

---

## Summary of changes

| Item | Details |
|------|---------|
| Migration SQL | Create `sponsors` table + RLS + `sponsor-logos` bucket |
| `src/hooks/useSponsors.ts` | CRUD hooks + logo upload |
| `src/components/SponsorStrip.tsx` | Public-facing blended logo strip |
| `src/pages/Admin.tsx` | New "Sponsors" tab with full CRUD |
| `src/pages/Index.tsx` | Add SponsorStrip between Drops and Guest Book |

## Technical notes

- Logo blending uses CSS: `opacity-25 grayscale hover:opacity-70 hover:grayscale-0 mix-blend-luminosity transition-all duration-500`
- Storage bucket uses same validation pattern as project images (JPEG/PNG/GIF/WebP, 5MB max)
- The strip hides entirely if no visible sponsors exist (no empty state shown)
- Admin tab header updates to show sponsor count alongside project and guest book counts

