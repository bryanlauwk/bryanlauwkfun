import { useState } from "react";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import { GuestBook } from "@/components/GuestBook";

const WHISPERS = [
  "The older worlds are still awake.",
  "Some objects remember being touched.",
  "There is more below the surface.",
  "Nothing here is finished.",
  "Scroll slower.",
];

const SOCIALS = [
  { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
  { href: "https://twitter.com/bryanlauwk", Icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, label: "LinkedIn" },
];

function MindSphere() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 md:h-28 md:w-28" aria-hidden="true">
      <defs>
        <radialGradient id="lp-mind" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#b9c9ff" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#2b2350" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#03050e" />
        </radialGradient>
      </defs>
      <ellipse
        cx="60"
        cy="62"
        rx="52"
        ry="16"
        fill="none"
        stroke="hsl(var(--accent) / 0.35)"
        strokeWidth="0.6"
        transform="rotate(-16 60 62)"
      />
      <circle cx="60" cy="60" r="34" fill="url(#lp-mind)" stroke="rgba(190,205,255,0.35)" strokeWidth="0.8" />
      <circle cx="50" cy="56" r="4.4" fill="#f2f6ff" opacity="0.9" />
      <circle cx="70" cy="56" r="4.4" fill="#f2f6ff" opacity="0.9" />
      <circle cx="18" cy="76" r="1.6" fill="hsl(var(--accent))" opacity="0.8" />
      <circle cx="104" cy="50" r="1.2" fill="#9fc0ff" opacity="0.7" />
    </svg>
  );
}

/**
 * ExitStrip — the static lower-page exit area.
 * Bryan's Mind lives here (never as a floating overlay), alongside the compact
 * About positioning, the collapsed signal form and contact icons.
 */
export function ExitStrip() {
  const [whisper, setWhisper] = useState<string | null>(null);
  const [signalOpen, setSignalOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const hint = () => {
    setWhisper(WHISPERS[idx % WHISPERS.length]);
    setIdx((n) => n + 1);
  };

  return (
    <section
      id="about"
      className="relative border-t border-[hsl(var(--lp-hair)/0.12)] px-6 py-12 md:px-14 md:py-16"
      aria-labelledby="exit-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto] md:gap-14">
          {/* Bryan's Mind */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={hint}
              aria-label="Bryan's mind — ask for a hint"
              className="lp-mind-orb shrink-0"
            >
              <MindSphere />
            </button>
            <div>
              <p className="lp-label lp-label--violet">Bryan&apos;s Mind</p>
              <p className="mt-2 max-w-[15rem] text-xs font-light leading-relaxed text-muted-foreground">
                I&apos;m here if you need a hint or a guide.
              </p>
              <button
                type="button"
                onClick={hint}
                className="mt-3 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-accent transition-colors hover:text-foreground"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Ask for a hint
              </button>

              <div role="status" aria-live="polite">
                {whisper && (
                  <div className="mt-4 max-w-xs rounded-sm border border-[hsl(var(--lp-hair)/0.16)] px-4 py-3">
                    <p className="text-xs font-light leading-relaxed text-muted-foreground">
                      {whisper}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <a href="#archive" className="text-[9px] uppercase tracking-[0.24em] text-accent hover:underline">
                        Past Seasons
                      </a>
                      <a href="#lab" className="text-[9px] uppercase tracking-[0.24em] text-accent hover:underline">
                        Laboratory
                      </a>
                      <button
                        type="button"
                        onClick={() => setWhisper(null)}
                        className="ml-auto text-[9px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* centre statement */}
          <div className="text-center">
            <h2
              id="exit-heading"
              className="text-[0.68rem] uppercase leading-[2.2] tracking-[0.34em] text-foreground/85 md:text-xs"
            >
              Nothing here is permanent.
              <br />
              See you next season.
            </h2>
            <p className="mt-5 text-xs font-light leading-relaxed text-muted-foreground">
              Built by Bryan Lau — a creative growth marketer making things people want to
              play with. Creativity is the interface. Growth is the outcome.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://ideas.bryanlauwk.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="lp-button"
              >
                The Studio
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setSignalOpen((v) => !v)}
                aria-expanded={signalOpen}
                aria-controls="signal"
                className="lp-button"
              >
                {signalOpen ? "Close signal" : "Leave a signal"}
              </button>
            </div>
          </div>

          {/* contact icons */}
          <div className="flex items-center justify-center gap-2 md:justify-end">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="lp-arrow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setSignalOpen(true)}
              aria-label="Leave a signal"
              className="lp-arrow"
            >
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div id="signal" className="scroll-mt-24">
          {signalOpen && (
            <div className="lp-fade mx-auto mt-12 max-w-3xl">
              <GuestBook />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
