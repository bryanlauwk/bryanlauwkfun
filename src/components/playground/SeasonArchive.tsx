import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import type { Project } from "@/hooks/useProjects";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { slugFor } from "@/lib/slug";
import { MemoryCapsule } from "./MemoryCapsule";

const NEW_WINDOW_DAYS = 45;

interface SeasonArchiveProps {
  projects: Project[];
  isLoading: boolean;
}

export function SeasonArchive({ projects, isLoading }: SeasonArchiveProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = useMemo(() => {
    const tagCounts = new Map<string, number>();
    projects.forEach((p) => {
      if (p.tag) {
        const key = p.tag.toLowerCase();
        tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
      }
    });
    const tagChips = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([label]) => ({ id: label, label }));

    const now = Date.now();
    const newCount = projects.filter(
      (p) => p.created_at && now - new Date(p.created_at).getTime() < NEW_WINDOW_DAYS * 86400_000
    ).length;

    return [
      { id: "all", label: "All" },
      ...(newCount > 0 ? [{ id: "new", label: "New" }] : []),
      ...tagChips,
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    return projects.filter((p) => {
      if (activeFilter === "new") {
        if (!p.created_at || now - new Date(p.created_at).getTime() >= NEW_WINDOW_DAYS * 86400_000) {
          return false;
        }
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

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: filtered.length,
    columns: 3,
    onSelect: (index) => {
      const target = filtered[index];
      if (target) navigate(`/drops/${slugFor(target)}`);
    },
  });

  return (
    <section
      id="archive"
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="archive-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="lp-label">Past Seasons</p>
        <h2
          id="archive-heading"
          className="mt-4 font-tide text-4xl italic text-foreground md:text-5xl"
        >
          Past Seasons
        </h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Memory capsules from earlier worlds.
        </p>

        {projects.length > 0 && (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setIndexOpen((v) => !v)}
              aria-expanded={indexOpen}
              aria-controls="archive-index"
              className="lp-button lp-button--ghost"
            >
              {indexOpen ? "Close archive index" : "Open archive index"}
            </button>

            <div
              id="archive-index"
              hidden={!indexOpen}
              className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="relative w-full max-w-sm">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the memories…"
                  aria-label="Search drops"
                  className="lp-input pl-11 pr-10"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter drops">
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
          </div>
        )}


        <div className="mt-10">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="lp-panel h-56 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="lp-panel px-8 py-14 text-center">
              <p className="font-tide text-3xl italic text-foreground">
                {projects.length ? "Nothing by that name" : "The archive is still empty"}
              </p>
              <p className="mt-3 text-muted-foreground">
                {projects.length
                  ? "Try a softer word, or wander back to everything."
                  : "Only the current season exists so far."}
              </p>
              {projects.length > 0 && (query || activeFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("all");
                  }}
                  className="lp-button mt-8"
                >
                  Show everything
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <div
                  key={project.id}
                  className="lp-fade"
                  style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                >
                  <MemoryCapsule
                    project={project}
                    index={index}
                    isFocused={focusedIndex === index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
