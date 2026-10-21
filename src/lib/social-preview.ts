import homeAsset from "../assets/social/home.jpg.asset.json";
import projectAssets from "../assets/social/projects.json";
import { catalogue } from "../data/public-projects";
import { slugFor } from "./slug";

export const SITE_URL = "https://www.bryanlauwk.fun";
export type SocialPreview = { title: string; description: string; image: string; imageAlt: string };
export const homepageSocial: SocialPreview = {
  title: "881230.studio — Curiosity, made into things",
  description: "Weird objects. Tiny worlds. Playable ideas. Explore the creative playground of Bryan Lau Wai Kit. Sometimes useful. Mostly curious.",
  image: `${SITE_URL}${homeAsset.url}`,
  imageAlt: "881230.studio — Bryan making a tabletop robot, with Curiosity, made into things",
};

export function projectSocial(project: { id: string; title: string; description?: string | null; image_url?: string | null }) {
  const assets: Record<string, { url: string }> = projectAssets;
  const asset = assets[project.title];
  const saved = catalogue.find(([title]) => title === project.title);
  let image = homepageSocial.image;
  if (asset) image = `${SITE_URL}${asset.url}`;
  else if (project.image_url?.startsWith("https://")) image = project.image_url;
  return {
    title: `${project.title} — 881230.studio`,
    description: saved?.[3] ?? project.description ?? "A curious experiment by Bryan Lau Wai Kit. Open it and see what happens.",
    image,
    imageAlt: asset || image !== homepageSocial.image ? `${project.title} — project preview` : homepageSocial.imageAlt,
    canonical: `${SITE_URL}/drops/${slugFor(project)}`,
  };
}

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Static metadata is required for social crawlers, which do not run React. */
export function socialHead(preview: SocialPreview, canonical: string) {
  const value = (input: string) => escape(input);
  return `<meta property="og:type" content="website">
<meta property="og:site_name" content="881230.studio">
<meta property="og:url" content="${value(canonical)}">
<meta property="og:title" content="${value(preview.title)}">
<meta property="og:description" content="${value(preview.description)}">
<meta property="og:image" content="${value(preview.image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${value(preview.imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${value(preview.title)}">
<meta name="twitter:description" content="${value(preview.description)}">
<meta name="twitter:image" content="${value(preview.image)}">
<meta name="twitter:image:alt" content="${value(preview.imageAlt)}">`;
}