import { ArrowUpRight } from "lucide-react";

const CONCEPTS = [
  {
    title: "Light That Remembers",
    body: "Illumination that keeps a record of everyone who passed through.",
  },
  {
    title: "The Object Listens",
    body: "A small physical thing reacting to voice, breath and silence.",
  },
  {
    title: "A Door for Strangers",
    body: "An entry point that behaves differently if it has met you.",
  },
];


function Blueprint({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 220 130" className="h-28 w-full" aria-hidden="true">
      <g stroke="hsl(var(--lp-blue) / 0.4)" strokeWidth="0.6" fill="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="220" y2={i * 20} opacity="0.25" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="130" opacity="0.25" />
        ))}
      </g>
      <g stroke="rgba(214,224,255,0.75)" strokeWidth="0.9" fill="none" strokeLinecap="round">
        {variant === 0 && (
          <>
            <circle cx="110" cy="65" r="34" />
            <circle cx="110" cy="65" r="14" strokeDasharray="3 5" />
            <path d="M110 20 L110 110 M60 65 L160 65" opacity="0.5" />
            <path d="M76 100 Q110 40 144 100" stroke="hsl(var(--accent) / 0.8)" />
          </>
        )}
        {variant === 1 && (
          <>
            <rect x="70" y="36" width="80" height="58" rx="6" />
            <path d="M84 65 Q97 44 110 65 T136 65" stroke="hsl(var(--accent) / 0.8)" />
            <path d="M70 104 L150 104" strokeDasharray="2 6" />
            <circle cx="110" cy="26" r="3" fill="hsl(var(--lp-gold))" stroke="none" />
          </>
        )}
        {variant === 2 && (
          <>
            <path d="M78 100 L78 38 Q110 20 142 38 L142 100" />
            <path d="M78 66 L142 66" strokeDasharray="3 5" />
            <circle cx="110" cy="66" r="8" stroke="hsl(var(--accent) / 0.85)" />
            <path d="M110 100 L110 118" opacity="0.4" />
          </>
        )}
      </g>
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
            Blueprints, half-thoughts and experiments in progress. No conclusions offered.
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
            <article key={c.title} className="lp-blueprint w-[17rem] md:w-auto">
              <Blueprint variant={i} />
              <span className="mt-5 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Study {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-light tracking-[0.04em] text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}

          <div className="lp-blueprint lp-blueprint--empty flex w-[17rem] flex-col items-center justify-center text-center md:w-auto">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-[hsl(var(--lp-hair)/0.4)] text-base font-extralight text-muted-foreground"
            >
              +
            </span>
            <span className="mt-5 block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Empty slot
            </span>
            <h3 className="mt-2 text-sm font-light tracking-[0.04em] text-foreground">
              Suggest an idea
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              This study has no shape yet. Ideas arrive by signal.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
