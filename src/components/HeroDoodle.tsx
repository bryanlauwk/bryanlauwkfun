import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  const [isWaving, setIsWaving] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);

  const handleClick = () => {
    setJumpCount(prev => prev + 1);
    setTimeout(() => setJumpCount(prev => prev - 1), 500);
  };

  return (
    <div 
      className={cn("w-full h-full flex items-center justify-center cursor-pointer select-none", className)}
      onClick={handleClick}
      onMouseEnter={() => setIsWaving(true)}
      onMouseLeave={() => setIsWaving(false)}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className={cn(
          "w-full h-full transition-transform duration-300",
          jumpCount > 0 && "animate-bounce"
        )}
      >
        {/* Ground line */}
        <path
          d="M 20 180 Q 100 175 180 180"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-muted-foreground/30"
          strokeDasharray="4 4"
        />

        {/* Stick Figure Group */}
        <g className="origin-bottom" style={{ transformOrigin: '100px 170px' }}>
          
          {/* Left Leg - Walking animation */}
          <line
            x1="100"
            y1="130"
            x2="80"
            y2="170"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground animate-walk-left-leg"
            style={{ transformOrigin: '100px 130px' }}
          />
          
          {/* Right Leg - Walking animation */}
          <line
            x1="100"
            y1="130"
            x2="120"
            y2="170"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground animate-walk-right-leg"
            style={{ transformOrigin: '100px 130px' }}
          />

          {/* Body */}
          <line
            x1="100"
            y1="80"
            x2="100"
            y2="130"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground"
          />

          {/* Left Arm */}
          <line
            x1="100"
            y1="95"
            x2="70"
            y2="115"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-foreground animate-walk-left-arm"
            style={{ transformOrigin: '100px 95px' }}
          />

          {/* Right Arm - Waves on hover */}
          <line
            x1="100"
            y1="95"
            x2={isWaving ? "135" : "130"}
            y2={isWaving ? "70" : "115"}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className={cn(
              "text-foreground transition-all duration-200",
              isWaving ? "animate-wave" : "animate-walk-right-arm"
            )}
            style={{ transformOrigin: '100px 95px' }}
          />

          {/* Hand wave indicator */}
          {isWaving && (
            <g className="animate-pulse">
              <text x="145" y="65" fontSize="16" className="fill-primary">👋</text>
            </g>
          )}

          {/* Head */}
          <circle
            cx="100"
            cy="55"
            r="25"
            stroke="currentColor"
            strokeWidth="4"
            fill="hsl(var(--background))"
            className="text-foreground"
          />

          {/* Face - Eyes */}
          <g className="animate-blink">
            <circle cx="90" cy="50" r="4" fill="currentColor" className="text-foreground" />
            <circle cx="110" cy="50" r="4" fill="currentColor" className="text-foreground" />
          </g>

          {/* Smile */}
          <path
            d="M 88 62 Q 100 72 112 62"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="text-foreground"
          />

          {/* Blush marks */}
          <ellipse cx="78" cy="58" rx="5" ry="3" fill="hsl(var(--primary))" opacity="0.3" />
          <ellipse cx="122" cy="58" rx="5" ry="3" fill="hsl(var(--primary))" opacity="0.3" />

        </g>

        {/* Action lines when jumping */}
        {jumpCount > 0 && (
          <g className="animate-fade-in">
            <line x1="60" y1="160" x2="50" y2="170" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <line x1="65" y1="155" x2="55" y2="160" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <line x1="140" y1="160" x2="150" y2="170" stroke="currentColor" strokeWidth="2" className="text-primary" />
            <line x1="135" y1="155" x2="145" y2="160" stroke="currentColor" strokeWidth="2" className="text-primary" />
          </g>
        )}

        {/* Floating elements around the character */}
        <g className="animate-float" style={{ animationDelay: '0s' }}>
          <text x="35" y="45" fontSize="20">✨</text>
        </g>
        <g className="animate-float" style={{ animationDelay: '0.5s' }}>
          <text x="155" y="35" fontSize="16">⭐</text>
        </g>
        <g className="animate-float" style={{ animationDelay: '1s' }}>
          <text x="25" y="120" fontSize="14">💫</text>
        </g>
        <g className="animate-float" style={{ animationDelay: '1.5s' }}>
          <text x="165" y="100" fontSize="18">✨</text>
        </g>

        {/* Click me hint */}
        <text 
          x="100" 
          y="195" 
          textAnchor="middle" 
          fontSize="10" 
          className="fill-muted-foreground/50 animate-pulse"
        >
          click me!
        </text>
      </svg>
    </div>
  );
};
