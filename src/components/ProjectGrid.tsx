import { usePublicProjects } from "@/hooks/useProjects";
import { StrangerThingsCard } from "./StrangerThingsCard";
import { Skeleton } from "./ui/skeleton";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

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

export function ProjectGrid() {
  const { data: projects, isLoading } = usePublicProjects();

  const { focusedIndex } = useKeyboardNavigation({
    itemCount: projects?.length ?? 0,
    columns: 3,
    onSelect: (index) => {
      if (projects?.[index]?.href) {
        window.open(projects[index].href, "_blank", "noopener,noreferrer");
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

  if (!projects || projects.length === 0) {
    return (
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
            Nothing here yet
          </p>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            New drops incoming…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
          <StrangerThingsCard 
            project={project} 
            index={index}
            isFocused={focusedIndex === index}
          />
        </div>
      ))}
    </div>
  );
}
