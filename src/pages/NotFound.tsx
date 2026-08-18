import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Page Not Found (404) — Bryan LauWK",
    description:
      "This page doesn't exist. Head back to browse Bryan LauWK's browser experiments — playable games, simulations and interactive toys.",
    canonical: "https://www.bryanlauwk.fun/404",
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);


  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden film-grain vignette">
      <div className="relative z-10 text-center px-6">
        <p className="exhibit-label mb-6">Exhibit not on display</p>
        <h1 className="mb-4 font-display text-7xl md:text-9xl font-black stranger-glow animate-electrical-flicker">
          404
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-muted-foreground font-mono">
          You've wandered off the tour
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest hover:tracking-[0.2em] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to the gallery</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
