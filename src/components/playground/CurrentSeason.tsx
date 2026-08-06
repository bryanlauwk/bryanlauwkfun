import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { CosmicPanel } from "./CosmicPanel";

interface CurrentSeasonProps {
  project?: Project;
  isLoading: boolean;
}

export function CurrentSeason({ project, isLoading }: CurrentSeasonProps) {
  const [imageFailed, setImageFailed] = useState(false);


  return (
    <section
      id="now"
      className="relative z-20 -mt-28 px-6 md:-mt-40 md:px-14"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        {isLoading ? (
          <div className="lp-panel h-[320px] animate-pulse" />
        ) : project ? (
          <Link
            to={`/drops/${slugFor(project)}`}
            className="lp-panel lp-panel--feature group grid overflow-hidden md:grid-cols-[minmax(0,44%)_minmax(0,56%)]"
            aria-label={`Enter the experience: ${project.title}`}
          >
            <span className="lp-panel-glow" aria-hidden="true" />

            <div className="relative order-2 flex flex-col justify-center p-7 md:order-1 md:p-14">
              <p className="lp-label lp-label--violet">Current Drop</p>

              <h2
                id="now-heading"
                className="mt-6 text-3xl font-extralight leading-tight tracking-[0.02em] text-foreground transition-colors duration-500 group-hover:text-white md:text-[2.6rem]"
              >
                {project.title}
              </h2>

              {project.description && (
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-[0.95rem]">
                  {project.description}
                </p>
              )}

              <span className="lp-button mt-9 w-fit">
                Enter the Experience
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="lp-chip lp-chip--violet">
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse" />
                  Limited transmission · currently open
                </span>
                {project.tag && <span className="lp-chip">{project.tag}</span>}
              </div>
            </div>

            <div className="relative order-1 min-h-[200px] overflow-hidden md:order-2 md:min-h-[360px]">
              {project.image_url && !imageFailed ? (
                <img
                  src={project.image_url}
                  alt={project.title}
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1600ms] group-hover:scale-[1.04]"
                />
              ) : (
                <CosmicPanel />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,#020409_2%,rgba(2,4,9,0.55)_38%,rgba(2,4,9,0.15)_100%)]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(200,215,255,0.5)_0.6px,transparent_0.7px)] [background-size:26px_26px]"
              />
            </div>
          </Link>
        ) : (
          <div className="lp-panel p-10 text-center md:p-16">
            <h2 id="now-heading" className="text-2xl font-extralight text-foreground">
              The season is between breaths
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing is open yet. Something is being built in the dark.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
