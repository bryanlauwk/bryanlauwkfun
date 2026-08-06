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
    <svg viewBox="0 0 140 140" className="h-28 w-28 md:h-32 md:w-32" aria-hidden="true">
      <defs>
        <radialGradient id="lp-mind-body" cx="36%" cy="30%" r="74%">
          <stop offset="0%" stopColor="#dfe7ff" stopOpacity="0.92" />
          <stop offset="26%" stopColor="#8b7cff" stopOpacity="0.7" />
          <stop offset="62%" stopColor="#2a2258" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#03050e" />
        </radialGradient>
        <radialGradient id="lp-mind-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <filter id="lp-mind-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <circle cx="70" cy="70" r="60" fill="url(#lp-mind-halo)" className="lp-mw-breathe" />

      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx="70"
          cy="72"
          rx={52 - i * 6}
          ry={15 + i * 4}
          fill="none"
          stroke="hsl(var(--accent) / 0.32)"
          strokeWidth="0.7"
          transform={`rotate(${-20 + i * 30} 70 72)`}
          className="lp-mind-ring"
          style={{ animationDuration: `${26 + i * 12}s` }}
        />
      ))}

      {/* liquid body with a soft wobble */}
      <path
        className="lp-mind-body"
        d="M70 28 C96 28 112 48 112 70 C112 94 94 112 70 112 C46 112 28 94 28 70 C28 48 44 28 70 28 Z"
        fill="url(#lp-mind-body)"
        stroke="rgba(198,210,255,0.35)"
        strokeWidth="0.8"
      />
      <ellipse cx="56" cy="54" rx="15" ry="10" fill="#ffffff" opacity="0.18" filter="url(#lp-mind-soft)" />

      {/* expressive light */}
      <circle cx="58" cy="66" r="5" fill="#f4f7ff" opacity="0.95" className="lp-mind-eye" />
      <circle cx="82" cy="66" r="5" fill="#f4f7ff" opacity="0.95" className="lp-mind-eye" style={{ animationDelay: "0.2s" }} />
      <path d="M60 84 Q70 92 80 84" stroke="rgba(226,232,255,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      <circle cx="16" cy="92" r="2" fill="hsl(var(--accent))" opacity="0.8" className="lp-mw-flicker" />
      <circle cx="124" cy="52" r="1.5" fill="#a8c4ff" opacity="0.7" className="lp-mw-flicker" />
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
