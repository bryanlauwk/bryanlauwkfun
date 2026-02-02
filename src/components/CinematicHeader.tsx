import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { SoundToggle } from "./SoundToggle";
import faviconImage from "/favicon.png";

export function CinematicHeader() {
  const { count, isLoading } = useVisitorCounter();

  return (
    <>
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:outline-none"
      >
        Skip to main content
      </a>
      
      <header className="relative z-20 px-4 py-3 md:px-12 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-shrink-0">
              <img 
                src={faviconImage} 
                alt="Bryan Lau" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-sm object-cover border border-primary/30 shadow-lg shadow-primary/20"
              />
              <div className="absolute inset-0 bg-primary/20 blur-md animate-glow-pulse rounded-sm" />
            </div>
            <span className="font-serif text-lg md:text-2xl font-bold text-foreground tracking-wider uppercase stranger-glow">
              Bryan Lau
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Sound toggle */}
            <SoundToggle />
            
            {/* Visitor counter - responsive */}
            <div className="flex items-center gap-1.5 md:gap-3">
              <div className="hidden sm:block text-xs text-muted-foreground font-mono uppercase tracking-widest">
                Lurkers
              </div>
              <div className="visitor-counter flex items-center gap-1 text-xs md:text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-christmas-light" />
                <span className="animate-electrical-flicker">
                  {isLoading ? "---" : (count ?? 0).toString().padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
