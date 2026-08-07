import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Sprout } from "lucide-react";
import { SoundToggle } from "@/components/SoundToggle";
import { useSiteContent } from "@/hooks/useSiteSettings";

const SOCIALS = [
  { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
  { href: "https://twitter.com/bryanlauwk", Icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, label: "LinkedIn" },
];

/**
 * Shared shell for every drop detail route. Uses the same near-black luminous
 * language as the homepage so the transition after "Play" feels continuous.
 */
export function DropShellHeader() {
  const { content } = useSiteContent();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to main content
      </a>

      <header className="pw-nav-lifted sticky top-0 z-50">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3 px-4 py-3 md:px-10 md:py-4">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="pw-wordmark">{content("nav.brand")}</span>
            <span className="pw-eyebrow pw-eyebrow--cyan mt-0.5 text-[0.55rem]">
              Playable experiences
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <SoundToggle />
            <Link to="/#play" className="pw-btn pw-btn--sm">
              Back to play
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function DropShellFooter() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[hsl(var(--pw-line)/0.14)] px-4 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[100rem] flex-col items-center gap-7">
        <Link to="/#play" className="pw-btn pw-btn--primary">
          Keep playing
        </Link>

        <a
          href={content("about.studioUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="pw-btn"
        >
          <Sprout className="h-4 w-4" aria-hidden="true" />
          The Studio · my idea engine
        </a>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="pw-icon-link"
              aria-label={label}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="text-[0.65rem] text-muted-foreground/80">© {year} bryanlauwk</p>
      </div>
    </footer>
  );
}
