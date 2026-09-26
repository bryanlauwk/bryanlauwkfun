import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { BrandSignature } from "./BrandSignature";

export function CinematicHeader() {
  useVisitorCounter();
  const { pathname } = useLocation();
  const home = pathname === "/" ? "" : "/";
  const links = pathname === "/"
    ? [
        { hash: "#featured", label: "Featured" },
        { hash: "#browser-work", label: "The archive" },
        { hash: "#about", label: "About" },
        { hash: "#contact", label: "Contact" },
      ]
    : [
        { hash: "#browser-work", label: "Play" },
        { hash: "#contact", label: "Collaborate" },
      ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground">Skip to main content</a>
      <header className="site-masthead relative z-50 border-b border-border bg-background">
        <div className="editorial-wrap flex min-h-[52px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1">
          <a href={`${home}#main-content`} aria-label="Bryan LauWK Create — home" className="flex min-h-11 items-center">
            <span className="relative block h-14 w-[7rem] md:w-[7.75rem]" aria-hidden="true">
              <BrandSignature className="absolute left-0 top-0 origin-top-left scale-[0.64] md:scale-[0.70]" />
            </span>
          </a>
          <div className="hidden items-center gap-1.5 md:flex">
            <a href="https://x.com/bryanlauwk" aria-label="X" target="_blank" rel="noopener noreferrer" className="masthead-social font-mono text-xs font-bold">X</a>
            <a href="https://github.com/bryanlauwk" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="masthead-social"><Github className="h-3.5 w-3.5" /></a>
            <a href="https://linkedin.com/in/bryanlauwk" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="masthead-social"><Linkedin className="h-3.5 w-3.5" /></a>
          </div>
          <nav className="order-3 flex w-full items-center justify-between border-t border-border md:order-none md:w-auto md:gap-4 md:border-0 lg:gap-6" aria-label="Primary navigation">
            {links.map(({ hash, label }) => <a key={hash} href={`${home}${hash}`} className="inline-flex min-h-9 items-center font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary">{label}</a>)}
            <a href={`${home}#featured`} className="ml-2 inline-flex min-h-8 items-center gap-1.5 bg-foreground px-3 font-mono text-[9px] font-bold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:text-white">Play now <ArrowUpRight className="h-3 w-3" /></a>
          </nav>
        </div>
      </header>
    </>
  );
}
