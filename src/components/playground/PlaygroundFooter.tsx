import { Github, Twitter, Linkedin } from "lucide-react";

export function PlaygroundFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-foreground/10 px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <p className="font-tide text-2xl italic text-foreground md:text-3xl">
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
              className="rounded-full border border-foreground/12 p-3 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
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
