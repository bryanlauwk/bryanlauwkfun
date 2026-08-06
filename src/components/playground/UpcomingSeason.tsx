import { useEffect, useRef, useState } from "react";

/**
 * UpcomingSeason — a "forming signal": a cocoon assembled from drifting
 * fragments that pulses at low frequency and knits together on entry.
 */
export function UpcomingSeason() {
  const ref = useRef<HTMLDivElement>(null);
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setFormed(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="next"
      className="relative px-6 py-8 md:px-14 md:py-11"
      aria-labelledby="next-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div
          ref={ref}
          className={`lp-signal relative overflow-hidden px-6 py-7 md:px-10 md:py-8 ${
            formed ? "is-formed" : ""
          }`}
        >
          <span aria-hidden="true" className="lp-signal-field" />

          <div className="relative grid items-center gap-6 md:grid-cols-[auto_minmax(0,15rem)_minmax(0,1fr)_auto] md:gap-12">
            <span aria-hidden="true" className="lp-cocoon">
              <svg viewBox="0 0 80 110" className="h-20 w-14 md:h-24 md:w-16">
                <defs>
                  <radialGradient id="lp-cocoon-core" cx="50%" cy="46%" r="55%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="lp-cocoon-shell" x1="0" y1="0" x2="0.6" y2="1">
                    <stop offset="0%" stopColor="#4b3ba0" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#171335" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#04060f" />
                  </linearGradient>
                </defs>
                <ellipse cx="40" cy="55" rx="34" ry="40" fill="url(#lp-cocoon-core)" className="lp-cocoon-glow" />
                <path
                  d="M40 12 C60 26 66 52 58 76 C52 94 46 100 40 100 C34 100 28 94 22 76 C14 52 20 26 40 12 Z"
                  fill="url(#lp-cocoon-shell)"
                  stroke="rgba(190,200,255,0.35)"
                  strokeWidth="0.7"
                />
                {[22, 34, 46, 58, 70].map((y, i) => (
                  <path
                    key={y}
                    d={`M ${40 - (18 - Math.abs(46 - y) * 0.22)} ${y} Q 40 ${y + 6} ${
                      40 + (18 - Math.abs(46 - y) * 0.22)
                    } ${y}`}
                    fill="none"
                    stroke="rgba(200,212,255,0.3)"
                    strokeWidth="0.6"
                    className="lp-cocoon-thread"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                ))}
                <circle cx="40" cy="52" r="5" fill="hsl(var(--accent))" opacity="0.85" className="lp-cocoon-heart" />
              </svg>
            </span>

            <p className="lp-label lp-label--violet">
              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
              Next transmission · forming
            </p>

            <h2
              id="next-heading"
              className="text-lg font-extralight leading-snug tracking-[0.02em] text-foreground md:text-xl"
            >
              Something is learning how to notice you.
            </h2>

            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Opens · Date unknown.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
