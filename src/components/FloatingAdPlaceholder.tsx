interface FloatingAdPlaceholderProps {
  name: string;
  scale?: number;
  id: string;
  price?: string;
  href?: string;
  showText?: boolean;
  animationClass?: string;
}

export function FloatingAdPlaceholder({ name, scale = 1, id, price, href, showText = true, animationClass = "animate-balloon-float" }: FloatingAdPlaceholderProps) {
  const w = Math.round(240 * scale);
  const h = Math.round(280 * scale);

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer', className: `${animationClass} block cursor-pointer group` } : { className: animationClass };

  return (
    <Wrapper {...wrapperProps as any}>
      <svg
        viewBox="0 0 240 280"
        width={w}
        height={h}
        className="overflow-visible"
      >
        <defs>
          {/* Balloon envelope gradient */}
          <radialGradient id={`env-${id}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="hsl(350 85% 55%)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(280 70% 40%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(250 30% 15%)" stopOpacity="0.4" />
          </radialGradient>
          {/* Neon glow aura */}
          <radialGradient id={`glow-${id}`} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="hsl(350 85% 55%)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="hsl(350 85% 55%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Basket fire glow */}
          <radialGradient id={`fire-${id}`} cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="hsl(35 90% 60%)" stopOpacity="0.6" />
            <stop offset="60%" stopColor="hsl(350 85% 55%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* VHS scanline pattern */}
          <pattern id={`scan-${id}`} width="240" height="4" patternUnits="userSpaceOnUse">
            <rect width="240" height="1" fill="hsl(0 0% 0%)" fillOpacity="0.12" />
          </pattern>
          {/* Film grain noise */}
          <filter id={`grain-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feComposite in="SourceGraphic" in2="noise" operator="in" />
          </filter>
        </defs>

        {/* Outer glow aura - animated */}
        <ellipse
          cx="120" cy="110" rx="100" ry="110"
          fill={`url(#glow-${id})`}
          className="animate-balloon-glow-pulse"
        />

        {/* Balloon envelope */}
        <path
          d="M120 20 C60 20 40 70 40 110 C40 150 60 175 80 190 L75 195 L165 195 L160 190 C180 175 200 150 200 110 C200 70 180 20 120 20 Z"
          fill={`url(#env-${id})`}
          stroke="hsl(350 85% 55%)"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Vertical panel stripes */}
        <path d="M95 22 C90 80 88 140 82 188" fill="none" stroke="hsl(280 70% 50%)" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M120 18 C120 80 120 140 120 193" fill="none" stroke="hsl(350 85% 55%)" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M145 22 C150 80 152 140 158 188" fill="none" stroke="hsl(280 70% 50%)" strokeWidth="1" strokeOpacity="0.3" />

        {/* Horizontal bands */}
        <path d="M48 70 Q120 78 192 70" fill="none" stroke="hsl(350 85% 55%)" strokeWidth="0.6" strokeOpacity="0.2" />
        <path d="M42 110 Q120 120 198 110" fill="none" stroke="hsl(350 85% 55%)" strokeWidth="0.6" strokeOpacity="0.2" />
        <path d="M50 150 Q120 160 190 150" fill="none" stroke="hsl(280 70% 50%)" strokeWidth="0.6" strokeOpacity="0.2" />

        {/* VHS scanline overlay on envelope */}
        <path
          d="M120 20 C60 20 40 70 40 110 C40 150 60 175 80 190 L75 195 L165 195 L160 190 C180 175 200 150 200 110 C200 70 180 20 120 20 Z"
          fill={`url(#scan-${id})`}
          opacity="0.6"
        />

        {/* Ropes with sag curves */}
        <path d="M82 192 Q88 210 92 225" fill="none" stroke="hsl(30 30% 50%)" strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M120 195 Q120 212 120 228" fill="none" stroke="hsl(30 30% 50%)" strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M158 192 Q152 210 148 225" fill="none" stroke="hsl(30 30% 50%)" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Cross ropes */}
        <path d="M92 215 Q120 220 148 215" fill="none" stroke="hsl(30 30% 50%)" strokeWidth="0.5" strokeOpacity="0.35" />

        {/* Basket */}
        <rect x="88" y="225" width="64" height="24" rx="4" fill="hsl(30 35% 18%)" fillOpacity="0.7" stroke="hsl(30 40% 30%)" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Basket weave lines */}
        <line x1="104" y1="225" x2="104" y2="249" stroke="hsl(30 40% 30%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="120" y1="225" x2="120" y2="249" stroke="hsl(30 40% 30%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="136" y1="225" x2="136" y2="249" stroke="hsl(30 40% 30%)" strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="88" y1="237" x2="152" y2="237" stroke="hsl(30 40% 30%)" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Basket rim */}
        <rect x="86" y="223" width="68" height="4" rx="2" fill="hsl(30 40% 25%)" fillOpacity="0.6" stroke="hsl(30 40% 30%)" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Basket fire glow underneath */}
        <ellipse cx="120" cy="222" rx="20" ry="8" fill={`url(#fire-${id})`} className="animate-balloon-glow-pulse" />

        {/* Fire flame */}
        <ellipse cx="120" cy="220" rx="5" ry="8" fill="hsl(35 90% 60%)" fillOpacity="0.5" />
        <ellipse cx="120" cy="218" rx="3" ry="5" fill="hsl(45 95% 70%)" fillOpacity="0.4" />

        {/* Brand text on balloon body with glow */}
        {showText && (
          <>
            <text
              x="120"
              y="115"
              textAnchor="middle"
              fontSize="14"
              fontFamily="Georgia, serif"
              fill="hsl(45 20% 90%)"
              opacity="0.85"
              letterSpacing="1"
              style={{ textShadow: '0 0 8px hsl(350 85% 55% / 0.6)' }}
            >
              {name}
            </text>
            {/* Subtitle */}
            <text
              x="120"
              y="132"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="hsl(45 20% 90%)"
              opacity="0.45"
              letterSpacing="2"
            >
              AD SPACE
            </text>
          </>
        )}

        {/* Price tag */}
        {price && (
          <>
            <rect
              x={showText ? 75 : 60}
              y={showText ? 142 : 100}
              width={showText ? 90 : 120}
              height={showText ? 18 : 26}
              rx={showText ? 9 : 13}
              fill="hsl(35 90% 55%)"
              fillOpacity="0.8"
            />
            <text
              x="120"
              y={showText ? 155 : 119}
              textAnchor="middle"
              fontSize={showText ? 9 : 14}
              fontFamily="monospace"
              fontWeight="bold"
              fill="hsl(0 0% 10%)"
              letterSpacing="0.5"
            >
              {price}
            </text>
          </>
        )}

        {/* Floating spore particles */}
        <circle cx="55" cy="60" r="1.5" fill="hsl(350 85% 55%)" opacity="0.3" className="animate-spore-float" style={{ '--drift': '8px', '--spore-opacity': '0.3' } as React.CSSProperties} />
        <circle cx="185" cy="85" r="1" fill="hsl(280 70% 50%)" opacity="0.25" className="animate-spore-float" style={{ '--drift': '-6px', '--spore-opacity': '0.25', animationDelay: '1s' } as React.CSSProperties} />
        <circle cx="40" cy="140" r="1.2" fill="hsl(200 100% 60%)" opacity="0.2" className="animate-spore-float" style={{ '--drift': '10px', '--spore-opacity': '0.2', animationDelay: '2.5s' } as React.CSSProperties} />
      </svg>
    </Wrapper>
  );
}
