import meltBanner from "@/assets/melt-banner.png.asset.json";

export function BrewingTeaser() {
  return (
    <section id="physical-work" className="relative scroll-mt-36 md:scroll-mt-28 grid gap-7 md:grid-cols-[.85fr_1.15fr] items-center" aria-labelledby="physical-work-heading">
      <div>
        <span className="dossier-stamp inline-block rotate-[-3deg] text-[11px] mb-5">Still brewing</span>
        <h2 id="physical-work-heading" className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">The weird is escaping the screen.</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-md">Meet MELT. Part robot, part resin experiment, part personality. Not ready to play. Definitely up to something.</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-primary">Physical prototype · in development</p>
      </div>
      <figure className="relative">
        <img src={meltBanner.url} alt="MELT character platform concept illustration" width="1672" height="941" loading="lazy" decoding="async" className="block h-auto w-full border border-foreground/15" />
        <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground">Concept artwork. Real-world mischief in progress.</figcaption>
      </figure>
    </section>
  );
}
