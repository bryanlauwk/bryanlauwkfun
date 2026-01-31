import { useTypewriter } from "@/hooks/useTypewriter";
import { useStrangerSFX } from "@/hooks/useStrangerSFX";

const MOTTO = "Good luck, have fun, don't die";

export function TypewriterMotto() {
  const { playTransmissionBlip, soundEnabled } = useStrangerSFX();
  
  const { displayedText, isComplete, isTyping } = useTypewriter({
    text: MOTTO,
    speed: 70,
    delay: 1500,
    onCharacter: () => {
      if (soundEnabled && Math.random() > 0.5) {
        playTransmissionBlip();
      }
    },
  });

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 border border-primary/30 rounded-sm bg-card/50 backdrop-blur-sm min-h-[52px]">
      <span className="w-2 h-2 rounded-full bg-primary animate-electrical-flicker" />
      
      <span className="font-mono text-sm md:text-base uppercase tracking-widest text-primary stranger-glow min-w-[280px] md:min-w-[340px]">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-electrical-flicker" />
        )}
        {isComplete && (
          <span className="inline-block w-2 h-4 bg-primary/50 ml-0.5 animate-pulse" />
        )}
      </span>
      
      <span 
        className="w-2 h-2 rounded-full bg-primary animate-electrical-flicker" 
        style={{ animationDelay: "0.5s" }} 
      />
    </div>
  );
}
