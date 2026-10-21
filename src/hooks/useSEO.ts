import { useEffect } from "react";
import { homepageSocial, type SocialPreview } from "@/lib/social-preview";

type SEOOptions = {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  social?: SocialPreview;
};

function setMeta(selector: string, attr: string, value: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSEO({ title, description, canonical, noindex, social }: SEOOptions) {
  const socialTitle = social?.title ?? title;
  const socialDescription = social?.description ?? description;
  const image = social?.image ?? homepageSocial.image;
  const imageAlt = social?.imageAlt ?? homepageSocial.imageAlt;
  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });

    setMeta('link[rel="canonical"]', "href", canonical, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });

    setMeta('meta[property="og:title"]', "content", socialTitle, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    setMeta('meta[property="og:description"]', "content", socialDescription, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    });
    setMeta('meta[property="og:url"]', "content", canonical, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    });
    setMeta('meta[name="twitter:title"]', "content", socialTitle, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:title");
      return m;
    });
    setMeta('meta[name="twitter:description"]', "content", socialDescription, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:description");
      return m;
    });
    const sharedTags = [
      ["property", "og:image", image], ["property", "og:image:alt", imageAlt],
      ["property", "og:image:width", "1200"], ["property", "og:image:height", "630"],
      ["property", "og:type", "website"], ["property", "og:site_name", "881230.studio"],
      ["name", "twitter:card", "summary_large_image"], ["name", "twitter:image", image],
      ["name", "twitter:image:alt", imageAlt],
    ];
    for (const [attribute, key, content] of sharedTags) {
      setMeta(`meta[${attribute}="${key}"]`, "content", content, () => {
        const meta = document.createElement("meta");
        meta.setAttribute(attribute, key);
        return meta;
      });
    }
    // robots
    const robotsSelector = 'meta[name="robots"]';
    let robots = document.head.querySelector<HTMLMetaElement>(robotsSelector);
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex,nofollow");
    } else if (robots) {
      robots.parentElement?.removeChild(robots);
    }
  }, [title, description, canonical, noindex, socialTitle, socialDescription, image, imageAlt]);
}
