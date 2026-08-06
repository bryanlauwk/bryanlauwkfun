import { useEffect, useState } from "react";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";

const STORAGE_KEY = "lp-first-key";

/**
 * The First Key — a small interactive artifact.
 * Press and hold (or click) to wake it. It remembers you.
 */
export function InteractiveArtifact() {
  const [found, setFound] = useState(false);
  const [charging, setCharging] = useState(false);
  const [returning, setReturning] = useState(false);
  const { playPowerSurge } = useStrangerSFX();

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setFound(true);
        setReturning(true);
      }
    } catch {
      /* storage unavailable — artifact simply forgets */
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

  return (
    <section
      id="artifact"
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="artifact-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="lp-label">Prototype artifact · concept in development</p>

        <div className="mt-8 grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2
              id="artifact-heading"
              className="font-tide text-4xl italic text-foreground md:text-5xl"
            >
              THE FIRST KEY
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              A possible physical layer for this season — a small NFC-enabled
              metal or acrylic token. Not made yet, not for sale. Just an idea
              being tested here first.
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              {found
                ? returning
                  ? "You've held this before. It warmed up faster this time — it remembers the shape of your hand."
                  : "It opened. Nothing dramatic happened, which is exactly how real doors work. Keep it. It'll matter in a later season."
                : "Tap to unlock a hidden response."}
            </p>

            <button
              type="button"
              onClick={wake}
              onPointerDown={() => setCharging(true)}
              onPointerUp={() => setCharging(false)}
              onPointerLeave={() => setCharging(false)}
              aria-pressed={found}
              className="lp-button mt-8"
            >
              {found ? "Held" : "Tap to unlock"}
            </button>
          </div>


          <button
            type="button"
            onClick={wake}
            aria-label={found ? "The first key, awake" : "Wake the first key"}
            className={`lp-artifact mx-auto ${found ? "is-awake" : ""} ${
              charging ? "is-charging" : ""
            }`}
          >
            <svg viewBox="0 0 200 200" className="h-48 w-48 md:h-64 md:w-64" aria-hidden="true">
              <defs>
                <radialGradient id="lp-key-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="72" fill="url(#lp-key-core)" className="lp-key-halo" />
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="hsl(var(--foreground) / 0.22)"
                strokeWidth="1"
              />
              <circle
                cx="100"
                cy="100"
                r="46"
                fill="none"
                stroke="hsl(var(--accent) / 0.55)"
                strokeWidth="1"
                strokeDasharray="4 9"
                className="lp-key-ring"
              />
              <path
                d="M100 58 L100 142 M78 100 L122 100 M86 128 L114 128"
                stroke="hsl(var(--foreground) / 0.75)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="7" fill="hsl(var(--accent))" className="lp-key-core" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
