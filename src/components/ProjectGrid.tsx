import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { usePublicProjects } from "@/hooks/useProjects";
import { StrangerThingsCard } from "./StrangerThingsCard";
import { Skeleton } from "./ui/skeleton";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { slugFor } from "@/lib/slug";

function DossierSkeleton({ delay = 0, index = 0 }: { delay?: number; index?: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className="relative bg-card border-2 border-foreground rounded-lg overflow-hidden shadow-[4px_4px_0_hsl(var(--foreground))] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <span
        className="absolute -top-1.5 left-4 w-14 h-4 bg-foreground/85 rotate-[-8deg] pointer-events-none"
        aria-hidden="true"
      />
      <div className="px-5 pt-5 pb-2 flex items-center justify-between bg-grid-paper border-b-2 border-dashed border-foreground/20">
        <span className="font-mono text-[10px] text-foreground uppercase tracking-[0.25em] font-bold">
          File · {num}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
          Retrieving…
        </span>
      </div>
      <div className="p-5 space-y-3 min-h-[180px]">
        <Skeleton className="h-8 w-3/4 animate-skeleton-shimmer" />
        <Skeleton className="h-1.5 w-12 bg-primary/40 animate-skeleton-shimmer" style={{ animationDelay: "0.1s" }} />
        <Skeleton className="h-4 w-full animate-skeleton-shimmer" style={{ animationDelay: "0.2s" }} />
        <Skeleton className="h-4 w-2/3 animate-skeleton-shimmer" style={{ animationDelay: "0.3s" }} />
        <Skeleton className="h-8 w-28 mt-4 animate-skeleton-shimmer" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

const NEW_WINDOW_DAYS = 45;

export function ProjectGrid() {
  const { data: projects, isLoading } = usePublicProjects();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Build filter list from actual tags + baseline chips
  const filters = useMemo(() => {
    const tagCounts = new Map<string, number>();
    (projects ?? []).forEach((p) => {
      if (p.tag) {
        const key = p.tag.toLowerCase();
        tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
      }
    });
    const tagChips = Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([label]) => ({ id: label, label }));

    const now = Date.now();
    const newCount = (projects ?? []).filter(
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
    return (projects ?? []).filter((p) => {
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
      if (target) {
        navigate(`/drops/${slugFor(target)}`);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <DossierSkeleton key={i} delay={i * 150} index={i} />
        ))}
      </div>
    );
  }

  const hasProjects = projects && projects.length > 0;

  return (
    <div className="space-y-8">
      {hasProjects && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drops…"
              aria-label="Search drops"
              className="w-full bg-card border-2 border-foreground rounded-sm pl-9 pr-9 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground shadow-[3px_3px_0_hsl(var(--foreground))] focus:outline-none focus:shadow-[5px_5px_0_hsl(var(--foreground))] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter drops">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(f.id)}
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border-2 border-foreground rounded-sm transition-all ${
                    isActive
                      ? "bg-primary text-foreground shadow-[3px_3px_0_hsl(var(--foreground))] -translate-x-0.5 -translate-y-0.5"
                      : "bg-card text-foreground hover:bg-primary/20"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="relative text-center bg-card p-10 rounded-lg border-2 border-foreground shadow-[6px_6px_0_hsl(var(--foreground))] max-w-md">
            <span
              className="absolute -top-2 left-8 w-16 h-4 bg-foreground/85 rotate-[-6deg] pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -top-4 -right-2 dossier-stamp"
              style={{ transform: "rotate(8deg)" }}
            >
              Redacted
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Case File // Empty
            </p>
            <p className="font-serif text-3xl font-black uppercase text-foreground mb-2">
              {hasProjects ? "No matches" : "Nothing here yet"}
            </p>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              {hasProjects ? "Try another filter or query" : "New drops incoming…"}
            </p>
            {hasProjects && (query || activeFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                }}
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border-2 border-foreground rounded-sm bg-primary hover:shadow-[3px_3px_0_hsl(var(--foreground))] transition-all"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <StrangerThingsCard
                project={project}
                index={index}
                isFocused={focusedIndex === index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
