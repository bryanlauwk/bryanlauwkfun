import { useState, useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onActivate: () => void) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    setInputSequence((prev) => {
      const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
      
      // Check if the sequence matches
      if (
        newSequence.length === KONAMI_CODE.length &&
        newSequence.every((k, i) => k === KONAMI_CODE[i])
      ) {
        setTimeout(onActivate, 0);
        return [];
      }
      
      return newSequence;
    });
  }, [onActivate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return inputSequence;
}
