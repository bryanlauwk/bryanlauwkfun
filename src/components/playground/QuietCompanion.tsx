import { useEffect, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";

const WHISPERS = [
  "The older worlds are still awake.",
  "Some objects remember being touched.",
  "There is more below the surface.",
  "Nothing here is finished.",
  "Scroll slower.",
];

const GUIDES = [
  { href: "#archive", label: "Past Seasons" },
  { href: "#lab", label: "Laboratory" },
];

/**
 * QuietCompanion — a small presence that notices stillness and speaks rarely.
 * Also always reachable via a tiny orb, so it can be discovered on purpose.
 */
export function QuietCompanion() {
  const [message, setMessage] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const idxRef = useRef(0);

  const speak = () => {
    setMessage(WHISPERS[idxRef.current % WHISPERS.length]);
    idxRef.current += 1;
  };

  useEffect(() => {
    if (dismissed) return;
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let idleTimer: number;
    let hideTimer: number;

    const idleSpeak = () => {
      speak();
      hideTimer = window.setTimeout(() => setMessage(null), 5200);
    };

    const reset = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(idleSpeak, 18000);
    };

    reset();
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("pointerdown", reset);
    window.addEventListener("keydown", reset);

    return () => {
      window.clearTimeout(idleTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("pointerdown", reset);
      window.removeEventListener("keydown", reset);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-5 z-40 flex items-end gap-3 md:bottom-9 md:left-9">
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={speak}
          aria-label="Bryan's mind — hear a whisper"
          className="lp-orb"
        >
          <Sparkles className="h-4 w-4 text-accent/80" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          mute
        </button>
      </div>

      <div role="status" aria-live="polite" className="max-w-[16rem] md:max-w-sm">
        {message && (
          <div className="lp-panel pointer-events-auto mb-9 flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
            <span className="text-xs font-light leading-relaxed text-muted-foreground">
              {message}
            </span>
            {GUIDES.map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="text-[9px] uppercase tracking-[0.24em] text-accent hover:underline"
              >
                {g.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Hide whisper"
              className="ml-auto text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

