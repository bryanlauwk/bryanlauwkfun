import { useState, useEffect } from "react";
import { HotspotCard } from "./HotspotCard";
import { ThemeToggle } from "./ThemeToggle";
import { useCyclingText } from "@/hooks/useCyclingText";
import { usePublicProjects } from "@/hooks/useProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import the existing octopus background as fallback
import octopusBackground from "@/assets/octopus-background.png";

const taglines = [
  "messing in the playground",
  "games and stuff by Bryan",
  "questionable decisions",
  "things that probably work",
  "bugs disguised as features",
  "procrastination projects",
  "powered by caffeine",
];

// Hotspot positions - these are percentage-based for responsive scaling
// Positioned to overlay on the "portal frames" in the illustration
const hotspotPositions = [
  { x: "8%", y: "35%", width: "24%", height: "40%" },    // Left portal
  { x: "38%", y: "55%", width: "24%", height: "35%" },   // Center bottom
  { x: "68%", y: "35%", width: "24%", height: "40%" },   // Right portal
];

// Mobile positions - stacked at bottom
const mobileHotspotPositions = [
  { x: "5%", y: "55%", width: "28%", height: "18%" },
  { x: "36%", y: "55%", width: "28%", height: "18%" },
  { x: "67%", y: "55%", width: "28%", height: "18%" },
];

export function ImmersiveCanvas() {
  const { data: projects, isLoading: projectsLoading } = usePublicProjects();
  const [backgroundImage, setBackgroundImage] = useState<string>(octopusBackground);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const { displayText: currentTagline } = useCyclingText(taglines, 3000);
  const isMobile = useIsMobile();

  // Subtle parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const generateNewBackground = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-background');
      
      if (error) {
        console.error("Error generating background:", error);
        toast.error("Failed to generate new background");
        return;
      }

      if (data?.base64) {
        setBackgroundImage(data.base64);
        toast.success("New background generated!");
      } else if (data?.imageUrl) {
        setBackgroundImage(data.imageUrl);
        toast.success("New background generated!");
      }
    } catch (err) {
      console.error("Generate background error:", err);
      toast.error("Failed to generate background");
    } finally {
      setIsGenerating(false);
    }
  };

  const displayProjects = projects || [];
  const positions = isMobile ? mobileHotspotPositions : hotspotPositions;

  // Calculate parallax offset
  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${-parallaxX}px, ${-parallaxY}px) scale(1.1)`,
        }}
      >
        <img
          src={backgroundImage}
          alt="Immersive octopus background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />
      </div>

      {/* Branding Overlay */}
      <div className="absolute inset-x-0 top-0 z-20 pt-8 md:pt-12 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground drop-shadow-lg animate-fade-in">
          bryanlauwk.fun
        </h1>
        <p className="mt-3 text-base md:text-lg text-foreground/80 font-medium tracking-wide">
          <span className="inline-block min-w-[200px]">
            {currentTagline}
            <span className="animate-pulse">|</span>
          </span>
        </p>
      </div>

      {/* Project Hotspots */}
      <div className="absolute inset-0 z-10">
        {projectsLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : displayProjects.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-foreground/60 bg-background/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              No projects yet
            </p>
          </div>
        ) : (
          displayProjects.slice(0, 3).map((project, index) => {
            const pos = positions[index];
            if (!pos) return null;
            
            return (
              <HotspotCard
                key={project.id}
                title={project.title}
                description={project.description || undefined}
                imageUrl={project.image_url || undefined}
                href={project.href}
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: pos.width,
                  height: pos.height,
                }}
              />
            );
          })
        )}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-30">
        <ThemeToggle />
      </div>

      {/* Generate New Background Button (for admin/dev) */}
      <div className="absolute bottom-4 right-4 z-30">
        <Button
          variant="ghost"
          size="sm"
          onClick={generateNewBackground}
          disabled={isGenerating}
          className="bg-background/50 backdrop-blur-sm hover:bg-background/70 text-xs"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="w-3 h-3 mr-1" />
              New BG
            </>
          )}
        </Button>
      </div>

      {/* Footer Credit */}
      <div className="absolute bottom-4 left-4 z-20">
        <p className="text-xs text-foreground/50">
          © {new Date().getFullYear()} Bryan Lau
        </p>
      </div>
    </div>
  );
}
