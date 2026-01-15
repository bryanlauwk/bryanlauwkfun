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
    <header className="relative py-8 md:py-12 overflow-hidden">
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

            {/* Cycling Tagline */}
            <p className="mt-3 font-display text-center text-sm text-muted-foreground md:text-base h-6">
              <span className="inline-block min-w-[200px]">
                {displayText}
                <span className={cn(
                  "inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle",
                  isTyping ? "animate-pulse" : "opacity-0"
                )} />
              </span>
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

        .hover\\:drop-shadow-glow:hover {
          filter: drop-shadow(0 0 12px hsl(var(--primary)));
        }
      `}</style>
    </header>
  );
}
