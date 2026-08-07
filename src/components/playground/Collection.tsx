import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { featuredImageFor } from "@/lib/featuredImage";

interface CollectionProps {
  projects: Project[];
  isLoading: boolean;
}

/**
 * The permanent collection — every other real playable experiment, exactly
 * once, in one coherent grid. No "past" or "archive" language: they all run.
 */
export function Collection({ projects, isLoading }: CollectionProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.08);
  const { content } = useSiteContent();

  return (
    <section
      id="collection"
      className="lp-band relative scroll-mt-24 px-6 py-14 md:px-14 md:py-20"
      aria-labelledby="collection-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-2xl">
          <p className="lp-label lp-label--violet">{content("collection.eyebrow")}</p>
          <h2 id="collection-heading" className="lp-display mt-4 text-3xl text-foreground md:text-[2.4rem]">
            {content("collection.heading")}
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            {content("collection.intro")}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="lp-room-card h-60 animate-pulse" aria-hidden="true" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-8 text-sm font-light text-muted-foreground">{content("collection.emptyBody")}</p>
        ) : (
          <div
            ref={ref}
            className={`lp-room-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              inView ? "is-live" : ""
            }`}
          >
            {projects.map((project, i) => {
              const image = featuredImageFor(project);
              return (
                <Link
                  key={project.id}
                  to={`/drops/${slugFor(project)}`}
                  className="lp-room-card lp-room-card--compact group"
                  style={{ ["--i" as string]: String(i) } as React.CSSProperties}
                >
                  <span className="lp-room-art" aria-hidden="true">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        loading={i < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                    ) : (
                      <span className={`absolute inset-0 ${project.color}`} />
                    )}
                    <span className="lp-room-wash" />
                  </span>

                  <span className="lp-room-body">
                    {project.tag && <span className="lp-mono text-muted-foreground/80">{project.tag}</span>}
                    <span className="lp-display mt-2 block text-lg text-foreground">{project.title}</span>
                    {project.description && (
                      <span className="mt-2 block text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
                        {project.description}
                      </span>
                    )}
                    <span className="lp-mono mt-4 inline-flex items-center gap-2 text-accent">
                      {content("collection.cta")}
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
