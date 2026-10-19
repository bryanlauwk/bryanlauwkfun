import { useEffect, useMemo } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";
import { categories, readCategory, categoryParam, projectPresentation, type StudioCategory } from "@/lib/studio-projects";
import { projectDestination } from "@/lib/project-destination";
import { StudioProjectImage } from "@/components/StudioProjectCard";
import { WHATSAPP } from "@/components/StudioChrome";
import heroWorkshop from "@/assets/scrapbook/hero-workshop.jpg";
import expDurianDash from "@/assets/scrapbook/exp-durian-dash.jpg";
import expDuri from "@/assets/scrapbook/exp-duri.jpg";
import expOriginals from "@/assets/scrapbook/exp-originals.jpg";
import expMiniature from "@/assets/scrapbook/exp-miniature.jpg";
import expOther from "@/assets/scrapbook/exp-other.jpg";
import aboutPortrait from "@/assets/scrapbook/about-portrait.jpg";
import couldRobots from "@/assets/scrapbook/could-robots.jpg";
import couldClickers from "@/assets/scrapbook/could-clickers.jpg";
import couldMiniature from "@/assets/scrapbook/could-miniature.jpg";
import couldObjects from "@/assets/scrapbook/could-objects.jpg";
import couldDigital from "@/assets/scrapbook/could-digital.jpg";
import couldWeird from "@/assets/scrapbook/could-weird.jpg";
import footerLineup from "@/assets/scrapbook/footer-lineup.jpg";
import "@/styles/scrapbook.css";

const experiments = [
  { img: expDurianDash, title: "Durian Dash KL", kind: "Web game", cap: "A small game for a big durian adventure.", alt: "Durian Dash KL browser game start screen" },
  { img: expDuri, title: "DURI", kind: "Interactive robot", cap: "A little robot with a clear jacket.", alt: "DURI, a small robot with a transparent dome head" },
  { img: expOriginals, title: "Little Originals", kind: "Kids artwork · Merch", cap: "Turn kids' drawings into real-world creations.", alt: "Children's monster drawings turned into keychains and pins" },
  { img: expMiniature, title: "Miniature Worlds", kind: "Physical diorama", cap: "Small things. Bigger stories.", alt: "A miniature illuminated street shop diorama" },
  { img: expOther, title: "Other Experiments", kind: "Web · Physical · Ideas", cap: "Play, build, iterate, repeat.", alt: "A desk with sketches, a laptop and a game controller" },
];

const couldExist = [
  { img: couldRobots, label: "Interactive Robots", alt: "A small clear-domed robot on a tree stump" },
  { img: couldClickers, label: "Mechanical Clickers", alt: "A chunky mechanical clicker device with buttons" },
  { img: couldMiniature, label: "Miniature Worlds", alt: "A tiny illuminated shopfront with trees" },
  { img: couldObjects, label: "Collectibles & Objects", alt: "A shelf of small collectible objects and charms" },
  { img: couldDigital, label: "Digital Experiences", alt: "A handheld screen running a colourful game" },
  { img: couldWeird, label: "Weird Things", alt: "A paint-splattered sneaker built into a tiny world" },
];

const behindTheMaking = [
  { src: "/concepts/03-on-paper.jpg", alt: "Sketchbook exploring a traffic-cone character" },
  { src: "/concepts/05-cabinet-of-curiosities.jpg", alt: "A display case of miniature objects and characters" },
  { src: "/concepts/01-curious-company.jpg", alt: "A smiling character and an orange traffic cone on a stool" },
];

