import { ArrowUpRight } from "lucide-react";

const CONCEPTS = [
  {
    title: "Light That Remembers",
    body: "Illumination keeping a record of everyone who passed.",
  },
  {
    title: "The Object Listens",
    body: "A small thing reacting to voice, breath and silence.",
  },
  {
    title: "A Door for Strangers",
    body: "An entry that behaves differently once it has met you.",
  },
];

/** Mixed-media specimens — each study has its own material and motion. */
function Specimen({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 220 130" className="lp-specimen h-32 w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`lab-glow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`lab-body-${variant}`} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#5f6fd6" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#1a2044" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#04060f" />
        </linearGradient>
        <linearGradient id={`lab-warm-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3a2418" stopOpacity="0.95" />
        </linearGradient>
        <filter id={`lab-soft-${variant}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* faint lab grid, kept as texture not as the subject */}
      <g stroke="hsl(var(--lp-blue) / 0.28)" strokeWidth="0.5" opacity="0.35">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 24} x2="220" y2={i * 24} />
        ))}
      </g>

      {variant === 0 && (
        /* breathing particle botanical */
        <g>
          <circle cx="110" cy="66" r="44" fill={`url(#lab-glow-${variant})`} opacity="0.4" className="lp-mw-breathe" />
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 62 + i * 24;
            const hgt = 34 + ((i * 37) % 40);
            return (
              <g key={i} className="lp-mw-sway" style={{ animationDelay: `${i * 0.8}s` }}>
                <path
                  d={`M ${x} 116 C ${x - 8} ${116 - hgt * 0.6} ${x + 10} ${116 - hgt * 0.8} ${x} ${116 - hgt}`}
                  stroke={`url(#lab-body-${variant})`}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx={x} cy={116 - hgt} r={5} fill="hsl(var(--accent))" opacity="0.85" />
                <circle cx={x} cy={116 - hgt} r={13} fill={`url(#lab-glow-${variant})`} opacity="0.5" />
              </g>
            );
          })}
          <ellipse cx="110" cy="118" rx="62" ry="5" fill="hsl(var(--accent) / 0.3)" filter={`url(#lab-soft-${variant})`} />
        </g>
      )}

      {variant === 1 && (
        /* folded paper soft-body */
        <g className="lp-mw-float">
          <path d="M60 96 L104 34 L150 62 L128 108 Z" fill={`url(#lab-warm-${variant})`} opacity="0.92" />
          <path d="M104 34 L128 108" stroke="rgba(255,244,225,0.55)" strokeWidth="0.9" fill="none" />
          <path d="M60 96 L150 62" stroke="rgba(255,244,225,0.3)" strokeWidth="0.7" fill="none" />
          <path d="M104 34 L60 96" stroke="rgba(20,12,6,0.5)" strokeWidth="1.2" fill="none" />
          <ellipse cx="106" cy="118" rx="46" ry="5" fill="rgba(255,200,140,0.22)" filter={`url(#lab-soft-${variant})`} />
          <circle cx="132" cy="52" r="3.4" fill="hsl(var(--lp-gold))" />
        </g>
      )}

      {variant === 2 && (
        /* camera / light organism */
        <g>
          <ellipse cx="110" cy="70" rx="46" ry="34" fill={`url(#lab-body-${variant})`} />
          <circle cx="110" cy="70" r="20" fill="#02040c" stroke="rgba(200,214,255,0.5)" strokeWidth="1" />
          <circle cx="110" cy="70" r="11" fill="hsl(var(--accent) / 0.55)" className="lp-mw-breathe" />
          <circle cx="104" cy="64" r="3.6" fill="#f2f6ff" opacity="0.9" />
          <path
            d="M64 70 Q40 52 30 24"
            stroke="hsl(var(--lp-blue) / 0.7)"
            strokeWidth="1.2"
            fill="none"
            className="lp-mw-flicker"
          />
          <path d="M156 70 Q182 56 196 30" stroke="hsl(var(--lp-blue) / 0.45)" strokeWidth="1" fill="none" />
          <ellipse cx="110" cy="112" rx="52" ry="6" fill="hsl(var(--lp-blue) / 0.25)" filter={`url(#lab-soft-${variant})`} />
        </g>
      )}

    </svg>
  );
}

export function Laboratory() {
  return (
    <section
      id="lab"
      className="relative px-6 py-8 md:px-14 md:py-11"
      aria-labelledby="lab-heading"
    >
      <div className="mx-auto grid max-w-[110rem] gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14">
        <div>
          <p className="lp-label lp-label--violet">Laboratory</p>
          <h2
            id="lab-heading"
            className="mt-5 text-2xl font-extralight tracking-[0.03em] text-foreground md:text-[1.8rem]"
          >
            Where things are still wrong
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            Specimens, half-thoughts and experiments in progress. No conclusions offered.
          </p>

          <a
            href="https://ideas.bryanlauwk.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-button mt-7"
          >
            The Studio · my idea engine
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="lp-rail md:grid md:grid-cols-4 md:overflow-visible">
          {CONCEPTS.map((c, i) => (
            <article key={c.title} className="lp-blueprint lp-study w-[17rem] md:w-auto">
              <Specimen variant={i} />
              <span className="mt-5 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Study {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-light tracking-[0.04em] text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}

          <div className="lp-blueprint lp-study lp-blueprint--empty flex w-[17rem] flex-col items-center justify-center text-center md:w-auto">
            <span aria-hidden="true" className="lp-empty-portal">
              <svg viewBox="0 0 120 120" className="h-24 w-24">
                <defs>
                  <radialGradient id="lab-portal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="40" fill="url(#lab-portal)" className="lp-mw-breathe" />
                <circle
                  cx="60"
                  cy="60"
                  r="28"
                  fill="none"
                  stroke="hsl(var(--lp-hair) / 0.5)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  className="lp-portal-ring"
                />
                <circle cx="60" cy="60" r="16" fill="none" stroke="hsl(var(--accent) / 0.5)" strokeWidth="0.8" />
                <path d="M60 50 L60 70 M50 60 L70 60" stroke="rgba(220,228,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="mt-5 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Empty slot
            </span>
            <h3 className="mt-2 text-sm font-light tracking-[0.04em] text-foreground">
              Suggest an idea
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              No shape yet. Ideas arrive by signal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
