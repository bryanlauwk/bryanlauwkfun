import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { featuredImageFor } from "@/lib/featuredImage";

interface Room01Props {
  featured?: Project;
  projects: Project[];
  isLoading: boolean;
}

/**
 * Room 01 — the homepage lead magnet. Real drops only: the current playable
 * experiment leads, followed by the rest of the collection. Every card links to
 * the real drop page.
 */
export function Room01({ featured, projects, isLoading }: Room01Props) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.08);
  const { content } = useSiteContent();

  const ordered = [featured, ...projects].filter(Boolean) as Project[];

  return (
    <section id="room" className="lp-band relative px-6 py-16 md:px-14 md:py-24" aria-labelledby="room-heading">
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-2xl">
          <p className="lp-label lp-label--violet">{content("room.eyebrow")}</p>
          <h2 id="room-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            {content("room.heading")}
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
            {content("room.intro")}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="lp-room-card h-72 animate-pulse" aria-hidden="true" />
            ))}
          </div>
        ) : ordered.length === 0 ? (
          <p className="mt-10 text-sm font-light text-muted-foreground">{content("room.emptyBody")}</p>
        ) : (
          <div
            ref={ref}
            className={`lp-room-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${inView ? "is-live" : ""}`}
          >
            {ordered.map((project, i) => {
              const image = featuredImageFor(project);
              const lead = i === 0;
              return (
                <Link
                  key={project.id}
                  to={`/drops/${slugFor(project)}`}
                  className={`lp-room-card group ${lead ? "lp-room-card--lead sm:col-span-2" : ""}`}
                  style={{ ["--i" as string]: String(i) } as React.CSSProperties}
                >
                  <span className="lp-room-art" aria-hidden="true">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <span className={`absolute inset-0 ${project.color}`} />
                    )}
                    <span className="lp-room-wash" />
                  </span>

                  <span className="lp-room-body">
                    <span className="flex flex-wrap items-center gap-3">
                      {lead && (
                        <span className="lp-room-status">
                          <span className="lp-pulse inline-block h-1 w-1 rounded-full bg-accent align-middle" />
                          {content("room.currentLabel")}
                        </span>
                      )}
                      {project.tag && <span className="lp-mono text-muted-foreground/80">{project.tag}</span>}
                    </span>

                    <span
                      className={`lp-display mt-3 block text-foreground ${lead ? "text-2xl md:text-[2.1rem]" : "text-xl"}`}
                    >
                      {project.title}
                    </span>

                    {project.description && (
                      <span className="mt-2 block max-w-md text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
                        {project.description}
                      </span>
                    )}

                    <span className="lp-mono mt-5 inline-flex items-center gap-2 text-accent">
                      {content("room.cta")}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
