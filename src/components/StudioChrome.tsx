import type { ReactNode } from "react";

export const WHATSAPP = "https://wa.me/60149303546?text=Hi%20Bryan%2C%20I%20have%20an%20idea%20for%20881230.studio";

function sectionHref(id: string) {
  const onHome = window.location.pathname === "/";
  return onHome ? `${window.location.search}#${id}` : `/#${id}`;
}

export function StudioHeader() {
  return <>
    <a className="studio-skip" href="#main-content">Skip to main content</a>
    <header className="studio-top">
      <a className="studio-home" href="/" aria-label="881230.studio — home">Independent creative practice</a>
      <nav aria-label="Main navigation"><a href={sectionHref("work")}>Work</a><a href={sectionHref("about")}>About</a><a href={sectionHref("contact")}>Contact</a></nav>
    </header>
  </>;
}

export function StudioFooter() {
  return <footer className="studio-foot">
    <a href="/">881230.studio · by Bryan Lau Wai Kit</a>
    <span>Made in Kuala Lumpur</span>
    <a href={sectionHref("work")}>Back to work ↑</a>
  </footer>;
}

export function StudioState({ title, children }: { title: string; children: ReactNode }) {
  return <div className="studio min-h-screen"><div className="studio-wrap">
    <StudioHeader />
    <main id="main-content" tabIndex={-1} className="studio-state">
      <p className="studio-eyebrow">881230.studio</p><h1>{title}</h1>{children}
      <a href={sectionHref("work")} className="studio-link">Browse selected work ↗</a>
    </main>
    <StudioFooter />
  </div></div>;
}
