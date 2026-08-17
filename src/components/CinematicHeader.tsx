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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-foreground/20"
            : "bg-background/60 backdrop-blur-sm border-foreground/10"
        }`}
      >
        {/* signal strip */}
        <div className="h-0.5 w-full bg-primary" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src={faviconImage}
              alt=""
              className="w-9 h-9 md:w-10 md:h-10 object-cover border border-foreground/25"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base md:text-xl font-black uppercase tracking-tight text-foreground">
                Bryan Lau Create
              </span>
              <span className="exhibit-label text-[9px] md:text-[10px]">
                Playable art · Ongoing exhibition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <SoundToggle />
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="exhibit-label text-[8px] md:text-[9px]">Attendance</span>
              <div className="visitor-counter flex items-center gap-1.5 text-xs md:text-sm mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{isLoading ? "----" : (count ?? 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
