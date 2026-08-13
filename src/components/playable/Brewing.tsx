import { Monitor, DoorOpen, Boxes, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const STEPS = [
  { id: "screen", Icon: Monitor, accent: "cyan" },
  { id: "space", Icon: DoorOpen, accent: "coral" },
  { id: "stuff", Icon: Boxes, accent: "lime" },
] as const;

/** Quiet teaser for the 2.0 direction: screen → space → stuff. No claims, no dates. */
export function Brewing() {
  const { content } = useSiteContent();
  const { ref, inView } = useReveal<HTMLUListElement>(0.1);

  return (
    <section id="next" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="brewing-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-panel pw-clip">
          <p className="pw-eyebrow pw-eyebrow--lime">
            <span className="pw-dot" aria-hidden="true" />
            {content("play.brewEyebrow")}
          </p>
          <h2 id="brewing-heading" className="pw-h2 mt-4 max-w-3xl">
            {content("play.brewHeading")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {content("play.brewBody")}
          </p>

          <ul ref={ref} className={`pw-brew-strip mt-9 ${inView ? "pw-in" : ""}`}>
            {STEPS.map(({ id, Icon, accent }, i) => (
              <li
                key={id}
                className={`pw-brew-step pw-accent-${accent}`}
                style={{ ["--i" as string]: String(i) } as React.CSSProperties}
              >
                <span className="pw-chain-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="pw-brew-label">{content(`play.brew.${id}`)}</span>
                  <span className="pw-brew-note">{content(`play.brew.${id}.note`)}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="pw-brew-arrow h-4 w-4 shrink-0" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
