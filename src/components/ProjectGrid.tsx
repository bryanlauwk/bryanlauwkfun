import { usePublicProjects } from "@/hooks/useProjects";
import { StrangerThingsCard } from "./StrangerThingsCard";
import { Skeleton } from "./ui/skeleton";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

function PowerSurgeSkeleton() {
  return (
    <div className="relative bg-card border border-border rounded-lg overflow-hidden">
      <Skeleton className="aspect-video w-full animate-power-surge" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4 animate-power-surge" style={{ animationDelay: "0.1s" }} />
        <Skeleton className="h-4 w-full animate-power-surge" style={{ animationDelay: "0.2s" }} />
        <Skeleton className="h-4 w-2/3 animate-power-surge" style={{ animationDelay: "0.3s" }} />
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
          <PowerSurgeSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center card-cinematic p-8 rounded-lg border border-border/30">
          <p className="font-serif text-2xl stranger-glow mb-2">
            Nothing here yet
          </p>
          <p className="text-muted-foreground font-mono text-sm">
            New drops coming soon...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {projects.map((project, index) => (
        <StrangerThingsCard 
          key={project.id} 
          project={project} 
          index={index}
          isFocused={focusedIndex === index}
        />
      ))}
    </div>
  );
}
