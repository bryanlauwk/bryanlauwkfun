import { MonitorPlay, DoorOpen, Gem } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const STAGES = [
  { id: "browser", Icon: MonitorPlay },
  { id: "space", Icon: DoorOpen },
  { id: "object", Icon: Gem },
] as const;

/**
 * Browser → Space → Object — one idea changing medium. A single animated
 * "signal" thread runs through all three stages; motion is decorative only and
 * halts under prefers-reduced-motion.
 */
export function SignalPath() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  const { content } = useSiteContent();

  return (
    <section id="travel" className="lp-band relative px-6 py-16 md:px-14 md:py-24" aria-labelledby="travel-heading">
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-2xl">
          <p className="lp-label lp-label--violet">{content("travel.eyebrow")}</p>
          <h2 id="travel-heading" className="lp-display mt-5 text-3xl text-foreground md:text-[2.7rem]">
            {content("travel.heading")}
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
            {content("travel.intro")}
          </p>
        </div>

        <div ref={ref} className={`lp-signal-path mt-14 ${inView ? "is-live" : ""}`}>
          <span className="lp-thread" aria-hidden="true">
            <span className="lp-thread-pulse" />
          </span>

          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {STAGES.map(({ id, Icon }, i) => (
              <li
                key={id}
                className="lp-stage"
                style={{ ["--i" as string]: String(i) } as React.CSSProperties}
              >
                <span className="lp-stage-node" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="lp-mono mt-6 text-muted-foreground/80">Stage {i + 1}</p>
                <h3 className="lp-display mt-2 text-2xl text-foreground">{content(`travel.${id}.title`)}</h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                  {content(`travel.${id}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
