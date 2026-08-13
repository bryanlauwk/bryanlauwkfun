import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowRight, FlaskConical, MousePointerClick } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";
import workbenchHero from "@/assets/curiosity/workbench-hero.webp";

const MEDIUMS = ["SCREEN", "SPACE", "STUFF"];

export function PlayHero() {
  const { content } = useSiteContent();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = stage.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        stage.style.setProperty("--hero-rx", `${y * -2.2}deg`);
        stage.style.setProperty("--hero-ry", `${x * 2.2}deg`);
        stage.style.setProperty("--hero-x", `${(x + 0.5) * 100}%`);
        stage.style.setProperty("--hero-y", `${(y + 0.5) * 100}%`);
      });
    };
    const onPointerLeave = () => {
      stage.style.setProperty("--hero-rx", "0deg");
      stage.style.setProperty("--hero-ry", "0deg");
    };

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="cp-hero" aria-labelledby="hero-heading">
      <div className="cp-hero-noise" aria-hidden="true" />
      <div className="cp-shell cp-hero-grid">
        <div className="cp-hero-copy">
          <p className="cp-kicker">
            <FlaskConical aria-hidden="true" />
            BRYAN&apos;S LAB / SEASON 02
          </p>

          <h1 id="hero-heading" className="cp-hero-title">
            MAKING
            <span>CURIOSITY</span>
            PLAYABLE.
          </h1>

          <p className="cp-hero-lede">
            I turn strange questions into things you can poke, trigger, annoy and accidentally make worse—across screens, spaces and stuff.
          </p>

          <div className="cp-hero-actions">
            <a href="#experiments" className="cp-button cp-button--red">
              MEET THE TROUBLEMAKERS
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a href="#archive" className="cp-text-link">
              PLAY SEASON 01 <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="cp-medium-row" aria-label="Creative technology across three mediums">
            {MEDIUMS.map((medium, index) => (
              <div key={medium} className="cp-medium">
                <span>0{index + 1}</span>
                <strong>{medium}</strong>
                {index < MEDIUMS.length - 1 && <ArrowRight aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        <div ref={stageRef} className="cp-hero-stage">
          <div className="cp-hero-photo">
            <img
              src={workbenchHero}
              alt="A colourful world of finished playful inventions with people reacting to a needy plant, celebration machine and snack dispenser."
              loading="eager"
              decoding="async"
            />
            <span className="cp-pointer-glow" aria-hidden="true" />
          </div>
          <p className="cp-camera-label">THE INVENTION CHANNEL / 02</p>
          <p className="cp-touch-sticker">
            <MousePointerClick aria-hidden="true" />
            POKE AROUND
          </p>
          <p className="cp-not-exhibition">NOT AN EXHIBITION.<br />A VERY BAD IDEA, FINISHED.</p>
          <span className="cp-photo-arrow" aria-hidden="true">↳</span>
        </div>
      </div>

      <div className="cp-marquee" aria-hidden="true">
        <div>
          <span>OBJECT + PERSONALITY + BEHAVIOUR + SURPRISE</span>
          <span>NO BORING BUTTONS</span>
          <span>BUILD THE PUNCHLINE</span>
          <span>OBJECT + PERSONALITY + BEHAVIOUR + SURPRISE</span>
          <span>NO BORING BUTTONS</span>
          <span>BUILD THE PUNCHLINE</span>
        </div>
      </div>
    </section>
  );
}
