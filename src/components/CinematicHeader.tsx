import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { SoundToggle } from "./SoundToggle";
import { BrandSignature } from "./BrandSignature";
import { ThemeToggle } from "./ThemeToggle";

export function CinematicHeader() {
  useVisitorCounter();
  const { pathname } = useLocation();
  const home = pathname === "/" ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-3 focus:bg-primary focus:text-primary-foreground">Skip to main content</a>
      <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm transition-colors ${scrolled ? "border-foreground/20" : "border-foreground/10"}`}>
        <div className="h-0.5 bg-primary" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-wrap items-center justify-between gap-x-5">
          <a href={`${home}#main-content`} aria-label="Bryan Lau — home" className="py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <span className="relative block h-12 w-[6.4rem]"><BrandSignature className="absolute left-0 top-0 origin-top-left scale-[0.6]" /></span>
          </a>
          <nav className="order-3 flex w-full items-center justify-between border-t border-foreground/10 md:order-none md:w-auto md:gap-7 md:border-0" aria-label="Primary navigation">
            {[
              { hash: "#browser-work", label: "Play" },
              { hash: "#physical-work", label: "Brewing" },
              { hash: "#contact", label: "Collaborate" },
            ].map(({ hash, label }) => <a key={hash} href={`${home}${hash}`} className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary">{label}</a>)}
          </nav>
          <div className="flex items-center gap-2"><ThemeToggle /><SoundToggle /></div>
        </div>
      </header>
    </>
  );
}
