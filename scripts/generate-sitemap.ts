// Only index the canonical studio; /drops URLs now redirect externally.
import { writeFileSync } from "node:fs";
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.bryanlauwk.fun/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>
`);
console.log("sitemap.xml written (canonical studio)");
