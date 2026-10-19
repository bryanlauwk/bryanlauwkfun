import workbench from "@/assets/studio-workbench.jpg";

// These existing illustrations are art direction, never evidence of a finished build.
export default function StudioMaking() {
  return <section id="making" className="studio-making" aria-labelledby="making-heading">
    <div className="studio-making-intro">
      <p className="studio-eyebrow">02 / Behind the making</p>
      <h2 id="making-heading">A little mess.<br />A lot of <em>what if.</em></h2>
      <p>Sketches, small worlds, and ideas with a life of their own. The interesting part is figuring out what happens next.</p>
      <p className="studio-image-note">An illustrated look at the process. AI concept imagery, not photographs of completed work.</p>
    </div>
    <div className="studio-making-collage">
      <figure className="making-wide"><img src={workbench} alt="AI concept of a sunlit workbench with robot ideas and sketches" width={1536} height={1024} loading="lazy" /><figcaption>01 / Start with a question · AI concept</figcaption></figure>
      <figure className="making-paper"><img src="/concepts/03-on-paper.jpg" alt="AI concept of character development sketches in a notebook" width={504} height={504} loading="lazy" /><figcaption>02 / Try it on paper · AI concept</figcaption></figure>
      <figure className="making-world"><img src="/concepts/02-small-worlds.jpg" alt="AI concept of a miniature shop and tiny street scene" width={504} height={504} loading="lazy" /><figcaption>03 / Think smaller · AI concept</figcaption></figure>
    </div>
    <div className="studio-notebook">
      <p className="studio-eyebrow">Still on the studio radar ↗</p>
      <article><span>Hardware / exploration</span><h3>DURI</h3><p>An interactive robot project. Build details and documentary photos to come.</p></article>
      <article><span>Miniatures / exploration</span><h3>Tiny worlds</h3><p>An interest in making small things with big personalities. The miniature scenes here are concept illustrations.</p></article>
    </div>
  </section>;
}
