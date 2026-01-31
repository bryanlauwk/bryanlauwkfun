import { useEffect, useState } from "react";
import { useUpsideDown } from "@/contexts/UpsideDownContext";
import { X } from "lucide-react";

export function UpsideDownOverlay() {
  const { isUpsideDown, toggleUpsideDown } = useUpsideDown();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (isUpsideDown) {
      setShowBanner(true);
      // Auto-hide banner after 5 seconds
      const timer = setTimeout(() => setShowBanner(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isUpsideDown]);

  if (!isUpsideDown) return null;

  return (
    <>
      {/* Full-screen filter overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none upside-down-filter" />
      
      {/* Floating spores - more intense in Upside Down */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/40 animate-spore-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-20px`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 8}s`,
              "--drift": `${-30 + Math.random() * 60}px`,
              "--spore-opacity": `${0.3 + Math.random() * 0.4}`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Ash/debris particles */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`ash-${i}`}
            className="absolute bg-muted-foreground/30 animate-ash-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10px`,
              width: `${2 + Math.random() * 4}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDuration: `${12 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Banner notification */}
      {showBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-fade-in">
          <div className="flex items-center gap-3 px-6 py-3 bg-card/95 border border-primary/50 rounded-sm shadow-lg shadow-primary/20 backdrop-blur-sm">
            <div className="flex flex-col">
              <span className="font-serif text-lg text-primary stranger-glow tracking-wider">
                THE UPSIDE DOWN
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Press Konami code again to escape
              </span>
            </div>
            <button
              onClick={toggleUpsideDown}
              className="p-1.5 hover:bg-primary/20 rounded transition-colors pointer-events-auto"
              aria-label="Exit Upside Down mode"
            >
              <X className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      )}

      {/* VHS distortion effect */}
      <div className="fixed inset-0 z-45 pointer-events-none vhs-scanlines opacity-50" />
      <div className="fixed inset-0 z-45 pointer-events-none vhs-tracking" />
    </>
  );
}
