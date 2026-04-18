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
        className={`sticky top-0 z-50 px-4 py-3 md:px-12 md:py-5 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b-2 border-foreground/10"
            : "bg-transparent border-b-2 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={faviconImage}
              alt="Bryan Lau"
              className="w-9 h-9 md:w-10 md:h-10 rounded-lg object-cover border-2 border-foreground"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base md:text-xl font-black uppercase tracking-tight text-foreground">
                Bryan Lau
              </span>
              <span className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-[0.2em]">
                Web collective
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <SoundToggle />
            <div className="visitor-counter flex items-center gap-1.5 text-xs md:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{isLoading ? "---" : (count ?? 0).toString().padStart(3, "0")}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
