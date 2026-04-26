import { Globe, Megaphone, Wrench } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollSection } from "@/components/ScrollSection";
import { GuestBook } from "@/components/GuestBook";
import faviconImage from "/favicon.png";

const serviceHighlights = [
  {
    title: "Web Design",
    description: "Clean, mobile-first pages that are easy to scan.",
    Icon: Globe,
  },
  {
    title: "Brand Messaging",
    description: "Sharper copy focused on what your business offers.",
    Icon: Megaphone,
  },
  {
    title: "Maintenance",
    description: "Content updates, fixes, and small improvements.",
    Icon: Wrench,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <CinematicHeader />

      <main id="main-content" className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <section className="mb-14 md:mb-24 animate-fade-in-up">
            <div className="grid gap-6 md:gap-10 md:grid-cols-[1.4fr_1fr] items-stretch">
              <div className="bg-primary rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-foreground shadow-[6px_6px_0_hsl(var(--foreground))]">
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary-foreground/90 mb-4">
                  Bluediesel · Johor Bahru
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight text-primary-foreground">
                  Better mobile pages for your business.
                </h1>
                <p className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-primary-foreground/90">
                  We simplify layout, reduce repeated messages, and highlight what customers should do next.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-foreground bg-card p-6 md:p-8 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={faviconImage}
                    alt="Bluediesel profile"
                    className="w-12 h-12 rounded-xl border-2 border-foreground object-cover"
                  />
                  <div>
                    <p className="font-serif text-lg font-black uppercase leading-none">Bluediesel</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 mt-1">
                      Web & Creative Studio
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                  <li>• Mobile layout reviewed for clearer hierarchy.</li>
                  <li>• Added visual identity block to improve trust.</li>
                  <li>• Reduced copy noise to avoid cognitive overload.</li>
                </ul>
              </div>
            </div>
          </section>

          <ScrollSection animation="fade-up" className="mt-8 md:mt-14">
            <div className="mb-6 md:mb-8">
              <h2 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
                What we do
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {serviceHighlights.map(({ title, description, Icon }) => (
                <article key={title} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </ScrollSection>

          <ScrollSection animation="fade-up" className="mt-16 md:mt-24">
            <div className="mb-8 md:mb-12">
              <h2 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground">
                Recent work
              </h2>
              <div className="h-2 w-24 bg-primary mt-3 rounded-full" />
            </div>
            <ProjectGrid />
          </ScrollSection>

          <ScrollSection animation="fade-up" className="mt-20 md:mt-32">
            <GuestBook />
          </ScrollSection>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
};

export default Index;
