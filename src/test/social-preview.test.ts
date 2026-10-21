import { describe, expect, it } from "vitest";
import { bundledPublicProjects } from "@/data/public-projects";
import { homepageSocial, projectSocial, socialHead, SITE_URL } from "@/lib/social-preview";
import { slugFor } from "@/lib/slug";

describe("shared project identity", () => {
  it.each(bundledPublicProjects)("keeps $title attributed to its own shared URL", project => {
    const social = projectSocial(project);
    expect(social.canonical).toBe(`${SITE_URL}/drops/${slugFor(project)}`);
    expect(new URL(social.image).protocol).toBe("https:");
    expect(social.image).not.toBe(homepageSocial.image);
    const head = socialHead(social, social.canonical);
    const document = new DOMParser().parseFromString(head, "text/html");
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(social.canonical);
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(social.image);
  });
  it("assigns distinct preview images to all fourteen current projects", () => {
    const images = bundledPublicProjects.map(p => projectSocial(p).image);
    expect(new Set(images).size).toBe(14);
  });
  it("escapes metadata without allowing injected elements", () => {
    const head = socialHead({ ...homepageSocial, title: '"><script>alert(1)</script>' }, `${SITE_URL}/`);
    const document = new DOMParser().parseFromString(head, "text/html");
    expect(document.querySelector("script")).toBeNull();
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe('"><script>alert(1)</script>');
  });
});