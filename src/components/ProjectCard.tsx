import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  color?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  href,
  color = "bg-secondary",
  className,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-2xl transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      style={{ aspectRatio: "285 / 107" }}
    >
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-300 group-hover:scale-105",
          color
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl opacity-20">🎮</span>
          </div>
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content - Always visible on wide cards */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="text-base font-bold text-primary-foreground drop-shadow-lg md:text-lg">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-primary-foreground/80 drop-shadow-md md:text-sm">
              {description}
            </p>
          )}
        </div>
        
        {/* Arrow indicator */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          <span className="text-primary-foreground">→</span>
        </div>
      </div>
    </a>
  );
}
