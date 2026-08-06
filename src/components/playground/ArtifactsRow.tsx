import { useEffect, useState } from "react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";

const STORAGE_KEY = "lp-first-key";

function KeyObject({ awake }: { awake: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-full" aria-hidden="true">
      <defs>
        <radialGradient id="lp-key-core" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={awake ? "0.9" : "0.45"} />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lp-key-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a3145" />
          <stop offset="55%" stopColor="#0a0e18" />
          <stop offset="100%" stopColor="#39415a" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="58" r="40" fill="url(#lp-key-core)" className="lp-key-halo" />
      <ellipse cx="60" cy="60" rx="30" ry="29" fill="url(#lp-key-metal)" stroke="rgba(190,200,230,0.5)" strokeWidth="1" />
      <circle
        cx="60"
        cy="60"
        r="21"
        fill="none"
        stroke="hsl(var(--accent) / 0.55)"
        strokeWidth="0.8"
        strokeDasharray="3 7"
        className="lp-key-ring"
      />
      <path
        d="M60 44 L60 76 M50 60 L70 60 M54 70 L66 70"
        stroke="rgba(225,232,255,0.8)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="60" r="3" fill="hsl(var(--accent))" />
    </svg>
  );
}

function StoneObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-full" aria-hidden="true">
      <defs>
        <radialGradient id="lp-stone" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#8ea6ff" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#141a2c" />
          <stop offset="100%" stopColor="#05070f" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="62" rx="34" ry="26" fill="url(#lp-stone)" stroke="rgba(190,200,230,0.4)" strokeWidth="0.9" />
      {[
        [50, 55],
        [66, 50],
        [72, 66],
        [56, 70],
        [62, 60],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 1.2 : 1.8} fill="#dfe8ff" opacity="0.85" />
      ))}
      <path d="M46 50 L62 60 L72 66 M62 60 L66 50" stroke="rgba(150,180,255,0.4)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function CardObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-full" aria-hidden="true">
      <rect x="38" y="26" width="44" height="68" rx="4" fill="#080c15" stroke="rgba(190,200,230,0.45)" strokeWidth="0.9" />
      <circle cx="60" cy="60" r="12" fill="none" stroke="rgba(200,212,245,0.7)" strokeWidth="1" />
      <circle cx="60" cy="60" r="18" fill="none" stroke="hsl(var(--lp-blue) / 0.35)" strokeWidth="0.6" strokeDasharray="2 6" />
    </svg>
  );
}

function CapsuleObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-full" aria-hidden="true">
      <path d="M40 42 L60 32 L80 42 L80 80 L60 90 L40 80 Z" fill="#070b13" stroke="rgba(190,200,230,0.35)" strokeWidth="0.9" />
      <path d="M40 42 L60 52 L80 42 M60 52 L60 90" stroke="rgba(150,165,205,0.35)" strokeWidth="0.7" fill="none" />
      <text x="60" y="70" textAnchor="middle" fill="rgba(210,220,250,0.6)" fontSize="16" fontWeight="200">
        ?
      </text>
    </svg>
  );
}

/**
 * Artifacts — concept studies for possible physical keys.
 * Nothing here is manufactured, owned or for sale.
 * The First Key stays interactive and remembers the visitor.
 */
export function ArtifactsRow() {
  const [found, setFound] = useState(false);
  const [returning, setReturning] = useState(false);
  const [charging, setCharging] = useState(false);
  const { playPowerSurge } = useStrangerSFX();

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

  const firstKeyBody = found
    ? returning
      ? "You've held this before. It warmed up faster this time."
      : "It answered. Nothing dramatic — that's how real doors work."
    : "NFC metal or acrylic token. Tap to unlock a hidden response.";

  return (
    <section
      id="artifact"
      className="relative px-6 py-20 md:px-14 md:py-28"
      aria-labelledby="artifacts-heading"
    >
      <div className="mx-auto grid max-w-[110rem] gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14">
        <div>
          <p className="lp-label lp-label--violet">Artifacts</p>
          <h2
            id="artifacts-heading"
            className="mt-5 text-sm font-light leading-relaxed text-muted-foreground"
          >
            Possible physical keys to hidden digital layers.
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
            Concepts in development. Not manufactured, not for sale.
          </p>
        </div>

        <div className="lp-rail md:grid md:grid-cols-4 md:overflow-visible">
          <button
            type="button"
            onClick={wake}
            onPointerDown={() => setCharging(true)}
            onPointerUp={() => setCharging(false)}
            onPointerLeave={() => setCharging(false)}
            aria-pressed={found}
            className={`lp-artifact-card lp-object-wrap w-[15rem] md:w-auto ${found ? "is-awake" : ""} ${
              charging ? "is-charging" : ""
            }`}
          >
            <span className="lp-object block">
              <KeyObject awake={found} />
            </span>
            <span className="mt-5 text-[0.7rem] uppercase tracking-[0.28em] text-foreground">
              The First Key
            </span>
            <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {firstKeyBody}
            </span>
            <span className="mt-4 lp-chip lp-chip--violet w-fit">
              {found ? "Prototype · unlocked" : "Prototype · interactive"}
            </span>
          </button>

          {[
            {
              title: "Light Stone Study",
              body: "A palm-sized cast object that scatters its own internal starlight.",
              Obj: StoneObject,
            },
            {
              title: "Echo Card Study",
              body: "A thin card exploring how a season could be carried in a pocket.",
              Obj: CardObject,
            },
            {
              title: "Unknown Capsule",
              body: "A sealed future study. Nothing decided yet, including whether it exists.",
              Obj: CapsuleObject,
            },
          ].map(({ title, body, Obj }) => (
            <article key={title} className="lp-artifact-card w-[15rem] md:w-auto">
              <span className="lp-object block">
                <Obj />
              </span>
              <span className="mt-5 text-[0.7rem] uppercase tracking-[0.28em] text-foreground">
                {title}
              </span>
              <span className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</span>
              <span className="mt-4 lp-chip w-fit">Concept in development</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
