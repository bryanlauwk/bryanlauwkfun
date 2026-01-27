import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  color?: string;
  className?: string;
  isPlaceholder?: boolean;
  index?: number;
  showTextOverlay?: boolean;
}

const cardGradients = [
  "from-primary/90 to-primary",
  "from-accent/90 to-accent",
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-slate-600 to-slate-700",
];

export function ProjectCard({
  title,
  description,
  imageUrl,
  href,
  color,
  className,
  isPlaceholder = false,
  index = 0,
  showTextOverlay = true,
}: ProjectCardProps) {
  const isDisabled = isPlaceholder || href === "#";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass = color?.includes("gradient") 
    ? color 
    : `bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`;

  // Subtle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDisabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / centerY * 4;
    const tiltY = (centerX - x) / centerX * 4;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardContent = (
    <>
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500",
          !isDisabled && "group-hover:scale-[1.02]",
          gradientClass
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
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/10" />
          </div>
        )}
      </div>

      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Coming Soon Badge */}
      {isPlaceholder && showTextOverlay && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-background/90 text-foreground text-xs backdrop-blur-sm border-0">
            Coming Soon
          </Badge>
        </div>
      )}

      {/* Content */}
      {showTextOverlay && (
        <div className="absolute inset-0 flex items-end p-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-white/80 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          
          {/* Arrow indicator */}
          {!isDisabled && (
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            )}>
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      )}
    </>
  );

  const cardStyle = {
    aspectRatio: "16 / 9",
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: "transform 0.15s ease-out",
  };

  if (isDisabled) {
    return (
      <div
        ref={cardRef}
        className={cn(
          "group relative block overflow-hidden rounded-xl cursor-default opacity-70",
          className
        )}
        style={cardStyle}
        aria-label={`${title} - Coming soon`}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-xl transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div ref={cardRef} className="absolute inset-0">
        {cardContent}
      </div>
    </a>
  );
}
