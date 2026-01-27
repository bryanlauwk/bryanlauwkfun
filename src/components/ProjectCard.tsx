import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Gamepad2, Sparkles, Star } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  color?: string;
  className?: string;
  isPlaceholder?: boolean;
  index?: number;
  showTextOverlay?: boolean;
}

const placeholderMessages = [
  "Something chaotic this way comes...",
  "Currently being debugged from existence",
  "41% done (we rounded up)",
  "Ask again later",
  "Probably shipping soon (probably)",
  "Loading... forever",
  "Under construction",
  "Coffee required to unlock",
  "Top secret experiments",
];

const cardGradients = [
  "from-primary/80 to-primary",
  "from-accent/80 to-accent",
  "from-pink-500 to-rose-500",
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-indigo-500 to-blue-500",
  "from-fuchsia-500 to-pink-500",
];

// Fun doodle icons for cards
const cardDoodles = ["✨", "🎮", "🚀", "⭐", "🎨", "💫", "🌈", "🎯", "🔮"];

export function ProjectCard({
  title,
  description,
  imageUrl,
  href,
  color,
  className,
  isPlaceholder = false,
  index = 0,
  showTextOverlay = true,
}: ProjectCardProps) {
  const isDisabled = isPlaceholder || href === "#";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [typedDescription, setTypedDescription] = useState("");
  const [sparklePositions, setSparklePositions] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const actualDescription = isPlaceholder 
    ? placeholderMessages[index % placeholderMessages.length]
    : description;

  const gradientClass = color?.includes("gradient") 
    ? color 
    : `bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`;

  const cardDoodle = cardDoodles[index % cardDoodles.length];

  // Typewriter effect for description
  useEffect(() => {
    if (!isHovered || !actualDescription) {
      setTypedDescription("");
      return;
    }

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= actualDescription.length) {
        setTypedDescription(actualDescription.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isHovered, actualDescription]);

  // Sparkle effect on hover
  useEffect(() => {
    if (!isHovered || isDisabled) {
      setSparklePositions([]);
      return;
    }

    const createSparkle = () => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setSparklePositions(prev => [...prev.slice(-5), newSparkle]);
    };

    createSparkle();
    const interval = setInterval(createSparkle, 400);
    return () => clearInterval(interval);
  }, [isHovered, isDisabled]);

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDisabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / centerY * 8;
    const tiltY = (centerX - x) / centerX * 8;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardContent = (
    <>
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-300",
          !isDisabled && "group-hover:scale-105",
          gradientClass
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Gamepad2 className="h-10 w-10 opacity-20 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Animated pattern overlay with dots */}
      <div 
        className={cn(
          "absolute inset-0 opacity-10 transition-opacity duration-300",
          isHovered && !isDisabled && "opacity-25"
        )}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Hover gradient overlay */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {/* Sparkle effects */}
      {sparklePositions.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle-fade"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        >
          <Sparkles className="h-4 w-4 text-primary-foreground/80" />
        </div>
      ))}

      {/* Coming Soon Badge with doodle */}
      {isPlaceholder && showTextOverlay && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          <span className="text-lg animate-bounce-slow">{cardDoodle}</span>
          <Badge variant="secondary" className="bg-background/80 text-foreground text-xs backdrop-blur-sm">
            Coming Soon
          </Badge>
        </div>
      )}

      {/* Floating star decoration */}
      {!isDisabled && isHovered && (
        <div className="absolute top-2 left-2 z-10">
          <Star className="h-5 w-5 text-primary-foreground/70 animate-spin-slow fill-current" />
        </div>
      )}

      {/* Content */}
      {showTextOverlay && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <div className="flex-1">
            <h3 className="text-base font-bold text-primary-foreground drop-shadow-lg md:text-lg flex items-center gap-2">
              {title}
              {isHovered && !isDisabled && (
                <span className="text-xs animate-bounce-slow">✨</span>
              )}
            </h3>
            <p className="mt-0.5 text-xs text-primary-foreground/80 drop-shadow-md md:text-sm h-5 overflow-hidden">
              {isHovered ? typedDescription : (actualDescription || "")}
              {isHovered && typedDescription.length < (actualDescription?.length || 0) && (
                <span className="inline-block w-0.5 h-3 bg-primary-foreground/80 ml-0.5 animate-pulse" />
              )}
            </p>
          </div>
          
          {/* Arrow indicator with bounce */}
          {!isDisabled && (
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-background/20 transition-all duration-300 backdrop-blur-sm",
              isHovered ? "opacity-100 translate-x-1 animate-bounce-x" : "opacity-0"
            )}>
              <span className="text-primary-foreground">→</span>
            </div>
          )}
        </div>
      )}

      {/* Wobbly hand-drawn border effect */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        preserveAspectRatio="none"
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="16"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="8 4"
          className="animate-dash"
        />
      </svg>

      {/* Corner doodles on hover */}
      {!isDisabled && isHovered && (
        <>
          <div className="absolute bottom-2 left-2 text-primary-foreground/50 text-sm animate-wiggle-slow">
            ✎
          </div>
          <div className="absolute bottom-2 right-2 text-primary-foreground/50 text-sm animate-wiggle-slow" style={{ animationDelay: '0.2s' }}>
            ♪
          </div>
        </>
      )}
    </>
  );

  const cardStyle = {
    aspectRatio: "285 / 107",
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: "transform 0.1s ease-out",
  };

  if (isDisabled) {
    return (
      <div
        ref={cardRef}
        className={cn(
          "group relative block overflow-hidden rounded-2xl cursor-default",
          className
        )}
        style={cardStyle}
        aria-label={`${title} - Coming soon`}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden rounded-2xl transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div ref={cardRef} className="absolute inset-0">
        {cardContent}
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        @keyframes sparkle-fade {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        .animate-sparkle-fade {
          animation: sparkle-fade 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 0.6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-wiggle-slow {
          animation: wiggle-slow 0.5s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}
