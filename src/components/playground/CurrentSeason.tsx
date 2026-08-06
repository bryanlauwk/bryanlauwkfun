import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { SketchRealm } from "./SketchRealm";

interface CurrentSeasonProps {
  project?: Project;
  isLoading: boolean;
}

/**
 * Current Drop — the boldest editorial moment after the hero.
 * A full-bleed ink-becomes-life vignette; the type sits inside the scene
 * rather than on a bordered card.
 */
export function CurrentSeason({ project, isLoading }: CurrentSeasonProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);

  return (
    <section
      id="now"
      className="lp-scene relative z-20 -mt-24 md:-mt-36"
      aria-labelledby="now-heading"
    >
      {isLoading ? (
        <div className="mx-auto h-[420px] max-w-[110rem] animate-pulse px-6 md:px-14" />
      ) : project ? (
        <div ref={ref} className={`lp-drop ${inView ? "is-live" : ""}`}>
          {/* the living vignette, full-bleed behind the type */}
          <div className="lp-drop-stage" aria-hidden="true">
            {project.image_url && !imageFailed ? (
              <img
                src={project.image_url}
                alt=""
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
            ) : (
              <SketchRealm />
            )}
            <span className="lp-drop-veil" />
            <span className="lp-drop-seam" />
          </div>

          <div className="relative mx-auto flex min-h-[30rem] max-w-[110rem] items-end px-6 pb-14 pt-40 md:min-h-[40rem] md:items-center md:px-14 md:py-28">
            <div className="max-w-xl md:max-w-[34rem]">
              <p className="lp-label lp-label--violet lp-drop-in">
                <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
                Current Drop · open now
              </p>

              <h2
                id="now-heading"
                className="lp-drop-in mt-6 text-[2.5rem] font-extralight leading-[1.05] tracking-[0.02em] text-foreground md:text-[4.2rem]"
                style={{ ["--d" as string]: "120ms" } as React.CSSProperties}
              >
                {project.title}
              </h2>

              {project.description && (
                <p
                  className="lp-drop-in mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-[0.98rem]"
                  style={{ ["--d" as string]: "220ms" } as React.CSSProperties}
                >
                  {project.description}
                </p>
              )}

              <div
                className="lp-drop-in mt-10 flex flex-wrap items-center gap-5"
                style={{ ["--d" as string]: "320ms" } as React.CSSProperties}
              >
                <Link
                  to={`/drops/${slugFor(project)}`}
                  className="lp-cta group"
                  aria-label={`Enter the experience: ${project.title}`}
                >
                  Enter the experience
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
                {project.tag && (
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                    {project.tag}
                  </span>
                )}
              </div>

              <p className="lp-drop-in mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/75"
                style={{ ["--d" as string]: "400ms" } as React.CSSProperties}
              >
                Touch the ink. It answers.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[110rem] px-6 py-20 text-center md:px-14">
          <h2 id="now-heading" className="text-2xl font-extralight text-foreground">
            The season is between breaths
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Nothing is open yet. Something is being built in the dark.
          </p>
        </div>
      )}
    </section>
  );
}
