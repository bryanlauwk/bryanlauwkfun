import { useEffect, useMemo } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";
import { categories, readCategory, categoryParam, projectPresentation, type StudioCategory } from "@/lib/studio-projects";
import { projectDestination } from "@/lib/project-destination";
import { StudioHeader, StudioFooter, WHATSAPP } from "@/components/StudioChrome";
import StudioProjectCard, { StudioProjectImage } from "@/components/StudioProjectCard";
import portrait from "@/assets/hero-portrait-photo.png";
import ConceptGallery from "@/components/ConceptGallery";

export default function StudioPreview() {
  useSEO({
    title: "881230.studio — Curiosity, made into things by Bryan Lau",
    description: "Curiosity, made into things. Creative marketer, designer and maker of playable things — art, design, games and objects by Bryan Lau Wai Kit.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  const { data, isLoading, isError, isFetching, refetch } = usePublicProjects();
  const projects = data ?? [];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cat = readCategory(params.get("category"));
  const list = useMemo(() => projects.filter(p => cat === "All" || projectPresentation(p).category === cat), [projects, cat]);
  const featured = projects.find(p => { try { return new URL(p.href).hostname === "kldex.bryanlauwk.fun"; } catch { return false; } });
  const featuredHref = projectDestination(featured?.href);

  // Preserve links shared before the studio redesign.
  useEffect(() => {
    const id = location.hash === "#browser-work" ? "work" : location.hash === "#featured" ? "featured-project" : location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [location.hash, isLoading]);

  const selectCategory = (category: StudioCategory) => {
    const next = new URLSearchParams(params);
    if (category === "All") next.delete("category"); else next.set("category", categoryParam(category));
    navigate({ search: next.toString(), hash: "#work" }, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="studio min-h-screen"><div className="studio-wrap">
      <StudioHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="studio-mast"><h1>881230.studio</h1><p>by Bryan Lau Wai Kit</p></div>
        <section className="studio-hero" aria-labelledby="studio-intro">
          <div>
            <h2 id="studio-intro">Curiosity,<br />made into<br />things.</h2>
            <p className="studio-role">Creative marketer. Designer. Maker of things.</p>
            <p className="studio-lede">I’m Bryan, based in Kuala Lumpur. I turn curious ideas into games, web experiences, and objects you can hold.</p>
            <a href="#work" className="studio-link">Explore selected work ↘</a>
          </div>
          <figure className="studio-hero-portrait">
            <img src={portrait} alt="Bryan Lau Wai Kit, the person behind 881230.studio" width={1024} height={1024} />
            <figcaption>The person behind the experiments. Bryan Lau Wai Kit.</figcaption>
          </figure>
        </section>

        <section id="featured-project" className="studio-featured" aria-labelledby="featured-heading">
          <div className="studio-featured-copy">
            <p className="studio-eyebrow">Start here · a playable project</p>
            <h2 id="featured-heading">A very Malaysian<br />obstacle course.</h2>
            <p>A browser runner made for the KL Durian Experience Centre. Dodge giant durians and see how far you get.</p>
            <p className="studio-contribution">Game concept &amp; interactive experience</p>
            {featured && featuredHref ? <a className="studio-button" href={featuredHref} target="_blank" rel="noopener noreferrer">Play Giant Durian Run ↗<span className="sr-only"> (opens in a new tab)</span></a> : <a className="studio-link" href="#work">Explore the collection ↘</a>}
          </div>
          {featured ? <a className="studio-featured-image" href={featuredHref ?? "#work"} target={featuredHref ? "_blank" : undefined} rel={featuredHref ? "noopener noreferrer" : undefined} aria-label="Open Giant Durian Run (opens in a new tab)"><StudioProjectImage project={featured} eager /></a> : <div className="studio-feature-placeholder"><span>GIANT<br />DURIAN RUN</span></div>}
        </section>

        <section id="work" className="studio-section" aria-labelledby="work-heading">
          <div className="studio-head"><h2 id="work-heading">Selected work</h2><span role="status" aria-live="polite">{isLoading ? "Loading projects…" : `${list.length} project${list.length === 1 ? "" : "s"}`}</span></div>
          <p className="studio-work-note">Pick something that makes you curious. Projects open in a new tab.</p>
          <div className="studio-tabs" role="group" aria-label="Filter projects">
            {categories.map(c => <button key={c} type="button" aria-pressed={cat === c} aria-controls="project-grid" onClick={() => selectCategory(c)}>{c}</button>)}
          </div>
          {isError && <div className="studio-notice" role="status">Showing the saved collection while the latest work is unavailable. <button disabled={isFetching} onClick={() => void refetch()}>{isFetching ? "Refreshing…" : "Refresh"}</button></div>}
          <div id="project-grid" className="studio-grid" aria-busy={isLoading}>
            {isLoading ? Array.from({ length: 4 }, (_, i) => <div className="studio-skeleton" key={i} aria-hidden="true"><div /><span /></div>) : list.map((p, i) => <StudioProjectCard key={p.id} project={p} index={i} />)}
          </div>
          {!isLoading && !list.length && <div className="studio-empty"><p>{projects.length ? "Nothing in this category yet." : "New work is on the way."}</p>{cat !== "All" && <button className="studio-button" onClick={() => selectCategory("All")}>Show all projects</button>}</div>}
        </section>

        <section id="about" className="studio-about" aria-labelledby="about-heading">
          <span>The person behind<br />the studio</span>
          <div><h2 id="about-heading">I follow ideas to see where they take me.</h2><p>I’m Bryan, a creative marketer with a mechatronics background. I bring together design, technology, and a habit of making things just to see what happens.</p><p>Sometimes that becomes a game. Sometimes an object. Sometimes another question.</p><a className="studio-link" href="https://linkedin.com/in/bryanlauwk" target="_blank" rel="noopener noreferrer">More about my work ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
        </section>
        <ConceptGallery />
        <section id="contact" className="studio-cta" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Have something curious in mind?<br /><em>Let’s make it.</em></h2>
          <p>Games, interactive experiences, or an unusual object. Tell me what you’re thinking.</p>
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
