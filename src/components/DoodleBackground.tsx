import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Doodle {
  id: string;
  type: "star" | "heart" | "lightning" | "spiral" | "diamond" | "squiggle";
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

const doodles: Doodle[] = [
  { id: "1", type: "star", x: 8, y: 12, size: 16, opacity: 0.25, delay: 0 },
  { id: "2", type: "squiggle", x: 85, y: 18, size: 24, opacity: 0.2, delay: 0.5 },
  { id: "3", type: "heart", x: 5, y: 35, size: 14, opacity: 0.25, delay: 1 },
  { id: "4", type: "lightning", x: 90, y: 45, size: 16, opacity: 0.2, delay: 1.5 },
  { id: "5", type: "spiral", x: 88, y: 75, size: 16, opacity: 0.2, delay: 2 },
  { id: "6", type: "diamond", x: 25, y: 65, size: 10, opacity: 0.25, delay: 2.5 },
  { id: "7", type: "star", x: 75, y: 85, size: 12, opacity: 0.2, delay: 3 },
  { id: "8", type: "heart", x: 92, y: 25, size: 10, opacity: 0.15, delay: 0.3 },
];

const DoodleSVG = ({ 
  type, 
  isHovered, 
  isNear 
}: { 
  type: Doodle["type"]; 
  isHovered: boolean;
  isNear: boolean;
}) => {
  const baseClass = cn(
    "transition-all duration-300",
    isHovered && "scale-125",
    isNear && !isHovered && "scale-110 opacity-100"
  );

  switch (type) {
    case "star":
      return (
        <svg viewBox="0 0 50 50" className={cn(baseClass, isHovered && "animate-spin-slow")}>
          <path 
            d="M25 5 L27 20 L25 15 L23 20 Z" 
            stroke="hsl(var(--primary))" 
            fill="hsl(var(--primary))" 
            fillOpacity="0.3"
            strokeWidth="2"
          />
          <path d="M10 25 L25 23 L20 25 L25 27 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="2" />
          <circle cx="15" cy="10" r="3" fill="#FFE66D" />
          <circle cx="38" cy="15" r="2" fill="#4ECDC4" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 40 40" className={cn(baseClass, isHovered && "animate-beat")}>
          <path 
            d="M20 35 Q5 20, 10 10 Q15 5, 20 12 Q25 5, 30 10 Q35 20, 20 35" 
            fill="#FF6B6B" 
            fillOpacity="0.7"
            stroke="#FF6B6B"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "lightning":
      return (
        <svg viewBox="0 0 40 50" className={cn(baseClass, isHovered && "animate-zap")}>
          <path 
            d="M22 5 L10 25 L18 25 L15 45 L32 22 L23 22 Z" 
            fill="#FFE66D" 
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "spiral":
      return (
        <svg viewBox="0 0 50 50" className={cn(baseClass, isHovered && "animate-spin-slow")}>
          <path 
            d="M25 25 Q30 25, 30 20 Q30 15, 25 15 Q18 15, 18 22 Q18 32, 28 32 Q40 32, 40 20 Q40 8, 25 8" 
            fill="none"
            stroke="#4ECDC4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 30 30" className={cn(baseClass, isHovered && "animate-bounce")}>
          <path 
            d="M15 3 L27 15 L15 27 L3 15 Z" 
            fill="#95E1D3" 
            fillOpacity="0.6"
            stroke="hsl(var(--foreground))"
            strokeWidth="1"
          />
        </svg>
      );
    case "squiggle":
      return (
        <svg viewBox="0 0 80 60" className={baseClass}>
          <path 
            d="M10 30 Q25 10, 40 30 Q55 50, 70 30" 
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="70" cy="30" r="6" fill="#4ECDC4" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
};

export const DoodleBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isNear = (doodle: Doodle) => {
    const distance = Math.sqrt(
      Math.pow(mousePos.x - doodle.x, 2) + Math.pow(mousePos.y - doodle.y, 2)
    );
    return distance < 15;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((doodle) => {
        // Parallax effect based on scroll
        const parallaxOffset = scrollY * (doodle.delay * 0.1);
        const isHovered = hoveredId === doodle.id;
        const near = isNear(doodle);

        return (
          <div
            key={doodle.id}
            className="absolute pointer-events-auto cursor-pointer transition-all duration-500"
            style={{
              left: `${doodle.x}%`,
              top: `calc(${doodle.y}% - ${parallaxOffset}px)`,
              width: `${doodle.size * 4}px`,
              height: `${doodle.size * 4}px`,
              opacity: near || isHovered ? doodle.opacity * 2 : doodle.opacity,
              animationDelay: `${doodle.delay}s`,
            }}
            onMouseEnter={() => setHoveredId(doodle.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <DoodleSVG type={doodle.type} isHovered={isHovered} isNear={near} />
          </div>
        );
      })}

      {/* Floating dots */}
      <div 
        className="absolute w-4 h-4 rounded-full opacity-25 animate-float" 
        style={{ 
          left: "25%", 
          top: `calc(30% - ${scrollY * 0.05}px)`,
          backgroundColor: "hsl(var(--primary))" 
        }} 
      />
      <div 
        className="absolute w-3 h-3 rounded-full opacity-20 animate-float" 
        style={{ 
          left: "70%", 
          top: `calc(60% - ${scrollY * 0.08}px)`,
          backgroundColor: "#4ECDC4",
          animationDelay: "1s" 
        }} 
      />
      <div 
        className="absolute w-3 h-3 rounded-full opacity-25 animate-float" 
        style={{ 
          left: "60%", 
          top: `calc(80% - ${scrollY * 0.03}px)`,
          backgroundColor: "#FFE66D",
          animationDelay: "2s" 
        }} 
      />
      <div 
        className="absolute w-2 h-2 rounded-full opacity-20 animate-float" 
        style={{ 
          left: "45%", 
          top: `calc(45% - ${scrollY * 0.06}px)`,
          backgroundColor: "#95E1D3",
          animationDelay: "1.5s" 
        }} 
      />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        @keyframes zap {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-beat { animation: beat 0.6s ease-in-out infinite; }
        .animate-zap { animation: zap 0.3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
