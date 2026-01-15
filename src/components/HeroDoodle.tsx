import { cn } from "@/lib/utils";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 200 180"
      fill="none"
    >
      {/* Floating geometric shapes - playful abstract doodle */}
      
      {/* Large circle with gradient */}
      <defs>
        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(340 82% 52%)" />
          <stop offset="100%" stopColor="hsl(270 67% 58%)" />
        </linearGradient>
        <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(48 100% 67%)" />
          <stop offset="100%" stopColor="hsl(16 100% 66%)" />
        </linearGradient>
        <linearGradient id="squareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(190 80% 50%)" />
          <stop offset="100%" stopColor="hsl(160 60% 60%)" />
        </linearGradient>
      </defs>

      {/* Floating shapes with animation classes */}
      <g className="animate-float" style={{ transformOrigin: "center" }}>
        {/* Main circle */}
        <circle
          cx="100"
          cy="70"
          r="45"
          fill="url(#circleGrad)"
          opacity="0.9"
        />
        
        {/* Eye-like detail on circle */}
        <circle cx="85" cy="60" r="12" fill="white" opacity="0.9" />
        <circle cx="115" cy="60" r="12" fill="white" opacity="0.9" />
        <circle cx="88" cy="62" r="6" fill="hsl(240 10% 15%)" />
        <circle cx="118" cy="62" r="6" fill="hsl(240 10% 15%)" />
        <circle cx="90" cy="60" r="2" fill="white" />
        <circle cx="120" cy="60" r="2" fill="white" />
        
        {/* Smile */}
        <path
          d="M 80 82 Q 100 100 120 82"
          stroke="hsl(240 10% 15%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Triangle shape */}
      <g 
        className="animate-float" 
        style={{ transformOrigin: "center", animationDelay: "0.5s" }}
      >
        <path
          d="M 40 140 L 70 100 L 100 140 Z"
          fill="url(#triangleGrad)"
          opacity="0.85"
        />
      </g>

      {/* Square/diamond shape */}
      <g 
        className="animate-float"
        style={{ transformOrigin: "center", animationDelay: "1s" }}
      >
        <rect
          x="130"
          y="110"
          width="40"
          height="40"
          rx="8"
          fill="url(#squareGrad)"
          opacity="0.85"
          transform="rotate(15 150 130)"
        />
      </g>

      {/* Small decorative elements */}
      <circle cx="30" cy="50" r="8" fill="hsl(48 100% 67%)" opacity="0.6" />
      <circle cx="170" cy="40" r="6" fill="hsl(160 60% 60%)" opacity="0.5" />
      <circle cx="160" cy="160" r="5" fill="hsl(340 82% 52%)" opacity="0.4" />
      <circle cx="25" cy="120" r="4" fill="hsl(190 80% 50%)" opacity="0.5" />

      {/* Stars */}
      <path
        d="M 180 80 L 182 86 L 188 86 L 183 90 L 185 96 L 180 92 L 175 96 L 177 90 L 172 86 L 178 86 Z"
        fill="hsl(48 100% 67%)"
        opacity="0.7"
      />
      <path
        d="M 20 90 L 21.5 94 L 26 94 L 22.5 97 L 24 101 L 20 98 L 16 101 L 17.5 97 L 14 94 L 18.5 94 Z"
        fill="hsl(340 82% 52%)"
        opacity="0.6"
      />
    </svg>
  );
};
