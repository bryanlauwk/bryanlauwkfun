import { AnimatedMascot } from "./AnimatedMascot";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative py-12">
      {/* Theme toggle - top right */}
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center gap-4 px-4">
        {/* Mascot */}
        <AnimatedMascot className="animate-bounce-slow" />

        {/* Title */}
        <h1 className="text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          bryanlauwk.fun
        </h1>

        {/* Tagline */}
        <p className="text-center text-lg text-muted-foreground md:text-xl">
          games and stuff ✨
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
      `}</style>
    </header>
  );
}
