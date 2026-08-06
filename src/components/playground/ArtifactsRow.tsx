import { useEffect, useRef, useState } from "react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useReveal } from "@/hooks/useReveal";

const STORAGE_KEY = "lp-first-key";

/**
 * The First Key — a single hero artifact presented like a product reveal in a
 * dark gallery. A slowly rotating machined token with a light sweep, a cast
 * reflection, and a hidden digital layer that only appears once it is woken.
 */
function KeySculpture({ awake }: { awake: boolean }) {
  return (
    <svg viewBox="0 0 320 320" className="lp-key-svg h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="fk-face" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f6e6c2" stopOpacity="0.95" />
          <stop offset="20%" stopColor="#b79257" />
          <stop offset="42%" stopColor="#2c2519" />
          <stop offset="58%" stopColor="#0a0a10" />
          <stop offset="78%" stopColor="#caa869" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1a1610" />
        </linearGradient>
        <linearGradient id="fk-edge" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#8e7440" />
          <stop offset="50%" stopColor="#efdcb0" />
          <stop offset="100%" stopColor="#5c4a28" />
        </linearGradient>
        <radialGradient id="fk-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eaf3ff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fk-emerald" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8affd8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#8affd8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fk-sweep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="fk-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id="fk-clip">
          <ellipse cx="160" cy="150" rx="94" ry="94" />
        </clipPath>
      </defs>

      {/* volumetric gallery light behind the object */}
      <ellipse cx="160" cy="140" rx="140" ry="120" fill="url(#fk-core)" opacity={awake ? 0.5 : 0.25} className="lp-key-aura" />

      {/* the rotating token */}
      <g className="lp-key-spin">
        <ellipse cx="160" cy="150" rx="94" ry="94" fill="url(#fk-face)" />
        <ellipse cx="160" cy="150" rx="94" ry="94" fill="none" stroke="url(#fk-edge)" strokeWidth="3" />
        <ellipse cx="160" cy="150" rx="80" ry="80" fill="none" stroke="rgba(8,7,4,0.75)" strokeWidth="4" />

        {/* machined knurling */}
        <g opacity="0.55">
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i / 72) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={160 + Math.cos(a) * 86}
                y1={150 + Math.sin(a) * 86}
                x2={160 + Math.cos(a) * 93}
                y2={150 + Math.sin(a) * 93}
                stroke={i % 2 ? "rgba(255,238,200,0.5)" : "rgba(20,16,8,0.7)"}
                strokeWidth="1.6"
              />
            );
          })}
        </g>

        {/* engraved circuitry — the hidden digital layer */}
        <g clipPath="url(#fk-clip)" className={awake ? "lp-key-layer is-open" : "lp-key-layer"}>
          <circle cx="160" cy="150" r="58" fill="url(#fk-emerald)" opacity="0.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            const x = 160 + Math.cos(a) * 52;
            const y = 150 + Math.sin(a) * 52;
            return (
              <g key={i}>
                <path
                  d={`M160 150 L${160 + Math.cos(a) * 34} ${150 + Math.sin(a) * 34} L${x} ${y}`}
                  fill="none"
                  stroke="rgba(150,255,225,0.75)"
                  strokeWidth="1.2"
                />
                <circle cx={x} cy={y} r="3.2" fill="#b7ffe8" />
              </g>
            );
          })}
          <circle cx="160" cy="150" r="66" fill="none" stroke="rgba(140,255,220,0.4)" strokeWidth="0.8" strokeDasharray="3 9" className="lp-key-ring" />
        </g>

        {/* embossed mark */}
        <path
          d="M160 118 L160 182 M138 150 L182 150 M146 168 L174 168"
          stroke="rgba(255,246,225,0.9)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="160" cy="150" r="7" fill={awake ? "#9dffe0" : "hsl(var(--accent))"} />

        {/* light sweep across the face */}
        <g clipPath="url(#fk-clip)">
          <rect x="-160" y="40" width="120" height="230" fill="url(#fk-sweep)" className="lp-key-sweep" />
        </g>
      </g>

      {/* cast shadow + reflection */}
      <ellipse cx="160" cy="264" rx="96" ry="14" fill="rgba(0,0,0,0.85)" filter="url(#fk-soft)" />
      <ellipse cx="160" cy="262" rx="70" ry="9" fill={awake ? "rgba(140,255,220,0.35)" : "hsl(var(--accent) / 0.3)"} filter="url(#fk-soft)" />
    </svg>
  );
}

