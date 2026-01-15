export function DoodleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Waving stick figure - top left */}
      <svg
        className="absolute top-20 left-8 w-24 h-32 opacity-[0.08] text-foreground hidden md:block"
        viewBox="0 0 100 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="50" cy="20" r="15" />
        {/* Body */}
        <path d="M50 35 L50 80" />
        {/* Arms - waving */}
        <path d="M50 50 L25 35" />
        <path d="M25 35 L15 20" />
        <path d="M50 50 L75 55" />
        {/* Legs */}
        <path d="M50 80 L30 120" />
        <path d="M50 80 L70 120" />
        {/* Smile */}
        <path d="M42 23 Q50 30 58 23" />
      </svg>

      {/* Thinking stick figure with lightbulb - right side */}
      <svg
        className="absolute top-40 right-12 w-28 h-36 opacity-[0.08] text-foreground hidden lg:block"
        viewBox="0 0 120 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="50" cy="25" r="15" />
        {/* Body */}
        <path d="M50 40 L50 85" />
        {/* Arms - thinking pose */}
        <path d="M50 55 L30 70" />
        <path d="M30 70 L35 50" />
        <path d="M50 55 L70 65" />
        {/* Legs */}
        <path d="M50 85 L35 125" />
        <path d="M50 85 L65 125" />
        {/* Thought bubble dots */}
        <circle cx="75" cy="15" r="2" fill="currentColor" />
        <circle cx="85" cy="8" r="3" fill="currentColor" />
        {/* Lightbulb */}
        <ellipse cx="100" cy="5" rx="10" ry="12" />
        <path d="M95 17 L105 17" />
        <path d="M96 20 L104 20" />
        {/* Rays */}
        <path d="M100 -10 L100 -15" />
        <path d="M115 5 L120 5" />
        <path d="M85 5 L80 5" />
        <path d="M110 -5 L115 -10" />
        <path d="M90 -5 L85 -10" />
      </svg>

      {/* Wobbly arrow pointing right */}
      <svg
        className="absolute top-1/3 left-1/4 w-20 h-10 opacity-[0.06] text-foreground hidden md:block"
        viewBox="0 0 100 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 20 Q25 15 45 22 Q65 28 80 18" />
        <path d="M70 10 L82 18 L72 28" />
      </svg>

      {/* Speech bubble with exclamation */}
      <svg
        className="absolute bottom-1/3 left-16 w-16 h-16 opacity-[0.07] text-foreground hidden md:block"
        viewBox="0 0 70 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 10 Q5 10 5 20 L5 40 Q5 50 15 50 L25 50 L20 60 L35 50 L55 50 Q65 50 65 40 L65 20 Q65 10 55 10 Z" />
        <path d="M35 20 L35 32" />
        <circle cx="35" cy="40" r="2" fill="currentColor" />
      </svg>

      {/* Star burst */}
      <svg
        className="absolute top-1/2 right-1/4 w-12 h-12 opacity-[0.06] text-foreground"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M25 5 L25 15 M25 35 L25 45 M5 25 L15 25 M35 25 L45 25 M10 10 L18 18 M32 32 L40 40 M40 10 L32 18 M18 32 L10 40" />
      </svg>

      {/* Small celebrating figure - bottom right */}
      <svg
        className="absolute bottom-32 right-20 w-20 h-28 opacity-[0.08] text-foreground hidden md:block"
        viewBox="0 0 80 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="40" cy="18" r="12" />
        {/* Happy face */}
        <path d="M34 16 Q40 22 46 16" />
        {/* Body */}
        <path d="M40 30 L40 65" />
        {/* Arms up! */}
        <path d="M40 42 L20 25" />
        <path d="M40 42 L60 25" />
        {/* Legs jumping */}
        <path d="M40 65 L25 95" />
        <path d="M40 65 L55 95" />
        {/* Confetti */}
        <circle cx="15" cy="15" r="2" fill="currentColor" />
        <circle cx="65" cy="18" r="2" fill="currentColor" />
        <path d="M70 8 L75 12" />
        <path d="M10 22 L5 26" />
      </svg>

      {/* Squiggly underline decoration */}
      <svg
        className="absolute bottom-48 left-1/3 w-32 h-8 opacity-[0.05] text-foreground hidden lg:block"
        viewBox="0 0 150 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 15 Q20 5 35 15 Q50 25 65 15 Q80 5 95 15 Q110 25 125 15 Q140 5 145 15" />
      </svg>

      {/* Pointing hand - mid left */}
      <svg
        className="absolute top-2/3 left-8 w-16 h-20 opacity-[0.07] text-foreground hidden lg:block"
        viewBox="0 0 60 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pointing finger */}
        <path d="M30 5 L30 30" />
        <path d="M25 30 L35 30" />
        <path d="M20 35 L40 35 L40 55 L20 55 Z" />
        <path d="M25 55 L25 70" />
        <path d="M35 55 L35 70" />
      </svg>

      {/* Question marks floating */}
      <svg
        className="absolute top-24 right-1/3 w-10 h-14 opacity-[0.06] text-foreground"
        viewBox="0 0 40 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M10 15 Q10 5 20 5 Q30 5 30 15 Q30 22 20 25 L20 35" />
        <circle cx="20" cy="45" r="3" fill="currentColor" />
      </svg>

      {/* Check mark */}
      <svg
        className="absolute bottom-1/4 right-1/3 w-10 h-10 opacity-[0.06] text-foreground hidden md:block"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 25 L20 35 L40 15" />
      </svg>

      {/* Heart */}
      <svg
        className="absolute top-3/4 left-1/4 w-8 h-8 opacity-[0.05] text-foreground"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 35 L8 22 Q2 15 8 8 Q15 2 20 10 Q25 2 32 8 Q38 15 32 22 Z" />
      </svg>

      {/* Sparkles cluster */}
      <svg
        className="absolute top-16 left-1/2 w-14 h-14 opacity-[0.05] text-foreground hidden lg:block"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M30 10 L30 20 M30 40 L30 50 M10 30 L20 30 M40 30 L50 30" />
        <path d="M18 18 L23 23 M37 37 L42 42 M42 18 L37 23 M23 37 L18 42" />
      </svg>

      {/* Rocket doodle */}
      <svg
        className="absolute bottom-20 left-1/2 w-12 h-20 opacity-[0.06] text-foreground hidden md:block"
        viewBox="0 0 50 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rocket body */}
        <path d="M25 5 Q15 20 15 40 L35 40 Q35 20 25 5" />
        {/* Window */}
        <circle cx="25" cy="25" r="6" />
        {/* Fins */}
        <path d="M15 35 L5 50 L15 45" />
        <path d="M35 35 L45 50 L35 45" />
        {/* Flame */}
        <path d="M20 40 L25 55 L30 40" />
        <path d="M22 40 L25 50 L28 40" />
      </svg>
    </div>
  );
}
