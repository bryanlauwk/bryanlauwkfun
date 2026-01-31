import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface StrangerThingsCardProps {
  project: Tables<"projects">;
  index: number;
}

// Christmas light colors - warm and nostalgic
const LIGHT_COLORS = [
  "hsl(0, 100%, 55%)",    // Red
  "hsl(199, 92%, 70%)",   // Blue  
  "hsl(145, 100%, 68%)",  // Green
  "hsl(45, 100%, 60%)",   // Yellow/Gold
  "hsl(25, 100%, 50%)",   // Orange
];

// Generates positions for lights around the card border
function generateLightPositions(count: number) {
  const positions: { top?: string; bottom?: string; left?: string; right?: string }[] = [];
  const perSide = Math.floor(count / 4);
  
  // Top edge
  for (let i = 0; i < perSide; i++) {
    positions.push({ top: "-4px", left: `${(i + 0.5) * (100 / perSide)}%` });
  }
  // Right edge
  for (let i = 0; i < perSide; i++) {
    positions.push({ right: "-4px", top: `${(i + 0.5) * (100 / perSide)}%` });
  }
  // Bottom edge
  for (let i = 0; i < perSide; i++) {
    positions.push({ bottom: "-4px", right: `${(i + 0.5) * (100 / perSide)}%` });
  }
  // Left edge
  for (let i = 0; i < perSide; i++) {
    positions.push({ left: "-4px", bottom: `${(i + 0.5) * (100 / perSide)}%` });
  }
  
  return positions;
}

function ChristmasLights() {
  const positions = useMemo(() => generateLightPositions(24), []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-christmas-light"
          style={{
            ...pos,
            backgroundColor: LIGHT_COLORS[i % LIGHT_COLORS.length],
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: `0 0 6px 2px ${LIGHT_COLORS[i % LIGHT_COLORS.length]}`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      size: 2 + Math.random() * 3,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-muted-foreground/40 rounded-full animate-float-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}
    </div>
  );
}

export function StrangerThingsCard({ project, index }: StrangerThingsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Main card container */}
      <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 animate-fade-in-up">
        
        {/* Christmas lights border */}
        <ChristmasLights />
        
        {/* Floating particles (visible on hover) */}
        <FloatingParticles />
        
        {/* VHS distortion overlay on hover */}
        <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="vhs-scanlines" />
          <div className="vhs-tracking" />
        </div>
        
        {/* Upside Down color shift overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none z-30 bg-[hsl(220,100%,50%)] mix-blend-overlay transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`}
        />

        {/* Image section */}
        <div className="relative aspect-video overflow-hidden">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105 chromatic-aberration' : ''}`}
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <span className="text-4xl font-serif text-primary-foreground/80 stranger-glow">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Film grain overlay */}
          <div className="absolute inset-0 film-grain opacity-30" />
        </div>

        {/* Content section */}
        <div className="p-5 relative">
          {/* Electrical flicker border */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-electrical-flicker" />
          
          {/* Title with neon glow */}
          <h3 className="font-serif text-xl font-bold uppercase tracking-wider mb-2 stranger-glow animate-electrical-flicker">
            {project.title}
          </h3>
          
          {/* Description */}
          {project.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-mono tracking-tight">
              {project.description}
            </p>
          )}
          
          {/* CTA Button */}
          <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
            <span className="animate-electrical-flicker">Enter the Void</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* Bottom glow effect on hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </a>
  );
}
