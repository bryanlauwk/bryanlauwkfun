import { Github, Twitter, Linkedin } from "lucide-react";

export function PlaygroundFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[hsl(var(--lp-hair)/0.14)] px-6 py-16 md:px-14 md:py-20">
      <div className="mx-auto flex max-w-[110rem] flex-col items-center gap-8 text-center">
        <p className="text-lg font-extralight tracking-[0.16em] text-foreground md:text-2xl">
          Good luck, have fun, don&apos;t die.
        </p>

        <div className="flex items-center gap-2">
          {[
            { href: "https://github.com/bryanlauwk", Icon: Github, label: "GitHub" },
            { href: "https://twitter.com/bryanlauwk", Icon: Twitter, label: "Twitter" },
            { href: "https://linkedin.com/in/bryanlauwk", Icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, Icon, label }) => (
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

        <p className="lp-label">© {year} bryanlauwk · you were here</p>

      </div>
    </footer>
  );
}
