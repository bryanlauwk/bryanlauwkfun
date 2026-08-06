import { useEffect, useState } from "react";
import { SoundToggle } from "@/components/SoundToggle";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";

const LINKS = [
  { id: "now", label: "Now" },
  { id: "artifact", label: "Artifact" },
  { id: "archive", label: "Archive" },
  { id: "lab", label: "Lab" },
  { id: "signal", label: "Say hi" },
];

export function PlaygroundNav() {
  const { count, isLoading } = useVisitorCounter();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          lifted
            ? "border-b border-foreground/10 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
          <a href="#arrival" className="group flex items-center gap-3">
            <span className="lp-orb" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="font-tide text-lg italic tracking-tight text-foreground md:text-xl">
                Bryan Lau
              </span>
              <span className="lp-label">A living playground</span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="lp-navlink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 sm:flex" title="Visitors who wandered in">
              <span className="h-1.5 w-1.5 rounded-full bg-accent lp-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] text-muted-foreground">
                {isLoading ? "····" : (count ?? 0).toLocaleString()}
              </span>
            </span>
            <SoundToggle />
          </div>
        </div>
      </header>
    </>
  );
}
