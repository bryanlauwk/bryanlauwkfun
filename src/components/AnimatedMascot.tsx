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
        {/* Face base - warm skin tone */}
        <ellipse
          cx="60"
          cy="65"
          rx="42"
          ry="38"
          fill="#F5D0B5"
        />
        
        {/* Face shadow/depth */}
        <ellipse
          cx="60"
          cy="68"
          rx="38"
          ry="34"
          fill="#EBC4A8"
          opacity="0.3"
        />
        
        {/* Ears */}
        <ellipse cx="20" cy="65" rx="8" ry="10" fill="#F5D0B5" />
        <ellipse cx="100" cy="65" rx="8" ry="10" fill="#F5D0B5" />
        <ellipse cx="20" cy="65" rx="5" ry="6" fill="#EBC4A8" opacity="0.5" />
        <ellipse cx="100" cy="65" rx="5" ry="6" fill="#EBC4A8" opacity="0.5" />
        
        {/* Hair base - black spiky hair */}
        <ellipse
          cx="60"
          cy="38"
          rx="38"
          ry="22"
          fill="#1A1A1A"
        />
        
        {/* Hair spikes on top */}
        <path
          d="M 30 35 Q 35 15 45 30 Q 48 10 55 28 Q 60 5 65 28 Q 72 10 75 30 Q 85 15 90 35"
          fill="#1A1A1A"
        />
        
        {/* Side hair */}
        <path
          d="M 22 45 Q 18 35 25 50 L 30 55 Q 25 50 22 45"
          fill="#1A1A1A"
        />
        <path
          d="M 98 45 Q 102 35 95 50 L 90 55 Q 95 50 98 45"
          fill="#1A1A1A"
        />
        
        {/* Left eye white */}
        <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
          <ellipse
            cx="42"
            cy="60"
            rx="12"
            ry="14"
            fill="white"
          />
          {/* Left pupil */}
          <circle
            cx="44"
            cy="62"
            r="6"
            fill="#3D2314"
          />
          {/* Left eye highlight */}
          <circle
            cx="46"
            cy="59"
            r="2.5"
            fill="white"
          />
          <circle
            cx="42"
            cy="65"
            r="1.5"
            fill="white"
            opacity="0.6"
          />
        </g>
        
        {/* Right eye white */}
        <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
          <ellipse
            cx="78"
            cy="60"
            rx="12"
            ry="14"
            fill="white"
          />
          {/* Right pupil */}
          <circle
            cx="80"
            cy="62"
            r="6"
            fill="#3D2314"
          />
          {/* Right eye highlight */}
          <circle
            cx="82"
            cy="59"
            r="2.5"
            fill="white"
          />
          <circle
            cx="78"
            cy="65"
            r="1.5"
            fill="white"
            opacity="0.6"
          />
        </g>
        
        {/* Eyebrows */}
        <path
          d="M 32 48 Q 42 44 52 48"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 68 48 Q 78 44 88 48"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Rosy cheeks */}
        <ellipse cx="28" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity="0.6" />
        <ellipse cx="92" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity="0.6" />
        
        {/* Smile with teeth */}
        <path
          d="M 42 82 Q 60 98 78 82"
          fill="none"
          stroke="#8B4513"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Teeth area */}
        <path
          d="M 45 83 Q 60 92 75 83"
          fill="white"
          stroke="none"
        />
        {/* Smile line on top of teeth */}
        <path
          d="M 42 82 Q 60 86 78 82"
          fill="none"
          stroke="#C9A08A"
          strokeWidth="1"
        />
      </svg>
      
      {/* Floating animation container */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 0.15s ease-in-out 4;
        }
      `}</style>
    </div>
  );
}
