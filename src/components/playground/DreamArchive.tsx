import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { useReveal } from "@/hooks/useReveal";

interface DreamArchiveProps {
  projects: Project[];
  isLoading: boolean;
}

const WAVE =
  "M0 60 C 120 18, 240 102, 360 60 S 600 18, 720 60 S 960 102, 1080 60 S 1320 18, 1440 60";

/** Dream Archive — every drop as a milestone node along a slow wave of time. */
export function DreamArchive({ projects, isLoading }: DreamArchiveProps) {
  const { ref, inView } = useReveal<HTMLElement>(0.12);

  const nodes = useMemo(() => {
    const dated = [...projects]
      .filter((p) => p.created_at)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    return dated.map((p, i) => ({
      project: p,
      pct: dated.length > 1 ? (i / (dated.length - 1)) * 100 : 50,
      up: i % 2 === 0,
      year: new Date(p.created_at).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      }),
    }));
  }, [projects]);

  return (
    <section
      ref={ref}
      id="archive"
      className={`lp-scene relative px-6 py-16 transition-all duration-1000 md:px-14 md:py-24 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      aria-labelledby="dream-archive-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="text-center">
          <p className="lp-label lp-label--violet">Archive</p>
          <h2
            id="dream-archive-heading"
            className="mt-4 text-2xl font-extralight tracking-[0.05em] text-foreground md:text-[2rem]"
          >
            Dream Archive
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            A wave of everything released so far — each node a night that turned
            into something playable.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-16 h-40 animate-pulse rounded-3xl border border-[hsl(var(--lp-hair)/0.14)] bg-card/40" />
        ) : (
          <div className="relative mt-16 overflow-x-auto pb-6">
            <div className="relative mx-auto h-[19rem] min-w-[52rem]">
              <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                className="absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="dreamwave" x1="0" x2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent) / 0)" />
                    <stop offset="20%" stopColor="hsl(var(--lp-blue) / 0.65)" />
                    <stop offset="70%" stopColor="hsl(160 80% 60% / 0.6)" />
                    <stop offset="100%" stopColor="hsl(var(--lp-gold) / 0)" />
                  </linearGradient>
                </defs>
                <path d={WAVE} stroke="url(#dreamwave)" strokeWidth="1.5" fill="none" />
                <path
                  d={WAVE}
                  stroke="url(#dreamwave)"
                  strokeWidth="8"
                  fill="none"
                  opacity="0.14"
                />
              </svg>

              {nodes.map(({ project, pct, up, year }, i) => (
                <Link
                  key={project.id}
                  to={`/drops/${slugFor(project)}`}
                  className="group absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${4 + pct * 0.92}%` }}
                >
                  <span
                    className={`order-1 h-3 w-3 rounded-full border border-[hsl(var(--lp-hair)/0.5)] bg-accent/80 shadow-[0_0_18px_hsl(var(--accent)/0.8)] transition-transform duration-500 group-hover:scale-150`}
                    style={{ animation: `lp-float ${6 + (i % 4)}s ease-in-out infinite` }}
                    aria-hidden="true"
                  />
                  <span
                    className={`${
                      up ? "order-0 mb-4" : "order-2 mt-4"
                    } w-32 text-center`}
                  >
                    <span className="block text-[0.68rem] font-light leading-snug tracking-[0.08em] text-foreground/90 transition-colors group-hover:text-foreground">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {year}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
