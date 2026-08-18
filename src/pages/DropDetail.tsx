import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CinematicHeader } from "@/components/CinematicHeader";
import { CinematicFooter } from "@/components/CinematicFooter";
import { usePublicProjects } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";

const SITE = "https://www.bryanlauwk.fun";

export default function DropDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: projects, isLoading } = usePublicProjects();

  const project = useMemo(
    () => (projects ?? []).find((p) => slugFor(p) === slug),
    [projects, slug],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <CinematicHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="exhibit-label animate-electrical-flicker">
            Installing exhibit…
          </p>
        </main>
        <CinematicFooter />
      </div>
    );
  }

  if (!project) {
    const url = `${SITE}/drops/${slug ?? ""}`;
    const title = "Drop not found — Bryan LauWK";
    const description = "This experiment doesn't exist or has been retired. Browse the current collection of browser experiments from Bryan LauWK.";
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex,follow" />
          {/* Hint for prerender-style crawlers to record a 404 */}
          <meta name="prerender-status-code" content="404" />
          <link rel="canonical" href={url} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={`${SITE}/og-image.png`} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`${SITE}/og-image.png`} />
        </Helmet>
        <CinematicHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="exhibit-label mb-3">
              Exhibit missing from collection
            </p>
            <h1 className="font-display text-4xl font-black uppercase text-foreground mb-4">
              Drop not found
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 font-mono text-sm">
              The slug <span className="text-primary">/drops/{slug}</span> isn't in the collection.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary"
            >
              <ArrowLeft className="w-4 h-4" /> Back to experiments
            </Link>
          </div>
        </main>
        <CinematicFooter />
      </div>
    );
  }

  const canonical = `${SITE}/drops/${slugFor(project)}`;
  const rawDesc = (project.description ?? "").trim();
  const description =
    rawDesc.length > 0
      ? rawDesc.length > 155
        ? `${rawDesc.slice(0, 152).trimEnd()}…`
        : rawDesc
      : `A drop from Bryan LauWK — ${project.title}. Click to play.`;
  const title = `${project.title} — Bryan LauWK browser experiments`;
  const ogImage = project.image_url ?? undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description,
    url: canonical,
    creator: { "@type": "Person", name: "Bryan Lau Wai Kit", alternateName: "Bryan LauWK" },
    dateCreated: project.created_at,
    ...(project.tag ? { genre: project.tag } : {}),
    ...(ogImage ? { image: ogImage } : {}),
    sameAs: [project.href],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Browser Experiments", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: project.title, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}

        <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <CinematicHeader />

      <main className="flex-1 relative z-10 px-4 md:px-12 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All experiments
          </Link>

          <article className="relative bg-card border border-foreground/15 overflow-hidden">
            <div className="h-0.5 w-full bg-primary" aria-hidden="true" />

            <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-foreground/10">
              <span className="exhibit-label">
                Exhibit file · Drop
              </span>
              {project.tag && (
                <span className="inline-flex items-center border border-primary/60 text-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold">
                  {project.tag}
                </span>
              )}
            </div>

            <div className="p-6 md:p-10 space-y-6">
              <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-[0.95]">
                {project.title}
              </h1>
              <div className="h-1 w-24 bg-primary" />
              {project.description && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              )}

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground border border-primary font-mono text-sm uppercase tracking-widest font-bold hover:bg-transparent hover:text-primary transition-colors"
              >
                Enter the exhibit
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="exhibit-label pt-2">
                Opens {new URL(project.href).hostname} in a new tab
              </p>
            </div>

            <div className="px-6 py-2.5 border-t border-foreground/10 flex items-center justify-between exhibit-label !text-[9px]">
              <span>Please touch the art</span>
              <span className="barcode h-3 w-16 inline-block" aria-hidden="true" />
            </div>
          </article>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
