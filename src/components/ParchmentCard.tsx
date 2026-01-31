import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ParchmentCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  delay?: number;
  className?: string;
}

export function ParchmentCard({
  title,
  description,
  imageUrl,
  href,
  delay = 0,
  className,
}: ParchmentCardProps) {
  const isDisabled = href === "#";

  if (isDisabled) {
    return (
      <div
        className={cn(
          "relative w-full md:w-48 lg:w-56 p-4 rounded-lg cursor-not-allowed",
          "parchment-bg border border-border/50",
          "opacity-60 animate-fade-in",
          className
        )}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="text-center">
          <p className="font-display text-sm text-card-foreground/60 tracking-wide">
            Coming Soon
          </p>
          <h3 className="mt-2 font-serif text-base font-medium text-card-foreground/80 line-clamp-1">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative w-full md:w-48 lg:w-56 overflow-hidden rounded-lg",
        "parchment-bg border border-border/50",
        "transition-all duration-500 ease-out",
        "hover:scale-105 hover:shadow-xl hover:border-primary/40",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "animate-parchment-float animate-fade-in",
        className
      )}
      style={{ 
        animationDelay: `${delay}s`,
        boxShadow: '4px 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      {/* Card Content */}
      <div className="relative p-4">
        {/* Optional Image */}
        {imageUrl && (
          <div className="mb-3 overflow-hidden rounded border border-border/30">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-base md:text-lg font-semibold text-card-foreground tracking-wide line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mt-1 font-body text-sm text-card-foreground/70 line-clamp-2 italic">
            {description}
          </p>
        )}

        {/* Arrow indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center">
            <ArrowUpRight className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg border-2 border-primary/30" />
    </a>
  );
}
