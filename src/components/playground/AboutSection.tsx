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
      className="relative px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p className="lp-label">About</p>

        <h2
          id="about-heading"
          className="mt-4 font-tide text-3xl italic leading-tight text-foreground md:text-4xl"
        >
          Built by Bryan Lau — a creative growth marketer making things people
          want to play with.
        </h2>

        <p className="mt-6 font-tide text-xl italic text-accent md:text-2xl">
          Creativity is the interface. Growth is the outcome.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://ideas.bryanlauwk.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-button lp-button--ghost"
          >
            The Studio · my idea engine
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="#signal" className="lp-button lp-button--ghost">
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
              className="rounded-full border border-foreground/12 p-3 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
