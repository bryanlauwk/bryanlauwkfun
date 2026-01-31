import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type HotspotVariant = "tablet" | "watch" | "lantern" | "scroll";

interface IllustrationHotspotProps {
  position: { x: string; y: string };
  size: { width: string; height: string };
  variant: HotspotVariant;
  title: string;
  description?: string;
  href: string;
  delay?: number;
}

const variantStyles: Record<HotspotVariant, {
  glowClass: string;
  hoverGlow: string;
  animation: string;
}> = {
  tablet: {
    glowClass: "shadow-[0_0_20px_hsl(180_70%_58%/0.3)]",
    hoverGlow: "hover:shadow-[0_0_40px_hsl(180_70%_58%/0.6)]",
    animation: "animate-pulse",
  },
  watch: {
    glowClass: "shadow-[0_0_20px_hsl(45_70%_47%/0.3)]",
    hoverGlow: "hover:shadow-[0_0_40px_hsl(45_70%_47%/0.6)]",
    animation: "animate-glow-pulse",
  },
  lantern: {
    glowClass: "shadow-[0_0_25px_hsl(45_80%_50%/0.4)]",
    hoverGlow: "hover:shadow-[0_0_50px_hsl(45_80%_50%/0.7)]",
    animation: "animate-lantern-flicker",
  },
  scroll: {
    glowClass: "shadow-[0_0_15px_hsl(40_30%_70%/0.3)]",
    hoverGlow: "hover:shadow-[0_0_30px_hsl(40_30%_70%/0.5)]",
    animation: "animate-parchment-float",
  },
};

export function IllustrationHotspot({
  position,
  size,
  variant,
  title,
  description,
  href,
  delay = 0,
}: IllustrationHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = variantStyles[variant];

  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "absolute rounded-full cursor-pointer transition-all duration-300 ease-out",
              "bg-transparent border-2 border-transparent",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              styles.glowClass,
              styles.hoverGlow,
              styles.animation,
              isHovered && "scale-110 border-primary/30"
            )}
            style={{
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              transform: "translate(-50%, -50%)",
              animationDelay: `${delay}s`,
            }}
            aria-label={`View project: ${title}`}
          >
            {/* Subtle inner glow indicator */}
            <span 
              className={cn(
                "absolute inset-2 rounded-full transition-opacity duration-300",
                "bg-gradient-radial from-primary/10 to-transparent",
                isHovered ? "opacity-100" : "opacity-50"
              )}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={12}
          className={cn(
            "px-4 py-3 max-w-[200px]",
            "bg-background/95 backdrop-blur-md",
            "border border-primary/30",
            "shadow-lg shadow-primary/10"
          )}
        >
          <div className="text-center">
            <p className="font-serif text-base font-semibold text-foreground leading-tight">
              {title}
            </p>
            {description && (
              <p className="mt-1 font-body text-sm text-muted-foreground italic">
                {description}
              </p>
            )}
            <p className="mt-2 font-body text-xs text-primary">
              Click to explore →
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
