import { useState, useEffect } from "react";

export function useCyclingText(texts: string[], intervalMs: number = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const targetText = texts[currentIndex];
    
    if (isTyping) {
      if (displayText.length < targetText.length) {
        const timer = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, wait before erasing
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, intervalMs);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timer);
      } else {
        // Finished erasing, move to next text
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentIndex, texts, intervalMs]);

  return { displayText, isTyping };
}
