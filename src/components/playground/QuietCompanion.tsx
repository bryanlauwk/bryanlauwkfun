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
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-3 px-5">
      <div role="status" aria-live="polite" className="w-full max-w-md">
        {message && (
          <div className="lp-whisper pointer-events-auto mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-foreground/12 bg-background/80 px-5 py-2.5 backdrop-blur-xl">
            <span className="font-tide text-sm italic text-muted-foreground">
              {message}
            </span>
            {GUIDES.map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:underline"
              >
                {g.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Hide whisper"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={speak}
          aria-label="Bryan's mind — hear a whisper"
          className="rounded-full border border-foreground/12 bg-background/70 p-2.5 text-muted-foreground backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          mute
        </button>
      </div>
    </div>
  );
}
