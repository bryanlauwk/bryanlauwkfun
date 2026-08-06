import { useReveal } from "@/hooks/useReveal";
import signalArt from "@/assets/next-transmission-v3.jpg";

/**
 * Next Transmission — a full-bleed painterly interlude. The forming season is
 * carried by the artwork itself; the copy rests in the painting's centre-right
 * negative space. No launch information is invented.
 */
export function UpcomingSeason() {
  const { ref, inView } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="next" className="lp-band relative" aria-labelledby="next-heading">
      <div ref={ref} className={`lp-feature is-quiet ${inView ? "is-live" : ""}`}>
        <div className="lp-feature-art lp-feature-art--tall lp-signal-art">
          <img
            src={signalArt}
            alt="A luminous cocoon of glass filaments glowing over still black water at night."
            loading="eager"
            decoding="sync"
            fetchPriority="low"
            className="absolute inset-0 h-full w-full object-cover object-[26%_50%] md:object-[34%_52%]"
          />
          <span aria-hidden="true" className="lp-veil lp-veil--right" />
          <span aria-hidden="true" className="lp-shimmer" />
          <span aria-hidden="true" className="lp-seam-top" />
          <span aria-hidden="true" className="lp-seam-bottom" />
        </div>

        <div className="relative mx-auto max-w-[110rem] px-6 pb-16 pt-[15rem] md:px-14 md:pb-24 md:pt-32">
          <div className="md:grid md:grid-cols-[minmax(0,46%)_minmax(0,1fr)]">
            <div aria-hidden="true" className="hidden md:block" />
            <div className="lp-signal-copy max-w-xl">
              <p className="lp-label lp-label--violet">
                <span className="mr-2 inline-block h-1 w-1 rounded-full bg-accent lp-pulse align-middle" />
                Next transmission · forming
              </p>
              <h2
                id="next-heading"
                className="lp-display mt-5 text-2xl leading-snug text-foreground md:text-[2.4rem]"
              >
                Something is learning how to notice you.
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
                Fragments are still arriving. When enough of them agree on a shape, the next
                season opens.
              </p>
              <p className="mt-7 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Opens · Date unknown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
