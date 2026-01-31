import { usePublicProjects } from "@/hooks/useProjects";
import { CinematicProjectCard } from "./CinematicProjectCard";
import { Loader2 } from "lucide-react";

export function ProjectGrid() {
  const { data: projects, isLoading } = usePublicProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center card-cinematic p-8 rounded-lg">
          <p className="font-serif text-2xl text-foreground mb-2">
            Coming Soon
          </p>
          <p className="text-muted-foreground">
            New projects are on the horizon...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, index) => (
        <CinematicProjectCard 
          key={project.id} 
          project={project} 
          index={index}
        />
      ))}
    </div>
  );
}
