import { useState, useEffect } from "react";
import { Github, Twitter, Mail } from "lucide-react";
import { useIntersection } from "@/hooks/useIntersection";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/bryanlauwk",
    icon: Twitter,
  },
  {
    name: "GitHub",
    href: "https://github.com/bryanlauwk",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:hello@bryanlauwk.fun",
    icon: Mail,
  },
];

const footerQuotes = [
  "Made with curiosity",
  "Built for fun",
  "Crafted with care",
  "Always experimenting",
];

export function Footer() {
  const [quote, setQuote] = useState(footerQuotes[0]);
  const year = new Date().getFullYear();
  const { ref, hasBeenInView } = useIntersection({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    setQuote(footerQuotes[Math.floor(Math.random() * footerQuotes.length)]);
  }, []);

  return (
    <footer ref={ref} className="border-t border-border bg-background py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          
          {/* Quote - animated entrance */}
          <p 
            className={cn(
              "text-base text-muted-foreground transition-all duration-700 ease-out",
              hasBeenInView 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
          >
            {quote}
          </p>

          {/* Social Links - staggered animation */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full p-3 text-muted-foreground transition-all duration-500 ease-out",
                  "hover:text-foreground hover:bg-muted hover:scale-110",
                  hasBeenInView 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: hasBeenInView ? `${(index + 1) * 100}ms` : "0ms",
                }}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Decorative Divider */}
          <div 
            className={cn(
              "flex items-center gap-4 transition-all duration-700 ease-out delay-300",
              hasBeenInView 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-90"
            )}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Copyright */}
          <p 
            className={cn(
              "text-sm text-muted-foreground transition-all duration-700 ease-out delay-500",
              hasBeenInView 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
          >
            <span className="opacity-60">©</span> {year} bryan.fun
          </p>
        </div>
      </div>
    </footer>
  );
}
