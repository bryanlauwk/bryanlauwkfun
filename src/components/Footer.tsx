import { Github, Twitter, Mail } from "lucide-react";
import { DoodleIcon } from "./DoodleIcon";

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

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* About */}
          <p className="max-w-md text-center text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
            A collection of games, experiments, and interactive stuff by Bryan.
            Made with curiosity and a lot of 
            <DoodleIcon type="coffee" size="md" className="text-muted-foreground mx-0.5" />
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} bryanlauwk.fun
          </p>
        </div>
      </div>
    </footer>
  );
}
