import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ConfettiBurst } from "./ConfettiBurst";

interface AnimatedMascotProps {
  className?: string;
  size?: "small" | "medium" | "large" | "hero";
}

type Expression = "default" | "happy" | "curious" | "sleepy";

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

const IDLE_TIMEOUT = 5000; // 5 seconds until sleepy

export function AnimatedMascot({ className, size = "medium" }: AnimatedMascotProps) {
  const [isWaving, setIsWaving] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [showThought, setShowThought] = useState(false);
  const [thoughtText, setThoughtText] = useState(thoughts[0]);
  const [lastThoughtIndex, setLastThoughtIndex] = useState(-1);
  const [confetti, setConfetti] = useState<{ x: number; y: number } | null>(null);
  const [expression, setExpression] = useState<Expression>("default");
  const mascotRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const expressionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dimensions = sizeMap[size];

  // Reset idle timer on any interaction
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (expression === "sleepy") {
      setExpression("default");
    }
    idleTimerRef.current = setTimeout(() => {
      setExpression("sleepy");
    }, IDLE_TIMEOUT);
  }, [expression]);

  // Cleanup timers on unmount
  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (expressionTimerRef.current) clearTimeout(expressionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      resetIdleTimer();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resetIdleTimer]);

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
    setExpression("happy");
    resetIdleTimer();
    
    // Clear any existing expression timer
    if (expressionTimerRef.current) {
      clearTimeout(expressionTimerRef.current);
    }
    
    setTimeout(() => setIsWaving(false), 600);
    
    // Return to default expression after animation
    expressionTimerRef.current = setTimeout(() => {
      setExpression("default");
    }, 1500);
    
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
    
    // Set curious expression on hover (unless happy from click)
    if (expression !== "happy") {
      setExpression("curious");
    }
    resetIdleTimer();
  };

  const handleMouseLeave = () => {
    setShowThought(false);
    // Return to default if curious (but not if happy from click)
    if (expression === "curious") {
      setExpression("default");
    }
  };

  // Expression-specific styles
  const getEyeStyle = () => {
    switch (expression) {
      case "happy":
        return { scaleY: 0.6, translateY: 2 }; // Squinted happy eyes
      case "sleepy":
        return { scaleY: 0.3, translateY: 4 }; // Droopy sleepy eyes
      case "curious":
        return { scaleY: 1.15, translateY: -1 }; // Wide curious eyes
      default:
        return { scaleY: 1, translateY: 0 };
    }
  };

  const getSmilePath = () => {
    switch (expression) {
      case "happy":
        return "M 38 80 Q 60 105 82 80"; // Big happy smile
      case "sleepy":
        return "M 45 85 Q 60 88 75 85"; // Slight sleepy smile
      case "curious":
        return "M 50 85 Q 60 82 70 85"; // Small curious 'o' shape
      default:
        return "M 42 82 Q 60 98 78 82"; // Default smile
    }
  };

  const getEyebrowStyle = () => {
    switch (expression) {
      case "happy":
        return { left: "M 32 46 Q 42 42 52 46", right: "M 68 46 Q 78 42 88 46" }; // Raised happy
      case "sleepy":
        return { left: "M 32 50 Q 42 52 52 50", right: "M 68 50 Q 78 52 88 50" }; // Droopy
      case "curious":
        return { left: "M 32 45 Q 42 40 52 48", right: "M 68 48 Q 78 40 88 45" }; // One raised
      default:
        return { left: "M 32 48 Q 42 44 52 48", right: "M 68 48 Q 78 44 88 48" };
    }
  };

  const eyeStyle = getEyeStyle();
  const smilePath = getSmilePath();
  const eyebrowPaths = getEyebrowStyle();

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
          
          {/* Eyes - with expression transforms */}
          <g 
            style={{ 
              transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              transition: 'all 0.3s ease-out'
            }}
          >
            <g style={{ 
              transform: `scaleY(${eyeStyle.scaleY}) translateY(${eyeStyle.translateY}px)`,
              transformOrigin: '42px 60px',
              transition: 'all 0.3s ease-out'
            }}>
              <ellipse cx="42" cy="60" rx="12" ry="14" fill="white" />
              <circle cx="44" cy="62" r="6" fill="#3D2314" />
              <circle cx="46" cy="59" r="2.5" fill="white" />
              <circle cx="42" cy="65" r="1.5" fill="white" opacity="0.6" />
            </g>
          </g>
          
          <g 
            style={{ 
              transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              transition: 'all 0.3s ease-out'
            }}
          >
            <g style={{ 
              transform: `scaleY(${eyeStyle.scaleY}) translateY(${eyeStyle.translateY}px)`,
              transformOrigin: '78px 60px',
              transition: 'all 0.3s ease-out'
            }}>
              <ellipse cx="78" cy="60" rx="12" ry="14" fill="white" />
              <circle cx="80" cy="62" r="6" fill="#3D2314" />
              <circle cx="82" cy="59" r="2.5" fill="white" />
              <circle cx="78" cy="65" r="1.5" fill="white" opacity="0.6" />
            </g>
          </g>
          
          {/* Eyebrows - dynamic based on expression */}
          <path d={eyebrowPaths.left} fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 0.3s ease-out' }} />
          <path d={eyebrowPaths.right} fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 0.3s ease-out' }} />
          
          {/* Cheeks - brighter when happy */}
          <ellipse cx="28" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity={expression === "happy" ? 0.9 : 0.6} style={{ transition: 'opacity 0.3s ease-out' }} />
          <ellipse cx="92" cy="72" rx="8" ry="5" fill="#FDA4AF" opacity={expression === "happy" ? 0.9 : 0.6} style={{ transition: 'opacity 0.3s ease-out' }} />
          
          {/* Smile - dynamic based on expression */}
          <path d={smilePath} fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 0.3s ease-out' }} />
          {expression === "happy" && (
            <path d="M 42 82 Q 60 95 78 82" fill="white" stroke="none" />
          )}
          {expression !== "happy" && expression !== "curious" && (
            <>
              <path d="M 45 83 Q 60 92 75 83" fill="white" stroke="none" />
              <path d="M 42 82 Q 60 86 78 82" fill="none" stroke="#C9A08A" strokeWidth="1" />
            </>
          )}
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
