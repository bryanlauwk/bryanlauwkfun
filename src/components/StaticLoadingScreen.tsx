import { useState, useEffect } from "react";

export function StaticLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"static" | "tuning" | "fade">("static");

  useEffect(() => {
    // Phase 1: Pure static
    const tuningTimer = setTimeout(() => {
      setPhase("tuning");
    }, 800);

    // Phase 2: Signal found, fade out
    const fadeTimer = setTimeout(() => {
      setPhase("fade");
    }, 1500);

    // Phase 3: Remove from DOM
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(tuningTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Static noise canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <StaticNoise isActive={phase !== "fade"} />
      </div>

      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
          }}
        />
      </div>

      {/* Tuning indicator */}
      <div
        className={`relative z-10 text-center transition-all duration-300 ${
          phase === "tuning" ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4 animate-electrical-flicker">
          Signal Detected
        </div>
        <div className="font-serif text-2xl md:text-4xl font-bold stranger-glow uppercase tracking-wider">
          Tuning...
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-christmas-light"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* VHS tracking effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 50%,
            transparent 100%
          )`,
          animation: "vhs-tracking 0.5s linear infinite",
        }}
      />

      {/* Channel number */}
      <div className="absolute top-6 right-6 font-mono text-sm text-muted-foreground/50">
        CH-11
      </div>
    </div>
  );
}

function StaticNoise({ isActive }: { isActive: boolean }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div
      key={key}
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        mixBlendMode: "overlay",
      }}
    />
  );
}
