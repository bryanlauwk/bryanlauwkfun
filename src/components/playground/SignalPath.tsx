import { useState } from "react";
import { MonitorPlay, DoorOpen, Gem, Plus, Minus } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const STAGES = [
  { id: "browser", Icon: MonitorPlay },
  { id: "space", Icon: DoorOpen },
  { id: "object", Icon: Gem },
] as const;

const OBJECTS = ["coin", "key", "stone"] as const;

/**
 * How a world travels — Browser → Space → Object. One idea changing medium,
 * carried by a single animated signal thread. The three speculative object
 * studies live inline inside the Object stage as expandable concept notes,
 * clearly labelled exploratory: not products, client work or editions.
 */
export function SignalPath() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);

  return (
    <section
      id="process"
      className="lp-band relative scroll-mt-24 px-6 py-16 md:px-14 md:py-20"
      aria-labelledby="travel-heading"
    >
      <div className="mx-auto max-w-[110rem]">
        <div className="max-w-2xl">
          <p className="lp-label lp-label--violet">{content("travel.eyebrow")}</p>
          <h2 id="travel-heading" className="lp-display mt-4 text-3xl text-foreground md:text-[2.4rem]">
            {content("travel.heading")}
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            {content("travel.intro")}
          </p>
        </div>

        <div ref={ref} className={`lp-signal-path mt-12 ${inView ? "is-live" : ""}`}>
          <span className="lp-thread" aria-hidden="true">
            <span className="lp-thread-pulse" />
          </span>

          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {STAGES.map(({ id, Icon }, i) => (
              <li key={id} className="lp-stage" style={{ ["--i" as string]: String(i) } as React.CSSProperties}>
                <span className="lp-stage-node" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="lp-mono mt-6 text-muted-foreground/80">Stage {i + 1}</p>
                <h3 className="lp-display mt-2 text-2xl text-foreground">{content(`travel.${id}.title`)}</h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                  {content(`travel.${id}.body`)}
                </p>

                {id === "object" && (
                  <div className="mt-5 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-controls="object-studies"
                      className="lp-mono inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
                    >
                      {open ? (
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      )}
                      {content("travel.objects.toggle")}
                    </button>

                    <div id="object-studies" hidden={!open} className="mt-4">
                      <p className="lp-mono text-muted-foreground/70">{content("travel.objects.label")}</p>
                      <ul className="mt-3 space-y-4 border-l border-[hsl(var(--lp-hair)/0.18)] pl-4">
                        {OBJECTS.map((o) => (
                          <li key={o}>
                            <p className="text-sm text-foreground/90">{content(`artifacts.${o}.name`)}</p>
                            <p className="lp-mono mt-1 text-muted-foreground/70">
                              {content(`artifacts.${o}.material`)}
                            </p>
                            <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                              {content(`artifacts.${o}.idea`)}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs font-light leading-relaxed text-muted-foreground/70">
                        {content("travel.objects.note")}
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
