import { cn } from "@/lib/utils";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Penrose Stairs with climbing stick figure */}
      <svg
        viewBox="0 0 200 180"
        className="w-full h-full animate-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for 3D stair faces */}
          <linearGradient id="stairTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="stairLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="stairRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="170" rx="70" ry="8" fill="hsl(var(--foreground))" opacity="0.1" />

        {/* === PENROSE STAIRS === */}
        {/* The impossible staircase - 4 connected stair sections forming a loop */}
        
        {/* Section 1: Top-left stairs going UP (visually) */}
        <g>
          {/* Top face */}
          <path
            d="M30 70 L30 50 L70 30 L70 50 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M30 90 L30 70 L70 50 L70 70 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M30 110 L30 90 L70 70 L70 90 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Section 2: Top-right stairs going UP */}
        <g>
          <path
            d="M70 30 L70 50 L110 30 L110 10 Z"
            fill="url(#stairRight)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M110 10 L110 30 L150 10 L150 -10 Z"
            fill="url(#stairRight)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M150 -10 L150 10 L170 0 L170 -20 Z"
            fill="url(#stairRight)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Section 3: Right side stairs going DOWN (but connecting impossibly) */}
        <g>
          <path
            d="M170 0 L170 40 L150 50 L150 10 Z"
            fill="url(#stairLeft)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M170 40 L170 80 L150 90 L150 50 Z"
            fill="url(#stairLeft)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M170 80 L170 120 L150 130 L150 90 Z"
            fill="url(#stairLeft)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Section 4: Bottom stairs connecting back (the impossible connection) */}
        <g>
          <path
            d="M150 130 L150 150 L110 140 L110 120 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M110 120 L110 140 L70 130 L70 110 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M70 110 L70 130 L30 120 L30 100 Z"
            fill="url(#stairTop)"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Inner void (the center of the impossible staircase) */}
        <path
          d="M50 70 L90 50 L130 60 L130 100 L90 110 L50 90 Z"
          fill="hsl(var(--background))"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />

        {/* === STICK FIGURE CLIMBING === */}
        <g transform="translate(38, 58)">
          {/* Body group with subtle bob animation */}
          <g className="animate-bob-body" style={{ transformOrigin: '12px 18px' }}>
            {/* Head */}
            <circle
              cx="12"
              cy="0"
              r="8"
              fill="hsl(var(--background))"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
            />
            
            {/* Happy face */}
            <circle cx="9" cy="-2" r="1.5" fill="hsl(var(--foreground))" />
            <circle cx="15" cy="-2" r="1.5" fill="hsl(var(--foreground))" />
            <path
              d="M8 3 Q12 7, 16 3"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Body */}
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="28"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
          
          {/* Left arm - swinging opposite to left leg */}
          <g className="animate-walk-left-arm" style={{ transformOrigin: '12px 14px' }}>
            <line
              x1="12"
              y1="14"
              x2="0"
              y2="8"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
          
          {/* Right arm - swinging opposite to right leg */}
          <g className="animate-walk-right-arm" style={{ transformOrigin: '12px 14px' }}>
            <line
              x1="12"
              y1="14"
              x2="24"
              y2="20"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
          
          {/* Left leg - stepping motion */}
          <g className="animate-walk-left-leg" style={{ transformOrigin: '12px 28px' }}>
            <line
              x1="12"
              y1="28"
              x2="4"
              y2="40"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
          
          {/* Right leg - opposite stepping motion */}
          <g className="animate-walk-right-leg" style={{ transformOrigin: '12px 28px' }}>
            <line
              x1="12"
              y1="28"
              x2="22"
              y2="35"
              stroke="hsl(var(--foreground))"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Motion lines near the figure */}
        <g opacity="0.5">
          <line
            x1="25"
            y1="75"
            x2="20"
            y2="80"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="80"
            x2="22"
            y2="86"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Sparkles showing the infinite nature */}
        <g className="animate-pulse">
          <circle cx="90" cy="25" r="2" fill="hsl(var(--primary))" />
          <circle cx="160" cy="55" r="2" fill="hsl(var(--primary))" />
          <circle cx="60" cy="125" r="2" fill="hsl(var(--primary))" />
          <path d="M175 100 L178 105 L175 110 L172 105 Z" fill="hsl(var(--primary))" opacity="0.7" />
          <path d="M25 45 L28 50 L25 55 L22 50 Z" fill="hsl(var(--primary))" opacity="0.7" />
        </g>

        {/* Small footprints showing the loop (subtle) */}
        <g opacity="0.2">
          <ellipse cx="55" cy="118" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="95" cy="128" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="135" cy="118" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="158" cy="70" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="158" cy="30" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="130" cy="18" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
          <ellipse cx="90" cy="38" rx="3" ry="1.5" fill="hsl(var(--foreground))" />
        </g>
      </svg>
    </div>
  );
};
