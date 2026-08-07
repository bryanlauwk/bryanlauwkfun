import { Sparkles, Users, Repeat } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const PRINCIPLES = [
  { id: "curiosity", Icon: Sparkles, accent: "cyan" },
  { id: "participation", Icon: Users, accent: "green" },
  { id: "transformation", Icon: Repeat, accent: "amber" },
] as const;

/** Three creative principles — what makes a thing playable. No lessons. */
export function PlayPrinciples() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  const { content } = useSiteContent();

  return (
    <section className="pw-section px-4 md:px-10" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-section-head">
          <div>
            <p className="pw-eyebrow pw-eyebrow--green">{content("play.principlesEyebrow")}</p>
            <h2 id="principles-heading" className="pw-h2 mt-3">
              {content("play.principlesHeading")}
            </h2>
          </div>
        </div>

        <div ref={ref} className={`mt-8 grid gap-4 md:grid-cols-3 ${inView ? "pw-in" : ""}`}>
          {PRINCIPLES.map(({ id, Icon, accent }, i) => (
            <div
              key={id}
              className={`pw-panel pw-accent-${accent} pw-tilt`}
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <span className="pw-chain-icon" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="pw-h3 mt-4 text-lg">{content(`play.principle.${id}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {content(`play.principle.${id}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