export default function StudioPreview() {
  useSEO({
    title: "881230.studio — Curiosity, made into things by Bryan Lau",
    description: "Curiosity, made into things. Weird objects, tiny worlds and digital experiences by Bryan Lau Wai Kit.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  const { data, isLoading, isError, isFetching, refetch } = usePublicProjects();
  const projects = data ?? [];
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cat = readCategory(params.get("category"));
  const list = useMemo(() => projects.filter(p => cat === "All" || projectPresentation(p).category === cat), [projects, cat]);

  useEffect(() => {
    const id = location.hash === "#browser-work" ? "work" : location.hash.slice(1);
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
    <div className="scrap min-h-screen">
      <a className="studio-skip" href="#main-content">Skip to main content</a>
      <header className="scrap-top scrap-wrap">
        <a className="scrap-logo" href="/" aria-label="881230.studio — home">881230.studio</a>
        <nav aria-label="Main navigation">
          <a href="#experiments">Experiments</a>
          <a href="#work">Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="scrap-smile" aria-hidden="true">☺</span>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="scrap-hero scrap-wrap" aria-labelledby="hero-title">
          <div>
            <h1 id="hero-title" className="scrap-title">881230<span className="dot">.</span><br />studio</h1>
            <p className="scrap-tagline">Curiosity,<br />made into things.</p>
            <p className="scrap-bio">I'm Bryan. I make weird objects, tiny worlds, and digital experiences. Sometimes useful. Mostly curious.</p>
            <div className="scrap-cta-row">
              <a className="scrap-btn" href="#work">See my works →</a>
              <a className="scrap-scroll" href="#experiments">or scroll down ↓</a>
            </div>
          </div>
          <div className="scrap-hero-photo">
            <span className="scrap-note scrap-note--text" aria-hidden="true">MAKE<br />PLAY<br />EXPERIMENT<br />REPEAT.</span>
            <img src={heroWorkshop} alt="Bryan soldering a small clear-domed robot at a cluttered workbench" width={694} height={445} fetchPriority="high" />
            <span className="scrap-note scrap-note--yellow" aria-hidden="true">SMALL THINGS<br />BIGGER IDEAS ☺</span>
          </div>
        </section>

        <section id="experiments" className="scrap-section scrap-wrap" aria-labelledby="exp-heading">
          <div className="scrap-head-row">
            <div>
              <h2 id="exp-heading" className="scrap-h2">Selected<br /><span className="u">Experiments</span></h2>
              <p className="scrap-sub">A mix of physical objects, web experiments, miniature worlds and random ideas.</p>
            </div>
            <a className="scrap-viewall" href="#work">View all works →</a>
          </div>
          <div className="scrap-exp-grid">
            {experiments.map(e => (
              <article key={e.title} className="scrap-exp">
                <span className="scrap-tape" aria-hidden="true" />
                <img src={e.img} alt={e.alt} width={420} height={420} loading="lazy" decoding="async" />
                <h3>{e.title}</h3>
                <p className="kind">{e.kind}</p>
                <p className="cap">{e.cap}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="scrap-section scrap-wrap" aria-labelledby="work-heading">
          <div className="scrap-head-row">
            <h2 id="work-heading" className="scrap-h2">All <span className="u">works</span></h2>
            <span className="scrap-count" role="status" aria-live="polite">{isLoading ? "Loading…" : `${list.length} project${list.length === 1 ? "" : "s"}`}</span>
          </div>
          <div className="scrap-tabs" role="group" aria-label="Filter projects">
            {categories.map(c => <button key={c} type="button" aria-pressed={cat === c} aria-controls="project-grid" onClick={() => selectCategory(c)}>{c}</button>)}
          </div>
          {isError && <div className="scrap-notice" role="status">Showing the saved collection while the latest work is unavailable. <button disabled={isFetching} onClick={() => void refetch()}>{isFetching ? "Refreshing…" : "Refresh"}</button></div>}
          <div id="project-grid" className="scrap-grid" aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => <div key={i} aria-hidden="true"><div style={{ aspectRatio: "16/10", background: "#e9e2d2" }} /><div style={{ width: "70%", height: 20, marginTop: 12, background: "#e9e2d2" }} /></div>)
              : list.map(p => <ScrapProjectCard key={p.id} project={p} />)}
          </div>
          {!isLoading && !list.length && <div className="scrap-empty"><p>{projects.length ? "Nothing in this category yet." : "New work is on the way."}</p>{cat !== "All" && <button className="scrap-btn" onClick={() => selectCategory("All")}>Show all projects</button>}</div>}
        </section>

        <section className="scrap-section scrap-wrap" aria-labelledby="making-heading">
          <span className="scrap-note scrap-note--pink" aria-hidden="true">BEHIND<br />THE MAKING</span>
          <h2 id="making-heading" className="sr-only">Behind the making</h2>
          <p className="scrap-sub">Sketches, prototypes, failed attempts and things in progress.</p>
          <div className="scrap-collage" style={{ marginTop: 24 }}>
            {behindTheMaking.map(b => (
              <figure key={b.src}>
                <img src={b.src} alt={b.alt} width={504} height={504} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>

        <section className="scrap-section scrap-wrap" aria-labelledby="could-heading">
          <h2 id="could-heading" className="scrap-h2">Things that<br /><span className="u">could exist.</span></h2>
          <p className="scrap-sub">Visual experiments, imaginary objects, and ideas from 881230.studio. Some are real. Some are experiments. Some probably shouldn't exist.</p>
          <div className="scrap-could" style={{ marginTop: 26 }}>
            {couldExist.map(c => (
              <figure key={c.label}>
                <img src={c.img} alt={c.alt} width={240} height={316} loading="lazy" decoding="async" />
                <figcaption>{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="about" className="scrap-section scrap-wrap scrap-about" aria-labelledby="about-heading">
          <div className="scrap-about-photo">
            <img src={aboutPortrait} alt="Bryan Lau Wai Kit holding a tiny robot up to his eye" width={420} height={330} loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 id="about-heading" className="scrap-h2">A bit<br /><span className="u">about me</span></h2>
            <p className="scrap-about-lines">
              <span>Engineer by education.</span>
              <span>Marketer by profession.</span>
              <span>Maker by curiosity.</span>
            </p>
            <p className="scrap-about-text">I enjoy turning ideas into things — whether it's a physical object, a digital experience, a miniature world, or just a weird experiment that makes people smile.</p>
            <div className="scrap-pills" aria-label="Areas of work">
              {["Ideas", "Hardware", "Web", "Miniatures", "Games", "Creative marketing"].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="scrap-cta" aria-labelledby="contact-heading">
        <div className="scrap-cta-in">
          <div>
            <h2 id="contact-heading">Have a weird idea?<br /><em>Good.</em></h2>
            <p>Let's make something interesting.</p>
            <a className="scrap-btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Say hello →<span className="sr-only"> (opens WhatsApp in a new tab)</span></a>
            <div className="scrap-socials" style={{ marginTop: 26 }}>
              <a href="mailto:bryanlauwk@gmail.com">Email</a>
              <a href="https://linkedin.com/in/bryanlauwk" target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
          <img className="scrap-cta-lineup" src={footerLineup} alt="A lineup of 881230.studio creations: robot, miniature shop, game screen and sneaker world" width={500} height={140} loading="lazy" decoding="async" />
        </div>
        <div className="scrap-wrap scrap-foot">
          <a href="/">881230.studio · by Bryan Lau Wai Kit</a>
          <span>Made in Kuala Lumpur</span>
          <a href="#experiments">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

function ScrapProjectCard({ project }: { project: import("@/hooks/useProjects").Project }) {
  const destination = projectDestination(project.href);
  const { category, summary, action } = projectPresentation(project);
  const content = <>
    <div className="frame"><StudioProjectImage project={project} /></div>
    <h3>{project.title}</h3>
    <p>{summary}</p>
    <p className="meta">{category}{destination ? ` · ${action} ↗` : " · In progress"}</p>
  </>;
  return destination
    ? <a href={destination} target="_blank" rel="noopener noreferrer" className="scrap-card" aria-label={`${action} ${project.title} (opens in a new tab)`}>{content}</a>
    : <article className="scrap-card">{content}</article>;
}
