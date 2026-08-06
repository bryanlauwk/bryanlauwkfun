import { useMemo } from "react";
import { makeRng, type WorldSpec } from "@/lib/lpWorld";

interface MiniWorldProps {
  spec: WorldSpec;
  /** unique id prefix for svg defs */
  uid: string;
}

/**
 * MiniWorld — an illustrated, deterministic scene rendered entirely in SVG.
 * Layered silhouettes, filled organic forms, volumetric glow, suspended dust
 * and a reflective base. No project imagery is used.
 */
export function MiniWorld({ spec, uid }: MiniWorldProps) {
  const { palette: p, archetype, seed, tempo } = spec;

  const scene = useMemo(() => {
    const rng = makeRng(seed);
    const dust = Array.from({ length: 26 }, () => ({
      x: 8 + rng() * 184,
      y: 12 + rng() * 150,
      r: 0.5 + rng() * 1.9,
      o: 0.25 + rng() * 0.7,
      d: rng() * 9,
    }));
    const hills = Array.from({ length: 3 }, (_, i) => {
      const h = 128 + i * 8 + rng() * 10;
      const pts: string[] = [`M -10 200 L -10 ${h}`];
      for (let x = -10; x <= 210; x += 22) {
        pts.push(`Q ${x + 11} ${h - 6 - rng() * 22} ${x + 22} ${h - rng() * 8}`);
      }
      pts.push("L 210 200 Z");
      return { d: pts.join(" "), o: 0.85 - i * 0.22 };
    });
    return { rng, dust, hills };
  }, [seed]);

  const rng = useMemo(() => makeRng(seed ^ 0x9e3779b9), [seed]);

  return (
    <svg
      viewBox="0 0 200 200"
      className="lp-mw absolute inset-0 h-full w-full"
      style={{ ["--mw-tempo" as string]: `${(14 / tempo).toFixed(2)}s` }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-sky`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor={p.haze} stopOpacity="0.95" />
          <stop offset="55%" stopColor={p.far} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.base} />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.85" />
          <stop offset="45%" stopColor={p.glow} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.75" />
          <stop offset="60%" stopColor={p.mid} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.base} />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.3" />
          <stop offset="40%" stopColor={p.mid} stopOpacity="0.28" />
          <stop offset="100%" stopColor={p.base} stopOpacity="0.9" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed % 100} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* background */}
      <rect width="200" height="200" fill={`url(#${uid}-sky)`} />
      <circle cx="100" cy="86" r="72" fill={`url(#${uid}-glow)`} opacity="0.55" className="lp-mw-breathe" />

      {/* far silhouettes */}
      <g className="lp-mw-far">
        {scene.hills.map((h, i) => (
          <path key={i} d={h.d} fill={p.far} opacity={h.o} />
        ))}
      </g>

      {/* archetype mid/foreground */}
      <g className="lp-mw-mid">
        <Archetype kind={archetype} uid={uid} p={p} rng={rng} />
      </g>

      {/* reflective base */}
      <g className="lp-mw-base">
        <rect x="0" y="150" width="200" height="50" fill={`url(#${uid}-water)`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={40 - i * 8}
            x2={160 + i * 8}
            y1={156 + i * 8}
            y2={156 + i * 8}
            stroke={p.spark}
            strokeWidth="0.6"
            opacity={0.22 - i * 0.03}
          />
        ))}
        <ellipse cx="100" cy="152" rx="54" ry="5" fill={p.glow} opacity="0.28" filter={`url(#${uid}-soft)`} />
      </g>

      {/* suspended dust */}
      <g className="lp-mw-dust">
        {scene.dust.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={p.spark}
            opacity={d.o * 0.7}
            style={{ animationDelay: `${d.d}s` }}
            className="lp-mw-mote"
          />
        ))}
      </g>

      {/* grain + vignette */}
      <rect width="200" height="200" filter={`url(#${uid}-grain)`} opacity="0.07" style={{ mixBlendMode: "overlay" }} />
      <radialGradient id={`${uid}-vig`} cx="50%" cy="46%" r="62%">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
      </radialGradient>
      <rect width="200" height="200" fill={`url(#${uid}-vig)`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

interface AProps {
  kind: WorldSpec["archetype"];
  uid: string;
  p: WorldSpec["palette"];
  rng: () => number;
}

function Archetype({ kind, uid, p, rng }: AProps) {
  switch (kind) {
    case "pollen":
      return (
        <>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 26 + i * 25 + rng() * 8;
            const h = 40 + rng() * 58;
            return (
              <g key={i} className="lp-mw-sway" style={{ animationDelay: `${i * 0.7}s` }}>
                <path
                  d={`M ${x} 152 C ${x - 6} ${152 - h * 0.5} ${x + 8} ${152 - h * 0.7} ${x} ${152 - h}`}
                  stroke={p.mid}
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx={x} cy={152 - h} r={4 + rng() * 4} fill={p.glow} opacity="0.85" />
                <circle cx={x} cy={152 - h} r={11} fill={p.glow} opacity="0.2" filter={`url(#${uid}-soft)`} />
              </g>
            );
          })}
        </>
      );

    case "ink":
      return (
        <g className="lp-mw-drift">
          <path
            d="M60 120 C40 96 62 62 92 62 C124 62 146 88 138 116 C132 138 108 150 88 144 C74 140 68 132 60 120 Z"
            fill={`url(#${uid}-body)`}
            opacity="0.95"
          />
          <path
            d="M92 62 C96 44 112 36 122 42"
            stroke={p.glow}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <ellipse cx="86" cy="96" rx="18" ry="14" fill={p.spark} opacity="0.18" filter={`url(#${uid}-soft)`} />
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} cx={54 + i * 24} cy={130 + rng() * 14} r={2 + rng() * 3} fill={p.glow} opacity="0.6" />
          ))}
        </g>
      );

    case "paper":
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => {
            const x = 24 + i * 34;
            const y = 56 + rng() * 60;
            const s = 0.7 + rng() * 0.7;
            return (
              <g
                key={i}
                className="lp-mw-float"
                style={{ animationDelay: `${i * 1.1}s`, transformOrigin: `${x}px ${y}px` }}
              >
                <path
                  d={`M ${x} ${y} l ${16 * s} ${-8 * s} l ${6 * s} ${16 * s} l ${-16 * s} ${7 * s} Z`}
                  fill={`url(#${uid}-body)`}
                  opacity="0.95"
                />
                <path
                  d={`M ${x} ${y} l ${16 * s} ${-8 * s}`}
                  stroke={p.spark}
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              </g>
            );
          })}
        </>
      );

    case "mineral":
      return (
        <>
          {Array.from({ length: 6 }, (_, i) => {
            const x = 22 + i * 28 + rng() * 6;
            const h = 42 + rng() * 62;
            const w = 8 + rng() * 8;
            return (
              <g key={i}>
                <path
                  d={`M ${x} 152 L ${x - w} ${152 - h * 0.55} L ${x + 2} ${152 - h} L ${x + w} ${152 - h * 0.5} Z`}
                  fill={`url(#${uid}-body)`}
                  opacity="0.96"
                />
                <path
                  d={`M ${x + 2} ${152 - h} L ${x} 152`}
                  stroke={p.spark}
                  strokeWidth="0.9"
                  opacity="0.45"
                />
              </g>
            );
          })}
          <circle cx="100" cy="70" r="16" fill={p.glow} opacity="0.4" filter={`url(#${uid}-soft)`} className="lp-mw-breathe" />
        </>
      );

    case "arcade":
      return (
        <>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 16 + i * 26;
            const h = 34 + rng() * 74;
            return (
              <g key={i}>
                <rect x={x} y={152 - h} width="18" height={h} rx="2" fill={p.far} opacity="0.98" />
                {Array.from({ length: Math.max(2, Math.floor(h / 16)) }, (_, j) => (
                  <rect
                    key={j}
                    x={x + 4}
                    y={152 - h + 6 + j * 14}
                    width="4"
                    height="4"
                    fill={p.glow}
                    opacity={0.4 + rng() * 0.55}
                    className="lp-mw-flicker"
                    style={{ animationDelay: `${rng() * 6}s` }}
                  />
                ))}
              </g>
            );
          })}
          <rect x="0" y="120" width="200" height="2" fill={p.glow} opacity="0.25" />
        </>
      );

    case "reef":
      return (
        <>
          {Array.from({ length: 6 }, (_, i) => {
            const x = 20 + i * 30 + rng() * 8;
            const h = 34 + rng() * 56;
            return (
              <g key={i} className="lp-mw-sway" style={{ animationDelay: `${i * 0.9}s` }}>
                <path
                  d={`M ${x} 152 C ${x - 12} ${152 - h * 0.6} ${x + 14} ${152 - h * 0.8} ${x + 3} ${152 - h}
                      M ${x} 152 C ${x + 12} ${152 - h * 0.5} ${x - 8} ${152 - h * 0.75} ${x - 6} ${152 - h * 0.9}`}
                  stroke={`url(#${uid}-body)`}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <circle cx={x + 3} cy={152 - h} r="3.4" fill={p.glow} opacity="0.9" />
              </g>
            );
          })}
        </>
      );

    case "cloud":
      return (
        <>
          {Array.from({ length: 4 }, (_, i) => {
            const y = 52 + i * 24;
            const x = 30 + rng() * 60;
            return (
              <g key={i} className="lp-mw-drift" style={{ animationDelay: `${i * 1.6}s` }}>
                <ellipse cx={x + 40} cy={y} rx={38 - i * 4} ry={12 - i} fill={p.mid} opacity={0.6 - i * 0.09} />
                <ellipse cx={x + 22} cy={y - 5} rx={20} ry={9} fill={p.haze} opacity={0.5 - i * 0.08} />
              </g>
            );
          })}
          <circle cx="132" cy="58" r="10" fill={p.spark} opacity="0.6" className="lp-mw-breathe" />
          <circle cx="132" cy="58" r="24" fill={p.glow} opacity="0.22" filter={`url(#${uid}-soft)`} />
        </>
      );

    case "orbit":
    default:
      return (
        <g>
          <circle cx="100" cy="100" r="20" fill={`url(#${uid}-body)`} />
          <circle cx="100" cy="100" r="34" fill={p.glow} opacity="0.18" filter={`url(#${uid}-soft)`} />
          {Array.from({ length: 3 }, (_, i) => (
            <g key={i} className="lp-mw-orbit" style={{ animationDuration: `${22 + i * 11}s` }}>
              <ellipse
                cx="100"
                cy="100"
                rx={36 + i * 16}
                ry={12 + i * 6}
                fill="none"
                stroke={p.glow}
                strokeWidth="0.9"
                opacity={0.4 - i * 0.08}
                transform={`rotate(${-22 + i * 26} 100 100)`}
              />
              <circle cx={100 + 36 + i * 16} cy="100" r={3 - i * 0.5} fill={p.spark} opacity="0.9" />
            </g>
          ))}
        </g>
      );
  }
}
