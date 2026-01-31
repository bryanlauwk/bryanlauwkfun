import { cn } from "@/lib/utils";

interface IllustrationProps {
  className?: string;
  opacity?: number;
}

// Constellation pattern with connected dots
export const ConstellationPattern = ({ className, opacity = 0.3 }: IllustrationProps) => (
  <svg
    viewBox="0 0 200 200"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    {/* Stars */}
    <circle cx="30" cy="40" r="2" fill="hsl(var(--accent))" className="animate-pulse" />
    <circle cx="80" cy="30" r="1.5" fill="hsl(var(--accent))" />
    <circle cx="120" cy="60" r="2" fill="hsl(var(--accent))" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
    <circle cx="160" cy="40" r="1" fill="hsl(var(--accent))" />
    <circle cx="50" cy="90" r="1.5" fill="hsl(var(--accent))" />
    <circle cx="100" cy="100" r="2.5" fill="hsl(var(--accent))" className="animate-pulse" style={{ animationDelay: "1s" }} />
    <circle cx="150" cy="110" r="1" fill="hsl(var(--accent))" />
    <circle cx="40" cy="150" r="2" fill="hsl(var(--accent))" />
    <circle cx="90" cy="160" r="1.5" fill="hsl(var(--accent))" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
    <circle cx="140" cy="170" r="2" fill="hsl(var(--accent))" />
    
    {/* Constellation lines */}
    <path
      d="M30 40 L80 30 L120 60 M50 90 L100 100 L150 110 M40 150 L90 160 L140 170"
      stroke="hsl(var(--accent))"
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
  </svg>
);

// Floating clock illustration
export const ClockIllustration = ({ className, opacity = 0.4 }: IllustrationProps) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    <circle cx="50" cy="50" r="40" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
    <circle cx="50" cy="50" r="35" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="none" />
    <circle cx="50" cy="50" r="3" fill="hsl(var(--accent))" />
    {/* Hour marks */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <line
        key={angle}
        x1={50 + 32 * Math.cos((angle * Math.PI) / 180)}
        y1={50 + 32 * Math.sin((angle * Math.PI) / 180)}
        x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
        stroke="hsl(var(--accent))"
        strokeWidth="1"
      />
    ))}
    {/* Clock hands */}
    <line x1="50" y1="50" x2="50" y2="25" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="50" x2="70" y2="50" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Compass illustration
export const CompassIllustration = ({ className, opacity = 0.4 }: IllustrationProps) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    <circle cx="50" cy="50" r="40" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="35" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="2 4" />
    {/* Cardinal directions */}
    <path d="M50 15 L55 45 L50 50 L45 45 Z" fill="hsl(var(--primary))" />
    <path d="M50 85 L55 55 L50 50 L45 55 Z" fill="hsl(var(--accent))" fillOpacity="0.5" />
    <path d="M15 50 L45 45 L50 50 L45 55 Z" fill="hsl(var(--accent))" fillOpacity="0.5" />
    <path d="M85 50 L55 45 L50 50 L55 55 Z" fill="hsl(var(--accent))" fillOpacity="0.5" />
    <circle cx="50" cy="50" r="4" fill="hsl(var(--accent))" />
  </svg>
);

// Lantern illustration
export const LanternIllustration = ({ className, opacity = 0.4 }: IllustrationProps) => (
  <svg
    viewBox="0 0 60 100"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    {/* Hook */}
    <path d="M30 5 Q45 5 45 15 L45 20" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
    {/* Top cap */}
    <path d="M20 20 L40 20 L38 30 L22 30 Z" fill="hsl(var(--accent))" fillOpacity="0.3" stroke="hsl(var(--accent))" />
    {/* Body */}
    <path d="M22 30 Q15 50 22 70 L38 70 Q45 50 38 30" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--accent))" />
    {/* Glow */}
    <ellipse cx="30" cy="50" rx="8" ry="12" fill="hsl(var(--accent))" fillOpacity="0.3" className="animate-pulse" />
    {/* Bottom cap */}
    <path d="M22 70 L38 70 L35 80 L25 80 Z" fill="hsl(var(--accent))" fillOpacity="0.3" stroke="hsl(var(--accent))" />
  </svg>
);

// Mystical symbol / glyph
export const MysticalGlyph = ({ className, opacity = 0.25 }: IllustrationProps) => (
  <svg
    viewBox="0 0 80 80"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    <circle cx="40" cy="40" r="30" stroke="hsl(var(--accent))" strokeWidth="1" />
    <circle cx="40" cy="40" r="20" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    <circle cx="40" cy="40" r="10" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    {/* Cross lines */}
    <line x1="40" y1="5" x2="40" y2="75" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    <line x1="5" y1="40" x2="75" y2="40" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    {/* Diagonal */}
    <line x1="12" y1="12" x2="68" y2="68" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    <line x1="68" y1="12" x2="12" y2="68" stroke="hsl(var(--accent))" strokeWidth="0.5" />
    {/* Center dot */}
    <circle cx="40" cy="40" r="3" fill="hsl(var(--accent))" />
  </svg>
);

// Bubble cluster
export const BubbleCluster = ({ className, opacity = 0.2 }: IllustrationProps) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    <circle cx="30" cy="30" r="15" stroke="hsl(var(--accent))" strokeWidth="1" fill="hsl(var(--accent))" fillOpacity="0.1" />
    <circle cx="60" cy="25" r="10" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="hsl(var(--accent))" fillOpacity="0.05" />
    <circle cx="45" cy="55" r="20" stroke="hsl(var(--accent))" strokeWidth="1" fill="hsl(var(--accent))" fillOpacity="0.1" />
    <circle cx="75" cy="50" r="8" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="hsl(var(--accent))" fillOpacity="0.05" />
    <circle cx="25" cy="70" r="12" stroke="hsl(var(--accent))" strokeWidth="0.5" fill="hsl(var(--accent))" fillOpacity="0.1" />
    <circle cx="70" cy="75" r="15" stroke="hsl(var(--accent))" strokeWidth="1" fill="hsl(var(--accent))" fillOpacity="0.1" />
  </svg>
);

// Organic tentacle curves
export const OrganicCurves = ({ className, opacity = 0.15 }: IllustrationProps) => (
  <svg
    viewBox="0 0 200 200"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    <path
      d="M20 180 Q60 140 40 100 Q20 60 60 40 Q100 20 140 60"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M180 20 Q140 60 160 100 Q180 140 140 160 Q100 180 60 140"
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />
    <path
      d="M100 0 Q120 40 100 80 Q80 120 100 160 Q120 200 100 200"
      stroke="hsl(var(--accent))"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="4 8"
    />
  </svg>
);

// Star burst
export const StarBurst = ({ className, opacity = 0.3 }: IllustrationProps) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-full h-full", className)}
    fill="none"
    style={{ opacity }}
  >
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
        stroke="hsl(var(--accent))"
        strokeWidth={i % 2 === 0 ? 1.5 : 0.5}
        strokeLinecap="round"
      />
    ))}
    <circle cx="50" cy="50" r="8" fill="hsl(var(--accent))" fillOpacity="0.3" />
    <circle cx="50" cy="50" r="3" fill="hsl(var(--accent))" />
  </svg>
);
