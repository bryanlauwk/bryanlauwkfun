import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { useSEO } from "@/hooks/useSEO";
import heroPortrait from "@/assets/hero-portrait-photo.png";
import studioHero from "@/assets/881230-studio-hero.png";

const Index = () => {
  useSEO({
    title: "881230.studio — Curiosity, made into things",
    description: "881230.studio is an independent creative practice making games, experimental objects, and interactive experiences. Explore the work and play.",
    canonical: "https://www.bryanlauwk.fun/",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <CinematicHeader />
      <main id="main-content" className="relative">
        <section className="border-b border-border bg-paper" aria-labelledby="studio-heading">
          <div className="editorial-wrap py-8 md:py-10 lg:py-12">
            <p className="eyebrow mb-3 text-primary">Independent creative practice · Kuala Lumpur</p>
            <h1 id="studio-heading" className="font-display text-[clamp(2.6rem,10.5vw,10rem)] font-black leading-[0.9] tracking-[-0.075em]">
              881230<span className="text-primary">.studio</span>
            </h1>
            <p className="mt-3 border-t border-border pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground md:text-xs">by Bryan Lau Wai Kit</p>

            <div className="mt-7 grid items-center gap-8 md:mt-10 md:grid-cols-[0.72fr_1.28fr] md:gap-10">
              <div>
                <p className="eyebrow mb-3 text-primary">Games · Objects · Interactive experiences</p>
                <h2 className="editorial-title max-w-xl text-[clamp(2.8rem,5vw,5.4rem)]">
                  Curiosity,<br />made into<br />things.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  881230.studio follows curious ideas into games, physical objects, and unexpected places. This is where they end up.
                </p>
                <a href="#browser-work" className="editorial-button editorial-button-red mt-6 min-h-11">
                  Explore the work <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <figure className="min-w-0">
                <img
                  src={studioHero}
                  alt="Clear glowing robot, durian character, and cat toy displayed on oak and white blocks beside an open sketchbook"
                  className="block h-auto w-full"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="mt-2 font-mono text-[10px] text-muted-foreground">Ideas on the workbench. More on the way.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="featured" className="section-band-even scroll-mt-24 border-b border-border py-8 md:py-10" aria-labelledby="featured-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow mb-2"><span className="eyebrow-pill">Latest</span> The featured game</p><h2 id="featured-heading" className="section-title">THIS WEEK’S COVER STORY</h2></div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground sm:block">Can you make it to 1,000m?</span>
            </div>
            <article className="feature-story group">
              <figure className="feature-preview">
                <div className="feature-art">
                  <div className="feature-preview-fallback" aria-hidden="true"><span>GIANT<br />DURIAN RUN</span><small>PLAY THE LIVE GAME</small></div>
                  <iframe src="https://kldex.bryanlauwk.fun/" title="Interactive mobile and desktop preview of Giant Durian Run" loading="lazy" allow="fullscreen; gamepad" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                </div>
                <figcaption className="feature-preview-caption">
                  <span><span className="feature-live-dot" aria-hidden="true" /> LIVE PREVIEW · KLDEX</span>
                  <span>Tap inside to play</span>
                </figcaption>
              </figure>
              <div className="feature-copy">
                <p className="eyebrow text-primary">KLDEX · Browser game</p>
                <h3 className="feature-headline mt-2 text-3xl leading-[0.98] md:text-4xl">GIANT DURIAN RUN</h3>
                <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-primary md:text-xs">1,000m. Three finales. One very big durian.</p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">Dodge rolling durians, collect durian flesh, and survive the KLDEX course. Swipe to switch lanes; double-tap to jump higher.</p>
                <a href="https://kldex.bryanlauwk.fun/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-primary pb-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary"><Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Run the course <ArrowUpRight className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </article>
          </div>
        </section>

        <section id="browser-work" className="section-band-odd scroll-mt-24 border-b border-border py-8 md:py-10" aria-labelledby="browser-work-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div><p className="eyebrow mb-2">The archive · pick your rabbit hole</p><h2 id="browser-work-heading" className="section-title">THE ARCHIVE</h2></div>
              <a href="#contact" className="inline-flex min-h-11 items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Have an idea? <ArrowUpRight className="h-3.5 w-3.5" /></a>
            </div>
            <ProjectGrid />
          </div>
        </section>

        <section id="about" className="section-band-even scroll-mt-24 border-b border-border py-9 md:py-12" aria-labelledby="about-heading">
          <div className="editorial-wrap grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
            <div>
              <p className="eyebrow mb-2 text-primary">A little more about the maker</p>
              <h2 id="about-heading" className="section-title">THE PERSON<br className="hidden md:block" /> BEHIND THE STUDIO</h2>
              <figure className="hero-portrait relative mt-8 w-full max-w-[420px]">
                <div className="hero-portrait-frame">
                  <img src={heroPortrait} alt="Bryan Lau playing the interviewer in a playful podcast thumbnail" className="hero-portrait-image hero-portrait-host" />
                  <img src={heroPortrait} alt="Bryan Lau playing the guest in a playful podcast thumbnail" className="hero-portrait-image hero-portrait-guest" />
                  <span className="hero-portrait-role hero-portrait-role-host" aria-hidden="true">HOST · BRYAN</span>
                  <span className="hero-portrait-role hero-portrait-role-guest" aria-hidden="true">GUEST · ALSO BRYAN</span>
                  <div className="hero-portrait-copy">
                    <span className="hero-portrait-kicker">THE BRYAN-ON-BRYAN SHOW</span>
                    <span className="hero-portrait-title">SO... WHAT<br />DO YOU<br /><b>MAKE?</b></span>
                    <span className="hero-portrait-tag">GAMES · EXPERIMENTS · BUILDS</span>
                  </div>
                  <span className="hero-portrait-episode" aria-hidden="true">EP. 001</span>
                </div>
                <figcaption className="hero-portrait-caption">
                  <span><strong>A VERY SERIOUS CHAT FOR ONE.</strong></span><span>GAMES · IDEAS · ODD BUILDS ↗</span>
                </figcaption>
              </figure>
            </div>
            <div className="max-w-3xl">
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">I’m Bryan, a Kuala Lumpur based marketer with an engineering background and a habit of turning curious ideas into things you can play with. This site is my evolving collection of games, interactive experiments, and physical builds.</p>
              <div className="about-faq-list" aria-label="Frequently asked questions about Bryan and the playground">
                <details className="about-faq">
                  <summary>Who’s behind the playground?</summary>
                  <p>I’m Bryan Lau, a technology enthusiast and marketer based in Kuala Lumpur. I studied mechatronics, and I still enjoy bringing together technology, storytelling, and hands on making.</p>
                </details>
                <details className="about-faq">
                  <summary>What kind of things do you make?</summary>
                  <p>Small browser games, playful interactive experiments, and physical builds with sensors, buttons, and bits of code. The common thread is that you get to try them, not just look at them.</p>
                </details>
                <details className="about-faq">
                  <summary>Why make playful projects?</summary>
                  <p>Play makes unfamiliar ideas easier to explore. I like turning a question or a silly what if into something people can poke, test, and share.</p>
                </details>
                <details className="about-faq">
                  <summary>Are these finished products?</summary>
                  <p>Some are ready to play; others are works in progress. I keep the experiments here because the process, the surprises, and the rough edges are part of the fun.</p>
                </details>
                <details className="about-faq">
                  <summary>Can we make something together?</summary>
                  <p>Absolutely. If you have an idea for a game, an interactive experience, or a delightfully odd build, <a href="#contact">tell me about it</a>.</p>
                </details>
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
