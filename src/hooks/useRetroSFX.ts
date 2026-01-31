import { useCallback, useEffect, useState, useRef } from "react";

// Simple retro sound effects using Web Audio API
// These are procedurally generated beeps and boops for authentic 90s vibes

// Storage key for sound preference
const SOUND_ENABLED_KEY = "retro-sfx-enabled";

export function useRetroSFX() {
  // Lazily initialize audio context to avoid issues during SSR/initial load
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(SOUND_ENABLED_KEY);
    return stored === null ? true : stored === "true";
  });

  // Persist preference
  useEffect(() => {
    localStorage.setItem(SOUND_ENABLED_KEY, String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  // Simple beep sound
  const playBeep = useCallback((frequency = 440, duration = 0.1, type: OscillatorType = "square") => {
    if (!soundEnabled) return;
    
    const audioContext = getAudioContext();
    if (!audioContext) return;

    // Resume audio context if suspended (browser autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Silently fail if audio can't be played
      console.warn("Audio playback failed:", e);
    }
  }, [soundEnabled, getAudioContext]);

  // Hover sound - quick high beep
  const playHover = useCallback(() => {
    playBeep(800, 0.05, "sine");
  }, [playBeep]);

  // Click sound - two quick beeps (like old button)
  const playClick = useCallback(() => {
    playBeep(600, 0.08, "square");
    setTimeout(() => playBeep(500, 0.06, "square"), 50);
  }, [playBeep]);

  // Drag start sound - ascending
  const playDragStart = useCallback(() => {
    playBeep(300, 0.1, "sawtooth");
    setTimeout(() => playBeep(400, 0.1, "sawtooth"), 50);
    setTimeout(() => playBeep(500, 0.1, "sawtooth"), 100);
  }, [playBeep]);

  // Drag end sound - descending
  const playDragEnd = useCallback(() => {
    playBeep(500, 0.1, "sawtooth");
    setTimeout(() => playBeep(400, 0.1, "sawtooth"), 50);
    setTimeout(() => playBeep(300, 0.15, "sawtooth"), 100);
  }, [playBeep]);

  // Success/celebration sound
  const playSuccess = useCallback(() => {
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => playBeep(freq, 0.15, "square"), i * 100);
    });
  }, [playBeep]);

  // Error/denied sound
  const playError = useCallback(() => {
    playBeep(200, 0.2, "sawtooth");
    setTimeout(() => playBeep(150, 0.3, "sawtooth"), 150);
  }, [playBeep]);

  return {
    soundEnabled,
    toggleSound,
    playHover,
    playClick,
    playDragStart,
    playDragEnd,
    playSuccess,
    playError,
  };
}
