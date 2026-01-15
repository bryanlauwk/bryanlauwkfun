import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative py-8 md:py-12">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-6">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center px-4">
        {/* Compact single-line logo like neal.fun */}
        <div className="logo-container flex items-center justify-center">
          <span className="logo-text font-display text-5xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
            bryan
          </span>

          {/* Mascot - inline as visual separator */}
          <div className="logo-mascot mx-1 md:mx-2">
            <AnimatedMascot size="small" />
          </div>

          <span className="logo-text font-display text-5xl font-bold uppercase tracking-tight text-primary md:text-6xl lg:text-7xl">
            fun
          </span>
        </div>

        {/* Tagline */}
        <p className="mt-4 font-display text-center text-base text-muted-foreground md:text-lg">
          games and stuff by Bryan
        </p>
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
