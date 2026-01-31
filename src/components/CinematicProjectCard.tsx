import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string | null;
  href: string;
  image_url: string | null;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function CinematicProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block card-cinematic rounded-lg overflow-hidden",
        "transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1"
      )}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-4xl opacity-50">⚡</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80" />
        
        {/* Lightning effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lightning-overlay" />
      </div>

      {/* Content */}
      <div className="relative p-6 -mt-12">
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>
        )}

        {/* Link indicator */}
        <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px hsl(350 85% 55% / 0.1), 0 0 40px hsl(350 85% 55% / 0.1)"
        }}
      />
    </a>
  );
}
