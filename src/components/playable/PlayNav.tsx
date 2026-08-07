import { useEffect, useState } from "react";
import { SoundToggle } from "@/components/SoundToggle";
import { useSiteContent } from "@/hooks/useSiteSettings";

const LINKS = [
  { id: "play", label: "Play" },
  { id: "system", label: "How it works" },
  { id: "bench", label: "On the bench" },
  { id: "about", label: "About" },
];

/**
 * Workshop navigation: four anchors plus one visible CTA. On mobile the same
 * four labels sit in a non-overflowing second row.
 */
export function PlayNav() {
  const { content } = useSiteContent();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40);
    onScroll();
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
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          lifted ? "pw-nav-lifted" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3 px-4 py-3 md:px-10 md:py-4">
          <a href="#top" className="pw-wordmark shrink-0">
            {content("nav.brand")}
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="pw-navlink">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <SoundToggle />
            <a
              href={content("about.studioUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="pw-btn pw-btn--sm pw-btn--primary"
            >
              {content("play.navCta")}
            </a>
          </div>
        </div>

        <nav
          aria-label="Sections, compact"
          className="flex w-full items-center justify-between gap-1 overflow-hidden border-t border-[hsl(var(--pw-line)/0.14)] px-3 py-1.5 md:hidden"
        >
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="pw-navlink pw-navlink--compact">
              {l.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
