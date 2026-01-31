import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ThemeToggle } from "./ThemeToggle";
import { useCyclingText } from "@/hooks/useCyclingText";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import octopusBackground from "@/assets/octopus-background.png";

const taglines = [
  "where imagination meets the deep",
  "a playground for web experiments",
  "creative experiments by Bryan",
  "building things that spark joy",
  "digital experiments & curiosities",
];

export function OctopusHero() {
  const { displayText, isTyping } = useCyclingText(taglines, 4000);
  const { scrollY } = useScrollProgress();
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(false);

  // Staggered entrance animations
  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 100);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 600);
    const scrollTimer = setTimeout(() => setScrollIndicatorVisible(true), 1500);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Calculate opacity for scroll indicator (fade out as user scrolls)
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 200);

  // Parallax effect for background
  const parallaxOffset = scrollY * 0.3;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Octopus illustration background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <img
          src={octopusBackground}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            minHeight: '120vh',
          }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Theme toggle */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Animated Title */}
          <div 
            className={cn(
              "transition-all duration-1000 ease-out",
              titleVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Logo with elegant typography */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Monogram mark */}
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 backdrop-blur-sm shadow-lg shadow-primary/20">
                  <span className="text-2xl md:text-3xl font-bold text-primary font-display">B</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-accent/90 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-accent-foreground">F</span>
                </div>
              </div>

              {/* Brand text */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight drop-shadow-lg">
                <span className="text-foreground">bryan</span>
                <span className="text-primary">.fun</span>
              </h1>
            </div>
          </div>

          {/* Cycling Tagline */}
          <div 
            className={cn(
              "transition-all duration-700 ease-out delay-100",
              subtitleVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
          >
            <p className="text-lg md:text-xl text-foreground/90 h-8 flex items-center justify-center drop-shadow-md">
              <span className="inline-block min-w-[280px] text-center">
                {displayText}
                <span 
                  className={cn(
                    "inline-block w-0.5 h-5 bg-primary/70 ml-1 align-middle",
                    isTyping ? "animate-pulse" : "opacity-0"
                  )} 
                />
              </span>
            </p>
          </div>

          {/* Decorative divider */}
          <div 
            className={cn(
              "mt-8 flex items-center gap-3 transition-all duration-700 ease-out delay-200",
              subtitleVisible 
                ? "opacity-100" 
                : "opacity-0"
            )}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary/50 shadow-lg shadow-primary/30" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500",
          scrollIndicatorVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-xs text-foreground/80 uppercase tracking-widest drop-shadow-md">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-foreground/80 animate-bounce" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
