import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";
import { HeroDoodle } from "./HeroDoodle";
import { DoodleIcon } from "./DoodleIcon";

export function Header() {
  return (
    <header className="relative py-6 md:py-10">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4">
        {/* Unified Hero Row: Logo + HeroDoodle */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16">
          
          {/* Left: Logo Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="logo-container flex items-center justify-center">
              <span className="logo-text font-display text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
                bryan
              </span>

              {/* Mascot - inline as visual separator */}
              <div className="logo-mascot mx-1 md:mx-2">
                <AnimatedMascot size="small" />
              </div>

              <span className="logo-text font-display text-4xl font-bold uppercase tracking-tight text-primary md:text-5xl lg:text-6xl">
                fun
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-2 font-display text-center md:text-right text-sm text-muted-foreground md:text-base">
              games and stuff by Bryan
            </p>
          </div>

          {/* Center: Hero Doodle - The Purple Cow! */}
          <div className="w-32 h-28 md:w-44 md:h-36 lg:w-52 lg:h-44 flex-shrink-0">
            <HeroDoodle className="w-full h-full drop-shadow-lg" />
          </div>

          {/* Right: Welcome Copy */}
          <div className="text-center md:text-left max-w-xs">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
              Welcome!
              <DoodleIcon type="wave" size="lg" className="text-primary" />
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A collection of fun experiments, games, and creative projects.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .logo-container {
          gap: 0;
        }

        .logo-text {
          line-height: 1;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
        }

        .logo-text:first-child {
          letter-spacing: -0.02em;
        }

        .logo-text:last-child {
          letter-spacing: -0.01em;
        }

        .logo-text:hover {
          transform: scale(1.05);
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
