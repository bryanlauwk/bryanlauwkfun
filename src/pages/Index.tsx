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
          <div className="editorial-wrap grid items-center gap-7 py-8 md:grid-cols-[1fr_0.92fr] md:gap-10 md:py-10 lg:py-12">
            <div>
              <p className="eyebrow mb-3 text-primary">A playground for games, experiments & builds</p>
              <h1 className="editorial-title max-w-3xl text-[clamp(3rem,6.3vw,5.8rem)]">
                good luck.<br />
                have fun.<br />
                <span className="text-primary">don’t die.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                I build games, interactive experiments, and physical curiosities. Pick one and see what happens.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#browser-work" className="editorial-button editorial-button-red min-h-10 py-2">Play something <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" /></a>
                <a href="#featured" className="editorial-button editorial-button-outline min-h-10 py-2">Latest game</a>
              </div>
            </div>
            <figure className="hero-portrait relative mx-auto w-full max-w-[520px] md:ml-auto">
              <div className="hero-portrait-frame">
                <div className="hero-portrait-copy" aria-hidden="true">
                  <span className="hero-portrait-kicker">BRYAN LAU · KUALA LUMPUR</span>
                  <span className="hero-portrait-title">I MAKE<br />PLAYABLE<br /><b>THINGS.</b></span>
                  <span className="hero-portrait-tag">GAMES · EXPERIMENTS · BUILDS</span>
                </div>
                <img src={heroPortrait} alt="Bryan Lau, creator of games and interactive experiments" className="hero-portrait-image" />
                <span className="hero-portrait-sticker" aria-hidden="true">LET’S<br />PLAY!</span>
              </div>
              <figcaption className="hero-portrait-caption">
                <span><strong>OFF THE SCREEN, INTO THE WORLD.</strong></span><span>GAMES · IDEAS · ODD BUILDS ↗</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="featured" className="section-band-even scroll-mt-24 border-b border-border py-8 md:py-10" aria-labelledby="featured-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow mb-2"><span className="eyebrow-pill">Latest</span> The featured game</p><h2 id="featured-heading" className="section-title">THIS WEEK’S COVER STORY</h2></div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground sm:block">A giant Malaysian-sized playground</span>
            </div>
            <article className="feature-story group">
              <div className="feature-art">
                <div className="feature-preview-fallback" aria-hidden="true"><span>GIANT<br />DURIAN RUN</span><small>PLAY THE LIVE GAME</small></div>
                <iframe src="https://kldex.bryanlauwk.fun/" title="Live preview of Giant Durian Run" loading="lazy" allow="fullscreen; gamepad" referrerPolicy="strict-origin-when-cross-origin" />
                <div className="feature-art-topline" aria-hidden="true"><span>KLDEX · LIVE GAME PREVIEW</span><span>PLAYABLE ↗</span></div>
                <a href="https://kldex.bryanlauwk.fun/" target="_blank" rel="noopener noreferrer" className="feature-play"><Play className="h-4 w-4 fill-current" aria-hidden="true" /> PLAY FULL GAME<span className="sr-only"> (opens in a new tab)</span></a>
              </div>
              <div className="feature-copy">
                <p className="eyebrow text-primary">KLDEX · Browser game</p>
                <h3 className="feature-headline mt-2 text-3xl leading-[0.98] md:text-4xl">GIANT DURIAN RUN</h3>
                <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Kuala Lumpur, with the durian dial turned all the way up.</p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">Step into a larger-than-life KL playground built around Malaysia’s most divisive fruit. Explore the city, meet the giant durian, and see what’s waiting around the corner.</p>
                <a href="https://kldex.bryanlauwk.fun/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 border-b-2 border-primary pb-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary">Play Giant Durian Run <ArrowUpRight className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="section-band-odd scroll-mt-24 border-b border-border py-9 md:py-12" aria-labelledby="about-heading">
          <div className="editorial-wrap grid gap-6 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
            <div>
              <p className="eyebrow mb-2 text-primary">A little more about the maker</p>
              <h2 id="about-heading" className="section-title">ABOUT THE<br className="hidden md:block" /> PLAYGROUND</h2>
            </div>
            <div className="max-w-3xl">
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">I’m Bryan, a Kuala Lumpur based marketer with an engineering background and a habit of turning curious ideas into things you can play with. This site is my evolving collection of games, interactive experiments, and physical builds.</p>
              <div className="about-faq-list" aria-label="Frequently asked questions about Bryan and the playground">
                <details className="about-faq" open>
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

        <section id="browser-work" className="section-band-even scroll-mt-24 py-8 md:py-10" aria-labelledby="browser-work-heading">
          <div className="editorial-wrap">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div><p className="eyebrow mb-2">The archive · pick your rabbit hole</p><h2 id="browser-work-heading" className="section-title">THE ARCHIVE</h2></div>
              <a href="#contact" className="inline-flex min-h-11 items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Have an idea? <ArrowUpRight className="h-3.5 w-3.5" /></a>
            </div>
            <ProjectGrid />
          </div>
        </section>

      </main>
      <CinematicFooter />
    </div>
  );
};

export default Index;
