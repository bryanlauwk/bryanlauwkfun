import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

// Work-in-progress teaser for the 2.0 direction (playable interactive tech you can carry and film).

const SPEC_ROWS: [string, string][] = [
  ["Case no.", "BL-2.0-001"],
  ["Format", "pocket-sized, no install"],
  ["Play", "press · react · repeat"],
  ["Made for", "hands, streets, cameras"],
  ["Status", "in the works"],
];

const DEADPAN_LINES = [
  "still under wraps.",
  "great on camera.",
  "do not open.",
];


function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function BrewingTeaser() {
  const [lineIndex, setLineIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setLineIndex((i) => (i + 1) % DEADPAN_LINES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <section id="physical-work" className="mt-16 md:mt-24 relative scroll-mt-24" aria-labelledby="brewing-heading">
      <div className="flex items-center justify-between mb-4 exhibit-label">
        <span>Playable tech · in development</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          In development
        </span>
      </div>

      <div className="relative border border-foreground/15 bg-card bg-grid-paper px-5 py-10 md:px-12 md:py-14 overflow-hidden">
        {/* Tape pinning the corners */}
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-8 w-32 h-7 bg-foreground/85 rotate-[-38deg] opacity-80"
        />

        <h2
          id="brewing-heading"
          className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground"
        >
          2.0 — off the screen.
        </h2>
        <div className="h-1 w-24 bg-primary mt-4" />
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider mt-4 max-w-2xl">
          2.0 is playable tech you can hold. Small interactive objects you take with you,
          hand to a stranger, and film in one take.
        </p>

        <div className="mt-7 max-w-2xl border-l-2 border-primary pl-4 md:pl-5">
          <p className="exhibit-label text-primary">Play on the go</p>
          <p className="font-mono text-xs md:text-sm text-foreground/85 tracking-wider mt-2 leading-relaxed">
            Pocket-sized, battery-powered, mildly chaotic. Press something, it reacts,
            everyone reaches for their phone.
          </p>

          <a
            href="https://wa.me/60149303546"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Discuss a strange idea
          </a>
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-12 items-center mt-6">
          {/* The crate */}
          <div className="relative flex flex-col items-center">
            <div className="crate-stage" aria-hidden="true">
              <span className="crate-shadow" />
              <div className="neon-crate">
                <span className="neon-crate-face crate-front">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-back">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-right">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-left">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-top">
                  <span className="stencil-glyph">?</span>
                </span>
                <span className="neon-crate-face crate-bottom" />
                <span className="crate-edges">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>

            {/* Status pill under the crate */}
            <div className="status-pill" aria-hidden="true">
              <span className="status-pill-dot" />
              <span className="status-pill-label">STATUS: SEALED</span>
              <span className="status-pill-divider" />
              <span className="status-pill-message" key={lineIndex}>
                {DEADPAN_LINES[lineIndex]}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="handwritten absolute bottom-2 right-2 md:right-6 rotate-[-6deg] text-foreground/80 text-lg md:text-xl pointer-events-none"
            >
              try shaking it
            </span>
          </div>

          {/* Spec sheet */}
          <dl className="font-mono text-[0.7rem] md:text-xs border border-foreground/15 divide-y divide-foreground/10">
            {SPEC_ROWS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                <dt className="uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                <dd className="text-right text-foreground">{v}</dd>
              </div>
            ))}
            <div className="px-3 py-3">
              <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Build status
              </div>
              <div className="mt-2 h-1.5 w-full bg-foreground/10 overflow-hidden">
                <div className="h-full w-[62%] bg-primary status-bar-fill" />
              </div>
            </div>
          </dl>
        </div>

        {/* Schematic sticker — hints at a handheld, filmable device without showing it */}
        <div className="mt-8 md:mt-10 flex items-center justify-center md:justify-start">
          <div className="schematic-sticker" aria-hidden="true">
            <svg viewBox="0 0 180 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Handheld unit body */}
              <rect x="46" y="52" width="66" height="40" rx="6" />
              {/* Redacted face plate */}
              <rect x="54" y="60" width="30" height="24" fill="currentColor" opacity="0.85" />
              <line x1="60" y1="66" x2="78" y2="66" stroke="hsl(var(--background))" />
              <line x1="60" y1="72" x2="72" y2="72" stroke="hsl(var(--background))" />
              {/* Big play button */}
              <circle cx="98" cy="72" r="8" />
              <path d="M95 68 L103 72 L95 76 Z" fill="currentColor" />
              {/* Wrist strap / carry loop */}
              <path d="M46 60 Q28 66 30 84" strokeDasharray="3 3" />
              {/* Camera framing brackets — filmable */}
              <path d="M126 52 L146 52 L146 60" />
              <path d="M146 84 L146 92 L126 92" />
              <circle cx="136" cy="72" r="7" />
              <circle cx="136" cy="72" r="2.5" fill="currentColor" />
              {/* Label tape */}
              <rect x="20" y="12" width="140" height="22" rx="2" fill="currentColor" opacity="0.1" />
              <text x="90" y="27" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">CONCEPT · ON THE GO</text>
              {/* Dotted connection lines */}
              <line x1="98" y1="52" x2="98" y2="42" strokeDasharray="2 3" />
              <line x1="136" y1="52" x2="136" y2="42" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>

        <span className="sr-only">
          One portable playable object in development, made to be carried, played with, and filmed.
        </span>


        {/* Barcode footer */}
        <div className="mt-10 flex items-end justify-between gap-6" aria-hidden="true">
          <div className="flex-1">
            <div className="barcode h-8 w-full max-w-xs" />
          </div>
          <p className="exhibit-label text-right !tracking-[0.3em] max-w-xs">
            Not for public hands yet.
          </p>
        </div>
      </div>
    </section>
  );
}
