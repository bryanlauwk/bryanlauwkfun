export const DoodleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left - colorful stars cluster */}
      <svg
        className="absolute top-20 left-8 w-16 h-16 opacity-25"
        viewBox="0 0 50 50"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M25 5 L27 20 L25 15 L23 20 Z" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity="0.3" />
        <path d="M10 25 L25 23 L20 25 L25 27 Z" stroke="hsl(var(--primary))" />
        <circle cx="15" cy="10" r="3" fill="#FFE66D" />
        <circle cx="38" cy="15" r="2" fill="#4ECDC4" />
      </svg>

      {/* Top right - playful squiggle with dot */}
      <svg
        className="absolute top-32 right-12 w-24 h-20 opacity-20"
        viewBox="0 0 80 60"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M10 30 Q25 10, 40 30 Q55 50, 70 30" />
        <circle cx="70" cy="30" r="6" fill="#4ECDC4" stroke="none" />
      </svg>

      {/* Left side - floating heart */}
      <svg
        className="absolute top-1/3 left-6 w-14 h-14 opacity-25"
        viewBox="0 0 40 40"
      >
        <path 
          d="M20 35 Q5 20, 10 10 Q15 5, 20 12 Q25 5, 30 10 Q35 20, 20 35" 
          fill="#FF6B6B" 
          fillOpacity="0.7"
          stroke="#FF6B6B"
          strokeWidth="1.5"
        />
      </svg>

      {/* Right side - lightning bolt */}
      <svg
        className="absolute top-1/2 right-10 w-12 h-16 opacity-20"
        viewBox="0 0 40 50"
      >
        <path 
          d="M22 5 L10 25 L18 25 L15 45 L32 22 L23 22 Z" 
          fill="#FFE66D" 
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
        />
      </svg>

      {/* Bottom left - arrow pointing up */}
      <svg
        className="absolute bottom-40 left-16 w-10 h-16 opacity-20"
        viewBox="0 0 30 50"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 45 L15 10" />
        <path d="M5 20 L15 10 L25 20" />
      </svg>

      {/* Bottom right - spiral */}
      <svg
        className="absolute bottom-32 right-24 w-16 h-16 opacity-20"
        viewBox="0 0 50 50"
        fill="none"
        stroke="#4ECDC4"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M25 25 Q30 25, 30 20 Q30 15, 25 15 Q18 15, 18 22 Q18 32, 28 32 Q40 32, 40 20 Q40 8, 25 8" />
      </svg>

      {/* Center-ish left - diamond */}
      <svg
        className="absolute top-2/3 left-1/4 w-10 h-10 opacity-25 hidden md:block"
        viewBox="0 0 30 30"
      >
        <path 
          d="M15 3 L27 15 L15 27 L3 15 Z" 
          fill="#95E1D3" 
          fillOpacity="0.6"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
        />
      </svg>

      {/* Random colorful dots scattered */}
      <div className="absolute top-1/4 right-1/3 w-4 h-4 rounded-full opacity-25" style={{ backgroundColor: '#FF6B6B' }} />
      <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full opacity-20" style={{ backgroundColor: '#4ECDC4' }} />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full opacity-25" style={{ backgroundColor: '#FFE66D' }} />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full opacity-20" style={{ backgroundColor: '#95E1D3' }} />
    </div>
  );
};
