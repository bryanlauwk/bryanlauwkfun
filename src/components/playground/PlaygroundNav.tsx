import { useEffect, useState } from "react";
import { SoundToggle } from "@/components/SoundToggle";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { useSiteContent } from "@/hooks/useSiteSettings";

const LINKS = [
  { id: "play", label: "Play" },
  { id: "process", label: "Process" },
  { id: "notes", label: "Field Notes" },
  { id: "next", label: "Next" },
  { id: "about", label: "About" },
];

export function PlaygroundNav() {
  const { count, isLoading } = useVisitorCounter();
  const { content } = useSiteContent();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to main content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
          lifted ? "bg-[#020409]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-4 px-6 py-5 md:px-14">
          <a href="#arrival" className="lp-script text-2xl text-foreground md:text-[1.7rem]">
            {content("nav.brand")}
          </a>

          <div className="flex items-center gap-5 md:gap-9">
            <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
              {LINKS.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="lp-navlink">
                  {l.label}
                </a>
              ))}
            </nav>

            <span className="hidden items-center gap-2 md:flex" title="Visitors who wandered in">
              <span className="h-1 w-1 rounded-full bg-accent lp-pulse" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                {isLoading ? "····" : (count ?? 0).toLocaleString()}
              </span>
            </span>

            <div className="flex items-center gap-2">
              <SoundToggle />
            </div>
          </div>
        </div>

        <nav
          aria-label="Sections, compact"
          className="lp-navrail flex items-center gap-5 overflow-x-auto border-t border-[hsl(var(--lp-hair)/0.12)] px-6 py-2.5 md:hidden"
        >
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="lp-navlink whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
