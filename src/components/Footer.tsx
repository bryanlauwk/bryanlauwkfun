import { useState, useEffect } from "react";
import { Github, Twitter, Mail, Coffee, Zap, Heart, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/bryanlauwk",
    icon: Twitter,
    hoverClass: "hover:text-[#1DA1F2] hover:scale-125 hover:rotate-12",
    emoji: "🐦",
  },
  {
    name: "GitHub",
    href: "https://github.com/bryanlauwk",
    icon: Github,
    hoverClass: "hover:text-foreground hover:scale-125 hover:-rotate-12",
    emoji: "🐙",
  },
  {
    name: "Email",
    href: "mailto:hello@bryanlauwk.fun",
    icon: Mail,
    hoverClass: "hover:text-primary hover:scale-125 hover:rotate-6",
    emoji: "💌",
  },
];

const footerQuotes = [
  "Made with curiosity and coffee",
  "Made with questionable judgment and caffeine",
  "Made with existential dread and sugar",
  "Made with deadlines and denial",
  "Made with love and lots of bugs",
  "Made with ctrl+z and hope",
  "Made with stack overflow and prayers",
];

const floatingEmojis = ["✨", "🌟", "💫", "⭐", "🎮", "🚀", "🎨", "💡"];

export function Footer() {
  const [quote, setQuote] = useState(footerQuotes[0]);
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [isOvercaffeinated, setIsOvercaffeinated] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isYearAnimating, setIsYearAnimating] = useState(false);
  const [floatingItems, setFloatingItems] = useState<Array<{ id: number; emoji: string; x: number }>>([]);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setQuote(footerQuotes[Math.floor(Math.random() * footerQuotes.length)]);
  }, []);

  useEffect(() => {
    if (coffeeClicks >= 3) {
      setIsOvercaffeinated(true);
      setCoffeeClicks(0);
      
      // Spawn floating emojis
      const newItems = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
        x: 10 + Math.random() * 80,
      }));
      setFloatingItems(newItems);
      
      // Reset after 2 seconds
      const timer = setTimeout(() => {
        setIsOvercaffeinated(false);
        setFloatingItems([]);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [coffeeClicks]);

  const handleCoffeeClick = () => {
    setCoffeeClicks((prev) => prev + 1);
  };

  const handleYearClick = () => {
    setIsYearAnimating(true);
    
    // Cycle through random years for fun
    let count = 0;
    const interval = setInterval(() => {
      setYear(Math.floor(Math.random() * 100) + 2000);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setYear(new Date().getFullYear());
        setIsYearAnimating(false);
      }
    }, 100);
  };

  return (
    <footer className={cn(
      "border-t border-border bg-background py-12 transition-all duration-300 relative overflow-hidden",
      isOvercaffeinated && "animate-shake"
    )}>
      {/* Floating emojis on overcaffeinated */}
      {floatingItems.map((item) => (
        <span
          key={item.id}
          className="absolute text-2xl animate-float-up pointer-events-none"
          style={{ left: `${item.x}%`, bottom: '0' }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Decorative doodles */}
      <div className="absolute left-4 top-4 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path 
            d="M10 30 Q30 10, 50 30 Q30 50, 10 30" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        </svg>
      </div>
      <div className="absolute right-4 bottom-4 opacity-10">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="25" cy="25" r="10" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center gap-6">
          
          {/* Decorative sparkles */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-8 opacity-40">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" style={{ animationDelay: '0s' }} />
            <Star className="h-3 w-3 text-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Sparkles className="h-4 w-4 text-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>

          {/* Quote with enhanced styling */}
          <p className="max-w-md text-center text-muted-foreground flex items-center justify-center gap-1 flex-wrap relative">
            <span className="text-primary/30 mr-1">~</span>
            {quote.split(" ").slice(0, -1).join(" ")}{" "}
            <button
              onClick={handleCoffeeClick}
              className={cn(
                "inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-all cursor-pointer group",
                isOvercaffeinated && "text-primary animate-bounce"
              )}
            >
              <Coffee 
                className={cn(
                  "h-4 w-4 transition-transform group-hover:rotate-12",
                  coffeeClicks > 0 && "animate-wiggle-coffee"
                )} 
              />
              <span className="hidden sm:inline">{quote.split(" ").slice(-1)}</span>
            </button>
            <span className="text-primary/30 ml-1">~</span>
            {isOvercaffeinated && (
              <span className="text-primary font-bold animate-pulse ml-1 inline-flex items-center gap-1">
                <Zap className="h-3 w-3" /> OVERCAFFEINATED MODE <Zap className="h-3 w-3" />
              </span>
            )}
          </p>

          {/* Social Links with enhanced hover effects */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative rounded-full p-2 text-muted-foreground transition-all duration-300 group",
                  link.hoverClass,
                  isOvercaffeinated && "animate-bounce"
                )}
                style={isOvercaffeinated ? { animationDelay: `${Math.random() * 0.3}s` } : {}}
                aria-label={link.name}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <link.icon className="h-5 w-5 relative z-10" />
                
                {/* Emoji popup on hover */}
                {hoveredLink === link.name && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg animate-pop-in">
                    {link.emoji}
                  </span>
                )}
                
                {/* Hover ring */}
                <span className="absolute inset-0 rounded-full border-2 border-current scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-30 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Made with love divider */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <Heart className="h-3 w-3 text-primary/40 animate-pulse" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>

          {/* Copyright with playful year click */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="opacity-50">©</span>{" "}
            <button
              onClick={handleYearClick}
              className={cn(
                "hover:text-primary transition-colors cursor-pointer tabular-nums font-mono",
                isYearAnimating && "text-primary animate-pulse"
              )}
            >
              {year}
            </button>
            <span className="mx-1 opacity-30">•</span>
            <span className="hover:text-primary transition-colors">bryanlauwk.fun</span>
            <span className="ml-1 opacity-50 animate-bounce-slow">🎮</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        @keyframes wiggle-coffee {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes float-up {
          0% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-150px) rotate(20deg); 
            opacity: 0; 
          }
        }
        @keyframes pop-in {
          0% { transform: translateX(-50%) scale(0) rotate(-10deg); }
          50% { transform: translateX(-50%) scale(1.2) rotate(5deg); }
          100% { transform: translateX(-50%) scale(1) rotate(0deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        .animate-wiggle-coffee {
          animation: wiggle-coffee 0.3s ease-in-out;
        }
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
        .animate-pop-in {
          animation: pop-in 0.3s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
