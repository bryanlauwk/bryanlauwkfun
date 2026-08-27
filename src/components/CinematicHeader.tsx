import { useState, useEffect } from "react";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { SoundToggle } from "./SoundToggle";
import { BrandSignature } from "./BrandSignature";
import { ThemeToggle } from "./ThemeToggle";

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

        <div className="max-w-7xl mx-auto px-4 py-3 md:px-8 flex items-center justify-between">
          <a
            href="#main-content"
            aria-label="Bryan LWK Create — back to the top"
            className="transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="relative block h-12 w-[6.4rem] md:h-14 md:w-[7.25rem]">
              <BrandSignature className="absolute left-0 top-0 origin-top-left scale-[0.6] md:scale-[0.68]" />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 ml-auto mr-8" aria-label="Primary navigation">
            {[
              { href: "#physical-work", label: "For cats" },
              { href: "#browser-work", label: "Play now" },
              { href: "#contact", label: "Collaborate" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <ThemeToggle />
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
