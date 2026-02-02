import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="mb-4 font-serif text-7xl md:text-9xl font-bold stranger-glow animate-electrical-flicker">
          404
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-muted-foreground font-mono">
          You've wandered too far
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest hover:tracking-[0.2em] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Head back</span>
        </a>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default NotFound;
