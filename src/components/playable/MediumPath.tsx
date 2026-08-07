import { useState } from "react";
import { MonitorPlay, DoorOpen, Box, Plus, Minus } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const STAGES = [
  { id: "browser", Icon: MonitorPlay, accent: "cyan", status: "now" },
  { id: "space", Icon: DoorOpen, accent: "violet", status: "next" },
  { id: "object", Icon: Box, accent: "amber", status: "next" },
] as const;

const OBJECTS = ["coin", "key", "stone"] as const;

/**
 * Browser → Space → Object. The browser stage is real, shipped work; Space and
 * Object are labelled clearly as directions being explored. The three object
 * studies sit inside the Object panel as optional concept notes.
 */
export function MediumPath() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.08);
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);

  return (
    <section id="process" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-section-head">
          <div>
            <p className="pw-eyebrow pw-eyebrow--violet">{content("play.pathEyebrow")}</p>
            <h2 id="process-heading" className="pw-h2 mt-3">
              {content("play.pathHeading")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {content("play.pathIntro")}
          </p>
        </div>

        <ol ref={ref} className={`pw-path mt-10 ${inView ? "pw-in" : ""}`}>
          {STAGES.map(({ id, Icon, accent, status }, i) => (
            <li
              key={id}
              className={`pw-path-step pw-accent-${accent}`}
              style={{ ["--i" as string]: String(i) } as React.CSSProperties}
            >
              <div className="pw-panel h-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="pw-chain-icon" aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`pw-status pw-status--${status}`}>
                    {content(status === "now" ? "play.statusNow" : "play.statusExploring")}
                  </span>
                </div>

                <h3 className="pw-h3 mt-5 text-xl">{content(`play.path.${id}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {content(`play.path.${id}.body`)}
                </p>

                {id === "object" && (
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-controls="object-studies"
                      className="pw-inline-toggle"
                    >
                      {open ? <Minus className="h-3 w-3" aria-hidden="true" /> : <Plus className="h-3 w-3" aria-hidden="true" />}
                      {content("play.objectsToggle")}
                    </button>

                    <div id="object-studies" hidden={!open} className="mt-4">
                      <ul className="space-y-4 border-l border-[hsl(var(--pw-line)/0.2)] pl-4">
                        {OBJECTS.map((o) => (
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

              {i < STAGES.length - 1 && (
                <span className="pw-path-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
