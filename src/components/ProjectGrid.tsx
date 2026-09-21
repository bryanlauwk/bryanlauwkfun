import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { usePublicProjects } from "@/hooks/useProjects";
import { StrangerThingsCard } from "./StrangerThingsCard";
import { Skeleton } from "./ui/skeleton";
import { projectCategory } from "@/lib/project-destination";

export function ProjectGrid() {
  const { data: projects, isLoading, isError, refetch, isFetching } = usePublicProjects();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    (projects ?? []).forEach(p => { const category = projectCategory(p.tag); if (category) counts.set(category, (counts.get(category) ?? 0) + 1); });
    // A dozen one-item audience tags add choices without helping discovery.
    return [...counts].filter(([, count]) => count > 1).map(([category]) => category);
  }, [projects]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (projects ?? []).filter(p =>
      (activeFilter === "all" || projectCategory(p.tag) === activeFilter) &&
      (!q || [p.title, p.description, p.tag].some(value => value?.toLowerCase().includes(q)))
    );
  }, [projects, query, activeFilter]);
  const reset = () => { setQuery(""); setActiveFilter("all"); };

  if (isLoading) return (
    <div role="status" aria-label="Loading experiments" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map(i => <div key={i} className="border border-foreground/15 bg-card"><Skeleton className="aspect-[8/5] w-full rounded-none" /><div className="space-y-4 p-6"><Skeleton className="h-7 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div></div>)}
    </div>
  );
  if (isError) return (
    <div role="alert" className="border border-foreground/20 bg-card p-8">
      <h3 className="font-display text-2xl font-black uppercase">A small technical gremlin.</h3>
      <p className="mt-2 text-muted-foreground">The experiments couldn’t load. Give them another nudge.</p>
      <button onClick={() => void refetch()} disabled={isFetching} className="mt-5 min-h-11 border border-primary px-5 font-mono text-xs font-bold text-primary disabled:opacity-50">{isFetching ? "Trying…" : "Try again"}</button>
    </div>
  );

  return (
    <div className="space-y-6">
      {(projects?.length ?? 0) > 6 && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {filters.length > 1 && <div className="flex flex-wrap gap-2" role="group" aria-label="Filter experiments">
            {["all", ...filters].map(filter => (
              <button key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}
                className={`min-h-11 border px-3 font-mono text-[11px] capitalize transition-colors ${activeFilter === filter ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20 text-muted-foreground hover:border-primary hover:text-foreground"}`}>
                {filter === "all" ? "Everything" : filter}
              </button>
            ))}
          </div>}
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find your kind of weird…"
              aria-label="Search experiments" className="min-h-11 w-full border border-foreground/20 bg-card pl-9 pr-11 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center"><X className="h-4 w-4" /></button>}
          </div>
        </div>
      )}
      {(query || activeFilter !== "all") && <p role="status" className="font-mono text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "experiment" : "experiments"} found <button onClick={reset} className="ml-3 inline-flex min-h-11 items-center underline underline-offset-4 text-primary">Show everything</button></p>}
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => <StrangerThingsCard key={project.id} project={project} index={index} />)}
        </div>
      ) : (
        <div className="border border-foreground/15 bg-card p-8 text-center">
          <h3 className="font-display text-2xl font-black uppercase">{projects?.length ? "Too weird. Even for us." : "Something strange is on its way."}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{projects?.length ? "No matches. Try another word or start over." : "Check back for new experiments."}</p>
          {projects?.length ? <button onClick={reset} className="mt-4 min-h-11 px-4 font-mono text-xs text-primary underline underline-offset-4">Show everything</button> : null}
        </div>
      )}
    </div>
  );
}
