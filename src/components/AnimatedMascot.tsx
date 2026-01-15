import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedMascotProps {
  className?: string;
}

export function AnimatedMascot({ className }: AnimatedMascotProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Calculate eye movement based on mouse position
    const centerX = window.innerWidth / 2;
    const centerY = 150;
    const maxOffset = 3;
    
    const deltaX = (mousePosition.x - centerX) / window.innerWidth;
    const deltaY = (mousePosition.y - centerY) / window.innerHeight;
    
    setEyeOffset({
      x: deltaX * maxOffset,
      y: Math.min(deltaY * maxOffset, maxOffset),
    });
  }, [mousePosition]);

  const handleClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 600);
  };

  return (
    <div 
      className={cn("cursor-pointer select-none", className)}
      onClick={handleClick}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className={cn(
          "transition-transform",
          isWaving && "animate-wiggle"
        )}
      >
        {/* Body - Rounded blob shape */}
        <ellipse
          cx="60"
          cy="65"
          rx="45"
          ry="40"
          className="fill-primary"
        />
        
        {/* Face highlight */}
        <ellipse
          cx="60"
          cy="60"
          rx="38"
          ry="33"
          className="fill-primary-foreground opacity-10"
        />
        
        {/* Left eye */}
        <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
          <ellipse
            cx="45"
            cy="55"
            rx="10"
            ry="12"
            className="fill-background"
          />
          <circle
            cx="47"
            cy="57"
            r="5"
            className="fill-foreground"
          />
          <circle
            cx="49"
            cy="55"
            r="2"
            className="fill-background"
          />
        </g>
        
        {/* Right eye */}
        <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
          <ellipse
            cx="75"
            cy="55"
            rx="10"
            ry="12"
            className="fill-background"
          />
          <circle
            cx="77"
            cy="57"
            r="5"
            className="fill-foreground"
          />
          <circle
            cx="79"
            cy="55"
            r="2"
            className="fill-background"
          />
        </g>
        
        {/* Smile */}
        <path
          d="M 45 75 Q 60 90 75 75"
          fill="none"
          className="stroke-foreground"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Cheeks */}
        <circle cx="32" cy="70" r="6" className="fill-destructive opacity-30" />
        <circle cx="88" cy="70" r="6" className="fill-destructive opacity-30" />
        
        {/* Left arm */}
        <ellipse
          cx="20"
          cy="75"
          rx="12"
          ry="8"
          className={cn(
            "fill-primary origin-center transition-transform",
            isWaving && "animate-wave"
          )}
          style={{ transformOrigin: "32px 75px" }}
        />
        
        {/* Right arm */}
        <ellipse
          cx="100"
          cy="75"
          rx="12"
          ry="8"
          className="fill-primary"
        />
      </svg>
      
      {/* Floating animation container */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(20deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out 2;
        }
        
        .animate-wave {
          animation: wave 0.3s ease-in-out 2;
        }
      `}</style>
    </div>
  );
}
