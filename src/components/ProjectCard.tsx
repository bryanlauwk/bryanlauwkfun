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
        "group relative block aspect-square overflow-hidden rounded-2xl transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
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
            <span className="text-6xl opacity-20">🎮</span>
          </div>
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>

      {/* Always visible title below card */}
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
    </a>
  );
}
