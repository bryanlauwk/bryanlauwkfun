import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { featuredImageFor } from "@/lib/featuredImage";
import dropArt from "@/assets/current-drop-hua-la-cai-la-v3.jpg";

interface NowShowingProps {
  project?: Project;
  isLoading: boolean;
}

/**
 * Now Showing — Room 01 holds exactly one experiment: the newest real drop.
 * It is presented as a single immersive feature panel and never repeated
 * anywhere else on the homepage.
 */
export function NowShowing({ project, isLoading }: NowShowingProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  const { content } = useSiteContent();

  if (isLoading) {
    return <section id="play" className="min-h-[24rem]" aria-hidden="true" />;
  }

  if (!project) {
    return (
      <section id="play" className="lp-band px-6 py-20 md:px-14" aria-labelledby="now-heading">
        <div className="mx-auto max-w-[110rem]">
          <p className="lp-label lp-label--violet">{content("now.eyebrow")}</p>
          <h2 id="now-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            {content("now.emptyBody")}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="play" className="lp-band relative scroll-mt-24" aria-labelledby="now-heading">
      <div ref={ref} className={`lp-feature ${inView ? "is-live" : ""}`}>
        <div className="lp-feature-art" aria-hidden="true">
          <img
            src={featuredImageFor(project) ?? dropArt}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[62%_45%] md:object-[55%_50%]"
          />
          <span className="lp-veil" />
          <span className="lp-seam-top" />
          <span className="lp-seam-bottom" />
        </div>

        <div className="relative mx-auto flex min-h-[30rem] max-w-[110rem] items-end px-6 pb-14 pt-40 md:min-h-[38rem] md:items-center md:px-14 md:py-28">
          <div className="lp-plate max-w-xl md:max-w-[34rem]">
            <p className="lp-label lp-label--violet">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
              {content("now.eyebrow")}
            </p>

            <h2
              id="now-heading"
              className="lp-display mt-5 text-[2.3rem] leading-[1.05] text-foreground md:text-[3.4rem]"
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
                aria-label={`${content("now.cta")}: ${project.title}`}
              >
                {content("now.cta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
              {project.tag && <span className="lp-mono text-muted-foreground">{project.tag}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
