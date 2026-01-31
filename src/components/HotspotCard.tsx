import { cn } from "@/lib/utils";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface HotspotCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HotspotCard({
  title,
  description,
  imageUrl,
  href,
  className,
  style,
}: HotspotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = href === "#";

  if (isDisabled) {
    return (
      <div
        className={cn(
          "absolute rounded-xl overflow-hidden cursor-not-allowed",
          "bg-card/20 backdrop-blur-md border border-border/30",
          "transition-all duration-300",
          "animate-glow-pulse",
          className
        )}
        style={style}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
          {imageUrl && (
            <div className="w-full h-full absolute inset-0 opacity-40">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="relative z-10 text-center">
            <p className="text-xs font-medium text-foreground/70 bg-background/50 px-2 py-1 rounded">
              Coming Soon
            </p>
          </div>
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
        "absolute rounded-xl overflow-hidden group",
        "bg-card/30 backdrop-blur-md border border-primary/30",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:border-primary/60 hover:bg-card/50",
        "hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent",
        "animate-glow-pulse",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isHovered ? "scale-110 opacity-90" : "scale-100 opacity-60"
            )} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "relative z-10 h-full flex flex-col justify-end p-3 transition-all duration-300",
        isHovered ? "opacity-100" : "opacity-80"
      )}>
        <div className="flex items-end justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-sm font-semibold text-foreground truncate transition-all duration-300",
              isHovered ? "text-primary-foreground drop-shadow-lg" : ""
            )}>
              {title}
            </h3>
            {description && isHovered && (
              <p className="text-xs text-foreground/70 line-clamp-2 mt-1 animate-fade-in">
                {description}
              </p>
            )}
          </div>
          
          <div className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center",
            "transition-all duration-300",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}>
            <ArrowUpRight className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Glow Ring */}
      <div className={cn(
        "absolute inset-0 rounded-xl border-2 transition-all duration-500 pointer-events-none",
        isHovered 
          ? "border-primary/60 shadow-[inset_0_0_20px_hsl(var(--primary)/0.3)]" 
          : "border-transparent"
      )} />
    </a>
  );
}
