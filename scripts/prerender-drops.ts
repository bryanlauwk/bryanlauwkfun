// Existing shared project URLs now open their destination directly, including
// when JavaScript is disabled. No legacy project page or homepage shell flash.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { bundledPublicProjects } from "../src/data/public-projects";
import { slugFor } from "../src/lib/slug";
import { projectDestination } from "../src/lib/project-destination";
import { projectSocial, socialHead } from "../src/lib/social-preview";

const SITE = "https://www.bryanlauwk.fun";
const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
async function main() {
  let projects = bundledPublicProjects;
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const response = await fetch(`${url}/rest/v1/projects?select=*&is_visible=eq.true&order=display_order.asc`, { headers: { apikey: key }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(String(response.status));
      projects = await response.json();
    } catch { console.warn("[redirects] Using saved public catalogue."); }
  }
  const base = readFileSync(resolve("dist/index.html"), "utf8");
  // Retain the built fonts/styles for the accessible fallback if a browser
  // blocks automatic redirection.
  const styles = (base.match(/<link[^>]+(?:stylesheet|icon)[^>]*>/g) ?? []).join("\n");
  for (const project of projects) {
    const href = projectDestination(project.href);
    if (!href || (new URL(href).origin === SITE && new URL(href).pathname.startsWith("/drops"))) continue;
    const title = esc(project.title);
    const destination = esc(href);
    const social = projectSocial(project);
    // No meta refresh: social crawlers must read this page rather than follow
    // a refresh to a different site's metadata. Browsers still launch directly.
    const launch = JSON.stringify(href).replace(/</g, "\\u003c");
    const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — 881230.studio</title><meta name="description" content="${esc(project.description ?? "")}"><link rel="canonical" href="${esc(social.canonical)}">${socialHead(social, social.canonical)}${styles}</head><body class="studio"><div class="studio-wrap"><main class="studio-state"><p class="studio-eyebrow">881230.studio</p><h1>Opening ${title}…</h1><a class="studio-button" href="${destination}">Open project ↗</a><a class="studio-link" href="/#work">Back to selected work</a></main></div><script>window.location.replace(${launch});</script></body></html>`;
    const dir = resolve("dist/drops", slugFor(project));
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "index.html"), html);
  }
  console.log(`[redirects] Prepared ${projects.length} shared project URLs.`);
}
main().catch(error => { console.error(error); process.exit(1); });
