import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ConfettiBurst } from "./ConfettiBurst";

interface AnimatedMascotProps {
  className?: string;
  size?: "small" | "medium" | "large" | "hero";
}

const sizeMap = {
  small: { width: 48, height: 48 },
  medium: { width: 80, height: 80 },
  large: { width: 120, height: 120 },
  hero: { width: 160, height: 160 },
};

const thoughts = [
  // English greetings
  "hi there!", "hey!", "hello!", "sup!", "howdy!", "hiya!", "yo!", "greetings!",
  // Multilingual greetings
  "hola!", "que tal!", "bonjour!", "salut!", "hallo!", "guten tag!", "ciao!", "salve!",
  "ola!", "oi!", "konnichiwa!", "ohayo!", "annyeong!", "ni hao!", "hoi!", "hej!",
  "aloha!", "namaste!", "shalom!", "sawubona!", "merhaba!", "ahoj!", "sveiki!",
  // Playful
  "wheee!", "boop!", "woohoo!", "hehe!", "yay!", "ta-da!", "peek-a-boo!", "woop woop!",
  // Curious
  "hmm...", "ooh?", "interesting...", "what's this?", "I wonder...", "curious...",
  // Friendly
  "nice to see you!", "welcome!", "glad you're here!", "having fun?", "good vibes!",
];

export function AnimatedMascot({ className, size = "medium" }: AnimatedMascotProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [showThought, setShowThought] = useState(false);
  const [thoughtText, setThoughtText] = useState(thoughts[0]);
  const [lastThoughtIndex, setLastThoughtIndex] = useState(-1);
  const [confetti, setConfetti] = useState<{ x: number; y: number } | null>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  const dimensions = sizeMap[size];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
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
    
    // Trigger confetti
    if (mascotRef.current) {
      const rect = mascotRef.current.getBoundingClientRect();
      setConfetti({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const handleMouseEnter = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * thoughts.length);
    } while (newIndex === lastThoughtIndex && thoughts.length > 1);
    
    setLastThoughtIndex(newIndex);
    setThoughtText(thoughts[newIndex]);
    setShowThought(true);
  };

  const handleMouseLeave = () => {
    setShowThought(false);
  };

  return (
    <>
      <div 
        ref={mascotRef}
        className={cn("cursor-pointer select-none inline-flex relative", className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thought bubble */}
        <div 
          className={cn(
            "absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-card border border-border text-xs font-medium whitespace-nowrap transition-all duration-300 shadow-lg",
            showThought ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          {thoughtText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-b border-r border-border rotate-45" />
        </div>

        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 120 120"
          className={cn(
            "transition-transform hover:scale-110",
            isWaving ? "animate-wiggle" : "animate-float-mascot"
          )}
        >
          {/* Face base */}
          <ellipse cx="60" cy="65" rx="42" ry="38" fill="#F5D0B5" />
          <ellipse cx="60" cy="68" rx="38" ry="34" fill="#EBC4A8" opacity="0.3" />
          
          {/* Ears */}
          <ellipse cx="20" cy="65" rx="8" ry="10" fill="#F5D0B5" />
          <ellipse cx="100" cy="65" rx="8" ry="10" fill="#F5D0B5" />
          <ellipse cx="20" cy="65" rx="5" ry="6" fill="#EBC4A8" opacity="0.5" />
          <ellipse cx="100" cy="65" rx="5" ry="6" fill="#EBC4A8" opacity="0.5" />
          
          {/* Hair */}
          <ellipse cx="60" cy="38" rx="38" ry="22" fill="#1A1A1A" />
          <path d="M 30 35 Q 35 15 45 30 Q 48 10 55 28 Q 60 5 65 28 Q 72 10 75 30 Q 85 15 90 35" fill="#1A1A1A" />
          <path d="M 22 45 Q 18 35 25 50 L 30 55 Q 25 50 22 45" fill="#1A1A1A" />
          <path d="M 98 45 Q 102 35 95 50 L 90 55 Q 95 50 98 45" fill="#1A1A1A" />
          
          {/* Eyes */}
          <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
            <ellipse cx="42" cy="60" rx="12" ry="14" fill="white" />
            <circle cx="44" cy="62" r="6" fill="#3D2314" />
            <circle cx="46" cy="59" r="2.5" fill="white" />
            <circle cx="42" cy="65" r="1.5" fill="white" opacity="0.6" />
          </g>
          
          <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
            <ellipse cx="78" cy="60" rx="12" ry="14" fill="white" />
            <circle cx="80" cy="62" r="6" fill="#3D2314" />
            <circle cx="82" cy="59" r="2.5" fill="white" />
            <circle cx="78" cy="65" r="1.5" fill="white" opacity="0.6" />
          </g>
          
          {/* Eyebrows */}
          <path d="M 32 48 Q 42 44 52 48" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 68 48 Q 78 44 88 48" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Cheeks */}
          <ellipse cx="28" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity="0.6" />
          <ellipse cx="92" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity="0.6" />
          
          {/* Smile */}
          <path d="M 42 82 Q 60 98 78 82" fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 45 83 Q 60 92 75 83" fill="white" stroke="none" />
          <path d="M 42 82 Q 60 86 78 82" fill="none" stroke="#C9A08A" strokeWidth="1" />
        </svg>
        
        <style>{`
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg) scale(1.1); }
            25% { transform: rotate(-8deg) scale(1.15); }
            75% { transform: rotate(8deg) scale(1.15); }
          }
          .animate-wiggle {
            animation: wiggle 0.15s ease-in-out 4;
          }
          @keyframes float-mascot {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(2deg); }
          }
          .animate-float-mascot {
            animation: float-mascot 3s ease-in-out infinite;
          }
        `}</style>
      </div>

      {confetti && (
        <ConfettiBurst
          x={confetti.x}
          y={confetti.y}
          onComplete={() => setConfetti(null)}
        />
      )}
    </>
  );
}
