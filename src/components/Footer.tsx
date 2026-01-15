import { useState, useEffect } from "react";
import { Github, Twitter, Mail, Coffee, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/bryanlauwk",
    icon: Twitter,
    hoverClass: "hover:text-[#1DA1F2] hover:scale-125 hover:rotate-12",
  },
  {
    name: "GitHub",
    href: "https://github.com/bryanlauwk",
    icon: Github,
    hoverClass: "hover:text-foreground hover:scale-125 hover:-rotate-12",
  },
  {
    name: "Email",
    href: "mailto:hello@bryanlauwk.fun",
    icon: Mail,
    hoverClass: "hover:text-primary hover:scale-125 hover:rotate-6",
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

export function Footer() {
  const [quote, setQuote] = useState(footerQuotes[0]);
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [isOvercaffeinated, setIsOvercaffeinated] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isYearAnimating, setIsYearAnimating] = useState(false);

  useEffect(() => {
    setQuote(footerQuotes[Math.floor(Math.random() * footerQuotes.length)]);
  }, []);

  useEffect(() => {
    if (coffeeClicks >= 3) {
      setIsOvercaffeinated(true);
      setCoffeeClicks(0);
      
      // Reset after 2 seconds
      const timer = setTimeout(() => {
        setIsOvercaffeinated(false);
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
      "border-t border-border bg-background py-12 transition-all duration-300",
      isOvercaffeinated && "animate-shake"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Quote */}
          <p className="max-w-md text-center text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            {quote.split(" ").slice(0, -1).join(" ")}{" "}
            <button
              onClick={handleCoffeeClick}
              className={cn(
                "inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-all cursor-pointer",
                isOvercaffeinated && "text-primary animate-bounce"
              )}
            >
              <Coffee 
                className={cn(
                  "h-4 w-4 transition-transform",
                  coffeeClicks > 0 && "animate-wiggle-coffee"
                )} 
              />
              <span className="hidden sm:inline">{quote.split(" ").slice(-1)}</span>
            </button>
            {isOvercaffeinated && (
              <span className="text-primary font-bold animate-pulse ml-1 inline-flex items-center gap-1">
                <Zap className="h-3 w-3" /> OVERCAFFEINATED MODE <Zap className="h-3 w-3" />
              </span>
            )}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full p-2 text-muted-foreground transition-all duration-300",
                  link.hoverClass,
                  isOvercaffeinated && "animate-bounce"
                )}
                style={isOvercaffeinated ? { animationDelay: `${Math.random() * 0.3}s` } : {}}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            ©{" "}
            <button
              onClick={handleYearClick}
              className={cn(
                "hover:text-primary transition-colors cursor-pointer tabular-nums",
                isYearAnimating && "text-primary"
              )}
            >
              {year}
            </button>
            {" "}bryanlauwk.fun
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
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        .animate-wiggle-coffee {
          animation: wiggle-coffee 0.3s ease-in-out;
        }
      `}</style>
    </footer>
  );
}
