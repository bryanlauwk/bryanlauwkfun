import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait-photo.png";

const Index = () => {
  useSEO({
    title: "Bryan LauWK — Interactive things to play with",
    description: "Playful web experiments, odd ideas, and interactive things made by Bryan LauWK. Pick one and play.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <CinematicHeader />
      <main id="main-content" className="relative">
        <section className="border-b border-border bg-paper">
          <div className="editorial-wrap grid items-center gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:gap-14 md:py-20 lg:py-24">
            <div>
              <p className="eyebrow mb-5">A small corner of the internet by Bryan Lau</p>
              <h1 className="editorial-title max-w-3xl text-[clamp(3.35rem,8vw,7.5rem)]">
                I BUILD THINGS<br />
                PEOPLE WANT<br />
                <span className="text-primary">TO PLAY WITH.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Playful web experiments, odd ideas, interactive toys. Creativity is the interface. Growth is the outcome.
              </p>
              <a href="#featured" className="editorial-button editorial-button-red mt-7">
                Find something to play <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <figure className="relative mx-auto w-full max-w-[410px] md:ml-auto">
              <div className="overflow-hidden border border-border bg-white shadow-[0_18px_44px_-32px_rgba(30,24,18,.5)]">
                <img src={heroPortrait} alt="Bryan Lau, maker of playable experiments" className="aspect-[4/4.2] w-full object-cover object-center" fetchPriority="high" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                <span>Curious by default. Shipping by habit.</span><span className="font-mono">KL · MY</span>
              </figcaption>
              <span aria-hidden="true" className="absolute -right-3 -top-3 grid h-16 w-16 rotate-6 place-items-center rounded-full bg-primary px-2 text-center font-mono text-[9px] font-bold uppercase leading-tight text-primary-foreground shadow-md md:-right-5 md:-top-5">
                Made to<br />be played
              </span>
            </figure>
          </div>
        </section>

        <section id="featured" className="scroll-mt-24 border-b border-border bg-background py-10 md:py-14" aria-labelledby="featured-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow mb-2"><span className="eyebrow-pill">Featured</span> Latest thing to play</p><h2 id="featured-heading" className="section-title">THE DURIAN DASH KL</h2></div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground sm:block">A very Malaysian high-speed problem</span>
            </div>
            <a href="https://giant-food-run-kldex.bryanlauwaikit.chatgpt.site/" target="_blank" rel="noopener noreferrer" className="feature-story group">
              <div className="feature-art" aria-hidden="true">
                <div className="feature-art-topline"><span>KLDEX · ARCADE RUNNER</span><span>NO. 001</span></div>
                <svg viewBox="0 0 420 300" className="feature-durian" role="presentation">
                  <path d="m210 31 19 30 36-22 4 38 42-7-15 36 38 15-28 27 29 27-39 14 13 39-42-7-8 39-35-25-26 31-20-35-39 22-2-42-41 5 16-39-36-19 31-25-24-32 41-9-7-40 39 14 16-37 25 30Z" fill="currentColor" />
                  <path d="M210 84c-45 0-79 32-79 73 0 34 27 57 79 83 52-26 79-49 79-83 0-41-34-73-79-73Z" fill="#f0c86d" />
                  <path d="M210 99v123m-54-102 108 81m-108 0 108-81" fill="none" stroke="#b77927" strokeWidth="5" strokeLinecap="round" />
                  <path d="M184 61q26 16 52 0" fill="none" stroke="#24452e" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <span className="feature-art-label">RUN FOR YOUR LIFE<br />OR AT LEAST YOUR DURIAN</span>
                <span className="feature-play"><Play className="h-4 w-4 fill-current" /> PLAY NOW</span>
              </div>
              <div className="feature-copy">
                <p className="eyebrow text-primary">Browser game · made for KLDEX</p>
                <h3 className="feature-headline mt-3 text-3xl leading-[0.98] md:text-5xl">A tiny runner.<br />A giant durian problem.</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">Dodge rolling durians, grab the golden flesh, and try to reach the finish line in one piece. Swipe to move. Double-tap to jump higher.</p>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 border-b-2 border-primary pb-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">Enter Durian Dash <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </a>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-b border-border bg-paper py-9 md:py-12" aria-labelledby="about-heading">
          <div className="editorial-wrap grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
            <h2 id="about-heading" className="section-title">WHAT’S THIS<br className="hidden md:block" /> ALL ABOUT?</h2>
            <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              <p>This is my playground: a growing collection of games, interactive experiments, and physical builds. Some live in your browser. Some have buttons, sensors, and questionable amounts of hot glue.</p>
              <p>Every project starts with one question: <span className="font-semibold text-foreground">would this be more fun if you could actually play with it?</span></p>
            </div>
          </div>
        </section>

        <section id="browser-work" className="scroll-mt-24 bg-background py-10 md:py-14" aria-labelledby="browser-work-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div><p className="eyebrow mb-2">The archive · pick your rabbit hole</p><h2 id="browser-work-heading" className="section-title">MORE THINGS TO PLAY WITH</h2></div>
              <a href="#contact" className="inline-flex min-h-11 items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Have an idea? <ArrowUpRight className="h-3.5 w-3.5" /></a>
            </div>
            <ProjectGrid />
          </div>
        </section>

        <section className="maker-band" aria-labelledby="maker-heading">
          <div className="editorial-wrap grid gap-8 py-9 md:grid-cols-[0.7fr_1.3fr] md:items-center md:gap-12 md:py-12">
            <div className="flex items-center gap-5 md:gap-7">
              <img src={heroPortrait} alt="Bryan Lau" className="h-32 w-28 shrink-0 object-cover object-center md:h-44 md:w-36" loading="lazy" />
              <div><p className="eyebrow text-white/60">The person behind the pixels</p><h2 id="maker-heading" className="mt-2 font-display text-2xl font-black uppercase leading-none md:text-4xl">MEET<br />BRYAN</h2></div>
            </div>
            <div>
              <p className="max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">I’m a creative growth marketer who likes building the thing, not just talking about it. This site is where prototypes get to escape the notebook and meet actual people.</p>
              <div className="mt-6 grid max-w-xl grid-cols-3 border-t border-white/20 pt-4">
                {[ ["01", "Games"], ["02", "Experiments"], ["03", "Physical builds"] ].map(([n, label]) => <div key={n}><span className="block font-display text-2xl font-black text-white md:text-3xl">{n}</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-white/55 md:text-[10px]">{label}</span></div>)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <CinematicFooter />
    </div>
  );
};

export default Index;
