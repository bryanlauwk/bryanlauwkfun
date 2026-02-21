

# Generate a Grunge + Terror Hero Background Image

## Approach

Use the existing `generate-background` edge function (updated with a new prompt) to generate a hero image that matches the grunge-inflected, absurdist terror aesthetic. The generated image gets uploaded to storage and referenced in the app.

## New Image Prompt

A dark, distressed background with these qualities:
- Grungy, industrial texture -- cracked concrete walls, peeling paint, rust stains
- Dark color palette: deep charcoal, muted crimson, desaturated teal
- Analog film grain and light leaks (matching existing 80s aesthetic)
- Subtle unsettling elements: faint scratches, dripping ink marks, barely-visible symbols
- Abstract enough to work as a background (no distinct focal subject competing with text)
- 16:9 aspect ratio, high resolution

This replaces the current `dark-fantasy-hero.jpg` with something grittier.

## Changes

### 1. Update Edge Function Prompt (`supabase/functions/generate-background/index.ts`)
- Change the image generation prompt from the octopus/portal illustration to the grunge-terror aesthetic described above
- Keep all existing upload-to-storage and error handling logic unchanged

### 2. Add a "Regenerate Background" Button in Admin (`src/pages/Admin.tsx`)
- Add a button that calls the `generate-background` edge function
- On success, save the returned image URL to a `site_settings` table (or similar) so the homepage can load it dynamically
- Show a preview of the generated image before confirming

### 3. Load Dynamic Background (`src/pages/Index.tsx`)
- Check for a stored background URL from the database
- Fall back to the existing `dark-fantasy-hero.jpg` if none is set
- This way you can regenerate until you get one you like

### Alternative: One-Time Generation
If you'd prefer a simpler approach -- generate once, download the result, and replace `dark-fantasy-hero.jpg` as a static asset -- we can skip the database/admin UI and just:
1. Call the edge function once
2. Save the best result as a static file in `src/assets/`
3. Done -- no runtime overhead

## Technical Notes
- Uses the existing `LOVABLE_API_KEY` (already configured)
- Uses `google/gemini-2.5-flash-image` model (already in the edge function)
- Storage bucket `backgrounds` is already referenced in the existing code
- No new dependencies needed

