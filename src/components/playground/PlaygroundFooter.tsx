import { useSiteContent } from "@/hooks/useSiteSettings";

export function PlaygroundFooter() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[hsl(var(--lp-hair)/0.14)] px-6 py-6 md:px-14 md:py-7">
      <div className="mx-auto flex max-w-[110rem] flex-col items-center gap-2 text-center">
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/80">
          {content("footer.tagline")}
        </p>
        <p className="lp-label">© {year} bryanlauwk · {content("footer.signature")}</p>
      </div>
    </footer>
  );
}
