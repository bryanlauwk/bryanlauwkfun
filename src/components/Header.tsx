import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative py-8 md:py-12">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center px-4">
        {/* Creative title layout around mascot */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          {/* "bryan" - left side */}
          <span className="title-text title-left text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            bryan
          </span>

          {/* Mascot - center */}
          <div className="relative z-10 mx-2 md:mx-4">
            <AnimatedMascot className="animate-bounce-slow h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32" />
          </div>

          {/* "lauwk" - right side */}
          <span className="title-text title-right text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            lauwk
          </span>
        </div>

        {/* ".fun" - centered below mascot */}
        <span className="title-text title-fun -mt-2 text-3xl font-bold tracking-tight text-primary md:-mt-4 md:text-5xl lg:text-6xl">
          fun
        </span>

        {/* Tagline */}
        <p className="mt-4 text-center text-base text-muted-foreground md:text-lg">
          games and stuff by Bryan
        </p>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .title-text {
          transition: all 0.3s ease;
          cursor: default;
        }

        .title-text:hover {
          transform: scale(1.05);
        }

        .title-left:hover {
          color: hsl(var(--primary));
          transform: scale(1.05) rotate(-3deg);
        }

        .title-right:hover {
          color: hsl(var(--primary));
          transform: scale(1.05) rotate(3deg);
        }

        .title-fun:hover {
          transform: scale(1.1);
          text-shadow: 0 0 20px hsl(var(--primary) / 0.5);
        }
      `}</style>
    </header>
  );
}
