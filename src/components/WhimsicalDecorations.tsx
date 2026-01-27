import { cn } from "@/lib/utils";

interface WhimsicalDecorationsProps {
  className?: string;
}

export function WhimsicalDecorations({ className }: WhimsicalDecorationsProps) {
  return (
    <div className={cn("pointer-events-none", className)}>
      {/* Hand-drawn underline squiggle */}
      <svg className="absolute -bottom-2 left-0 w-full h-3 overflow-visible" preserveAspectRatio="none">
        <path
          d="M0 5 Q10 0, 20 5 Q30 10, 40 5 Q50 0, 60 5 Q70 10, 80 5 Q90 0, 100 5"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="animate-draw-line"
        />
      </svg>
    </div>
  );
}

// Sparkle decoration
export function Sparkle({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={cn("animate-sparkle", className)}
    >
      <path
        d="M12 0 L13 9 L22 12 L13 15 L12 24 L11 15 L2 12 L11 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Squiggle arrow
export function SquiggleArrow({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 40" 
      className={cn("w-20 h-8", className)}
    >
      <path
        d="M5 20 Q20 10, 35 20 Q50 30, 65 20 Q80 10, 85 20 L95 20 M85 12 L95 20 L85 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn circle
export function HandDrawnCircle({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative inline-block", className)}>
      <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="4 2"
          className="animate-draw-circle"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children}
    </div>
  );
}

// Bouncy star
export function BouncyStar({ className, color = "#FFE66D" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn("w-6 h-6 animate-bounce-star", className)}
    >
      <path
        d="M12 2 L14 8 L20 9 L15 13 L17 20 L12 16 L7 20 L9 13 L4 9 L10 8 Z"
        fill={color}
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// Wavy text underline component
export function WavyUnderline({ 
  children, 
  className,
  color = "hsl(var(--primary))"
}: { 
  children: React.ReactNode; 
  className?: string;
  color?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg 
        className="absolute -bottom-1 left-0 w-full h-2 overflow-visible" 
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <path
          d="M0 5 Q12.5 0, 25 5 Q37.5 10, 50 5 Q62.5 0, 75 5 Q87.5 10, 100 5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

// Floating emoji decoration
export function FloatingEmoji({ 
  emoji, 
  className,
  delay = 0 
}: { 
  emoji: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <span 
      className={cn(
        "absolute text-2xl animate-float-emoji pointer-events-none select-none",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {emoji}
    </span>
  );
}

// Doodle border wrapper
export function DoodleBorder({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        preserveAspectRatio="none"
      >
        <rect
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          rx="12"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          strokeDasharray="8 4"
          vectorEffect="non-scaling-stroke"
          className="animate-dash-slow"
        />
      </svg>
      {children}
    </div>
  );
}

// Add these styles to your global CSS or include them inline
export const whimsicalStyles = `
  @keyframes sparkle {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.2) rotate(15deg); opacity: 0.8; }
  }
  @keyframes draw-line {
    from { stroke-dashoffset: 100; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes draw-circle {
    from { stroke-dashoffset: 300; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes bounce-star {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(10deg); }
  }
  @keyframes float-emoji {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  @keyframes dash-slow {
    to { stroke-dashoffset: -24; }
  }
  .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
  .animate-draw-line { 
    stroke-dasharray: 100; 
    animation: draw-line 1s ease-out forwards; 
  }
  .animate-draw-circle { 
    stroke-dasharray: 300; 
    animation: draw-circle 2s ease-out forwards; 
  }
  .animate-bounce-star { animation: bounce-star 2s ease-in-out infinite; }
  .animate-float-emoji { animation: float-emoji 3s ease-in-out infinite; }
  .animate-dash-slow { animation: dash-slow 2s linear infinite; }
`;
