import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";
import { bundledPublicProjects } from "@/data/public-projects";
import { previewSrcFor } from "@/lib/preview";
import { slugFor } from "@/lib/slug";
import workbench from "@/assets/studio-lab.jpg";
import portrait from "@/assets/hero-portrait-photo.png";
import ConceptGallery from "@/components/ConceptGallery";

type Cat = "All" | "Digital" | "Objects" | "Experiments";
const OBJECTS = ["Cartridge", "Artoy"];
const EXPERIMENTS = ["Boringg", "Inflation Chart", "Farm-direct platform", "马年新年歌排行榜"];
const catOf = (t: string): Exclude<Cat, "All"> =>
  OBJECTS.includes(t) ? "Objects" : EXPERIMENTS.includes(t) ? "Experiments" : "Digital";

export default function StudioPreview() {
  useSEO({
    title: "881230.studio — Curiosity, made into things by Bryan Lau",
    description: "Curiosity, made into things. Creative marketer, designer and maker of playable things — art, design, games and objects by Bryan Lau Wai Kit.",
    canonical: "https://www.bryanlauwk.fun/",
  });
  const { data } = usePublicProjects();
  const projects = data?.length ? data : bundledPublicProjects;
  const [cat, setCat] = useState<Cat>("All");
  const list = useMemo(
    () => projects.filter((p) => cat === "All" || catOf(p.title) === cat),
    [projects, cat]
  );

  return (
    <div className="studio min-h-screen">
      <main id="main-content" className="studio-wrap">

        <header className="studio-top">
          <span>Independent creative practice</span>
          <nav>
            <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="studio-mast">
          <h1>881230.studio</h1>
          <p>by Bryan Lau Wai Kit</p>
        </div>

        <section className="studio-hero">
          <div>
            <h2>Curiosity,<br />made into<br />things.</h2>
            <p className="studio-role">Creative marketer. Designer. Maker of things.</p>
            <p className="studio-lede">
              A practice spanning art, graphic design, product design, film and branding —
              exploring ideas through playful technology and things you can hold.
            </p>
            <a href="#work" className="studio-link">Explore selected work ↘</a>
          </div>
          <figure>
            <img src={workbench} alt="Clear robot prototype, durian character and cat toy on oak and white plinths with an open sketchbook" width={1264} height={848} />
            <figcaption>A few things on the workbench. More on the way.</figcaption>
          </figure>
        </section>

        <section id="work" className="studio-section">
          <div className="studio-head">
            <h3>Selected work</h3>
            <span>(01 — {String(list.length).padStart(2, "0")})</span>
          </div>
          <div className="studio-tabs" role="tablist">
            {(["All", "Digital", "Objects", "Experiments"] as Cat[]).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="studio-grid">
            {list.map((p, i) => {
              const src = previewSrcFor(p, { width: 1200 });
              return (
                <Link key={p.id} to={`/drops/${slugFor(p)}`} className="studio-card">
                  <div className="studio-img">{src && <img src={src} alt={`${p.title} preview`} loading="lazy" />}</div>
                  <div className="studio-meta">
                    <div>
                      <strong>{String(i + 1).padStart(2, "0")} / {p.title}</strong>
                      <p>{p.description?.split(/[—.]/)[0]}</p>
                    </div>
                    <span>{catOf(p.title)}{p.tag ? ` · ${p.tag}` : ""}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="about" className="studio-about">
          <span>The person behind<br />the studio</span>
          <figure className="studio-portrait">
            <img src={portrait} alt="Portrait of Bryan Lau Wai Kit" loading="lazy" />
            <figcaption>Bryan Lau Wai Kit</figcaption>
          </figure>
          <div>
            <h3>I follow ideas to see where they take me.</h3>
            <p>Sometimes that becomes a game. Sometimes an object. Sometimes another question.</p>
          </div>
        </section>

        <ConceptGallery />

        <section id="contact" className="studio-cta">
          <a href="mailto:bryanlauwk@gmail.com">Have something curious in mind? <em>Let's make it. ↗</em></a>
        </section>

        <footer className="studio-foot">
          <span>881230.studio &nbsp;|&nbsp; by Bryan Lau Wai Kit</span>
          <span>Made in Kuala Lumpur</span>
        </footer>
      </main>
    </div>
  );
}
