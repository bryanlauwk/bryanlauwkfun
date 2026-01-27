import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Doodle {
  id: string;
  type: "star" | "heart" | "lightning" | "spiral" | "diamond" | "squiggle" | "cloud" | "planet" | "rocket" | "cat" | "flower" | "rainbow" | "sun" | "moon";
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

const doodles: Doodle[] = [
  { id: "1", type: "star", x: 8, y: 12, size: 16, opacity: 0.25, delay: 0 },
  { id: "2", type: "cloud", x: 85, y: 8, size: 28, opacity: 0.2, delay: 0.5 },
  { id: "3", type: "heart", x: 5, y: 35, size: 14, opacity: 0.25, delay: 1 },
  { id: "4", type: "rocket", x: 92, y: 35, size: 22, opacity: 0.2, delay: 1.5 },
  { id: "5", type: "planet", x: 88, y: 75, size: 20, opacity: 0.2, delay: 2 },
  { id: "6", type: "flower", x: 12, y: 65, size: 16, opacity: 0.25, delay: 2.5 },
  { id: "7", type: "star", x: 75, y: 90, size: 12, opacity: 0.2, delay: 3 },
  { id: "8", type: "cat", x: 93, y: 55, size: 18, opacity: 0.18, delay: 0.3 },
  { id: "9", type: "sun", x: 3, y: 80, size: 16, opacity: 0.2, delay: 1.2 },
  { id: "10", type: "moon", x: 78, y: 5, size: 14, opacity: 0.22, delay: 0.8 },
  { id: "11", type: "rainbow", x: 15, y: 48, size: 24, opacity: 0.15, delay: 1.8 },
  { id: "12", type: "spiral", x: 70, y: 60, size: 14, opacity: 0.18, delay: 2.2 },
  { id: "13", type: "lightning", x: 4, y: 20, size: 12, opacity: 0.2, delay: 0.6 },
  { id: "14", type: "diamond", x: 50, y: 95, size: 10, opacity: 0.22, delay: 1.4 },
  { id: "15", type: "squiggle", x: 35, y: 8, size: 20, opacity: 0.15, delay: 2.8 },
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
            d="M25 5 L28 18 L42 18 L31 27 L35 40 L25 32 L15 40 L19 27 L8 18 L22 18 Z" 
            stroke="hsl(var(--primary))" 
            fill="hsl(var(--primary))" 
            fillOpacity="0.4"
            strokeWidth="2"
            strokeLinejoin="round"
          />
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
    case "cloud":
      return (
        <svg viewBox="0 0 80 50" className={cn(baseClass, isHovered && "animate-float-cloud")}>
          <path 
            d="M20 35 Q5 35, 10 25 Q5 15, 20 15 Q25 5, 40 10 Q55 5, 60 15 Q75 12, 70 25 Q78 35, 60 35 Z" 
            fill="white"
            fillOpacity="0.6"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Blush on cloud */}
          <ellipse cx="30" cy="25" rx="6" ry="3" fill="#FDA4AF" opacity="0.4" />
          <ellipse cx="50" cy="25" rx="6" ry="3" fill="#FDA4AF" opacity="0.4" />
          {/* Eyes */}
          <circle cx="30" cy="22" r="2" fill="hsl(var(--foreground))" opacity="0.6" />
          <circle cx="50" cy="22" r="2" fill="hsl(var(--foreground))" opacity="0.6" />
        </svg>
      );
    case "planet":
      return (
        <svg viewBox="0 0 60 60" className={cn(baseClass, isHovered && "animate-spin-slow")}>
          <circle cx="30" cy="30" r="18" fill="#C7B8EA" stroke="#9B8AC4" strokeWidth="2" />
          <ellipse cx="30" cy="30" rx="28" ry="8" fill="none" stroke="#FFB6C1" strokeWidth="2.5" transform="rotate(-20 30 30)" />
          {/* Crater details */}
          <circle cx="24" cy="26" r="4" fill="#B8A6D9" opacity="0.5" />
          <circle cx="35" cy="34" r="3" fill="#B8A6D9" opacity="0.4" />
          {/* Star nearby */}
          <path d="M52 12 L53 15 L56 15 L54 17 L55 20 L52 18 L49 20 L50 17 L48 15 L51 15 Z" fill="#FFE66D" opacity="0.8" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 50 70" className={cn(baseClass, isHovered && "animate-rocket")}>
          {/* Flame */}
          <path 
            d="M20 60 Q25 70, 25 65 Q25 70, 30 60" 
            fill="#FF6B6B"
            className={isHovered ? "animate-flame" : ""}
          />
          <path 
            d="M22 58 Q25 65, 28 58" 
            fill="#FFE66D"
          />
          {/* Body */}
          <path 
            d="M25 5 Q35 15, 35 35 L35 55 Q25 58, 15 55 L15 35 Q15 15, 25 5" 
            fill="#4ECDC4"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
          {/* Window */}
          <circle cx="25" cy="28" r="7" fill="#E8F4F8" stroke="hsl(var(--foreground))" strokeWidth="1" />
          <circle cx="25" cy="28" r="4" fill="#87CEEB" />
          {/* Fins */}
          <path d="M15 45 L8 55 L15 52" fill="#FF6B6B" stroke="hsl(var(--foreground))" strokeWidth="1" />
          <path d="M35 45 L42 55 L35 52" fill="#FF6B6B" stroke="hsl(var(--foreground))" strokeWidth="1" />
        </svg>
      );
    case "cat":
      return (
        <svg viewBox="0 0 50 50" className={cn(baseClass, isHovered && "animate-cat-wiggle")}>
          {/* Body */}
          <ellipse cx="25" cy="32" rx="16" ry="14" fill="#FFD1A9" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          {/* Ears */}
          <path d="M12 18 L10 6 L18 14" fill="#FFD1A9" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <path d="M38 18 L40 6 L32 14" fill="#FFD1A9" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <path d="M13 16 L12 10 L17 14" fill="#FDA4AF" opacity="0.6" />
          <path d="M37 16 L38 10 L33 14" fill="#FDA4AF" opacity="0.6" />
          {/* Face */}
          <circle cx="19" cy="28" r="3" fill="hsl(var(--foreground))" />
          <circle cx="31" cy="28" r="3" fill="hsl(var(--foreground))" />
          <circle cx="20" cy="27" r="1" fill="white" />
          <circle cx="32" cy="27" r="1" fill="white" />
          {/* Nose and mouth */}
          <ellipse cx="25" cy="34" rx="2" ry="1.5" fill="#FDA4AF" />
          <path d="M25 35 L25 38 M25 38 Q22 40, 20 38 M25 38 Q28 40, 30 38" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
          {/* Whiskers */}
          <path d="M8 30 L16 32" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <path d="M8 34 L16 34" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <path d="M34 32 L42 30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <path d="M34 34 L42 34" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          {/* Tail */}
          <path d="M40 36 Q50 30, 48 22" fill="none" stroke="#FFD1A9" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 36 Q50 30, 48 22" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "flower":
      return (
        <svg viewBox="0 0 50 60" className={cn(baseClass, isHovered && "animate-flower-sway")}>
          {/* Stem */}
          <path d="M25 35 Q22 45, 25 55" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
          {/* Leaf */}
          <path d="M25 45 Q32 42, 35 48 Q30 48, 25 45" fill="#4CAF50" />
          {/* Petals */}
          <ellipse cx="25" cy="18" rx="6" ry="10" fill="#FF9ECD" stroke="#FF6B9D" strokeWidth="1" />
          <ellipse cx="18" cy="22" rx="6" ry="10" fill="#FFB6D9" stroke="#FF6B9D" strokeWidth="1" transform="rotate(-40 18 22)" />
          <ellipse cx="32" cy="22" rx="6" ry="10" fill="#FFB6D9" stroke="#FF6B9D" strokeWidth="1" transform="rotate(40 32 22)" />
          <ellipse cx="18" cy="30" rx="6" ry="10" fill="#FFC8E3" stroke="#FF6B9D" strokeWidth="1" transform="rotate(-80 18 30)" />
          <ellipse cx="32" cy="30" rx="6" ry="10" fill="#FFC8E3" stroke="#FF6B9D" strokeWidth="1" transform="rotate(80 32 30)" />
          {/* Center */}
          <circle cx="25" cy="26" r="6" fill="#FFE66D" stroke="#F4D03F" strokeWidth="1" />
          <circle cx="23" cy="25" r="1" fill="#DAA520" opacity="0.6" />
          <circle cx="27" cy="27" r="1" fill="#DAA520" opacity="0.6" />
        </svg>
      );
    case "rainbow":
      return (
        <svg viewBox="0 0 80 50" className={cn(baseClass, isHovered && "animate-rainbow-glow")}>
          <path d="M10 45 Q10 15, 40 15 Q70 15, 70 45" fill="none" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 45 Q14 19, 40 19 Q66 19, 66 45" fill="none" stroke="#FFB347" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 45 Q18 23, 40 23 Q62 23, 62 45" fill="none" stroke="#FFE66D" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 45 Q22 27, 40 27 Q58 27, 58 45" fill="none" stroke="#77DD77" strokeWidth="4" strokeLinecap="round" />
          <path d="M26 45 Q26 31, 40 31 Q54 31, 54 45" fill="none" stroke="#89CFF0" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 45 Q30 35, 40 35 Q50 35, 50 45" fill="none" stroke="#CF9FFF" strokeWidth="4" strokeLinecap="round" />
          {/* Clouds at ends */}
          <ellipse cx="10" cy="45" rx="8" ry="5" fill="white" opacity="0.8" />
          <ellipse cx="70" cy="45" rx="8" ry="5" fill="white" opacity="0.8" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 60 60" className={cn(baseClass, isHovered && "animate-spin-slow")}>
          {/* Rays */}
          <line x1="30" y1="5" x2="30" y2="12" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="48" x2="30" y2="55" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="30" x2="12" y2="30" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="30" x2="55" y2="30" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="12" x2="17" y2="17" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="43" y1="43" x2="48" y2="48" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="48" x2="17" y2="43" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          <line x1="43" y1="17" x2="48" y2="12" stroke="#FFE66D" strokeWidth="3" strokeLinecap="round" />
          {/* Face */}
          <circle cx="30" cy="30" r="14" fill="#FFE66D" stroke="#F4D03F" strokeWidth="2" />
          <circle cx="25" cy="28" r="2" fill="#DAA520" />
          <circle cx="35" cy="28" r="2" fill="#DAA520" />
          <path d="M24 34 Q30 38, 36 34" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="22" cy="32" rx="3" ry="2" fill="#FDA4AF" opacity="0.5" />
          <ellipse cx="38" cy="32" rx="3" ry="2" fill="#FDA4AF" opacity="0.5" />
        </svg>
      );
    case "moon":
      return (
        <svg viewBox="0 0 50 50" className={cn(baseClass, isHovered && "animate-moon-glow")}>
          {/* Crescent */}
          <path 
            d="M30 5 Q45 15, 45 30 Q45 45, 30 50 Q40 40, 40 30 Q40 20, 30 5" 
            fill="#F5E6A3"
            stroke="#E0D58A"
            strokeWidth="1.5"
          />
          {/* Face */}
          <circle cx="34" cy="22" r="1.5" fill="#DAA520" />
          <path d="M32 30 Q36 32, 38 30" fill="none" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" />
          {/* Stars around */}
          <path d="M10 15 L11 18 L14 18 L12 20 L13 23 L10 21 L7 23 L8 20 L6 18 L9 18 Z" fill="#FFE66D" opacity="0.6" />
          <path d="M15 35 L16 37 L18 37 L17 38 L17.5 40 L15 39 L12.5 40 L13 38 L12 37 L14 37 Z" fill="#FFE66D" opacity="0.5" />
          <circle cx="8" cy="28" r="1" fill="#FFE66D" opacity="0.4" />
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
              opacity: near || isHovered ? doodle.opacity * 2.5 : doodle.opacity,
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
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(5px) translateY(-3px); }
        }
        @keyframes rocket {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes flame {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(1.3); opacity: 0.8; }
        }
        @keyframes cat-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes flower-sway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        @keyframes rainbow-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3) saturate(1.2); }
        }
        @keyframes moon-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(245, 230, 163, 0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(245, 230, 163, 0.8)); }
        }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-beat { animation: beat 0.6s ease-in-out infinite; }
        .animate-zap { animation: zap 0.3s ease-in-out infinite; }
        .animate-float-cloud { animation: float-cloud 4s ease-in-out infinite; }
        .animate-rocket { animation: rocket 1.5s ease-in-out infinite; }
        .animate-flame { animation: flame 0.2s ease-in-out infinite; }
        .animate-cat-wiggle { animation: cat-wiggle 0.4s ease-in-out infinite; }
        .animate-flower-sway { animation: flower-sway 2s ease-in-out infinite; }
        .animate-rainbow-glow { animation: rainbow-glow 1.5s ease-in-out infinite; }
        .animate-moon-glow { animation: moon-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
