import { HelpCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";

const QUESTIONS = ["play.bench.q1", "play.bench.q2", "play.bench.q3"] as const;

/** Honest workbench: open questions and directions, never finished builds. */
export function OnTheBench() {
  const { ref, inView } = useReveal<HTMLUListElement>(0.1);
  const { content } = useSiteContent();

  return (
    <section id="bench" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="bench-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-bench">
          <div className="max-w-md">
            <p className="pw-eyebrow pw-eyebrow--cream">{content("play.benchEyebrow")}</p>
            <h2 id="bench-heading" className="pw-h2 mt-3">
              {content("play.benchHeading")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {content("play.benchIntro")}
            </p>
          </div>

          <ul ref={ref} className={`grid gap-3 ${inView ? "pw-in" : ""}`}>
            {QUESTIONS.map((k, i) => (
              <li
                key={k}
                className="pw-bench-item"
                style={{ ["--i" as string]: String(i) } as React.CSSProperties}
              >
                <span className="pw-chain-icon pw-accent-cream shrink-0" aria-hidden="true">
                  <HelpCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="pw-bench-label">{content("play.benchLabel")}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/90">{content(k)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
