import portrait from "@/assets/bryan-studio-portrait.webp";

export default function StudioHero() {
  return <section className="maker-hero" aria-labelledby="maker-title">
    <div className="maker-hero-art">
      <img src={portrait} alt="Portrait of Bryan in a warm studio, adjusting an imagined tabletop robot" width={1536} height={1024} />
      </div>
    <div className="maker-hero-copy">
      <h1 id="maker-title" aria-label="881230.studio">881230.<br />studio</h1>
      <h2>Curiosity,<br />made into things.</h2>
      <svg className="maker-scribble" viewBox="0 0 90 35" fill="none" aria-hidden="true"><path d="M4 4C8 25 43 12 58 24M47 13l13 12-17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" /></svg>
      <p>I’m Bryan. I make weird objects,<br className="maker-desktop-break" /> tiny worlds, and digital experiences.<br className="maker-desktop-break" /> Sometimes useful. Mostly curious.</p>
      <div className="maker-hero-actions"><a className="maker-pill" href="#work">See my works <span aria-hidden="true">→</span></a><a className="maker-scroll" href="#work">or scroll down ↓</a></div>
    </div>
    <span className="maker-mantra" aria-hidden="true">Make.<br />Play.<br />Experiment.<br />Repeat.<span>☺</span></span>
    <span className="maker-sticky" aria-hidden="true">Small<br />things.<br />Bigger<br />ideas.<span>☺</span></span>
  </section>;
}
