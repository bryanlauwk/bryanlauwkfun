Implement the approved 'For the Curious' direction by replacing the legacy hero headline and removing stale 'dumb' / 'late nights' / 'wild ideas' references across the app.

Changes
1. Hero headline — `src/pages/Index.tsx`
   - Replace `I build dumb ideas. They keep working.` with:
     - Line 1: `For the curious.`
     - Line 2: `A stranger`
     - Line 3: `kind of`
     - Line 4: `internet.` (wrapped in `MarkerUnderline`)
   - Keep the 4-line uppercase display treatment and existing animation.

2. Hero stamp — `src/pages/Index.tsx`
   - Change `Certified dumb` to `Certified curious` so the collage sticker matches the new headline.

3. Dynamic SEO — `src/pages/Index.tsx` `useSEO`
   - Update title to: `Bryan Lau — For the curious`
   - Update description to remove any leftover legacy tone and reflect the new headline.

4. Static head & fallback shell — `index.html`
   - Update `<title>` from `Bryan Lau — Games, experiments and rabbit holes` to `Bryan Lau — For the curious`.
   - Rewrite `<meta name="description">`, `og:description`, and `twitter:description` to drop `Late nights, wild ideas` and align with the new headline.
   - Rewrite `og:title` / `twitter:title` to match the new title.
   - Rewrite static fallback `<h1>` from `Late Nights, / Wild Ideas` to `For the curious. / A stranger kind of internet.`
   - Rewrite static fallback `<p>` from `Experiments, games, and things that crawled out of late nights.` to copy that matches the new headline.
   - Update JSON-LD `description` if needed for consistency.

5. LLM context — `public/llms.txt`
   - Replace `Drops from Bryan Lau — ... Late nights, wild ideas.` with copy that reflects the new `For the curious` / `stranger kind of internet` voice.

No backend or route changes are required; this is a frontend copy refresh only.