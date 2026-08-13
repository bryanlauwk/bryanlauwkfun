import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import { featuredImageFor } from "@/lib/featuredImage";

interface PlayExperiencesProps {
  featured?: Project;
  rest: Project[];
  isLoading: boolean;
}

/**
 * Browser experiments. The newest real experiment leads, and every other real
 * playable follows exactly once. Bench-style affordances (input/output cues,
 * variable ticks) are decorative annotations only — never fake controls.
 */
export function PlayExperiences({ featured, rest, isLoading }: PlayExperiencesProps) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.06);
  const { content } = useSiteContent();

  return (
    <section id="play" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="play-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-section-head">
          <div>
            <p className="pw-eyebrow pw-eyebrow--cyan">{content("play.sectionEyebrow")}</p>
            <h2 id="play-heading" className="pw-h2 mt-3">
              {content("play.sectionHeading")}
            </h2>
            <p className="pw-section-sub mt-3">{content("play.sectionSub")}</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {content("play.sectionIntro")}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="pw-card h-80 animate-pulse" aria-hidden="true" />
            <div className="pw-card h-80 animate-pulse" aria-hidden="true" />
          </div>
        ) : !featured ? (
          <p className="mt-8 text-sm text-muted-foreground">{content("play.emptyBody")}</p>
        ) : (
          <div ref={ref} className={`mt-10 space-y-4 ${inView ? "pw-in" : ""}`}>
            {/* Newest experiment — featured once, never repeated below */}
            <article className="pw-feature pw-tilt">
              <div className="pw-feature-art">
                {featuredImageFor(featured) ? (
                  <img
                    src={featuredImageFor(featured) as string}
                    alt={`Artwork for ${featured.title}`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover object-[58%_48%]"
                  />
                ) : (
                  <div className="h-full w-full" style={{ background: featured.color }} aria-hidden="true" />
                )}
                <span className="pw-feature-veil" aria-hidden="true" />
                <span className="pw-ticks" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </span>
              </div>

              <div className="pw-feature-body">
                <p className="pw-eyebrow pw-eyebrow--cyan">
                  <span className="pw-dot" aria-hidden="true" />
                  {content("play.featuredLabel")}
                </p>
                <h3 className="pw-h3 mt-3">{featured.title}</h3>
                {featured.description && (
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/drops/${slugFor(featured)}`}
                    className="pw-btn pw-btn--primary"
                    aria-label={`Play ${featured.title}`}
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    {content("play.cardCta")}
                  </Link>
                  {featured.tag && <span className="pw-tag">{featured.tag}</span>}
                </div>
              </div>
            </article>

            {/* Every other real playable, exactly once */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((p, i) => {
                const art = featuredImageFor(p);
                return (
                  <article key={p.id} className="pw-card pw-tilt" style={{ ["--i" as string]: String(i) } as React.CSSProperties}>
                    <Link to={`/drops/${slugFor(p)}`} className="pw-card-link" aria-label={`Play ${p.title}`}>
                      <div className="pw-card-art">
                        {art ? (
                          <img
                            src={art}
                            alt={`Artwork for ${p.title}`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full" style={{ background: p.color }} aria-hidden="true" />
                        )}
                        <span className="pw-card-scan" aria-hidden="true" />
                      </div>
                      <div className="pw-card-body">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="pw-card-title">{p.title}</h3>
                          <ArrowUpRight className="pw-card-arrow h-4 w-4 shrink-0" aria-hidden="true" />
                        </div>
                        {p.description && <p className="pw-card-hook">{p.description}</p>}
                        <p className="pw-card-io" aria-hidden="true">
                          {content("play.inputLabel")}
                          <span className="pw-card-io-line" />
                          {content("play.outputLabel")}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          {p.tag ? <span className="pw-tag">{p.tag}</span> : <span />}
                          <span className="pw-card-cta">{content("play.cardCta")}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
