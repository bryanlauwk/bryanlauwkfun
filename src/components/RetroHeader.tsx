import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Star, Zap, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useVisitorCounter } from "@/hooks/useVisitorCounter";
import { useSFX } from "@/contexts/SFXContext";

const marqueeMessages = [
  "~*~ Welcome to my corner of the internet! ~*~",
  "🎬 BE KIND, PLEASE REWIND 🎬",
  ">>> Projects! Games! Experiments! <<<",
  "🕹️ INSERT COIN TO CONTINUE 🕹️",
  "** Always under construction **",
  "🎵 NOW THAT'S WHAT I CALL A WEBSITE 🎵",
  "!!! Click and drag the cards around !!!",
  "📼 BLOCKBUSTER APPROVED 📼",
  "^^^ Made with love and questionable decisions ^^^",
  "🎮 GAME OVER? NEVER! 🎮",
];

export function RetroHeader() {
  const { count, isLoading } = useVisitorCounter();
  const { soundEnabled, toggleSound, playClick } = useSFX();
  const [currentMessage, setCurrentMessage] = useState(0);

  // Cycle through marquee messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % marqueeMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative">
      {/* Construction tape top */}
      <div className="h-4 construction-tape" />

      {/* Main header */}
      <div className="bg-card border-b-4 border-border py-4 px-4 md:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Star className="w-10 h-10 text-accent animate-spin-slow" />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            </div>
            <div>
              <h1 className="font-pixel text-2xl md:text-3xl text-foreground animate-rainbow">
                Bryan's Web Zone
              </h1>
              <p className="font-fun text-sm text-muted-foreground">
                est. 2024 • best viewed at 800x600
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Sound toggle */}
            <button
              onClick={() => {
                playClick();
                toggleSound();
              }}
              className="p-2 bg-muted border-2 border-border button-bevel hover:animate-wobble"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-foreground" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Visitor counter */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-fun text-sm text-muted-foreground">Visitors:</span>
              <div className="visitor-counter">
                {isLoading ? "------" : (count ?? 0).toString().padStart(6, "0")}
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* Marquee */}
      <div className="bg-primary py-2 overflow-hidden border-y-2 border-foreground">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
          <Sparkles className="w-5 h-5 text-primary-foreground inline" />
          <span className="font-pixel text-sm text-primary-foreground">
            {marqueeMessages[currentMessage]}
          </span>
          <Sparkles className="w-5 h-5 text-primary-foreground inline" />
          <span className="font-pixel text-sm text-primary-foreground">
            {marqueeMessages[currentMessage]}
          </span>
          <Sparkles className="w-5 h-5 text-primary-foreground inline" />
          <span className="font-pixel text-sm text-primary-foreground">
            {marqueeMessages[currentMessage]}
          </span>
        </div>
      </div>
    </header>
  );
}
