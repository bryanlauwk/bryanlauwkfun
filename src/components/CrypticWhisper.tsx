import { useMemo } from "react";

const WHISPERS = [
  "the signal persists",
  "something shifted",
  "still transmitting",
  "signal detected",
  "frequency locked",
  "channel open",
  "wavelength steady",
  "transmission holding",
];

export function CrypticWhisper() {
  const phrase = useMemo(
    () => WHISPERS[Math.floor(Math.random() * WHISPERS.length)],
    []
  );

  return (
    <div className="mt-4 animate-breathe" aria-hidden="true">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/[0.15] select-none">
        {phrase}
      </span>
    </div>
  );
}
