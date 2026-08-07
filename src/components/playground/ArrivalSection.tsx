import { useEffect, useRef, useState } from "react";
import { useSiteContent } from "@/hooks/useSiteSettings";
import heroArt from "@/assets/living-playground-hero-v3.jpg";

const MOTES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 9) * 1.7,
  dur: 16 + (i % 5) * 4,
  size: i % 3 === 0 ? 3 : 2,
}));

/**
 * Arrival — the hero painting held edge to edge, with pointer parallax, a slow
 * caustic shimmer over the water and a breathing orb glow. All motion is
 * transform/opacity only and stops under prefers-reduced-motion.
 */
export function ArrivalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { content } = useSiteContent();
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        setP({
          x: ((e.clientX - r.left) / r.width - 0.5) * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * 2,
        });
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="arrival"
      className="lp-arrival relative min-h-[100svh] w-full overflow-hidden"
      aria-labelledby="arrival-heading"
      style={{ ["--px" as string]: p.x.toFixed(3), ["--py" as string]: p.y.toFixed(3) } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={heroArt}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="lp-art-parallax absolute inset-0 h-full w-full object-cover object-[52%_62%]"
        />
        <span className="lp-caustics" />
        <span className="lp-orb-breath" />
        <span className="lp-veil" />
        <span className="lp-seam-bottom" />

        <div className="lp-motes">
          {MOTES.map((m, i) => (
            <span
              key={i}
              style={{
                left: `${m.left}%`,
                width: m.size,
                height: m.size,
                animationDelay: `${m.delay}s`,
                animationDuration: `${m.dur}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-end px-6 pb-28 pt-32 text-center md:justify-center md:pb-24">
        <p className="lp-fade lp-label lp-label--violet" style={{ animationDelay: "0ms" }}>
          {content("hero.eyebrow")}
        </p>

        <h1
          id="arrival-heading"
          className="lp-fade lp-display mt-6 text-[2.7rem] leading-[1.04] text-foreground sm:text-6xl md:text-[4.4rem]"
          style={{ animationDelay: "80ms" }}
        >
          {content("hero.title")}
        </h1>

        <p
          className="lp-fade mt-6 text-[0.68rem] uppercase tracking-[0.34em] text-foreground/90 md:text-[0.78rem]"
          style={{ animationDelay: "140ms" }}
        >
          {content("hero.subtitle")}
        </p>

        <p
          className="lp-fade mt-6 max-w-lg text-sm font-light leading-relaxed text-foreground/70 md:text-[0.95rem]"
          style={{ animationDelay: "200ms" }}
        >
          {content("hero.description")}
        </p>

        <div className="lp-fade mt-9 flex flex-col items-center gap-5" style={{ animationDelay: "260ms" }}>
          <a href="#play" className="lp-cta">
            {content("hero.ctaPrimary")}
          </a>
          <a
            href="#process"
            className="lp-mono text-muted-foreground underline-offset-8 transition-colors hover:text-foreground hover:underline"
          >
            {content("hero.ctaSecondary")}
          </a>
        </div>
      </div>

      <a
        href="#play"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center text-[0.55rem] uppercase tracking-[0.34em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="mx-auto mb-2 block h-8 w-px bg-[hsl(var(--lp-hair)/0.35)]" aria-hidden="true" />
        {content("hero.scrollHint")}
      </a>

    </section>
  );
}
