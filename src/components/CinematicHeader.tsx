import { useState, useEffect } from "react";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { SoundToggle } from "./SoundToggle";
import { BrandSignature } from "./BrandSignature";

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
            <span className="relative block h-10 w-[5.125rem]">
              <BrandSignature className="absolute left-0 top-0 origin-top-left scale-50" />
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 ml-auto mr-8" aria-label="Primary navigation">
            {[
              { href: "#physical-work", label: "Physical" },
              { href: "#browser-work", label: "Browser" },
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
