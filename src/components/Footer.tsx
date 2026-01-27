import { useState, useEffect } from "react";
import { Github, Twitter, Mail } from "lucide-react";
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

  useEffect(() => {
    setQuote(footerQuotes[Math.floor(Math.random() * footerQuotes.length)]);
  }, []);

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          
          {/* Quote */}
          <p className="text-sm text-muted-foreground">
            {quote}
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
                  "rounded-full p-2 text-muted-foreground transition-colors duration-200",
                  "hover:text-foreground hover:bg-muted"
                )}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-border" />
            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <div className="h-px w-8 bg-border" />
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            <span className="opacity-60">©</span> {year} bryan.fun
          </p>
        </div>
      </div>
    </footer>
  );
}
