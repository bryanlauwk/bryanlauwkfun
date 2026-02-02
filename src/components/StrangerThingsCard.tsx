import { useState, useMemo } from "react";
import { ArrowRight, Radio } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
  isFocused?: boolean;
}

// Christmas light colors
const LIGHT_COLORS = [
  "hsl(0, 100%, 55%)",
  "hsl(199, 92%, 70%)",
  "hsl(145, 100%, 68%)",
  "hsl(45, 100%, 60%)",
  "hsl(25, 100%, 50%)",
];

function generateLightPositions(count: number) {
  const positions: { top?: string; bottom?: string; left?: string; right?: string }[] = [];
  const perSide = Math.floor(count / 4);
  
  for (let i = 0; i < perSide; i++) {
    positions.push({ top: "-4px", left: `${(i + 0.5) * (100 / perSide)}%` });
  }
  for (let i = 0; i < perSide; i++) {
    positions.push({ right: "-4px", top: `${(i + 0.5) * (100 / perSide)}%` });
  }
  for (let i = 0; i < perSide; i++) {
    positions.push({ bottom: "-4px", right: `${(i + 0.5) * (100 / perSide)}%` });
  }
  for (let i = 0; i < perSide; i++) {
    positions.push({ left: "-4px", bottom: `${(i + 0.5) * (100 / perSide)}%` });
  }
  
  return positions;
}

function ChristmasLights({ isActive }: { isActive: boolean }) {
  const positions = useMemo(() => generateLightPositions(20), []);
  
  return (
    <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-christmas-light"
          style={{
            ...pos,
            backgroundColor: LIGHT_COLORS[i % LIGHT_COLORS.length],
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: isActive ? `0 0 8px 3px ${LIGHT_COLORS[i % LIGHT_COLORS.length]}` : `0 0 4px 1px ${LIGHT_COLORS[i % LIGHT_COLORS.length]}`,
          }}
        />
      ))}
    </div>
  );
}

export function StrangerThingsCard({ project, index, isFocused = false }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = isHovered || isFocused;
  const { playElectricalCrackle, playPowerSurge } = useStrangerSFX();

  const handleMouseEnter = () => {
    setIsHovered(true);
    playElectricalCrackle();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    playPowerSurge();
  };

  // Get the first letter for the monogram
  const monogram = project.title.charAt(0).toUpperCase();
  
  // Episode number style
  const episodeNum = String(index + 1).padStart(2, "0");

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`relative bg-card/80 backdrop-blur-sm border rounded-sm overflow-hidden transition-all duration-500 animate-fade-in-up ${isActive ? 'border-primary/50 ring-2 ring-primary/30' : 'border-border'}`}>
        
        <ChristmasLights isActive={isActive} />
        
        {/* VHS distortion on hover/focus */}
        <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <div className="vhs-scanlines" />
          <div className="vhs-tracking" />
        </div>

        {/* Upside Down overlay */}
        <div className={`absolute inset-0 pointer-events-none z-30 bg-[hsl(220,100%,50%)] mix-blend-overlay transition-opacity duration-500 ${isActive ? 'opacity-15' : 'opacity-0'}`} />

        {/* Header with episode number */}
        <div className="px-5 pt-5 pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Drop #{episodeNum}
            </span>
            <Radio className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-primary animate-electrical-flicker' : 'text-muted-foreground'}`} />
          </div>
        </div>

        {/* Main content - Typography focused */}
        <div className="p-5 min-h-[180px] flex flex-col">
          {/* Large decorative monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span 
              className={`font-serif text-[120px] font-bold leading-none transition-all duration-500 ${isActive ? 'text-primary/10 stranger-glow' : 'text-muted/5'}`}
            >
              {monogram}
            </span>
          </div>
          
          {/* Title */}
          <h3 className={`relative z-10 font-serif text-2xl md:text-3xl font-bold uppercase tracking-wider mb-3 transition-all duration-300 ${isActive ? 'stranger-glow' : 'text-foreground'}`}>
            {project.title}
          </h3>
          
          {/* Decorative line */}
          <div className={`w-16 h-0.5 mb-4 transition-all duration-500 ${isActive ? 'bg-primary w-full' : 'bg-border'}`} />
          
          {/* Description */}
          {project.description && (
            <p className="relative z-10 text-muted-foreground text-sm leading-relaxed font-mono tracking-tight flex-1">
              {project.description}
            </p>
          )}
          
          {/* CTA */}
          <div className="relative z-10 flex items-center gap-2 mt-4 text-primary font-mono text-xs uppercase tracking-widest group-hover:tracking-[0.15em] transition-all duration-300">
            <span className="animate-electrical-flicker">Check it out</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Bottom glow */}
        <div className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/15 to-transparent pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </a>
  );
}
