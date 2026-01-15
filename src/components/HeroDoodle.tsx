import { cn } from "@/lib/utils";

interface HeroDoodleProps {
  className?: string;
}

export const HeroDoodle = ({ className }: HeroDoodleProps) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 300 280"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: '400px' }}
      >
        <defs>
          {/* Gradients for 3D depth */}
          <linearGradient id="topFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--background))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
          <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="rightFace" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Shadow underneath */}
        <ellipse cx="150" cy="250" rx="80" ry="15" fill="hsl(var(--muted-foreground))" opacity="0.15" />

        {/* === CLASSIC PENROSE STAIRCASE === */}
        
        {/* Flight 1: Bottom-Right going up-right */}
        <g>
          {/* Step 1 */}
          <path d="M100 200 L130 185 L160 200 L130 215 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 200 L100 212 L130 227 L130 215 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M130 215 L130 227 L160 212 L160 200 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 2 */}
          <path d="M130 185 L160 170 L190 185 L160 200 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M130 185 L130 197 L160 212 L160 200 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 200 L160 212 L190 197 L190 185 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 3 */}
          <path d="M160 170 L190 155 L220 170 L190 185 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 170 L160 182 L190 197 L190 185 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M190 185 L190 197 L220 182 L220 170 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Flight 2: Right side going up-back */}
        <g>
          {/* Step 1 */}
          <path d="M190 155 L220 140 L250 155 L220 170 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M220 170 L220 182 L250 167 L250 155 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 2 */}
          <path d="M190 130 L220 115 L250 130 L220 145 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M220 145 L220 157 L250 142 L250 130 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 3 */}
          <path d="M190 105 L220 90 L250 105 L220 120 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M220 120 L220 132 L250 117 L250 105 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Flight 3: Top going left (impossible connection!) */}
        <g>
          {/* Step 1 */}
          <path d="M160 90 L190 75 L220 90 L190 105 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 90 L160 102 L190 117 L190 105 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 2 */}
          <path d="M130 105 L160 90 L190 105 L160 120 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M130 105 L130 117 L160 132 L160 120 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 3 */}
          <path d="M100 120 L130 105 L160 120 L130 135 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 120 L100 132 L130 147 L130 135 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Flight 4: Left side going down-forward (impossible connection!) */}
        <g>
          {/* Step 1 */}
          <path d="M70 135 L100 120 L130 135 L100 150 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 135 L70 147 L100 162 L100 150 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 150 L100 162 L130 147 L130 135 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 2 */}
          <path d="M70 165 L100 150 L130 165 L100 180 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 165 L70 177 L100 192 L100 180 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 180 L100 192 L130 177 L130 165 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Step 3 - connects back to flight 1 */}
          <path d="M70 195 L100 180 L130 195 L100 210 Z" fill="url(#topFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 195 L70 207 L100 222 L100 210 Z" fill="url(#leftFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 210 L100 222 L130 207 L130 195 Z" fill="url(#rightFace)" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* === ANIMATED WALKING CHARACTER WITH BACKPACK === */}
        <g transform="translate(145, 160)">
          {/* Body with bob animation */}
          <g className="animate-bob-body" style={{ transformOrigin: '0 0' }}>
            {/* Head */}
            <circle cx="0" cy="-22" r="7" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="-2" cy="-23" r="1.2" fill="hsl(var(--foreground))" />
            <circle cx="3" cy="-23" r="1.2" fill="hsl(var(--foreground))" />
            {/* Smile */}
            <path d="M-2 -19 Q0.5 -16 3 -19" stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" strokeLinecap="round" />
            
            {/* Body/Torso */}
            <line x1="0" y1="-15" x2="0" y2="2" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
            
            {/* Backpack */}
            <rect x="3" y="-12" width="8" height="12" rx="1.5" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="1.2" />
            <line x1="5" y1="-9" x2="9" y2="-9" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
            <line x1="5" y1="-5" x2="9" y2="-5" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
            {/* Backpack strap */}
            <path d="M3 -10 Q0 -12, 0 -8" stroke="hsl(var(--foreground))" strokeWidth="1.2" fill="none" />
          </g>
          
          {/* Left Arm */}
          <g className="animate-walk-left-arm" style={{ transformOrigin: '0 -13px' }}>
            <line x1="0" y1="-13" x2="-6" y2="-3" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Right Arm */}
          <g className="animate-walk-right-arm" style={{ transformOrigin: '0 -13px' }}>
            <line x1="0" y1="-13" x2="3" y2="-3" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Left Leg */}
          <g className="animate-walk-left-leg" style={{ transformOrigin: '0 2px' }}>
            <line x1="0" y1="2" x2="-5" y2="14" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Right Leg */}
          <g className="animate-walk-right-leg" style={{ transformOrigin: '0 2px' }}>
            <line x1="0" y1="2" x2="5" y2="14" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* Motion lines near character */}
        <g opacity="0.4">
          <line x1="132" y1="155" x2="124" y2="155" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
          <line x1="132" y1="160" x2="120" y2="160" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
          <line x1="132" y1="165" x2="124" y2="165" stroke="hsl(var(--foreground))" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Small sparkle accents */}
        <g className="animate-pulse" style={{ animationDuration: '2s' }}>
          <circle cx="55" cy="145" r="2.5" fill="hsl(var(--primary))" opacity="0.6" />
          <circle cx="260" cy="95" r="2.5" fill="hsl(var(--primary))" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};
