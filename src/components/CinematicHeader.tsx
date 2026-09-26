import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { ThemeToggle } from "./ThemeToggle";

export function CinematicHeader() {
  useVisitorCounter();
  const { pathname } = useLocation();
  const home = pathname === "/" ? "" : "/";

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to main content</a>
      <header className="site-masthead sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="editorial-wrap flex min-h-[62px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1">
          <a href={`${home}#main-content`} aria-label="Bryan LauWK — home" className="flex min-h-11 items-center gap-2">
            <span className="font-display text-lg font-black uppercase tracking-[-0.06em] md:text-xl">BRYAN<span className="text-primary">LAUWK</span></span>
            <span className="hidden rounded-full bg-primary px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-primary-foreground sm:inline">Playable ideas</span>
          </a>
          <nav className="order-3 flex w-full items-center justify-between border-t border-border md:order-none md:w-auto md:gap-7 md:border-0" aria-label="Primary navigation">
            {[
              { hash: "#featured", label: "Featured" },
              { hash: "#browser-work", label: "The archive" },
              { hash: "#about", label: "About" },
              { hash: "#contact", label: "Contact" },
            ].map(({ hash, label }) => <a key={hash} href={`${home}${hash}`} className="inline-flex min-h-10 items-center font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary">{label}</a>)}
          </nav>
          <div className="flex items-center gap-1.5">
            <a href="https://x.com/bryanlauwk" aria-label="X" target="_blank" rel="noopener noreferrer" className="masthead-social font-mono text-xs font-bold">X</a>
            <a href="https://github.com/bryanlauwk" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="masthead-social"><Github className="h-3.5 w-3.5" /></a>
            <a href="https://linkedin.com/in/bryanlauwk" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="masthead-social"><Linkedin className="h-3.5 w-3.5" /></a>
            <ThemeToggle />
            <a href={`${home}#contact`} className="ml-1 hidden min-h-9 items-center gap-1.5 bg-foreground px-3 font-mono text-[9px] font-bold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:text-white sm:inline-flex">Say hello <ArrowUpRight className="h-3 w-3" /></a>
          </div>
        </div>
      </header>
    </>
  );
}
