// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
// Fetches visible drops from Supabase so per-drop URLs are indexed.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.bryanlauwk.fun";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface Entry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

async function fetchDrops(): Promise<Entry[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("[sitemap] Supabase env not set — skipping drop URLs.");
    return [];
  }
  const url = `${SUPABASE_URL}/rest/v1/projects?select=id,title,updated_at&is_visible=eq.true&order=display_order.asc`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    console.warn(`[sitemap] Supabase fetch failed (${res.status}) — skipping drop URLs.`);
    return [];
  }
  const rows = (await res.json()) as Array<{ id: string; title: string; updated_at: string }>;
  return rows.map((r) => {
    const s = slugify(r.title);
    const slug = s.length > 0 ? s : `drop-${r.id.slice(0, 8)}`;
    return {
      loc: `${BASE_URL}/drops/${slug}`,
      lastmod: r.updated_at?.slice(0, 10),
      changefreq: "monthly",
      priority: "0.8",
    };
  });
}

function render(entries: Entry[]): string {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${e.loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

async function main() {
  const drops = await fetchDrops();
  const entries: Entry[] = [
    { loc: `${BASE_URL}/`, changefreq: "weekly", priority: "1.0" },
    ...drops,
  ];
  writeFileSync(resolve("public/sitemap.xml"), render(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
}

main().catch((err) => {
  console.error("[sitemap] generation failed:", err);
  process.exit(0); // don't block dev/build on sitemap failure
});
