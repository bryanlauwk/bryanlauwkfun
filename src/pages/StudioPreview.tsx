import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";
import { categories, readCategory, categoryParam, projectPresentation, type StudioCategory } from "@/lib/studio-projects";
import { StudioHeader, StudioFooter, WHATSAPP } from "@/components/StudioChrome";
import StudioProjectCard from "@/components/StudioProjectCard";
import portrait from "@/assets/hero-portrait-photo.png";
import studioHero from "@/assets/studio-workbench.jpg";
import StudioMaking from "@/components/StudioMaking";
import ConceptGallery from "@/components/ConceptGallery";

export default function StudioPreview() {
  useSEO({
    title: "881230.studio — Curiosity, made into things by Bryan Lau",
    description: "Curiosity, made into things. Creative marketer, designer and maker of playable things — art, design, games and objects by Bryan Lau Wai Kit.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  const { data, isLoading, isError, isFetching, refetch } = usePublicProjects();
  const projects = useMemo(() => data ?? [], [data]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cat = readCategory(params.get("category"));
  const [expanded, setExpanded] = useState(false);
  const list = useMemo(() => {
    const priority = ["kldex.bryanlauwk.fun", "littleoriginal.bryanlauwk.fun", "artoy.bryanlauwk.fun", "typeadisaster.bryanlauwk.fun"];
    const rank = (href: string) => { try { const i = priority.indexOf(new URL(href).hostname); return i < 0 ? priority.length : i; } catch { return priority.length; } };
    return projects.filter(p => cat === "All" || projectPresentation(p).category === cat).sort((a, b) => rank(a.href) - rank(b.href));
  }, [projects, cat]);
  const visible = expanded || cat !== "All" ? list : list.slice(0, 6);


  // Preserve links shared before the studio redesign.
  useEffect(() => {
    const id = location.hash === "#browser-work" ? "work" : location.hash === "#featured" ? "work" : location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [location.hash, isLoading]);

  const selectCategory = (category: StudioCategory) => {
    setExpanded(false);
    const next = new URLSearchParams(params);
    if (category === "All") next.delete("category"); else next.set("category", categoryParam(category));
    navigate({ search: next.toString(), hash: "#work" }, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="studio studio-editorial min-h-screen"><div className="studio-wrap">
      <StudioHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="studio-mast"><h1>881230.studio</h1><p><span>by Bryan Lau Wai Kit</span><span>Kuala Lumpur, MY · Always curious ↙</span></p></div>
        <section className="studio-hero" aria-labelledby="studio-intro">
          <div>
            <p className="studio-eyebrow">Objects / tiny worlds / digital play</p>
            <h2 id="studio-intro">Curiosity,<br />made into<br />things.</h2>
            <p className="studio-role">Sometimes useful. Mostly curious.</p>
            <p className="studio-lede">I’m Bryan. I make playful objects, tiny worlds, and digital experiences. Built to be played with, poked at, and held.</p>
            <a href="#work" className="studio-link">Explore selected work ↘</a>
          </div>
          <figure className="studio-hero-image">
            <span className="studio-sticker" aria-hidden="true">What if?</span>
            <img src={studioHero} alt="Illustrated workbench with a transparent robot, durian character and open sketchbook" width={1536} height={1024} />
            <figcaption><span>An imagined day at the studio.</span><span>AI concept illustration</span></figcaption>
          </figure>
        </section>

        <section id="work" className="studio-section" aria-labelledby="work-heading">
          <div className="studio-head"><h2 id="work-heading"><sup>01 /</sup> Selected experiments</h2><span role="status" aria-live="polite">{isLoading ? "Loading projects…" : `${list.length} project${list.length === 1 ? "" : "s"}`}</span></div>
          <p className="studio-work-note">A few things that escaped the sketchbook. Each opens in a new tab.</p>
          <div className="studio-tabs" role="group" aria-label="Filter projects">
            {categories.map(c => <button key={c} type="button" aria-pressed={cat === c} aria-controls="project-grid" onClick={() => selectCategory(c)}>{c}</button>)}
          </div>
          {isError && <div className="studio-notice" role="status">Showing the saved collection while the latest work is unavailable. <button disabled={isFetching} onClick={() => void refetch()}>{isFetching ? "Refreshing…" : "Refresh"}</button></div>}
          <div id="project-grid" className="studio-grid" aria-busy={isLoading}>
            {isLoading ? Array.from({ length: 4 }, (_, i) => <div className="studio-skeleton" key={i} aria-hidden="true"><div /><span /></div>) : visible.map((p, i) => <StudioProjectCard key={p.id} project={p} index={i} />)}
          </div>
          {cat === "All" && list.length > 6 && <button className="studio-archive-toggle" aria-expanded={expanded} aria-controls="project-grid" onClick={() => setExpanded(!expanded)}>{expanded ? "A little less ↑" : `Explore all ${list.length} experiments ↗`}</button>}
          {!isLoading && !list.length && <div className="studio-empty"><p>{projects.length ? "Nothing in this category yet." : "New work is on the way."}</p>{cat !== "All" && <button className="studio-button" onClick={() => selectCategory("All")}>Show all projects</button>}</div>}
        </section>

        <StudioMaking />
        <ConceptGallery />
        <section id="about" className="studio-about" aria-labelledby="about-heading">
          <div className="studio-about-person">
            <span>04 / The person behind the experiments</span>
            <figure>
              <img src={portrait} alt="Bryan Lau Wai Kit, the person behind 881230.studio" width={1024} height={1024} loading="lazy" />
              <figcaption>Bryan Lau Wai Kit</figcaption>
            </figure>
          </div>
          <div><h2 id="about-heading">Engineer by education.<br />Marketer by profession.<br /><em>Maker by curiosity.</em></h2><p className="studio-about-roles">Creative marketer. Designer. Maker of things.</p><p>Mechatronics background. Marketer by profession. Translating curiosities into physical and digital forms.</p><a className="studio-link studio-about-link" href="https://linkedin.com/in/bryanlauwk" target="_blank" rel="noopener noreferrer">More about my work ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
        </section>
        <section id="contact" className="studio-cta" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Have a weird idea?<br /><em>Good.</em></h2>
          <p>Let’s make something interesting. Or interestingly unnecessary.</p>
          <div className="studio-contact-actions">
            <a className="studio-button" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗<span className="sr-only"> (opens in a new tab)</span></a>
            <a href="mailto:bryanlauwk@gmail.com">Email Bryan ↗</a>
            <a href="https://linkedin.com/in/bryanlauwk" target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <a className="studio-email" href="mailto:bryanlauwk@gmail.com">bryanlauwk@gmail.com</a>
        </section>
      </main>
      <StudioFooter />
    </div></div>
  );
}
