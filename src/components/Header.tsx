import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";
import { useCyclingText } from "@/hooks/useCyclingText";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const taglines = [
  "messing in the playground",
  "games and stuff by Bryan",
  "questionable decisions",
  "things that probably work",
  "bugs disguised as features",
  "procrastination projects",
  "powered by caffeine",
];

const letterColors = [
  "hover:text-pink-500",
  "hover:text-purple-500",
  "hover:text-blue-500",
  "hover:text-cyan-500",
  "hover:text-green-500",
  "hover:text-yellow-500",
  "hover:text-orange-500",
  "hover:text-red-500",
];

export function Header() {
  const { displayText, isTyping } = useCyclingText(taglines, 3000);

  return (
    <header className="relative py-8 md:py-12 overflow-hidden">
      {/* Decorative floating doodles */}
      <div className="absolute left-8 top-8 opacity-20 animate-float hidden md:block">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path 
            d="M20 5 L22 15 L32 17 L24 22 L26 32 L20 26 L14 32 L16 22 L8 17 L18 15 Z" 
            fill="hsl(var(--primary))" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute right-12 top-16 opacity-15 animate-float hidden md:block" style={{ animationDelay: '1s' }}>
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle cx="15" cy="15" r="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="4 3" />
        </svg>
      </div>
      <div className="absolute left-16 bottom-4 opacity-20 animate-float hidden md:block" style={{ animationDelay: '0.5s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 21 Q3 12, 8 6 Q12 3, 12 8 Q12 3, 16 6 Q21 12, 12 21" fill="hsl(var(--primary))" opacity="0.6" />
        </svg>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[250px] bg-primary/8 rounded-full blur-[80px]" />
      </div>

      {/* Theme toggle */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          
          {/* Hero Logo Section */}
          <div className="flex flex-col items-center">
            <div className="logo-container flex items-center justify-center">
              {/* BRYAN - wobbly letters */}
              <div className="flex">
                {"bryan".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-4xl font-bold uppercase text-foreground md:text-5xl lg:text-6xl",
                      "transition-all duration-200 cursor-pointer",
                      letterColors[i % letterColors.length]
                    )}
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Mascot */}
              <div className="logo-mascot mx-1 md:mx-2 relative">
                <div className="absolute inset-0 bg-primary/15 rounded-full blur-lg scale-125" />
                <AnimatedMascot size="large" />
              </div>

              {/* FUN - with glow effect */}
              <div className="flex">
                {"fun".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-4xl font-bold uppercase text-primary md:text-5xl lg:text-6xl",
                      "transition-all duration-200 cursor-pointer",
                      "hover:text-accent hover:drop-shadow-glow",
                      letterColors[(i + 5) % letterColors.length]
                    )}
                    style={{ 
                      animationDelay: `${(i + 5) * 0.05}s`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Cycling Tagline with sparkle decoration */}
            <div className="mt-3 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary/40 animate-pulse hidden sm:block" />
              <p className="font-display text-center text-sm text-muted-foreground md:text-base h-6">
                <span className="inline-block min-w-[200px]">
                  {displayText}
                  <span className={cn(
                    "inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle",
                    isTyping ? "animate-pulse" : "opacity-0"
                  )} />
                </span>
              </p>
              <Sparkles className="h-3 w-3 text-primary/40 animate-pulse hidden sm:block" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Decorative wavy line */}
            <svg className="mt-4 w-32 h-3 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path
                d="M0 5 Q12.5 0, 25 5 Q37.5 10, 50 5 Q62.5 0, 75 5 Q87.5 10, 100 5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .logo-letter {
          line-height: 1;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-letter:hover {
          animation: wobble 0.5s ease-in-out;
          text-shadow: 0 0 20px currentColor;
        }

        @keyframes wobble {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(-8deg) scale(1.2); }
          50% { transform: rotate(8deg) scale(1.15); }
          75% { transform: rotate(-4deg) scale(1.18); }
        }

        .logo-mascot {
          transition: transform 0.3s ease;
        }

        .logo-container:hover .logo-mascot {
          transform: scale(1.05);
        }

        .hover\\:drop-shadow-glow:hover {
          filter: drop-shadow(0 0 12px hsl(var(--primary)));
        }
      `}</style>
    </header>
  );
}
