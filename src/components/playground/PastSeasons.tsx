import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { pairSpheres, sphereStyle } from "@/lib/capsuleArt";
import capsuleArt from "@/assets/past-seasons-capsules-v3.jpg";

interface PastSeasonsProps {
  projects: Project[];
  isLoading: boolean;
}

/**
 * Past Seasons — nine glass capsules, each one a crop of a single painting of
 * nine worlds. Every capsule links to its real drop page.
 */
export function PastSeasons({ projects, isLoading }: PastSeasonsProps) {
  const { ref, inView } = useReveal<HTMLUListElement>(0.1);
  const pairs = pairSpheres(projects);

  return (
    <section id="archive" className="relative px-6 py-20 md:px-14 md:py-28" aria-labelledby="archive-heading">
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-xl">
          <p className="lp-label lp-label--violet">Past Seasons</p>
          <h2 id="archive-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            The archive of finished worlds
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
            Every world that has already opened, sealed in glass. They all still run.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-14 h-72" aria-hidden="true" />
        ) : (
          <ul
            ref={ref}
            className={`lp-capsules mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-20 md:grid-cols-5 md:gap-x-8 md:gap-y-14 ${
              inView ? "is-live" : ""
            }`}
          >
            {pairs.map(({ sphere, project }, i) => (
              <li
                key={project.id}
                className="lp-capsule"
                style={{ ["--i" as string]: String(i), ["--dur" as string]: `${11 + (i % 5) * 2.4}s` } as React.CSSProperties}
              >
                <Link to={`/drops/${slugFor(project)}`} className="lp-capsule-link group">
                  <span className="lp-capsule-glass">
                    <img
                      src={capsuleArt}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={sphereStyle(sphere)}
                      className="absolute"
                    />
                    <span className="lp-capsule-sheen" aria-hidden="true" />
                    <span className="lp-capsule-core" aria-hidden="true" />
                  </span>
                  <span className="lp-capsule-reflection" aria-hidden="true">
                    <img
                      src={capsuleArt}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={sphereStyle(sphere)}
                      className="absolute"
                    />
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
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
