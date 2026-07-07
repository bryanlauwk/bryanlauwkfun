// Runs after `vite build`. For each visible drop, writes
// dist/drops/<slug>/index.html with per-drop <title>, meta description,
// canonical, og:*, twitter:*, and JSON-LD baked into the static head so
// social crawlers (Facebook, LinkedIn, Slack, X, WhatsApp, Discord) see
// the right preview without executing JS. The SPA still hydrates for humans.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = "https://www.bryanlauwk.fun";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

const DIST = resolve("dist");
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const TWITTER_SITE = "@bryanlauwk";

interface Drop {
  id: string;
  title: string;
  description: string | null;
  tag: string | null;
}

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

function slugFor(d: Drop): string {
  const s = slugify(d.title);
  return s.length > 0 ? s : `drop-${d.id.slice(0, 8)}`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clampDescription(d: Drop): string {
  const raw =
    (d.description && d.description.trim()) ||
    `A small playable experiment from Bryan Lau — ${d.title}.`;
  // Meta description: keep under ~160 chars.
  return raw.length > 157 ? raw.slice(0, 157).trimEnd() + "…" : raw;
}

async function fetchDrops(): Promise<Drop[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("[prerender] Supabase env not set — skipping per-drop HTML.");
    return [];
  }
  const url =
    `${SUPABASE_URL}/rest/v1/projects` +
    `?select=id,title,description,tag&is_visible=eq.true&order=display_order.asc`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    console.warn(`[prerender] Supabase fetch failed (${res.status}) — skipping.`);
    return [];
  }
  return (await res.json()) as Drop[];
}

/**
 * Rewrite the sitewide head tags in the built index.html to per-drop values.
 * We replace by attribute match rather than regex-over-full-tag so the exact
 * whitespace and neighbouring tags in dist/index.html stay untouched.
 */
function renderDropHtml(template: string, drop: Drop): string {
  const slug = slugFor(drop);
  const canonical = `${BASE_URL}/drops/${slug}`;
  const title = `${drop.title} — Bryan Lau`;
  const description = clampDescription(drop);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: drop.title,
    description,
    url: canonical,
    author: { "@type": "Person", name: "Bryan Lau", url: BASE_URL },
    ...(drop.tag ? { keywords: drop.tag } : {}),
  };

  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${esc(title)}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${esc(description)}" />`,
  );

  // <link rel="canonical">
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <link rel="canonical" href="${canonical}" />\n  </head>`,
    );
  }

  // Open Graph
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="article" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
  );

  // Twitter
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  );
  if (!/twitter:card/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:site" content="${TWITTER_SITE}" />\n  </head>`,
    );
  }

  // Per-drop JSON-LD (append inside <head>)
  const ldTag = `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`;
  html = html.replace(/<\/head>/i, ldTag);

  return html;
}

/** Sanity check: after rewriting, the head must actually contain the new values. */
function verify(html: string, canonical: string, title: string): string[] {
  const errs: string[] = [];
  if (!html.includes(`<title>${esc(title)}</title>`)) errs.push("title not applied");
  if (!html.includes(`href="${canonical}"`)) errs.push("canonical not applied");
  if (!html.includes(`property="og:url" content="${canonical}"`))
    errs.push("og:url not applied");
  return errs;
}

/**
 * Bake a "drop not found" head into a standalone HTML file.
 * Used for `dist/drops/index.html` and `dist/drops/404.html` so crawlers that
 * land on a stale or unknown /drops/<slug> URL see a proper 404-style preview
 * (noindex, correct title, canonical, og:*/twitter:*) instead of the homepage.
 */
function renderNotFoundHtml(template: string, canonicalPath: string): string {
  const canonical = `${BASE_URL}${canonicalPath}`;
  const title = "Drop not found — Bryan Lau";
  const description =
    "This drop doesn't exist or has been retired. Browse the current collection of drops from Bryan Lau.";

  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${esc(description)}" />`,
  );

  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <link rel="canonical" href="${canonical}" />\n  </head>`,
    );
  }

  // Force noindex + prerender 404 hint
  if (/<meta\s+name="robots"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="noindex,follow" />`,
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="robots" content="noindex,follow" />\n    <meta name="prerender-status-code" content="404" />\n  </head>`,
    );
  }
  if (!/prerender-status-code/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="prerender-status-code" content="404" />\n  </head>`,
    );
  }

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="website" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${esc(title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  );
  if (!/twitter:card/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:site" content="${TWITTER_SITE}" />\n  </head>`,
    );
  }

  return html;
}

async function main() {
  if (!existsSync(DIST)) {
    console.warn(`[prerender] ${DIST} does not exist — did vite build run?`);
    return;
  }
  const templatePath = join(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.warn(`[prerender] ${templatePath} missing — skipping.`);
    return;
  }
  const template = readFileSync(templatePath, "utf8");
  const drops = await fetchDrops();

  // Always write the /drops/ 404 fallback, even when Supabase is unreachable.
  const dropsDir = join(DIST, "drops");
  mkdirSync(dropsDir, { recursive: true });
  const notFoundHtml = renderNotFoundHtml(template, "/drops/");
  writeFileSync(join(dropsDir, "index.html"), notFoundHtml);
  writeFileSync(join(dropsDir, "404.html"), notFoundHtml);
  console.log(`[prerender] wrote /drops/ 404-style fallback (index.html + 404.html).`);

  if (drops.length === 0) {
    console.log("[prerender] no drops found — only fallback written.");
    return;
  }

  let written = 0;
  const problems: string[] = [];
  for (const drop of drops) {
    const slug = slugFor(drop);
    const canonical = `${BASE_URL}/drops/${slug}`;
    const title = `${drop.title} — Bryan Lau`;
    const html = renderDropHtml(template, drop);
    const errs = verify(html, canonical, title);
    if (errs.length > 0) {
      problems.push(`  ${slug}: ${errs.join(", ")}`);
      continue;
    }
    const outDir = join(DIST, "drops", slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    written++;
  }
  console.log(`[prerender] wrote ${written} per-drop HTML file(s) under dist/drops/`);
  if (problems.length > 0) {
    console.warn(`[prerender] ${problems.length} drop(s) failed verification:`);
    for (const p of problems) console.warn(p);
  }
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(0); // don't block build on prerender failure
});
