import { useState } from "react";
import { Sparkles, Waves, DoorOpen, Box, RefreshCw, Plus, Minus } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const NODES = [
  { id: "phenomenon", Icon: Sparkles, accent: "cream", status: null },
  { id: "simulation", Icon: Waves, accent: "cyan", status: "now" },
  { id: "experience", Icon: DoorOpen, accent: "coral", status: "next" },
  { id: "object", Icon: Box, accent: "lime", status: "next" },
] as const;

const STUDIES = ["coin", "key", "stone"] as const;

/**
 * One idea, more than one form — a reciprocal system rather than a pipeline.
 * Only the simulation node is marked as real today; everything else is
 * explicitly labelled as an exploration, and the three object studies stay
 * collapsed as conceptual form studies.
 */
export function IdeaSystem() {
  const { ref, inView } = useReveal<HTMLOListElement>(0.06);
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);

  return (
    <section id="system" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="system-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-section-head">
          <div>
            <p className="pw-eyebrow pw-eyebrow--coral">{content("play.loopEyebrow")}</p>
            <h2 id="system-heading" className="pw-h2 mt-3">
              {content("play.loopHeading")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {content("play.loopIntro")}
          </p>
        </div>

        <ol ref={ref} className={`pw-loop mt-10 ${inView ? "pw-in" : ""}`}>
          {NODES.map(({ id, Icon, accent, status }, i) => (
            <li
              key={id}
              className={`pw-loop-node pw-accent-${accent}`}
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <div className="pw-panel pw-clip h-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="pw-chain-icon" aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                  {status && (
                    <span className={`pw-status pw-status--${status}`}>
                      {content(status === "now" ? "play.statusNow" : "play.statusExploring")}
                    </span>
                  )}
                </div>

                <h3 className="pw-h3 mt-5 text-lg">{content(`play.node.${id}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {content(`play.node.${id}.body`)}
                </p>

                {id === "object" && (
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-controls="form-studies"
                      className="pw-inline-toggle"
                    >
                      {open ? <Minus className="h-3 w-3" aria-hidden="true" /> : <Plus className="h-3 w-3" aria-hidden="true" />}
                      {content("play.objectsToggle")}
                    </button>

                    <div id="form-studies" hidden={!open} className="mt-4">
                      <ul className="space-y-4 border-l border-dashed border-[hsl(var(--pw-line)/0.25)] pl-4">
                        {STUDIES.map((o) => (
                          <li key={o}>
                            <p className="text-sm text-foreground/90">{content(`artifacts.${o}.name`)}</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {content(`artifacts.${o}.idea`)}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
                        {content("play.objectsNote")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {i < NODES.length - 1 && (
                <span className="pw-loop-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="pw-loopback mt-4">
          <span className="pw-chain-icon pw-accent-cyan" aria-hidden="true">
            <RefreshCw className="h-4 w-4" />
          </span>
          <div>
            <p className="pw-mini-title">{content("play.loopBackTitle")}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {content("play.loopBackBody")}
            </p>
          </div>
          <span className="pw-loopback-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
