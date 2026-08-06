import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import dropArt from "@/assets/current-drop-hua-la-cai-la-v3.jpg";

interface CurrentSeasonProps {
  project?: Project;
  isLoading: boolean;
}

/**
 * Current Drop — an exhibition feature, not a card. The painting runs edge to
 * edge and the copy sits on a fine glass plate inside the scene.
 */
export function CurrentSeason({ project, isLoading }: CurrentSeasonProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);

  if (isLoading) {
    return <section id="now" className="min-h-[24rem]" aria-hidden="true" />;
  }

  if (!project) {
    return (
      <section id="now" className="mx-auto max-w-[110rem] px-6 py-20 text-center md:px-14">
        <h2 className="lp-display text-2xl text-foreground">The season is between breaths</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Nothing is open yet. Something is being built in the dark.
        </p>
      </section>
    );
  }

  return (
    <section id="now" className="relative z-20 -mt-20 md:-mt-28" aria-labelledby="now-heading">
      <div ref={ref} className={`lp-feature ${inView ? "is-live" : ""}`}>
        <div className="lp-feature-art" aria-hidden="true">
          <img
            src={dropArt}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[62%_45%] md:object-[55%_50%]"
          />
          <span className="lp-veil" />
          <span className="lp-seam-top" />
          <span className="lp-seam-bottom" />
        </div>

        <div className="relative mx-auto flex min-h-[32rem] max-w-[110rem] items-end px-6 pb-16 pt-44 md:min-h-[42rem] md:items-center md:px-14 md:py-32">
          <div className="lp-plate max-w-xl md:max-w-[34rem]">
            <p className="lp-label lp-label--violet">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
              Current Drop · open now
            </p>

            <h2
              id="now-heading"
              className="lp-display mt-5 text-[2.4rem] leading-[1.05] text-foreground md:text-[3.8rem]"
            >
              {project.title}
            </h2>

            {project.description && (
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-[0.97rem]">
                {project.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to={`/drops/${slugFor(project)}`}
                className="lp-cta group"
                aria-label={`Enter the experience: ${project.title}`}
              >
                Enter the experience
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
              {project.tag && (
                <span className="lp-mono text-muted-foreground">{project.tag}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
