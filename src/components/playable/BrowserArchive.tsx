import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { featuredImageFor } from "@/lib/featuredImage";
import { slugFor } from "@/lib/slug";

type BrowserArchiveProps = {
  featured?: Project;
  rest: Project[];
  isLoading: boolean;
};

export function BrowserArchive({ featured, rest, isLoading }: BrowserArchiveProps) {
  const projects = featured ? [featured, ...rest] : rest;

  return (
    <section id="archive" className="cp-section cp-archive" aria-labelledby="archive-heading">
      <div className="cp-shell">
        <div className="cp-archive-head">
          <div>
            <p className="cp-kicker">SEASON 01 / THE BROWSER YEARS</p>
            <h2 id="archive-heading" className="cp-section-title">WEIRD PLAYABLE<br />INTERNET.</h2>
          </div>
          <div className="cp-intro-note">
            <p>The original playground stays open. These browser-born games, simulations and small worlds are the archive—and the fastest place to test what deserves to escape into the room.</p>
            <span className="cp-live-chip"><i /> STILL PLAYABLE</span>
          </div>
        </div>

        {isLoading ? (
          <div className="cp-archive-loading" aria-label="Loading browser experiments">
            <span /><span /><span />
          </div>
        ) : projects.length === 0 ? (
          <p className="cp-archive-empty">The archive is being rewired. Check back when the smoke clears.</p>
        ) : (
          <div className="cp-archive-grid">
            {projects.map((project, index) => {
              const image = featuredImageFor(project);
              return (
                <article key={project.id} className={`cp-archive-card ${index === 0 ? "is-first" : ""}`}>
                  <Link to={`/drops/${slugFor(project)}`} aria-label={`Play ${project.title}`}>
                    <div className="cp-archive-media">
                      {image ? (
                        <img src={image} alt={`Artwork for ${project.title}`} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                      ) : (
                        <span style={{ background: project.color }} />
                      )}
                      <div className="cp-archive-overlay">
                        <Play aria-hidden="true" />
                        <strong>PLAY IT</strong>
                      </div>
                      <span className="cp-archive-number">S01 / {String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="cp-archive-copy">
                      <div>
                        <h3>{project.title}</h3>
                        {project.description && <p>{project.description}</p>}
                      </div>
                      <ArrowUpRight aria-hidden="true" />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
