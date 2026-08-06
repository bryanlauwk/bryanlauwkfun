import { useReveal } from "@/hooks/useReveal";

const STAGES = [
  { label: "Seed", note: "A stray thought, written down at 1am.", grow: 0.22 },
  { label: "Sprout", note: "A rough prototype that barely runs.", grow: 0.45 },
  { label: "Sapling", note: "Playable, ugly, weirdly fun.", grow: 0.7 },
  { label: "Tree", note: "Shipped as a drop, still growing.", grow: 1 },
];

function Tree({ grow, delay }: { grow: number; delay: number }) {
  const h = 40 + grow * 62;
  const spread = 10 + grow * 30;
  return (
    <svg viewBox="0 0 120 130" className="h-28 w-24 md:h-36 md:w-28" aria-hidden="true">
      <defs>
        <radialGradient id={`leaf-${delay}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor="hsl(160 90% 72% / 0.95)" />
          <stop offset="60%" stopColor="hsl(172 80% 46% / 0.5)" />
          <stop offset="100%" stopColor="hsl(200 90% 40% / 0)" />
        </radialGradient>
      </defs>
      <g style={{ animation: `lp-float ${7 + delay}s ease-in-out infinite` }}>
        <ellipse cx="60" cy={120 - h} rx={spread * 1.5} ry={spread} fill={`url(#leaf-${delay})`} />
        <path
          d={`M60 120 C 58 ${120 - h * 0.5} 62 ${120 - h * 0.7} 60 ${120 - h}`}
          stroke="hsl(41 62% 70% / 0.75)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {grow > 0.4 && (
          <path
            d={`M60 ${120 - h * 0.55} q -${spread * 0.7} -8 -${spread} -${spread * 0.5}`}
            stroke="hsl(41 62% 70% / 0.5)"
            strokeWidth="1.4"
            fill="none"
          />
        )}
        {grow > 0.6 && (
          <path
            d={`M60 ${120 - h * 0.7} q ${spread * 0.7} -8 ${spread} -${spread * 0.5}`}
            stroke="hsl(41 62% 70% / 0.5)"
            strokeWidth="1.4"
            fill="none"
          />
        )}
      </g>
      <ellipse cx="60" cy="123" rx={spread} ry="3" fill="hsl(172 80% 60% / 0.16)" />
    </svg>
  );
}

/** Ideas Forest — a growth timeline from raw idea to shipped world. */
export function IdeasForest() {
  const { ref, inView } = useReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      id="ideas"
      className={`lp-scene relative px-6 py-16 transition-all duration-1000 md:px-14 md:py-24 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      aria-labelledby="ideas-heading"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="text-center">
          <p className="lp-label lp-label--violet">Growth</p>
          <h2
            id="ideas-heading"
            className="mt-4 text-2xl font-extralight tracking-[0.05em] text-foreground md:text-[2rem]"
          >
            Ideas Forest
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            Nothing here arrives finished. Ideas are planted, watered in public,
            and occasionally become worlds.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[3.25rem] h-px bg-[linear-gradient(90deg,transparent,hsl(var(--lp-hair)/0.35),transparent)]"
          />
          <ol className="relative grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
            {STAGES.map((s, i) => (
              <li key={s.label} className="flex flex-col items-center text-center">
                <Tree grow={s.grow} delay={i} />
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent)/0.9)]"
                />
                <span className="mt-4 text-[0.62rem] uppercase tracking-[0.3em] text-foreground/90">
                  {s.label}
                </span>
                <span className="mt-2 max-w-[13rem] px-2 text-xs font-light leading-relaxed text-muted-foreground">
                  {s.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
