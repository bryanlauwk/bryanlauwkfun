import { useState } from "react";
import { Github, Twitter, Linkedin, ArrowUpRight, MessageSquare, ChevronDown } from "lucide-react";
import { GuestBook } from "@/components/GuestBook";
import { useSiteContent } from "@/hooks/useSiteSettings";

/**
 * About + a small "currently exploring" teaser, real links, and the guest book
 * kept collapsed and secondary.
 */
export function ClosingAbout() {
  const { content } = useSiteContent();
  const [openBook, setOpenBook] = useState(false);

  const socials = [
    { href: content("about.githubUrl"), Icon: Github, label: "GitHub" },
    { href: content("about.twitterUrl"), Icon: Twitter, label: "LinkedIn" },
    { href: content("about.linkedinUrl"), Icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="about" className="pw-section scroll-mt-28 px-4 md:px-10" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="pw-panel">
            <p className="pw-eyebrow pw-eyebrow--cyan">{content("play.aboutEyebrow")}</p>
            <h2 id="about-heading" className="pw-h2 mt-3 text-2xl md:text-3xl">
              {content("play.aboutHeading")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {content("play.aboutBody")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={content("about.studioUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="pw-btn"
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
                  className="pw-icon-link"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="pw-panel pw-accent-violet">
              <p className="pw-eyebrow pw-eyebrow--violet">
                <span className="pw-dot" aria-hidden="true" />
                {content("play.exploringEyebrow")}
              </p>
              <h3 className="pw-h3 mt-3 text-lg">{content("play.exploringHeading")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {content("play.exploringBody")}
              </p>
            </div>

            <div className="pw-panel">
              <button
                type="button"
                onClick={() => setOpenBook((v) => !v)}
                aria-expanded={openBook}
                aria-controls="guest-book-panel"
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="inline-flex items-center gap-2 text-sm text-foreground/90">
                  <MessageSquare className="h-4 w-4 text-accent" aria-hidden="true" />
                  {content("play.guestbookLabel")}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${openBook ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div id="guest-book-panel" hidden={!openBook} className="mt-5">
                <GuestBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
