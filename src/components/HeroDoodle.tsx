import { cn } from "@/lib/utils";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Main character: Friendly game controller with face */}
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full animate-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Controller body - rounded rectangle with gradient */}
        <defs>
          <linearGradient id="controllerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="100" cy="150" rx="60" ry="8" fill="hsl(var(--foreground))" opacity="0.1" />
        
        {/* Controller body */}
        <path
          d="M30 60 Q30 30, 60 30 L140 30 Q170 30, 170 60 L170 100 Q170 130, 140 130 L60 130 Q30 130, 30 100 Z"
          fill="url(#controllerGradient)"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Highlight shine */}
        <path
          d="M40 55 Q40 40, 55 40 L145 40 Q160 40, 160 55 L160 65 Q100 75, 40 65 Z"
          fill="url(#highlightGradient)"
        />
        
        {/* Left grip */}
        <path
          d="M30 80 Q10 80, 10 100 L10 115 Q10 130, 30 130"
          fill="url(#controllerGradient)"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Right grip */}
        <path
          d="M170 80 Q190 80, 190 100 L190 115 Q190 130, 170 130"
          fill="url(#controllerGradient)"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* D-pad */}
        <g transform="translate(55, 65)">
          <rect x="8" y="0" width="9" height="25" rx="2" fill="hsl(var(--foreground))" opacity="0.8" />
          <rect x="0" y="8" width="25" height="9" rx="2" fill="hsl(var(--foreground))" opacity="0.8" />
        </g>
        
        {/* Action buttons */}
        <g transform="translate(125, 55)">
          <circle cx="20" cy="10" r="8" fill="#FF6B6B" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <circle cx="35" cy="25" r="8" fill="#4ECDC4" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <circle cx="5" cy="25" r="8" fill="#FFE66D" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <circle cx="20" cy="40" r="8" fill="#95E1D3" stroke="hsl(var(--foreground))" strokeWidth="2" />
        </g>
        
        {/* FACE - The kawaii part! */}
        {/* Left eye */}
        <g transform="translate(75, 85)">
          <ellipse cx="0" cy="0" rx="8" ry="10" fill="hsl(var(--foreground))" />
          <ellipse cx="2" cy="-2" rx="3" ry="4" fill="white" />
        </g>
        
        {/* Right eye */}
        <g transform="translate(115, 85)">
          <ellipse cx="0" cy="0" rx="8" ry="10" fill="hsl(var(--foreground))" />
          <ellipse cx="2" cy="-2" rx="3" ry="4" fill="white" />
        </g>
        
        {/* Happy smile */}
        <path
          d="M85 105 Q100 120, 115 105"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Blush marks */}
        <ellipse cx="65" cy="100" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
        <ellipse cx="135" cy="100" rx="6" ry="4" fill="#FFB6C1" opacity="0.6" />
        
        {/* Sparkles around */}
        <g className="animate-pulse">
          <path d="M25 20 L28 25 L25 30 L22 25 Z" fill="#FFE66D" />
          <path d="M175 25 L178 30 L175 35 L172 30 Z" fill="#4ECDC4" />
          <path d="M15 50 L17 53 L15 56 L13 53 Z" fill="#FF6B6B" />
          <path d="M185 55 L187 58 L185 61 L183 58 Z" fill="#95E1D3" />
        </g>
      </svg>
      
      {/* Floating elements around the controller */}
      <div className="absolute -top-4 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
        ✨
      </div>
      <div className="absolute -bottom-2 -left-4 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
        🎮
      </div>
    </div>
  );
};
