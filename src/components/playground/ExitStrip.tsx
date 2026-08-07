import { useState } from "react";
import { Github, Twitter, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { GuestBook } from "@/components/GuestBook";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent } from "@/hooks/useSiteSettings";
import closingArt from "@/assets/bryans-mind-closing-v3.jpg";

/**
 * Bryan's Mind + the guest book, held inside the closing landscape. The copy
 * sits in the painting's intentional dark negative space on the left.
 */
export function ExitStrip() {
  const [whisper, setWhisper] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const { ref, inView } = useReveal<HTMLDivElement>(0.1);
  const { content } = useSiteContent();

  const whispers = content("about.whispers")
    .split("\n")
    .map((w) => w.trim())
    .filter(Boolean);

  const socials = [
    { href: content("about.githubUrl"), Icon: Github, label: "GitHub" },
    { href: content("about.twitterUrl"), Icon: Twitter, label: "Twitter" },
    { href: content("about.linkedinUrl"), Icon: Linkedin, label: "LinkedIn" },
  ];

  const hint = () => {
    if (whispers.length === 0) return;
    setWhisper(whispers[idx % whispers.length]);
    setIdx((n) => n + 1);
  };

  return (
    <section id="about" className="lp-band relative" aria-labelledby="exit-heading">
      <div ref={ref} className={`lp-feature is-quiet ${inView ? "is-live" : ""}`}>
        <div className="lp-feature-art lp-feature-art--tall">
          <img
            src={closingArt}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[70%_45%] md:object-[60%_50%]"
          />
          <span className="lp-veil lp-veil--left" />
          <span className="lp-seam-top" />
        </div>

        <div className="relative mx-auto max-w-[110rem] px-6 pb-16 pt-20 md:px-14 md:pb-20 md:pt-28">
          <div className="grid gap-14 md:grid-cols-[minmax(0,26rem)_minmax(0,30rem)] md:gap-20">
            <div>
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={hint}
                  aria-label="Bryan's mind — ask for a hint"
                  className="lp-mind"
                >
                  <span aria-hidden="true" />
                </button>
                <div>
                  <p className="lp-label lp-label--violet">{content("about.mindLabel")}</p>
                  <p className="mt-3 max-w-[18rem] text-sm font-light leading-relaxed text-muted-foreground">
                    {content("about.mindBody")}
                  </p>
                  <button
                    type="button"
                    onClick={hint}
                    className="lp-mono mt-4 inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
                  >
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {content("about.mindCta")}
                  </button>
                </div>
              </div>

              <div role="status" aria-live="polite">
                {whisper && (
                  <div className="lp-plate lp-fade mt-6 max-w-sm">
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">
                      {whisper}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <a href="#archive" className="lp-mono text-accent hover:underline">
                        Past Seasons
                      </a>
                      <a href="#artifact" className="lp-mono text-accent hover:underline">
                        Artifacts
                      </a>
                      <button
                        type="button"
                        onClick={() => setWhisper(null)}
                        className="lp-mono ml-auto text-muted-foreground hover:text-foreground"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <h2 id="exit-heading" className="lp-display mt-12 text-2xl text-foreground md:text-[2rem]">
                {content("about.heading")
                  .split("\n")
                  .map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
              </h2>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                {content("about.body")}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={content("about.studioUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-button"
                >
                  {content("about.studioLabel")}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="lp-arrow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div id="signal" className="lp-plate scroll-mt-24">
              <p className="lp-label lp-label--violet">{content("about.guestbookLabel")}</p>
              <div className="mt-5">
                <GuestBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
