import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteSettings";

const TRACKS = ["browser", "space", "object"] as const;

/** Collaboration — grounded, no logos, pricing or claims. */
export function BuildTogether() {
  const { content } = useSiteContent();

  return (
    <section className="pw-section px-4 md:px-10" aria-labelledby="build-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="pw-build">
          <div className="max-w-xl">
            <p className="pw-eyebrow pw-eyebrow--coral">{content("play.buildEyebrow")}</p>
            <h2 id="build-heading" className="pw-h2 mt-3">
              {content("play.buildHeading")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {content("play.buildBody")}
            </p>
            <a
              href={content("about.studioUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="pw-btn pw-btn--primary mt-7"
            >
              {content("play.buildCta")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 lg:max-w-xl">
            {TRACKS.map((t) => (
              <li key={t} className="pw-mini-panel pw-clip">
                <p className="pw-mini-title">{content(`play.track.${t}.title`)}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {content(`play.track.${t}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
