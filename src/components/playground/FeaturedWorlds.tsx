import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { worldFor } from "@/lib/lpWorld";
import { MiniWorld } from "./MiniWorld";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";

interface FeaturedWorldsProps {
  projects: Project[];
  isLoading: boolean;
}

/**
 * Featured Worlds — five planet-like orbs, each a deterministic mini-world
 * generated from a real drop. Circular, luminous, floating above the dark.
 */
export function FeaturedWorlds({ projects, isLoading }: FeaturedWorldsProps) {
  const ref = useReveal<HTMLElement>();

  const worlds = useMemo(
    () =>
      projects.slice(0, 5).map((p) => ({
        project: p,
        spec: worldFor(`${p.id}::${p.title}`, `${p.title} ${p.tag ?? ""} ${p.description ?? ""}`),
      })),
    [projects]
  );

  return (
    <section
      ref={ref}
      id="worlds"
      className="lp-scene lp-reveal relative px-6 py-16 md:px-14 md:py-24"
      aria-labelledby="worlds-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="text-center">
          <p className="lp-label lp-label--violet">Worlds</p>
          <h2
            id="worlds-heading"
            className="mt-4 text-2xl font-extralight tracking-[0.05em] text-foreground md:text-[2rem]"
          >
            Featured Worlds
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            Every drop grows its own small planet — colour, weather and rhythm
            derived from what lives inside it.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-8 md:gap-12">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 w-32 animate-pulse rounded-full border border-[hsl(var(--lp-hair)/0.16)] bg-card/40 md:h-40 md:w-40"
                />
              ))
            : worlds.map(({ project, spec }, i) => (
                <Link
                  key={project.id}
                  to={`/drops/${slugFor(project)}`}
                  className="group flex w-32 flex-col items-center text-center md:w-40"
                  style={{ marginTop: i % 2 ? "1.75rem" : 0 }}
                >
                  <span
                    className="relative block h-32 w-32 overflow-hidden rounded-full border border-[hsl(var(--lp-hair)/0.2)] shadow-[0_0_60px_-18px_hsl(var(--accent)/0.55)] transition-transform duration-700 group-hover:scale-[1.06] md:h-40 md:w-40"
                    style={{ animation: `lp-float ${9 + i * 1.3}s ease-in-out infinite` }}
                  >
                    <MiniWorld spec={spec} uid={`fw-${project.id}`} />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.22),transparent_46%)]"
                    />
                  </span>
                  <span className="mt-5 block text-[0.72rem] font-light tracking-[0.14em] text-foreground/90">
                    {project.title}
                  </span>
                  <span className="mt-1.5 block text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {spec.name}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
