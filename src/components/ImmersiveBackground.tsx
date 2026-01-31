import { useScrollProgress } from "@/hooks/useScrollProgress";
import {
  ConstellationPattern,
  ClockIllustration,
  CompassIllustration,
  LanternIllustration,
  MysticalGlyph,
  BubbleCluster,
  OrganicCurves,
  StarBurst,
} from "./FloatingIllustrations";

interface BackgroundElement {
  id: string;
  component: React.ComponentType<{ className?: string; opacity?: number }>;
  x: number;
  y: number;
  size: number;
  layer: 1 | 2 | 3; // 1 = distant, 2 = middle, 3 = near
  opacity: number;
  rotation?: number;
}

const backgroundElements: BackgroundElement[] = [
  // Layer 1 - Distant (slowest parallax)
  { id: "const-1", component: ConstellationPattern, x: 5, y: 10, size: 300, layer: 1, opacity: 0.15 },
  { id: "const-2", component: ConstellationPattern, x: 70, y: 5, size: 250, layer: 1, opacity: 0.1, rotation: 45 },
  { id: "glyph-1", component: MysticalGlyph, x: 85, y: 30, size: 80, layer: 1, opacity: 0.12 },
  { id: "glyph-2", component: MysticalGlyph, x: 10, y: 60, size: 60, layer: 1, opacity: 0.1, rotation: 30 },
  { id: "const-3", component: ConstellationPattern, x: 50, y: 70, size: 200, layer: 1, opacity: 0.12, rotation: 180 },

  // Layer 2 - Middle (medium parallax)
  { id: "clock-1", component: ClockIllustration, x: 8, y: 25, size: 100, layer: 2, opacity: 0.2 },
  { id: "compass-1", component: CompassIllustration, x: 85, y: 55, size: 90, layer: 2, opacity: 0.18 },
  { id: "lantern-1", component: LanternIllustration, x: 90, y: 15, size: 70, layer: 2, opacity: 0.22 },
  { id: "curves-1", component: OrganicCurves, x: 20, y: 80, size: 200, layer: 2, opacity: 0.1 },
  { id: "star-1", component: StarBurst, x: 75, y: 80, size: 60, layer: 2, opacity: 0.15 },

  // Layer 3 - Near (fastest parallax)
  { id: "bubble-1", component: BubbleCluster, x: 3, y: 45, size: 120, layer: 3, opacity: 0.15 },
  { id: "bubble-2", component: BubbleCluster, x: 80, y: 40, size: 80, layer: 3, opacity: 0.12 },
  { id: "star-2", component: StarBurst, x: 15, y: 90, size: 40, layer: 3, opacity: 0.2 },
  { id: "glyph-3", component: MysticalGlyph, x: 60, y: 95, size: 50, layer: 3, opacity: 0.15, rotation: 60 },
];

// Parallax multipliers for each layer
const parallaxMultipliers = {
  1: 0.05, // Distant - slowest
  2: 0.15, // Middle
  3: 0.3,  // Near - fastest
};

export function ImmersiveBackground() {
  const { scrollY } = useScrollProgress();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"
        style={{
          background: `linear-gradient(
            to bottom,
            hsl(var(--background)) 0%,
            hsl(var(--background)) 50%,
            hsl(var(--background)) 100%
          )`,
        }}
      />

      {/* Subtle radial glow in center */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20"
        style={{
          background: `radial-gradient(
            ellipse at center,
            hsl(var(--primary) / 0.1) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* Floating elements with parallax */}
      {backgroundElements.map((element) => {
        const Component = element.component;
        const parallaxOffset = scrollY * parallaxMultipliers[element.layer];
        
        return (
          <div
            key={element.id}
            className="absolute transition-transform duration-100 ease-out will-change-transform"
            style={{
              left: `${element.x}%`,
              top: `calc(${element.y}% - ${parallaxOffset}px)`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
            }}
          >
            <Component opacity={element.opacity} />
          </div>
        );
      })}

      {/* Top fade overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
