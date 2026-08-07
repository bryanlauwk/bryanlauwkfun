import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { featuredImageFor } from "@/lib/featuredImage";

interface PastSeasonsProps {
  projects: Project[];
  isLoading: boolean;
}

/**
 * Past Seasons — nine glass capsules, each holding a finished world. Every
 * capsule shows that season's featured image (the same one managed in the
 * admin dashboard) so the archive always matches the backend. Each capsule
 * links to its real drop page.
 */
export function PastSeasons({ projects, isLoading }: PastSeasonsProps) {
  const { ref, inView } = useReveal<HTMLUListElement>(0.1);
  const { content } = useSiteContent();

  return (
    <section id="archive" className="lp-band relative px-6 py-14 md:px-14 md:py-20" aria-labelledby="archive-heading">
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-xl">
          <p className="lp-label lp-label--violet">{content("archive.eyebrow")}</p>
          <h2 id="archive-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            {content("archive.heading")}
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
            {content("archive.intro")}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-14 h-72" aria-hidden="true" />
        ) : (
          <ul
            ref={ref}
            className={`lp-capsules mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:mt-14 md:gap-x-8 md:gap-y-10 xl:grid-cols-4 ${
              inView ? "is-live" : ""
            }`}
          >
            {projects.map((project, i) => {
              const image = featuredImageFor(project);
              return (
                <li
                  key={project.id}
                  className={`lp-capsule ${i === projects.length - 1 && projects.length % 2 === 1 ? "lp-capsule-last" : ""}`}
                  style={{ ["--i" as string]: String(i), ["--dur" as string]: `${11 + (i % 5) * 2.4}s` } as React.CSSProperties}
                >
                  <Link to={`/drops/${slugFor(project)}`} className="lp-capsule-link group">
                    <span className="lp-capsule-glass">
                      {image ? (
                        <img
                          src={image}
                          alt={project.title}
                          loading="eager"
                          decoding="sync"
                          fetchPriority="high"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <span className={`absolute inset-0 ${project.color}`} aria-hidden="true" />
                      )}

                      <span className="lp-capsule-sheen" aria-hidden="true" />
                      <span className="lp-capsule-core" aria-hidden="true" />
                    </span>
                    <span className="lp-capsule-reflection" aria-hidden="true">
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          loading="eager"
                          decoding="sync"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <span className={`absolute inset-0 ${project.color}`} />
                      )}
                    </span>
                    <span className="mt-4 block text-center">
                      <span className="lp-display block text-sm text-foreground/90 transition-colors group-hover:text-foreground">
                        {project.title}
                      </span>
                      {project.tag && (
                        <span className="lp-mono mt-1 block text-muted-foreground/70">{project.tag}</span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
