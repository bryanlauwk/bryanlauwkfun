import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";
import { HeroDoodle } from "./HeroDoodle";
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

export function Header() {
  const { displayText, isTyping } = useCyclingText(taglines, 3000);

  return (
    <header className="relative py-6 md:py-10">
      {/* Theme toggle */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="logo-container flex items-center justify-center">
              {/* BRYAN - wobbly letters */}
              <div className="flex">
                {"bryan".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-4xl font-bold uppercase text-foreground md:text-5xl lg:text-6xl",
                      "transition-transform duration-200 hover:scale-110"
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
              <div className="logo-mascot mx-1 md:mx-2">
                <AnimatedMascot size="small" />
              </div>

              {/* FUN - with glow effect */}
              <div className="flex">
                {"fun".split("").map((letter, i) => (
                  <span
                    key={i}
                    className={cn(
                      "logo-letter font-display text-4xl font-bold uppercase text-primary md:text-5xl lg:text-6xl",
                      "transition-all duration-200 hover:scale-110"
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
            <p className="mt-2 font-display text-center md:text-right text-sm text-muted-foreground md:text-base h-6">
              <span className="inline-block min-w-[200px]">
                {displayText}
                <span className={cn(
                  "inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle",
                  isTyping ? "animate-pulse" : "opacity-0"
                )} />
              </span>
            </p>
          </div>

          {/* Hero Doodle */}
          <div className="w-32 h-28 md:w-44 md:h-36 lg:w-52 lg:h-44 flex-shrink-0">
            <HeroDoodle className="w-full h-full drop-shadow-lg" />
          </div>

          {/* Right spacer for balance */}
          <div className="hidden md:block max-w-xs" />
        </div>
      </div>

      <style>{`
        .logo-letter {
          line-height: 1;
          cursor: default;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-letter:hover {
          animation: wobble 0.5s ease-in-out;
        }

        @keyframes wobble {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(-5deg) scale(1.15); }
          50% { transform: rotate(5deg) scale(1.1); }
          75% { transform: rotate(-3deg) scale(1.12); }
        }

        .logo-mascot {
          transition: transform 0.2s ease;
        }

        .logo-container:hover .logo-mascot {
          transform: scale(1.1);
        }
      `}</style>
    </header>
  );
}
