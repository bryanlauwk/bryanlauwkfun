import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { DropShellHeader, DropShellFooter } from "@/components/playable/DropShell";
import { usePublicProjects } from "@/hooks/useProjects";
import { slugFor } from "@/lib/slug";
import { featuredImageFor } from "@/lib/featuredImage";

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
      <div className="playable min-h-screen flex flex-col">
        <span className="pw-backdrop" aria-hidden="true" />
        <DropShellHeader />
        <main className="relative z-10 flex-1 flex items-center justify-center">
          <p className="pw-eyebrow pw-eyebrow--cyan">
            <span className="pw-dot" aria-hidden="true" />
            Loading experience…
          </p>
        </main>
        <DropShellFooter />
      </div>
    );
  }

  if (!project) {
    const url = `${SITE}/drops/${slug ?? ""}`;
    const title = "Drop not found — Bryan Lau";
    const description = "This drop doesn't exist or has been retired. Browse the current collection of drops from Bryan Lau.";
    return (
      <div className="playable min-h-screen flex flex-col">
        <span className="pw-backdrop" aria-hidden="true" />
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
        <DropShellHeader />
        <main id="main-content" className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <p className="pw-eyebrow pw-eyebrow--amber mb-3">Experience not found</p>
            <h1 className="pw-h1 mb-4">Nothing to play here.</h1>
            <p className="mx-auto mb-7 max-w-md text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground">/drops/{slug}</span> isn't one of the current
              playable experiences.
            </p>
            <Link to="/#play" className="pw-btn pw-btn--primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to play
            </Link>
          </div>
        </main>
        <DropShellFooter />
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
      : `A playable experience by Bryan Lau — ${project.title}. Open it in your browser.`;
  const title = `${project.title} — playable experience by Bryan Lau`;
  const resolvedImage = featuredImageFor(project);
  const launchYear = project.created_at
    ? new Date(project.created_at).getFullYear()
    : undefined;
  const ogImage = resolvedImage
    ? resolvedImage.startsWith("http")
      ? resolvedImage
      : `${SITE}${resolvedImage}`
    : undefined;

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
      { "@type": "ListItem", position: 1, name: "Playable experiences", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: project.title, item: canonical },
    ],
  };

  return (
    <div className="playable min-h-screen flex flex-col">
      <span className="pw-backdrop" aria-hidden="true" />
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

      <DropShellHeader />

      <main
        id="main-content"
        className="relative z-10 flex-1 px-4 py-10 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <Link
            to="/#play"
            className="pw-navlink inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All experiences
          </Link>

          <article className="pw-panel mt-6 overflow-hidden !p-0">
            {resolvedImage && (
              <div className="relative h-52 w-full overflow-hidden md:h-80">
                <img
                  src={resolvedImage}
                  alt={`Artwork for ${project.title}`}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="pw-feature-veil" aria-hidden="true" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--pw-line)/0.14)] px-5 py-3 md:px-8">
              <span className="pw-eyebrow pw-eyebrow--cyan">
                <span className="pw-dot" aria-hidden="true" />
                Playable file
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {project.tag && <span className="pw-tag">{project.tag}</span>}
                {launchYear && <span className="pw-tag">Launched · {launchYear}</span>}
              </div>
            </div>

            <div className="space-y-6 p-5 md:p-10">
              <h1 className="pw-h1">{project.title}</h1>

              {project.description && (
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pw-btn pw-btn--primary"
                >
                  Play now
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to="/#play" className="pw-btn">
                  Back to play
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                Opens {new URL(project.href).hostname} in a new tab.
              </p>
            </div>

            <div className="border-t border-[hsl(var(--pw-line)/0.14)] px-5 py-3 md:px-8">
              <span className="pw-eyebrow pw-eyebrow--green">Made to be played</span>
            </div>
          </article>
        </div>
      </main>

      <DropShellFooter />
    </div>
  );
}
