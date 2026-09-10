import meltBanner from "@/assets/melt-banner.png.asset.json";

export function BrewingTeaser() {
  return (
    <section
      id="physical-work"
      className="relative scroll-mt-32 md:scroll-mt-24"
      aria-label="MELT interactive character platform"
    >
      <img
        src={meltBanner.url}
        alt="MELT, a curious interactive character platform that notices, follows, and reacts to people across cafés, retail, events, workspaces, and homes."
        width="1536"
        height="768"
        loading="lazy"
        decoding="async"
        className="block h-auto w-full border border-foreground/15"
      />
    </section>
  );
}
