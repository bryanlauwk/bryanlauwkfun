import { useEffect, useRef, useState } from "react";

const WHISPERS = [
  "you're still here.",
  "nothing here is finished.",
  "that button does something.",
  "scroll slower.",
  "the key remembers you.",
  "good luck, have fun, don't die.",
];

/**
 * QuietCompanion — a small presence that notices stillness and speaks rarely.
 * Never blocks interaction; dismissible; silent for reduced-motion users.
 */
export function QuietCompanion() {
  const [message, setMessage] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const idxRef = useRef(0);

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

    const speak = () => {
      setMessage(WHISPERS[idxRef.current % WHISPERS.length]);
      idxRef.current += 1;
      hideTimer = window.setTimeout(() => setMessage(null), 5200);
    };

    const reset = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(speak, 18000);
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

  if (!message || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="lp-whisper pointer-events-auto fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="rounded-full border border-foreground/12 bg-background/70 px-5 py-2.5 font-tide text-sm italic text-muted-foreground backdrop-blur-xl transition-colors hover:text-foreground"
        aria-label={`Whisper: ${message}. Dismiss.`}
      >
        {message}
      </button>
    </div>
  );
}
