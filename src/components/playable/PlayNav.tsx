import { useEffect, useState } from "react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";

const LINKS = [
  { id: "experiments", label: "EXPERIMENTS" },
  { id: "method", label: "THE METHOD" },
  { id: "archive", label: "SEASON 01" },
  { id: "about", label: "ABOUT" },
];

export function PlayNav() {
  const { content } = useSiteContent();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="cp-skip">Skip to main content</a>
      <header className={`cp-nav ${lifted ? "is-lifted" : ""}`}>
        <div className="cp-shell cp-nav-inner">
          <a href="#top" className="cp-wordmark" aria-label="bryanlauwk.fun, back to top">
            <Asterisk aria-hidden="true" />
            <span>{content("nav.brand")}</span>
            <small>CURIOUSLY UNQUALIFIED</small>
          </a>

          <nav aria-label="Main navigation" className="cp-nav-links">
            {LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`}>{link.label}</a>
            ))}
          </nav>

          <a
            href={content("about.studioUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-nav-cta"
          >
            BRING A WEIRD BRIEF <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </header>
    </>
  );
}
