import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";

interface CurrentSeasonProps {
  project?: Project;
  isLoading: boolean;
}

export function CurrentSeason({ project, isLoading }: CurrentSeasonProps) {
  return (
    <section
      id="now"
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="lp-label">Current Season · Featured Drop</p>
          <p className="lp-label inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent lp-pulse" aria-hidden="true" />
            Limited transmission · currently open
          </p>
        </div>

        <h2 id="now-heading" className="font-tide text-4xl italic text-foreground md:text-5xl">
          What&apos;s alive right now
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          One thing gets the whole room. Everything else waits its turn.
        </p>

        <div className="mt-10">
          {isLoading ? (
            <div className="lp-panel h-[320px] animate-pulse" />
          ) : project ? (
            <Link
              to={`/drops/${slugFor(project)}`}
              className="lp-panel lp-panel--feature group block p-8 md:p-14"
              aria-label={`Open ${project.title}`}
            >
              <span className="lp-label text-accent">Currently open</span>


              <h3 className="mt-5 font-tide text-4xl leading-tight text-foreground transition-colors duration-500 group-hover:text-accent md:text-6xl">
                {project.title}
              </h3>

              {project.description && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.description}
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <span className="lp-button lp-button--ghost">
                  Enter Experience
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                {project.tag && <span className="lp-chip">{project.tag}</span>}
              </div>

              <span className="lp-panel-glow" aria-hidden="true" />
            </Link>
          ) : (
            <div className="lp-panel p-10 text-center">
              <p className="font-tide text-3xl italic text-foreground">
                The season is between breaths
              </p>
              <p className="mt-3 text-muted-foreground">
                Nothing is open yet. Something is being built in the dark.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
