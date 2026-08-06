import { useEffect, useState } from "react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";
import { useReveal } from "@/hooks/useReveal";

const STORAGE_KEY = "lp-first-key";

/** Shared material defs — gradients, refraction, grain. */
function Defs({ id, warm }: { id: string; warm?: boolean }) {
  return (
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor={warm ? "#f0d7a8" : "#c9d6ff"} stopOpacity="0.95" />
        <stop offset="26%" stopColor={warm ? "#7a5a34" : "#454f7a"} />
        <stop offset="58%" stopColor="#080c18" />
        <stop offset="82%" stopColor={warm ? "#c9a468" : "#8f9ecb"} stopOpacity="0.75" />
        <stop offset="100%" stopColor="#05070f" />
      </linearGradient>
      <radialGradient id={`${id}-inner`} cx="42%" cy="34%" r="66%">
        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.95" />
        <stop offset="42%" stopColor="hsl(var(--accent))" stopOpacity="0.28" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
        <stop offset="40%" stopColor="#8fb4ff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
      </linearGradient>
      <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  );
}

/** Machined metal / acrylic key with an internal charge. */
function KeyObject({ awake }: { awake: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-full" aria-hidden="true">
      <Defs id="ak" warm />
      <ellipse cx="60" cy="103" rx="30" ry="6" fill="hsl(var(--accent) / 0.28)" filter="url(#ak-soft)" />
      <circle cx="60" cy="58" r="42" fill="url(#ak-inner)" opacity={awake ? "0.85" : "0.4"} className="lp-key-halo" />
      <ellipse cx="60" cy="60" rx="31" ry="30" fill="url(#ak-metal)" stroke="rgba(240,225,190,0.55)" strokeWidth="0.9" />
      <ellipse cx="60" cy="60" rx="24" ry="23" fill="none" stroke="rgba(10,8,4,0.7)" strokeWidth="2" />
      <circle cx="60" cy="60" r="21" fill="none" stroke="hsl(var(--accent) / 0.6)" strokeWidth="0.8" strokeDasharray="3 7" className="lp-key-ring" />
      <path d="M60 44 L60 76 M50 60 L70 60 M54 70 L66 70" stroke="rgba(255,246,226,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="3.4" fill="hsl(var(--accent))" />
      <path d="M40 44 Q52 34 70 36" stroke="rgba(255,252,240,0.55)" strokeWidth="2" fill="none" strokeLinecap="round" className="lp-sheen" />
    </svg>
  );
}

/** Cloudy cast stone holding its own light. */
function StoneObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-full" aria-hidden="true">
      <Defs id="as" />
      <ellipse cx="60" cy="98" rx="32" ry="6" fill="hsl(var(--lp-blue) / 0.28)" filter="url(#as-soft)" />
      <path
        d="M28 66 C26 50 40 36 60 34 C82 32 96 46 94 64 C92 80 78 92 60 92 C42 92 30 82 28 66 Z"
        fill="url(#as-metal)"
        stroke="rgba(190,206,245,0.4)"
        strokeWidth="0.8"
      />
      <ellipse cx="58" cy="64" rx="22" ry="18" fill="url(#as-inner)" opacity="0.7" className="lp-stone-core" />
      {[[48, 58], [66, 52], [72, 68], [54, 72]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 1.3 : 2} fill="#eef4ff" opacity="0.9" />
      ))}
      <path d="M38 48 Q52 38 70 40" stroke="rgba(240,246,255,0.5)" strokeWidth="2.4" fill="none" strokeLinecap="round" className="lp-sheen" />
    </svg>
  );
}

