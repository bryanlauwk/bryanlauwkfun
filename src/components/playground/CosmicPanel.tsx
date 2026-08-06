/**
 * CosmicPanel — a compact original fallback scene for feature panels with no
 * artwork. Uses the same visual language as the hero (particles, portal,
 * reflective water) but deliberately quieter. Static SVG: no runtime cost.
 */
export function CosmicPanel() {
  const motes = Array.from({ length: 120 }, (_, i) => {
    const rnd = (n: number) => {
      const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
      return s - Math.floor(s);
    };
    const u = Math.pow(rnd(1), 0.9);
    const y = 62 - u * 46;
    const flare = Math.pow(u, 1.4) * 26;
    const x = 50 + (rnd(2) - 0.5) * 2 * flare;
    return {
      x,
      y,
      r: 0.16 + Math.pow(rnd(3), 3) * 0.7,
      o: 0.2 + rnd(4) * 0.75,
      c: rnd(5) > 0.72 ? "#9a7cff" : rnd(5) > 0.4 ? "#78b0ff" : "#eef4ff",
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="lp-cp-portal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6f0ff" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#8fb6ff" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#050a18" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lp-cp-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9dc0ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lp-cp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#04070f" />
          <stop offset="100%" stopColor="#080a1a" />
        </linearGradient>
      </defs>

      <rect width="100" height="100" fill="url(#lp-cp-bg)" />

      {/* filaments */}
      {[-16, -9, 8, 15].map((dx, i) => (
        <path
          key={dx}
          d={`M50 62 Q ${50 + dx * 0.4} ${44 - i * 3} ${50 + dx} ${28 - i * 2}`}
          fill="none"
          stroke={i % 2 ? "rgba(150,120,255,0.2)" : "rgba(120,175,255,0.2)"}
          strokeWidth="0.3"
        />
      ))}

      {motes.map((m, i) => (
        <circle key={i} cx={m.x} cy={m.y} r={m.r} fill={m.c} opacity={m.o} />
      ))}

      {/* portal at the waterline */}
      <circle cx="50" cy="60" r="18" fill="url(#lp-cp-portal)" />
      <circle cx="50" cy="60" r="6.4" fill="none" stroke="rgba(240,248,255,0.85)" strokeWidth="0.4" />
      <circle cx="50" cy="60" r="8.4" fill="none" stroke="rgba(160,130,255,0.45)" strokeWidth="0.25" />

      {/* water */}
      <rect x="0" y="66" width="100" height="34" fill="url(#lp-cp-water)" />
      {Array.from({ length: 12 }).map((_, i) => {
        const u = i / 12;
        const y = 67 + Math.pow(u, 1.6) * 32;
        const half = 8 + u * 40;
        return (
          <line
            key={i}
            x1={50 - half}
            x2={50 + half}
            y1={y}
            y2={y}
            stroke="rgba(200,222,255,0.85)"
            strokeWidth="0.22"
            opacity={0.22 - u * 0.17}
          />
        );
      })}
      <path d="M46 66 L54 66 L60 100 L40 100 Z" fill="rgba(200,225,255,0.1)" />
    </svg>
  );
}
