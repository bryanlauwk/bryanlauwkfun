import { cn } from "@/lib/utils";

interface Decoration {
  emoji: string;
  position: string;
  animation: string;
  size?: string;
  delay?: string;
  hideOnMobile?: boolean;
}

const decorations: Decoration[] = [
  // Corners - spinning globe and CD
  { emoji: "🌐", position: "top-20 left-4", animation: "animate-spin-slow", size: "text-4xl" },
  { emoji: "💿", position: "top-24 right-8", animation: "animate-spin-slow", size: "text-3xl", delay: "animation-delay-500" },
  
  // Under construction
  { emoji: "🚧", position: "top-32 left-1/4", animation: "animate-blink", size: "text-2xl", hideOnMobile: true },
  { emoji: "👷", position: "bottom-40 right-1/4", animation: "animate-bounce-chaotic", size: "text-3xl", hideOnMobile: true },
  
  // Movie/Blockbuster theme
  { emoji: "🎬", position: "top-1/3 right-6", animation: "animate-wobble", size: "text-4xl" },
  { emoji: "🎥", position: "bottom-1/3 left-8", animation: "animate-bounce-chaotic", size: "text-3xl", hideOnMobile: true },
  { emoji: "🍿", position: "top-1/2 left-4", animation: "animate-bounce-chaotic", size: "text-3xl", delay: "animation-delay-300" },
  { emoji: "📼", position: "bottom-48 right-10", animation: "animate-wobble", size: "text-2xl", hideOnMobile: true },
  
  // Arcade/Gaming theme
  { emoji: "🕹️", position: "top-40 left-12", animation: "animate-wobble", size: "text-3xl", hideOnMobile: true },
  { emoji: "👾", position: "bottom-1/4 right-8", animation: "animate-bounce-chaotic", size: "text-4xl" },
  { emoji: "🎮", position: "top-2/3 right-12", animation: "animate-glitch", size: "text-3xl", hideOnMobile: true },
  
  // Music theme
  { emoji: "🎵", position: "top-1/4 right-1/3", animation: "animate-float", size: "text-2xl", hideOnMobile: true },
  { emoji: "📻", position: "bottom-32 left-1/3", animation: "animate-wobble", size: "text-3xl", hideOnMobile: true },
  { emoji: "🎸", position: "bottom-20 left-10", animation: "animate-bounce-chaotic", size: "text-3xl", delay: "animation-delay-700" },
  
  // Dancing hamster - the star of the show!
  { emoji: "🐹", position: "bottom-1/2 left-1/4", animation: "animate-dance", size: "text-5xl", hideOnMobile: true },
  
  // Extra flair
  { emoji: "⭐", position: "top-1/3 left-1/3", animation: "animate-star-spin", size: "text-2xl", hideOnMobile: true },
  { emoji: "✨", position: "bottom-1/3 right-1/3", animation: "animate-star-spin", size: "text-xl", delay: "animation-delay-500", hideOnMobile: true },
];

// Themed text badges
const themedBadges = [
  { text: "BE KIND REWIND", position: "top-16 left-1/2 -translate-x-1/2", theme: "blockbuster" },
  { text: "INSERT COIN", position: "bottom-24 left-8", theme: "arcade" },
  { text: "NOW PLAYING", position: "top-2/3 left-6", theme: "music" },
];

export function RetroDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Emoji decorations */}
      {decorations.map((dec, index) => (
        <span
          key={index}
          className={cn(
            "absolute",
            dec.position,
            dec.animation,
            dec.size || "text-2xl",
            dec.delay,
            dec.hideOnMobile && "hidden lg:block"
          )}
          style={{
            animationDelay: dec.delay ? `${parseInt(dec.delay.replace(/\D/g, "")) || 0}ms` : undefined,
          }}
        >
          {dec.emoji}
        </span>
      ))}
      
      {/* Themed text badges */}
      {themedBadges.map((badge, index) => (
        <div
          key={`badge-${index}`}
          className={cn(
            "absolute hidden lg:block font-pixel text-xs px-3 py-1 border-2 animate-blink",
            badge.position,
            badge.theme === "blockbuster" && "bg-primary text-primary-foreground border-foreground rotate-3",
            badge.theme === "arcade" && "bg-secondary text-secondary-foreground border-foreground -rotate-2",
            badge.theme === "music" && "bg-accent text-accent-foreground border-foreground rotate-1"
          )}
        >
          {badge.text}
        </div>
      ))}
      
      {/* Floating music notes that repeat */}
      <div className="absolute top-1/4 right-20 hidden xl:block">
        <span className="text-2xl animate-float-up opacity-70">🎵</span>
      </div>
      <div className="absolute top-1/3 right-24 hidden xl:block" style={{ animationDelay: "1s" }}>
        <span className="text-xl animate-float-up opacity-60">🎶</span>
      </div>
    </div>
  );
}
