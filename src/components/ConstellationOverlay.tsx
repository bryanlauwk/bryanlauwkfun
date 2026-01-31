import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function ConstellationOverlay() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars for constellation effect
    const generatedStars: Star[] = [];
    const starCount = 30;

    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      });
    }

    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Corner constellation patterns */}
      <svg 
        className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-20"
        viewBox="0 0 200 200"
      >
        <circle cx="30" cy="40" r="2" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '0s' }} />
        <circle cx="60" cy="25" r="1.5" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '0.5s' }} />
        <circle cx="45" cy="70" r="2" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '1s' }} />
        <circle cx="80" cy="55" r="1" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '1.5s' }} />
        <circle cx="25" cy="90" r="1.5" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '2s' }} />
        <line x1="30" y1="40" x2="60" y2="25" className="stroke-primary/30" strokeWidth="0.5" />
        <line x1="30" y1="40" x2="45" y2="70" className="stroke-primary/30" strokeWidth="0.5" />
        <line x1="45" y1="70" x2="80" y2="55" className="stroke-primary/30" strokeWidth="0.5" />
        <line x1="45" y1="70" x2="25" y2="90" className="stroke-primary/30" strokeWidth="0.5" />
      </svg>

      <svg 
        className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-20"
        viewBox="0 0 200 200"
      >
        <circle cx="170" cy="30" r="2" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '0.3s' }} />
        <circle cx="140" cy="50" r="1.5" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '0.8s' }} />
        <circle cx="160" cy="80" r="1" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '1.3s' }} />
        <circle cx="130" cy="35" r="2" className="fill-primary animate-constellation-twinkle" style={{ animationDelay: '1.8s' }} />
        <line x1="170" y1="30" x2="140" y2="50" className="stroke-primary/30" strokeWidth="0.5" />
        <line x1="140" y1="50" x2="160" y2="80" className="stroke-primary/30" strokeWidth="0.5" />
        <line x1="140" y1="50" x2="130" y2="35" className="stroke-primary/30" strokeWidth="0.5" />
      </svg>

      {/* Scattered twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-primary animate-constellation-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Decorative circles (alchemical style) */}
      <div className="absolute bottom-20 left-10 w-16 h-16 md:w-24 md:h-24 border border-primary/10 rounded-full opacity-30" />
      <div className="absolute bottom-24 left-14 w-8 h-8 md:w-12 md:h-12 border border-primary/10 rounded-full opacity-20" />
      <div className="absolute top-40 right-16 w-20 h-20 md:w-32 md:h-32 border border-primary/10 rounded-full opacity-20" />
    </div>
  );
}
