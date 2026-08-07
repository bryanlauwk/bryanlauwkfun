import { useEffect, useRef } from "react";
import { ArrowRight, Globe, MonitorPlay, Box, DoorOpen } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";
import heroArt from "@/assets/living-playground-hero-v3.jpg";

const CHAIN = [
  { id: "browser", Icon: MonitorPlay, accent: "cyan" },
  { id: "space", Icon: DoorOpen, accent: "violet" },
  { id: "object", Icon: Box, accent: "amber" },
] as const;

/**
 * Hero — bold sans statement, the Browser → Space → Object promise up front,
 * and a cursor-following glow over a real painting cropped into a graphic
 * panel. All motion is transform/opacity and disabled for reduced motion.
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
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
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

          <h1 className="pw-h1 mt-5">
            {content("play.heroTitle")}
          </h1>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
            {content("play.heroBody")}
          </p>

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
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {content("play.heroReassurance")}
          </p>

          <ul className="pw-chain mt-9">
            {CHAIN.map(({ id, Icon, accent }, i) => (
              <li key={id} className={`pw-chain-item pw-accent-${accent}`}>
                <span className="pw-chain-icon" aria-hidden="true">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="pw-chain-label">{content(`play.chain.${id}`)}</span>
                {i < CHAIN.length - 1 && (
                  <span className="pw-chain-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div ref={stageRef} className="pw-hero-stage">
          <img
            src={heroArt}
            alt="A luminous field of light particles rising over dark water — a frame from one of Bryan's browser worlds."
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[52%_58%]"
          />
          <span className="pw-hero-cursorglow" aria-hidden="true" />
          <span className="pw-hero-grain" aria-hidden="true" />
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
