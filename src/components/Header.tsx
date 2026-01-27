import { ThemeToggle } from "./ThemeToggle";
import { useCyclingText } from "@/hooks/useCyclingText";
import { cn } from "@/lib/utils";

const taglines = [
  "a playground for web experiments",
  "where ideas become interactive",
  "creative experiments by Bryan",
  "building things that spark joy",
  "digital experiments & curiosities",
];

export function Header() {
  const { displayText, isTyping } = useCyclingText(taglines, 4000);

  return (
    <header className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Theme toggle */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          
          {/* Hero Logo Section */}
          <div className="flex flex-col items-center">
            {/* Logo with elegant typography */}
            <div className="flex items-center justify-center gap-3">
              {/* Monogram mark */}
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="text-xl md:text-2xl font-bold text-primary font-display">B</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-accent/80 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-accent-foreground">F</span>
                </div>
              </div>

              {/* Brand text */}
              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
                  <span className="text-foreground">bryan</span>
                  <span className="text-primary">.fun</span>
                </h1>
              </div>
            </div>

            {/* Cycling Tagline */}
            <div className="mt-6 flex items-center gap-2">
              <p className="text-center text-sm md:text-base text-muted-foreground h-6">
                <span className="inline-block min-w-[200px]">
                  {displayText}
                  <span className={cn(
                    "inline-block w-0.5 h-4 bg-primary/50 ml-0.5 align-middle",
                    isTyping ? "animate-pulse" : "opacity-0"
                  )} />
                </span>
              </p>
            </div>

            {/* Subtle decorative line */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
