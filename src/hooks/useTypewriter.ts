import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onCharacter?: () => void;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 80,
  delay = 1000,
  onCharacter,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const reset = useCallback(() => {
    setDisplayedText("");
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    reset();
    
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, reset]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
        onCharacter?.();
      }, speed + Math.random() * 40); // Slight randomness for organic feel

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      setIsTyping(false);
      onComplete?.();
    }
  }, [displayedText, text, speed, isTyping, onCharacter, onComplete]);

  return {
    displayedText,
    isComplete,
    isTyping,
    reset,
  };
}
