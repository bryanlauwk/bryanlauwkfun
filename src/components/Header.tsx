import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";
import { useCyclingText } from "@/hooks/useCyclingText";
import { cn } from "@/lib/utils";

const taglines = [
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
    <header className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Theme toggle */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          
          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute top-8 left-1/4 text-2xl animate-float-sparkle" style={{ animationDelay: '0s' }}>✨</span>
            <span className="absolute top-16 right-1/4 text-xl animate-float-sparkle" style={{ animationDelay: '0.5s' }}>⭐</span>
            <span className="absolute bottom-12 left-1/3 text-lg animate-float-sparkle" style={{ animationDelay: '1s' }}>💫</span>
            <span className="absolute top-1/3 right-1/3 text-xl animate-float-sparkle" style={{ animationDelay: '1.5s' }}>🌟</span>
            <span className="absolute bottom-20 right-1/4 text-2xl animate-float-sparkle" style={{ animationDelay: '2s' }}>✨</span>
          </div>

          {/* Hero Logo Section */}
          <div className="flex flex-col items-center">
            <div className="logo-container flex items-center justify-center">
              {/* BRYAN - wobbly letters */}
              <div className="flex">
                {"bryan".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-5xl font-bold uppercase text-foreground md:text-7xl lg:text-8xl",
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

              {/* Mascot - Hero Size */}
              <div className="logo-mascot mx-2 md:mx-4 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150" />
                <AnimatedMascot size="hero" />
              </div>

              {/* FUN - with glow effect */}
              <div className="flex">
                {"fun".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-5xl font-bold uppercase text-primary md:text-7xl lg:text-8xl",
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

            {/* Cycling Tagline */}
            <p className="mt-6 font-display text-center text-base text-muted-foreground md:text-lg lg:text-xl h-8">
              <span className="inline-block min-w-[240px] px-4 py-1 rounded-full bg-muted/50 backdrop-blur-sm">
                {displayText}
                <span className={cn(
                  "inline-block w-0.5 h-5 bg-primary ml-1 align-middle",
                  isTyping ? "animate-pulse" : "opacity-0"
                )} />
              </span>
            </p>

            {/* Subtle hint */}
            <p className="mt-4 text-xs text-muted-foreground/60 animate-pulse">
              ↑ click the mascot! ↑
            </p>
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

        @keyframes float-sparkle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-15px) rotate(10deg) scale(1.1);
            opacity: 1;
          }
        }

        .animate-float-sparkle {
          animation: float-sparkle 4s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .hover\\:drop-shadow-glow:hover {
          filter: drop-shadow(0 0 15px hsl(var(--primary)));
        }
      `}</style>
    </header>
  );
}
