import { useEffect, useRef, useState } from "react";

/**
 * UpcomingSeason — a large "forming signal": a layered cocoon/seed membrane
 * with drifting fragments knitting into it. It occupies roughly a third of the
 * band on desktop and responds gently to the pointer. No launch information is
 * invented — the date remains unknown.
 */
export function UpcomingSeason() {
  const ref = useRef<HTMLDivElement>(null);
  const [formed, setFormed] = useState(false);
  const [pt, setPt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setFormed(true),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <section
      id="next"
      className="relative px-6 py-8 md:px-14 md:py-11"
      aria-labelledby="next-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={() => setPt({ x: 0, y: 0 })}
          className={`lp-signal relative overflow-hidden px-6 py-8 md:px-10 md:py-9 ${
            formed ? "is-formed" : ""
          }`}
          style={
            {
              ["--sg-x" as string]: pt.x.toFixed(3),
              ["--sg-y" as string]: pt.y.toFixed(3),
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className="lp-signal-field" />

          <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,32%)_minmax(0,1fr)] md:gap-14">
            {/* the living forming signal */}
            <span aria-hidden="true" className="lp-cocoon lp-cocoon--large">
              <svg viewBox="0 0 320 220" className="h-48 w-full md:h-64">
                <defs>
                  <radialGradient id="lp-cocoon-volume" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
                    <stop offset="45%" stopColor="hsl(var(--accent))" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="lp-cocoon-core" cx="50%" cy="44%" r="56%">
                    <stop offset="0%" stopColor="#f0ecff" stopOpacity="0.95" />
                    <stop offset="36%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="lp-cocoon-shell" x1="0.1" y1="0" x2="0.7" y2="1">
                    <stop offset="0%" stopColor="#6b56d8" stopOpacity="0.92" />
                    <stop offset="45%" stopColor="#241c58" stopOpacity="0.96" />
                    <stop offset="100%" stopColor="#03050e" />
                  </linearGradient>
                  <linearGradient id="lp-cocoon-membrane" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#8fb4ff" stopOpacity="0.04" />
                  </linearGradient>
                  <filter id="lp-cocoon-blur" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="7" />
                  </filter>
                </defs>

                {/* volumetric glow */}
                <ellipse
                  cx="160"
                  cy="110"
                  rx="140"
                  ry="98"
                  fill="url(#lp-cocoon-volume)"
                  className="lp-cocoon-glow"
                />

                {/* drifting fragments assembling inward */}
                <g className="lp-cocoon-fragments">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const a = (i / 14) * Math.PI * 2;
                    const rx = 118 + (i % 4) * 12;
                    const ry = 82 + (i % 3) * 9;
                    return (
                      <rect
                        key={i}
                        x={160 + Math.cos(a) * rx}
                        y={110 + Math.sin(a) * ry}
                        width={i % 3 ? 4 : 7}
                        height={i % 2 ? 2 : 4}
                        rx="1"
                        fill={i % 4 === 0 ? "hsl(var(--accent))" : "rgba(196,212,255,0.65)"}
                        opacity="0.7"
                        transform={`rotate(${i * 26} ${160 + Math.cos(a) * rx} ${110 + Math.sin(a) * ry})`}
                        className="lp-fragment"
                        style={{ animationDelay: `${(i % 7) * 0.5}s` }}
                      />
                    );
                  })}
                </g>

                {/* outer membrane */}
                <ellipse
                  cx="160"
                  cy="110"
                  rx="86"
                  ry="94"
                  fill="url(#lp-cocoon-membrane)"
                  stroke="rgba(190,200,255,0.22)"
                  strokeWidth="0.8"
                  className="lp-cocoon-membrane"
                />

                {/* the seed shell */}
                <path
                  d="M160 22 C214 52 232 108 214 156 C200 194 180 210 160 210 C140 210 120 194 106 156 C88 108 106 52 160 22 Z"
                  fill="url(#lp-cocoon-shell)"
                  stroke="rgba(198,206,255,0.32)"
                  strokeWidth="0.9"
                />

                {/* woven threads */}
                {[46, 66, 86, 106, 126, 146, 166].map((y, i) => (
                  <path
                    key={y}
                    d={`M ${160 - (52 - Math.abs(106 - y) * 0.3)} ${y} Q 160 ${y + 12} ${
                      160 + (52 - Math.abs(106 - y) * 0.3)
                    } ${y}`}
                    fill="none"
                    stroke="rgba(206,216,255,0.3)"
                    strokeWidth="0.7"
                    className="lp-cocoon-thread"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                ))}

                {/* inner heart, low-frequency pulse */}
                <circle cx="160" cy="104" r="34" fill="url(#lp-cocoon-core)" className="lp-cocoon-heart" />
                <circle cx="160" cy="104" r="9" fill="#f4f1ff" opacity="0.9" className="lp-cocoon-heart" />
                <ellipse
                  cx="160"
                  cy="204"
                  rx="70"
                  ry="8"
                  fill="hsl(var(--accent) / 0.28)"
                  filter="url(#lp-cocoon-blur)"
                />
              </svg>
            </span>

            <div>
              <p className="lp-label lp-label--violet">
                <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
                Next transmission · forming
              </p>
              <h2
                id="next-heading"
                className="mt-4 text-xl font-extralight leading-snug tracking-[0.02em] text-foreground md:text-2xl"
              >
                Something is learning how to notice you.
              </h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
                Fragments are still arriving. When enough of them agree on a shape, the next
                season opens.
              </p>
              <p className="mt-5 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Opens · Date unknown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