export function ArtifactsRow() {
  const [found, setFound] = useState(false);
  const [returning, setReturning] = useState(false);
  const [charging, setCharging] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const { playPowerSurge } = useStrangerSFX();
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setFound(true);
        setReturning(true);
      }
    } catch {
      /* storage unavailable — the artifact simply forgets */
    }
  }, []);

  const wake = () => {
    if (found) return;
    setFound(true);
    playPowerSurge?.();
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const onMove = (e: React.PointerEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  const body = found
    ? returning
      ? "You have held this before. It warmed up faster this time."
      : "It answered. Nothing dramatic — that is how real doors work."
    : "A machined token carrying a short-range chip. Wake it and the digital layer beneath the metal surfaces.";

  return (
    <section
      id="artifact"
      className="lp-scene relative px-6 py-16 md:px-14 md:py-24"
      aria-labelledby="artifact-heading"
    >
      <div
        ref={ref}
        className={`lp-vault mx-auto grid max-w-[110rem] items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-20 ${
          inView ? "is-lit" : ""
        }`}
      >
        <div
          ref={stageRef}
          onPointerMove={onMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          className="lp-vault-stage relative order-1 md:order-none"
          style={
            {
              ["--kx" as string]: tilt.x.toFixed(3),
              ["--ky" as string]: tilt.y.toFixed(3),
            } as React.CSSProperties
          }
        >
          <span aria-hidden="true" className="lp-vault-pool" />
          <button
            type="button"
            onClick={wake}
            onPointerDown={() => setCharging(true)}
            onPointerUp={() => setCharging(false)}
            onPointerLeave={() => setCharging(false)}
            aria-pressed={found}
            aria-label={found ? "The First Key is awake" : "Wake The First Key"}
            className={`lp-vault-object ${found ? "is-awake" : ""} ${charging ? "is-charging" : ""}`}
          >
            <KeySculpture awake={found} />
          </button>
        </div>

        <div className="order-2 md:order-none">
          <p className="lp-label lp-label--violet">Artifact 001</p>
          <h2
            id="artifact-heading"
            className="mt-6 text-3xl font-extralight leading-tight tracking-[0.02em] text-foreground md:text-[2.6rem]"
          >
            The First Key
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            {body}
          </p>

          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-x-6 gap-y-4 text-[0.62rem] uppercase tracking-[0.24em]">
            <div>
              <dt className="text-muted-foreground/70">Material</dt>
              <dd className="mt-1 text-foreground/85">Machined brass · acrylic</dd>
            </div>
            <div>
              <dt className="text-muted-foreground/70">Layer</dt>
              <dd className="mt-1 text-foreground/85">Short-range chip</dd>
            </div>
            <div>
              <dt className="text-muted-foreground/70">Status</dt>
              <dd className="mt-1 text-foreground/85">
                {found ? "Unlocked" : "Prototype · dormant"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground/70">Edition</dt>
              <dd className="mt-1 text-foreground/85">Not manufactured</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={wake}
            className="lp-cta mt-9"
            aria-hidden={found}
            tabIndex={found ? -1 : 0}
            hidden={found}
          >
            Wake the key
          </button>
          {found && (
            <p className="lp-fade mt-9 text-[0.6rem] uppercase tracking-[0.3em] text-accent">
              Hidden layer visible · keep it
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
