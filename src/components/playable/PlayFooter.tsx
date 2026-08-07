import { useSiteContent } from "@/hooks/useSiteSettings";

const LINKS = [
  { href: "#play", label: "Play" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export function PlayFooter() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[hsl(var(--pw-line)/0.14)] px-4 py-6 md:px-10">
      <div className="mx-auto flex max-w-[100rem] flex-col items-center justify-between gap-4 md:flex-row">
        <a href="#top" className="pw-wordmark">
          {content("nav.brand")}
        </a>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="pw-navlink">
              {l.label}
            </a>
          ))}
          <a
            href={content("about.studioUrl")}
            target="_blank"
            rel="noopener noreferrer"
            className="pw-navlink"
          >
            Studio
          </a>
        </nav>
        <p className="text-[0.65rem] text-muted-foreground/80">© {year} bryanlauwk</p>
      </div>
    </footer>
  );
}
