import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ConstellationOverlay } from "./ConstellationOverlay";
import { IllustrationHotspot } from "./IllustrationHotspot";
import { AbyssalLogo } from "./AbyssalLogo";
import { usePublicProjects } from "@/hooks/useProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";
import abyssalBackground from "@/assets/abyssal-background.png";

// Hotspot configuration - positions mapped to illustration objects
const hotspotConfig = [
  {
    position: { x: "72%", y: "42%" },
    size: { width: "80px", height: "80px" },
    variant: "tablet" as const,
    projectIndex: 0,
  },
  {
    position: { x: "28%", y: "48%" },
    size: { width: "70px", height: "70px" },
    variant: "watch" as const,
    projectIndex: 1,
  },
  {
    position: { x: "82%", y: "68%" },
    size: { width: "75px", height: "75px" },
    variant: "lantern" as const,
    projectIndex: 2,
  },
];

export function AbyssalCanvas() {
  const { data: projects, isLoading } = usePublicProjects();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const parallaxX = (mousePos.x - 0.5) * 15;
  const parallaxY = (mousePos.y - 0.5) * 15;

  const displayProjects = projects || [];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${-parallaxX}px, ${-parallaxY}px) scale(1.08)`,
        }}
      >
        <img
          src={abyssalBackground}
          alt="Abyssal Explorer - Mystical octopus illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />

      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay pointer-events-none" />

      {/* Constellation decorations */}
      <ConstellationOverlay />

      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4 md:px-10 md:py-6">
        <AbyssalLogo />
        <ThemeToggle />
      </header>

      {/* Hero Text */}
      <div className="absolute inset-x-0 top-[12%] md:top-[10%] z-20 text-center px-4">
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-wide animate-fade-in glow-gold">
          Explore the Abyss
        </h1>
        <p className="mt-3 md:mt-4 font-body text-lg md:text-xl lg:text-2xl text-foreground/80 italic tracking-wide animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Where imagination meets the deep
        </p>
      </div>

      {/* Interactive Hotspots - positioned over illustration objects */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
        }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="absolute bottom-[15%] inset-x-0 flex items-center justify-center pointer-events-auto">
            <p className="text-foreground/60 font-body text-lg italic">
              Treasures yet to be discovered...
            </p>
          </div>
        ) : (
          <>
            {hotspotConfig.map((config, index) => {
              const project = displayProjects[config.projectIndex];
              if (!project) return null;
              return (
                <div key={project.id} className="pointer-events-auto">
                  <IllustrationHotspot
                    position={config.position}
                    size={config.size}
                    variant={config.variant}
                    title={project.title}
                    description={project.description || undefined}
                    href={project.href}
                    delay={index * 0.3}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 inset-x-0 z-20 text-center pb-4 md:pb-6">
        <p className="font-body text-sm md:text-base text-foreground/50 italic tracking-wider">
          Always experimenting
        </p>
        <p className="mt-1 font-body text-xs text-foreground/30">
          © {new Date().getFullYear()} Bryan Lau
        </p>
      </footer>
    </div>
  );
}
