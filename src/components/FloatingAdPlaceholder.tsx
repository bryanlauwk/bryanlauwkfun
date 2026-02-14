interface FloatingAdPlaceholderProps {
  name: string;
  variant: number;
}

function HotAirBalloon({ name }: { name: string }) {
  return (
    <div className="animate-balloon-float">
      <svg viewBox="0 0 200 180" width="200" height="180" className="overflow-visible">
        {/* Balloon envelope */}
        <defs>
          <linearGradient id="balloon-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(350 85% 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(280 70% 50%)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="65" rx="52" ry="60" fill="url(#balloon-grad)" stroke="hsl(350 85% 55%)" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Stripes */}
        <path d="M70 30 Q100 130 130 30" fill="none" stroke="hsl(350 85% 55%)" strokeWidth="0.8" strokeOpacity="0.35" />
        <path d="M60 45 Q100 140 140 45" fill="none" stroke="hsl(280 70% 50%)" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Ropes */}
        <line x1="72" y1="118" x2="82" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="128" y1="118" x2="118" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        <line x1="100" y1="125" x2="100" y2="145" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        {/* Basket */}
        <rect x="82" y="145" width="36" height="18" rx="3" fill="hsl(30 40% 25%)" fillOpacity="0.5" stroke="hsl(30 40% 35%)" strokeWidth="1" strokeOpacity="0.5" />
        {/* Brand text on balloon */}
        <text
          x="100"
          y="68"
          textAnchor="middle"
          fontSize="11"
          fontFamily="Georgia, serif"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="0.5"
        >
          {name}
        </text>
      </svg>
    </div>
  );
}

function FlyingBroom({ name }: { name: string }) {
  return (
    <div className="animate-broom-drift">
      <svg viewBox="0 0 220 140" width="210" height="134" className="overflow-visible">
        {/* Broom handle */}
        <line x1="30" y1="70" x2="140" y2="65" stroke="hsl(30 40% 30%)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        {/* Bristles */}
        <path d="M140 65 L170 50 L175 65 L170 80 Z" fill="hsl(30 50% 25%)" fillOpacity="0.5" stroke="hsl(30 40% 30%)" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="145" y1="65" x2="168" y2="55" stroke="hsl(30 40% 30%)" strokeWidth="0.5" opacity="0.35" />
        <line x1="145" y1="67" x2="172" y2="65" stroke="hsl(30 40% 30%)" strokeWidth="0.5" opacity="0.35" />
        <line x1="145" y1="69" x2="168" y2="75" stroke="hsl(30 40% 30%)" strokeWidth="0.5" opacity="0.35" />
        {/* Trailing banner */}
        <path
          d="M28 68 Q15 58 10 68 L10 88 Q15 82 28 88 L80 85 L80 72 Z"
          fill="hsl(350 85% 55%)"
          fillOpacity="0.25"
          stroke="hsl(350 85% 55%)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Banner tail notch */}
        <path d="M10 68 L4 78 L10 88" fill="none" stroke="hsl(350 85% 55%)" strokeWidth="1" strokeOpacity="0.4" />
        {/* Brand text on banner */}
        <text
          x="45"
          y="82"
          textAnchor="middle"
          fontSize="10"
          fontFamily="Georgia, serif"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="0.5"
        >
          {name}
        </text>
        {/* Sparkle trail */}
        <circle cx="22" cy="60" r="1.5" fill="hsl(350 85% 55%)" opacity="0.35" />
        <circle cx="35" cy="55" r="1" fill="hsl(280 70% 50%)" opacity="0.3" />
        <circle cx="15" cy="65" r="1" fill="hsl(200 100% 60%)" opacity="0.3" />
      </svg>
    </div>
  );
}

function FloatingLantern({ name }: { name: string }) {
  return (
    <div className="animate-lantern-rise">
      <svg viewBox="0 0 160 180" width="160" height="180" className="overflow-visible">
        <defs>
          <radialGradient id="lantern-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="hsl(35 90% 60%)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="hsl(350 85% 55%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Glow aura */}
        <ellipse cx="80" cy="75" rx="55" ry="60" fill="url(#lantern-glow)" className="animate-glow-pulse" />
        {/* Lantern body */}
        <path
          d="M60 45 Q58 30 80 25 Q102 30 100 45 L105 110 Q80 120 55 110 Z"
          fill="hsl(35 70% 50%)"
          fillOpacity="0.25"
          stroke="hsl(35 70% 50%)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        {/* Lantern top */}
        <path d="M70 28 Q80 18 90 28" fill="none" stroke="hsl(35 70% 50%)" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Ribs */}
        <line x1="80" y1="28" x2="80" y2="115" stroke="hsl(35 70% 50%)" strokeWidth="0.5" strokeOpacity="0.25" />
        <path d="M60 45 Q80 50 100 45" fill="none" stroke="hsl(35 70% 50%)" strokeWidth="0.5" strokeOpacity="0.25" />
        <path d="M57 75 Q80 82 103 75" fill="none" stroke="hsl(35 70% 50%)" strokeWidth="0.5" strokeOpacity="0.25" />
        {/* Flame */}
        <ellipse cx="80" cy="120" rx="4" ry="6" fill="hsl(35 90% 60%)" fillOpacity="0.5" />
        {/* Brand text */}
        <text
          x="80"
          y="78"
          textAnchor="middle"
          fontSize="10"
          fontFamily="Georgia, serif"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="0.5"
        >
          {name}
        </text>
      </svg>
    </div>
  );
}

export function FloatingAdPlaceholder({ name, variant }: FloatingAdPlaceholderProps) {
  const normalizedVariant = variant % 3;

  return (
    <div className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-90 transition-opacity duration-500">
      {normalizedVariant === 0 && <HotAirBalloon name={name} />}
      {normalizedVariant === 1 && <FlyingBroom name={name} />}
      {normalizedVariant === 2 && <FloatingLantern name={name} />}
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors duration-500">
        Ad Space
      </span>
    </div>
  );
}