/** Translucent card — refracting, thin, pocketable. */
function CardObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-full" aria-hidden="true">
      <Defs id="ac" />
      <ellipse cx="60" cy="102" rx="26" ry="5" fill="hsl(var(--lp-blue) / 0.24)" filter="url(#ac-soft)" />
      <g className="lp-card-tilt">
        <rect x="38" y="24" width="44" height="70" rx="5" fill="url(#ac-metal)" opacity="0.9" />
        <rect x="38" y="24" width="44" height="70" rx="5" fill="url(#ac-glass)" stroke="rgba(206,220,255,0.55)" strokeWidth="0.9" />
        <circle cx="60" cy="59" r="13" fill="url(#ac-inner)" opacity="0.65" />
        <circle cx="60" cy="59" r="13" fill="none" stroke="rgba(214,226,255,0.75)" strokeWidth="1" />
        <circle cx="60" cy="59" r="19" fill="none" stroke="hsl(var(--lp-blue) / 0.4)" strokeWidth="0.6" strokeDasharray="2 6" className="lp-key-ring" />
        <path d="M42 30 L78 84" stroke="rgba(255,255,255,0.22)" strokeWidth="6" className="lp-sheen" />
      </g>
    </svg>
  );
}

/** Sealed prism capsule — nothing decided, including whether it exists. */
function CapsuleObject() {
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-full" aria-hidden="true">
      <Defs id="ap" />
      <ellipse cx="60" cy="100" rx="26" ry="5" fill="hsl(var(--accent) / 0.2)" filter="url(#ap-soft)" />
      <path d="M40 42 L60 30 L80 42 L80 80 L60 92 L40 80 Z" fill="url(#ap-metal)" stroke="rgba(196,208,245,0.45)" strokeWidth="0.9" />
      <path d="M40 42 L60 54 L80 42 M60 54 L60 92" stroke="rgba(160,176,220,0.4)" strokeWidth="0.8" fill="none" />
      <path d="M40 42 L60 30 L80 42 L60 54 Z" fill="url(#ap-glass)" />
      <circle cx="60" cy="68" r="12" fill="url(#ap-inner)" opacity="0.45" className="lp-mw-breathe" />
      <text x="60" y="74" textAnchor="middle" fill="rgba(226,234,255,0.7)" fontSize="16" fontWeight="200">
        ?
      </text>
    </svg>
  );
}

/**
 * Artifacts — concept studies for possible physical keys, presented as linked
 * plinths on one continuous dark display shelf rather than four cards.
 * Nothing here is manufactured, owned or for sale.
 */
export function ArtifactsRow() {
  const [found, setFound] = useState(false);
  const [returning, setReturning] = useState(false);
  const [charging, setCharging] = useState(false);
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

  const firstKeyBody = found
    ? returning
      ? "You've held this before. It warmed up faster this time."
      : "It answered. Nothing dramatic — that's how real doors work."
    : "NFC metal or acrylic token. Tap to unlock a hidden response.";

  return (
    <section
      id="artifact"
      className="relative px-6 py-8 md:px-14 md:py-11"
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

        <div ref={ref} className={`lp-shelf ${inView ? "is-lit" : ""}`}>
          <span aria-hidden="true" className="lp-shelf-surface" />
          <span aria-hidden="true" className="lp-shelf-light" />

          <div className="lp-rail lp-shelf-row md:grid md:grid-cols-4 md:overflow-visible">
            <button
              type="button"
              onClick={wake}
              onPointerDown={() => setCharging(true)}
              onPointerUp={() => setCharging(false)}
              onPointerLeave={() => setCharging(false)}
              aria-pressed={found}
              className={`lp-plinth lp-plinth--metal w-[15rem] md:w-auto ${found ? "is-awake" : ""} ${
                charging ? "is-charging" : ""
              }`}
            >
              <span className="lp-object lp-object--rich lp-plinth-object block">
                <KeyObject awake={found} />
              </span>
              <span className="lp-plinth-label mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-foreground">
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
                material: "stone",
              },
              {
                title: "Echo Card Study",
                body: "A thin card exploring how a season could be carried in a pocket.",
                Obj: CardObject,
                material: "card",
              },
              {
                title: "Unknown Capsule",
                body: "A sealed future study. Nothing decided yet, including whether it exists.",
                Obj: CapsuleObject,
                material: "prism",
              },
            ].map(({ title, body, Obj, material }) => (
              <article
                key={title}
                tabIndex={0}
                className={`lp-plinth lp-plinth--${material} w-[15rem] md:w-auto`}
              >
                <span className="lp-object lp-object--rich lp-plinth-object block">
                  <Obj />
                </span>
                <span className="lp-plinth-label mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-foreground">
                  {title}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</span>
                <span className="mt-4 lp-chip w-fit">Concept in development</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
