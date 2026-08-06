import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const SOCIALS = [
  { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
  { href: "https://twitter.com/bryanlauwk", Icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, label: "LinkedIn" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-6 py-20 md:px-14 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-[110rem] gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14">
        <p className="lp-label lp-label--violet self-start">About</p>

        <div>
          <h2
            id="about-heading"
            className="max-w-3xl text-xl font-extralight leading-relaxed tracking-[0.02em] text-foreground md:text-[1.8rem] md:leading-[1.5]"
          >
            Built by Bryan Lau — a creative growth marketer making things people want to
            play with.
          </h2>

          <p className="mt-6 text-sm uppercase tracking-[0.28em] text-accent">
            Creativity is the interface. Growth is the outcome.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://ideas.bryanlauwk.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="lp-button"
            >
              The Studio · my idea engine
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href="#signal" className="lp-button">
              Say hi
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {SOCIALS.map(({ href, Icon, label }) => (
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
      </div>
    </section>
  );
}
