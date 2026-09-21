// Read-only check of the public catalogue and its experiment destinations.
// Does not submit forms, invoke experiments, or modify project records.
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/integrations/supabase/safe-client.ts", import.meta.url), "utf8");
const url = process.env.VITE_SUPABASE_URL ?? source.match(/const FALLBACK_URL = "([^"]+)"/)?.[1];
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? source.match(/const FALLBACK_KEY = "([^"]+)"/)?.[1];
if (!url || !key) throw new Error("Public catalogue configuration is missing.");
const response = await fetch(url + "/rest/v1/projects?select=id,title,href,tag,image_url&is_visible=eq.true&order=display_order.asc", {
  headers: { apikey: key, Authorization: "Bearer " + key }, signal: AbortSignal.timeout(15000),
});
if (!response.ok) throw new Error("Catalogue HTTP " + response.status);
const projects = await response.json();
const results = [];
for (let i = 0; i < projects.length; i += 4) {
  results.push(...await Promise.all(projects.slice(i, i + 4).map(async project => {
    const result = { title: project.title, href: project.href, tag: project.tag, hasPreview: Boolean(project.image_url) };
    try {
      const target = new URL(project.href);
      if (!["https:", "http:"].includes(target.protocol)) throw new Error("Not a web URL");
      let page = await fetch(target, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12000) });
      if (page.status === 405) page = await fetch(target, { signal: AbortSignal.timeout(12000) });
      return { ...result, status: page.status, destination: page.url };
    } catch (error) {
      return { ...result, error: error.message };
    }
  })));
}
console.log(JSON.stringify(results, null, 2));
