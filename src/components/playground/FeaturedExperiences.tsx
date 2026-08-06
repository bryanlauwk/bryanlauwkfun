import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { artFor } from "@/lib/dropArt";
import { useReveal } from "@/hooks/useReveal";

const NEW_WINDOW_DAYS = 45;

interface FeaturedExperiencesProps {
  projects: Project[];
  isLoading: boolean;
}

/** Featured Experiences — cinematic landscape cards, four across. */
export function FeaturedExperiences({ projects, isLoading }: FeaturedExperiencesProps) {
  const { ref, inView } = useReveal<HTMLElement>(0.1);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = useMemo(() => {
    const tags = new Map<string, number>();
    projects.forEach((p) => {
      if (p.tag) tags.set(p.tag.toLowerCase(), (tags.get(p.tag.toLowerCase()) ?? 0) + 1);
    });
    const now = Date.now();
    const newCount = projects.filter(
      (p) => p.created_at && now - new Date(p.created_at).getTime() < NEW_WINDOW_DAYS * 86400_000
    ).length;
    return [
      { id: "all", label: "All" },
      ...(newCount ? [{ id: "new", label: "New" }] : []),
      ...Array.from(tags.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([label]) => ({ id: label, label })),
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    return projects.filter((p) => {
      if (activeFilter === "new") {
        if (!p.created_at || now - new Date(p.created_at).getTime() >= NEW_WINDOW_DAYS * 86400_000)
          return false;
      } else if (activeFilter !== "all") {
        if ((p.tag ?? "").toLowerCase() !== activeFilter) return false;
      }
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.tag ?? "").toLowerCase().includes(q)
      );
    });
  }, [projects, activeFilter, query]);

  return (
    <section
      ref={ref}
      id="experiences"
      className={`lp-scene relative px-6 py-16 transition-all duration-1000 md:px-14 md:py-24 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      aria-labelledby="experiences-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="text-center">
          <p className="lp-label lp-label--violet">Playable</p>
          <h2
            id="experiences-heading"
            className="mt-4 text-2xl font-extralight tracking-[0.05em] text-foreground md:text-[2rem]"
          >
            Featured Experiences
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            Small playable art, browser-born and free to wander into.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the experiences…"
              aria-label="Search experiences"
              className="lp-input pl-10 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter experiences">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`lp-filter ${activeFilter === f.id ? "is-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl border border-[hsl(var(--lp-hair)/0.16)] bg-card/40"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="lp-panel mx-auto mt-14 max-w-lg px-8 py-12 text-center">
            <p className="text-lg font-extralight text-foreground">Nothing by that name</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Try a softer word, or wander back to everything.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveFilter("all");
              }}
              className="lp-button mt-7"
            >
              Show everything
            </button>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((project, i) => {
              const art = artFor(project);
              return (
                <Link
                  key={project.id}
                  to={`/drops/${slugFor(project)}`}
                  className="group relative block overflow-hidden rounded-2xl border border-[hsl(var(--lp-hair)/0.18)] bg-card/40 transition-all duration-700 hover:-translate-y-1.5 hover:border-[hsl(var(--accent)/0.45)] hover:shadow-[0_28px_70px_-32px_hsl(var(--accent)/0.6)]"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    {art ? (
                      <img
                        src={art}
                        alt=""
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="h-full w-full object-cover opacity-85 transition-transform duration-[1400ms] group-hover:scale-[1.07] group-hover:opacity-100"
                      />
                    ) : (
                      <span className="block h-full w-full bg-[radial-gradient(circle_at_38%_32%,hsl(var(--accent)/0.35),transparent_62%),radial-gradient(circle_at_72%_74%,hsl(var(--lp-blue)/0.3),transparent_66%)]" />
                    )}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,9,0)_36%,rgba(2,4,9,0.9)_100%)]"
                    />
                  </span>

                  <span className="relative block px-5 pb-5 pt-4">
                    {project.tag && (
                      <span className="block text-[0.55rem] uppercase tracking-[0.3em] text-accent">
                        {project.tag}
                      </span>
                    )}
                    <span className="mt-2 block text-sm font-light tracking-[0.06em] text-foreground">
                      {project.title}
                    </span>
                    {project.description && (
                      <span className="mt-2 line-clamp-2 block text-xs font-light leading-relaxed text-muted-foreground">
                        {project.description}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
