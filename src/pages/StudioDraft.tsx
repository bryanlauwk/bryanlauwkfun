import { usePublicProjects } from "@/hooks/useProjects";
import { useSEO } from "@/hooks/useSEO";
import { projectDestination } from "@/lib/project-destination";
import { StudioHeader, StudioFooter, WHATSAPP } from "@/components/StudioChrome";
import StudioProjectCard, { StudioProjectImage } from "@/components/StudioProjectCard";
import ConceptGallery from "@/components/ConceptGallery";
import hero from "@/assets/draft-hero-maker.jpg";
import making from "@/assets/draft-behind-making.jpg";
import portrait from "@/assets/hero-portrait-photo.png";
import "@/styles/studio-draft.css";

const FEATURED_HOSTS = ["kldex.bryanlauwk.fun", "littleoriginal.bryanlauwk.fun"];
const host = (href: string) => { try { return new URL(href).hostname; } catch { return ""; } };

export default function StudioDraft() {
  useSEO({ title: "881230.studio — Draft preview", description: "Draft preview of the 881230.studio homepage.", canonical: "https://www.bryanlauwk.fun/", noindex: true } as any);
  const { data, isLoading } = usePublicProjects();
  const projects = data ?? [];
  const featured = FEATURED_HOSTS.map(h => projects.find(p => host(p.href) === h)).filter(Boolean) as typeof projects;
  const rest = projects.filter(p => !featured.includes(p));

  return (
    <div className="studio min-h-screen"><div className="studio-wrap">
      <StudioHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="draft-hero" aria-labelledby="draft-title">
          <div className="draft-hero-copy">
            <h1 id="draft-title">881230.<br />studio</h1>
            <p className="draft-script">Curiosity, made into things.</p>
            <p className="draft-lede">Unconventional objects. Playable ideas.<br />Built to be played with, poked at, and held.</p>
            <a href="#work" className="studio-button">See the work ↘</a>
          </div>
          <figure className="draft-hero-image">
            <img src={hero} alt="Bryan painting a clear-domed robot prototype at his studio workbench" width={1264} height={848} />
            <span className="draft-note draft-note-a">Make. Play.<br />Experiment.<br />Repeat.</span>
            <span className="draft-note draft-note-b">Small things,<br />bigger ideas.</span>
          </figure>
        </section>

        <section id="work" className="studio-section" aria-labelledby="draft-work">
          <div className="studio-head"><h2 id="draft-work">Selected experiments</h2></div>
          <div className="draft-featured">
            {featured.map(p => {
              const href = projectDestination(p.href) ?? "#work";
              return (
                <a key={p.id} className="draft-feature" href={href} target="_blank" rel="noopener noreferrer">
                  <div className="draft-feature-img"><StudioProjectImage project={p} eager /></div>
                  <h3>{p.title}</h3>
                  <p className="draft-hand">↖ {p.description}</p>
                </a>
              );
            })}
          </div>
          <div className="studio-grid" aria-busy={isLoading}>
            {rest.map((p, i) => <StudioProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>

        <section className="draft-making" aria-labelledby="draft-making-title">
          <div className="draft-making-copy">
            <h2 id="draft-making-title"><span>Behind the making</span></h2>
            <p>Sketches, prototypes, failed attempts and things in progress.</p>
            <span className="draft-note">Good ideas.<br />Bad games.<br />Still fun.</span>
          </div>
          <img src={making} alt="Polaroids of Bryan soldering, a 3D-printed prototype, cone sketches and breadboards on a table" width={1584} height={672} loading="lazy" />
        </section>

        <ConceptGallery />

        <section id="about" className="studio-about" aria-labelledby="about-heading">
          <div className="studio-about-person"><span>The person behind<br />the studio</span>
            <figure><img src={portrait} alt="Bryan Lau Wai Kit" width={1024} height={1024} loading="lazy" /><figcaption>Bryan Lau Wai Kit</figcaption></figure>
          </div>
          <div><h2 id="about-heading">Serious craft for<br />unnecessary ideas.</h2><p className="studio-about-roles">Creative marketer. Designer. Maker of things.</p><p>Mechatronics background. Marketer by profession. Translating curiosities into physical and digital forms.</p></div>
        </section>

        <section id="contact" className="draft-cta" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Have a weird idea?<br /><em>Good.</em></h2>
          <p>Let’s make something interesting.</p>
          <div className="studio-contact-actions">
            <a className="studio-button" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a>
            <a href="mailto:bryanlauwk@gmail.com">Email Bryan ↗</a>
            <a href="https://linkedin.com/in/bryanlauwk" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div></div>
  );
}
