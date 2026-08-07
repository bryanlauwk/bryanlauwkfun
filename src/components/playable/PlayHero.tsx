import { useEffect, useRef } from "react";
import { ArrowRight, MousePointerClick, Waves, DoorOpen, Box } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";
import heroArt from "@/assets/living-playground-hero-v3.jpg";

const OUTPUTS = [
  { id: "simulation", Icon: Waves, accent: "cyan" },
  { id: "experience", Icon: DoorOpen, accent: "coral" },
  { id: "object", Icon: Box, accent: "lime" },
] as const;

/**
 * Hero — "Curiosity, made playable". The frame is a real painting from one of
 * Bryan's browser worlds, layered with diagram lines and a cursor-driven
 * response so the first thing a visitor sees is visible cause and effect.
 * All motion is transform/opacity and disabled under reduced motion.
 */
export function PlayHero() {
  const { content } = useSiteContent();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
        el.style.setProperty("--bend", String(Math.max(-1, Math.min(1, (x - 50) / 50))));
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="pw-hero relative overflow-hidden px-4 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32">
      <div className="pw-hero-wash" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[100rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="pw-eyebrow">
            <span className="pw-dot" aria-hidden="true" />
            {content("play.heroEyebrow")}
          </p>

          <h1 className="pw-h1 mt-5">{content("play.heroTitle")}</h1>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
            {content("play.heroBody")}
          </p>

          <p className="pw-note mt-4 max-w-lg">{content("play.heroLine")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#play" className="pw-btn pw-btn--primary">
              {content("play.heroCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={content("about.studioUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="pw-btn"
            >
              {content("play.heroCtaSecondary")}
            </a>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
            {content("play.heroReassurance")}
          </p>

          <ul className="pw-outputs mt-9">
            {OUTPUTS.map(({ id, Icon, accent }) => (
              <li key={id} className={`pw-output pw-accent-${accent}`}>
                <span className="pw-chain-icon" aria-hidden="true">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="pw-output-label">{content(`play.output.${id}`)}</span>
                  <span className="pw-output-note">{content(`play.output.${id}.note`)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={stageRef} className="pw-hero-stage">
          <img
            src={heroArt}
            alt="A luminous field of light particles rising over dark water — a frame from one of Bryan's browser experiments."
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[52%_58%]"
          />
          <span className="pw-hero-cursorglow" aria-hidden="true" />
          <span className="pw-hero-grain" aria-hidden="true" />

          {/* Diagram layer: the trace bends toward the cursor */}
          <svg className="pw-hero-diagram" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="pw-trace" d="M2,86 C30,70 46,58 62,40 C74,26 86,18 98,14" />
            <path className="pw-trace pw-trace--ghost" d="M2,86 C30,78 46,70 62,58 C74,48 86,40 98,34" />
          </svg>
          <span className="pw-hero-ticks" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </span>

          <div className="pw-hero-badge">
            <p className="pw-eyebrow pw-eyebrow--cyan">{content("play.heroBadgeLabel")}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              {content("play.heroBadgeBody")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
