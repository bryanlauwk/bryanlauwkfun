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
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
            Retrieving file…
          </p>
        </main>
        <CinematicFooter />
      </div>
    );
  }

  if (!project) {
    const url = `${SITE}/drops/${slug ?? ""}`;
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Helmet>
          <title>Drop not found — Bryan Lau</title>
          <meta name="description" content="This drop doesn't exist or has been retired." />
          <meta name="robots" content="noindex,nofollow" />
          <link rel="canonical" href={url} />
          <meta property="og:url" content={url} />
        </Helmet>
        <CinematicHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Case File // Missing
            </p>
            <h1 className="font-serif text-4xl font-black uppercase text-foreground mb-4">
              Drop not found
            </h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary"
            >
              <ArrowLeft className="w-4 h-4" /> Back to drops
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
      : `A drop from Bryan Lau — ${project.title}. Click to play.`;
  const title = `${project.title} — Bryan Lau drops`;
  const ogImage = project.image_url ?? undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description,
    url: canonical,
    creator: { "@type": "Person", name: "Bryan Lau" },
    dateCreated: project.created_at,
    ...(project.tag ? { genre: project.tag } : {}),
    ...(ogImage ? { image: ogImage } : {}),
    sameAs: [project.href],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Drops", item: `${SITE}/` },
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
            <ArrowLeft className="w-3.5 h-3.5" /> All drops
          </Link>

          <article className="relative bg-card border-2 border-foreground rounded-lg shadow-[6px_6px_0_hsl(var(--foreground))] overflow-hidden">
            <span
              className="absolute -top-2 left-8 w-20 h-4 bg-foreground/85 rotate-[-6deg] pointer-events-none z-10"
              aria-hidden="true"
            />

            <div className="px-6 pt-6 pb-3 flex items-center justify-between border-b-2 border-dashed border-foreground/20 bg-grid-paper">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                Case File · Drop
              </span>
              {project.tag && (
                <span className="inline-flex items-center bg-foreground text-primary rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest font-bold">
                  {project.tag}
                </span>
              )}
            </div>

            <div className="p-6 md:p-10 space-y-6">
              <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-[0.95]">
                {project.title}
              </h1>
              <div className="h-2 w-24 bg-primary rounded-full" />
              {project.description && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-mono max-w-2xl">
                  {project.description}
                </p>
              )}

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-foreground rounded-sm bg-primary font-mono text-sm uppercase tracking-widest font-bold text-foreground shadow-[4px_4px_0_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--foreground))] transition-all"
              >
                Open the drop
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground pt-2">
                Opens {new URL(project.href).hostname} in a new tab
              </p>
            </div>
          </article>
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
