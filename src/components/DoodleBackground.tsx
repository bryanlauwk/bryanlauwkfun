import React from "react";

export function DoodleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left - waving stick figure */}
      <svg
        className="absolute top-20 left-8 w-16 h-20 opacity-[0.08] dark:opacity-[0.06]"
        viewBox="0 0 60 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="30" cy="12" r="10" />
        {/* Body */}
        <path d="M30 22 L30 50" />
        {/* Legs */}
        <path d="M30 50 L20 70" />
        <path d="M30 50 L40 70" />
        {/* Arms - one waving */}
        <path d="M30 30 L15 40" />
        <path d="M30 30 L50 15" />
        {/* Wave lines */}
        <path d="M52 10 Q55 8, 58 12" />
        <path d="M54 6 Q57 4, 60 8" />
      </svg>

      {/* Top right - thinking stick figure with lightbulb */}
      <svg
        className="absolute top-32 right-12 w-20 h-24 opacity-[0.08] dark:opacity-[0.06]"
        viewBox="0 0 80 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="30" cy="20" r="10" />
        {/* Body */}
        <path d="M30 30 L30 55" />
        {/* Legs */}
        <path d="M30 55 L20 75" />
        <path d="M30 55 L40 75" />
        {/* Arms - thinking pose */}
        <path d="M30 38 L18 45" />
        <path d="M30 38 L42 32 L38 22" />
        {/* Lightbulb */}
        <path d="M55 8 Q60 5, 65 8 Q70 12, 65 18 Q62 22, 62 26 L58 26 Q58 22, 55 18 Q50 12, 55 8" />
        <path d="M58 28 L62 28" />
        <path d="M58 30 L62 30" />
        {/* Rays */}
        <path d="M50 12 L46 10" />
        <path d="M70 12 L74 10" />
        <path d="M60 3 L60 0" />
      </svg>

      {/* Middle left - arrow pointing right */}
      <svg
        className="absolute top-1/3 -left-2 w-24 h-12 opacity-[0.06] dark:opacity-[0.04]"
        viewBox="0 0 100 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 25 Q20 22, 35 28 Q50 32, 65 24 Q75 18, 85 25" />
        <path d="M75 18 L88 25 L78 32" />
      </svg>

      {/* Center right - excited stick figure */}
      <svg
        className="absolute top-1/2 right-6 w-14 h-20 opacity-[0.07] dark:opacity-[0.05] hidden md:block"
        viewBox="0 0 55 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="28" cy="15" r="10" />
        {/* Happy face */}
        <path d="M24 13 L24 14" />
        <path d="M32 13 L32 14" />
        <path d="M24 19 Q28 23, 32 19" />
        {/* Body */}
        <path d="M28 25 L28 48" />
        {/* Legs - jumping */}
        <path d="M28 48 L18 65" />
        <path d="M28 48 L38 65" />
        {/* Arms up - celebrating */}
        <path d="M28 32 L15 18" />
        <path d="M28 32 L41 18" />
        {/* Celebration lines */}
        <path d="M10 12 L8 8" />
        <path d="M46 12 L48 8" />
        <path d="M12 20 L6 20" />
        <path d="M44 20 L50 20" />
      </svg>

      {/* Bottom left - pointing stick figure */}
      <svg
        className="absolute bottom-40 left-10 w-16 h-20 opacity-[0.07] dark:opacity-[0.05] hidden lg:block"
        viewBox="0 0 70 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <circle cx="25" cy="12" r="10" />
        {/* Body */}
        <path d="M25 22 L25 50" />
        {/* Legs */}
        <path d="M25 50 L15 70" />
        <path d="M25 50 L35 70" />
        {/* Arms - pointing */}
        <path d="M25 32 L10 40" />
        <path d="M25 32 L55 20" />
        {/* Arrow at pointing hand */}
        <path d="M55 20 L65 18" />
        <path d="M60 14 L65 18 L60 22" />
      </svg>

      {/* Bottom right - speech bubble */}
      <svg
        className="absolute bottom-32 right-16 w-16 h-14 opacity-[0.06] dark:opacity-[0.04]"
        viewBox="0 0 65 55"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 10 Q5 5, 15 5 L50 5 Q60 5, 60 15 L60 30 Q60 40, 50 40 L25 40 L15 50 L18 40 L15 40 Q5 40, 5 30 Z" />
        <path d="M20 18 L45 18" />
        <path d="M20 26 L40 26" />
        <path d="M20 34 L35 34" />
      </svg>

      {/* Stars scattered */}
      <svg
        className="absolute top-48 left-1/4 w-8 h-8 opacity-[0.08] dark:opacity-[0.05]"
        viewBox="0 0 30 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M15 5 L15 25" />
        <path d="M5 15 L25 15" />
        <path d="M8 8 L22 22" />
        <path d="M22 8 L8 22" />
      </svg>

      <svg
        className="absolute bottom-1/3 right-1/4 w-6 h-6 opacity-[0.06] dark:opacity-[0.04] hidden md:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 2 L12 22" />
        <path d="M2 12 L22 12" />
      </svg>

      {/* Squiggly underline */}
      <svg
        className="absolute bottom-20 left-1/3 w-32 h-6 opacity-[0.05] dark:opacity-[0.03]"
        viewBox="0 0 120 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 12 Q15 5, 25 12 Q35 19, 45 12 Q55 5, 65 12 Q75 19, 85 12 Q95 5, 105 12 Q115 19, 120 12" />
      </svg>

      {/* Circle highlight */}
      <svg
        className="absolute top-2/3 left-16 w-12 h-12 opacity-[0.05] dark:opacity-[0.03] hidden lg:block"
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M25 5 Q45 8, 45 25 Q42 45, 25 45 Q5 42, 5 25 Q8 5, 25 5" />
      </svg>

      {/* Small arrow */}
      <svg
        className="absolute top-1/4 right-1/3 w-10 h-8 opacity-[0.06] dark:opacity-[0.04] hidden md:block"
        viewBox="0 0 40 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15 Q15 12, 25 18 L35 15" />
        <path d="M30 10 L36 15 L30 20" />
      </svg>
    </div>
  );
}
