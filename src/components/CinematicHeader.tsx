import { useState, useEffect } from "react";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { SoundToggle } from "./SoundToggle";
import faviconImage from "/favicon.png";

export function CinematicHeader() {
  const { count, isLoading } = useVisitorCounter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-full focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 px-4 py-3 md:px-8 md:py-4 transition-all duration-300 relative ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b-2 border-foreground"
            : "bg-background/60 backdrop-blur-sm border-b-2 border-foreground/20"
        }`}
      >
        {/* dossier tape corners */}
        <span className="dossier-tape-black left-8 -top-2 rotate-[-6deg]" aria-hidden="true" />
        <span className="dossier-tape-black right-16 -top-2 rotate-[4deg]" aria-hidden="true" />

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={faviconImage}
              alt="Bryan Lau"
              className="w-9 h-9 md:w-10 md:h-10 rounded-md object-cover border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))]"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base md:text-xl font-black uppercase tracking-tight text-foreground">
                Bryan Lau
              </span>
              <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.25em]">
                Playable art & experiments
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <SoundToggle />
            <div className="visitor-counter flex items-center gap-1.5 text-xs md:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{isLoading ? "---" : (count ?? 0).toLocaleString()}</span>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
