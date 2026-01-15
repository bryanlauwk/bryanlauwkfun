import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative py-10 md:py-16">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center px-4">
        {/* Creative title layout around mascot */}
        <div className="relative flex items-center justify-center gap-3 md:gap-5">
          {/* "bryan" - left side */}
          <span className="title-text title-left font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            bryan
          </span>

          {/* Mascot - center */}
          <div className="relative z-10 mx-2 md:mx-4">
            <AnimatedMascot className="animate-bounce-slow h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36" />
          </div>

          {/* "lauwk" - right side */}
          <span className="title-text title-right font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            lauwk
          </span>
        </div>

        {/* "fun" - centered below mascot with vibrant primary color */}
        <span className="title-text title-fun font-display -mt-1 text-5xl font-bold tracking-wide text-primary md:-mt-2 md:text-7xl lg:text-8xl">
          fun
        </span>

        {/* Tagline */}
        <p className="mt-6 font-display text-center text-lg text-muted-foreground md:text-xl">
          games and stuff by Bryan
        </p>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }

        .title-text {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: default;
          text-shadow: 0 2px 10px hsl(var(--foreground) / 0.1);
        }

        .title-text:hover {
          transform: scale(1.08);
        }

        .title-left:hover {
          color: hsl(var(--primary));
          transform: scale(1.08) rotate(-4deg);
          text-shadow: 0 4px 20px hsl(var(--primary) / 0.3);
        }

        .title-right:hover {
          color: hsl(var(--primary));
          transform: scale(1.08) rotate(4deg);
          text-shadow: 0 4px 20px hsl(var(--primary) / 0.3);
        }

        .title-fun {
          text-shadow: 0 4px 20px hsl(var(--primary) / 0.4);
        }

        .title-fun:hover {
          transform: scale(1.12);
          text-shadow: 0 6px 30px hsl(var(--primary) / 0.6);
        }
      `}</style>
    </header>
  );
}
