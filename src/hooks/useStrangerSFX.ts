import { useCallback, useEffect, useState, useRef } from "react";

const SOUND_ENABLED_KEY = "stranger-sfx-enabled";

export function useStrangerSFX() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);
  
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(SOUND_ENABLED_KEY);
    return stored === "true"; // Default to off for ambient sounds
  });

  useEffect(() => {
    localStorage.setItem(SOUND_ENABLED_KEY, String(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  // Start ambient hum
  const startAmbientHum = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = getAudioContext();
    if (!audioContext || ambientNodeRef.current) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      // Deep bass hum
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // Low A
      
      // Very quiet ambient
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 2);
      
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      
      ambientNodeRef.current = { oscillator, gain };
    } catch (e) {
      console.warn("Ambient audio failed:", e);
    }
  }, [soundEnabled, getAudioContext]);

  // Stop ambient hum
  const stopAmbientHum = useCallback(() => {
    if (ambientNodeRef.current) {
      const { oscillator, gain } = ambientNodeRef.current;
      const audioContext = getAudioContext();
      if (audioContext) {
        gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        setTimeout(() => {
          oscillator.stop();
          ambientNodeRef.current = null;
        }, 500);
      }
    }
  }, [getAudioContext]);

  // Electrical crackle on hover
  const playElectricalCrackle = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      // Create white noise for crackle
      const bufferSize = audioContext.sampleRate * 0.15;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        // Sparse crackle pattern
        data[i] = Math.random() > 0.97 ? (Math.random() * 2 - 1) * 0.8 : 0;
      }

      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for electrical sound
      const filter = audioContext.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3000, audioContext.currentTime);
      filter.Q.setValueAtTime(2, audioContext.currentTime);

      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      noise.start();
      noise.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      console.warn("Crackle audio failed:", e);
    }
  }, [soundEnabled, getAudioContext]);

  // Transmission blip for typewriter
  const playTransmissionBlip = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1200 + Math.random() * 400, audioContext.currentTime);
      
      gain.gain.setValueAtTime(0.02, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.03);
    } catch (e) {
      // Silent fail
    }
  }, [soundEnabled, getAudioContext]);

  // Power surge sound
  const playPowerSurge = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.2);
      
      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent fail
    }
  }, [soundEnabled, getAudioContext]);

  // Manage ambient based on sound enabled state
  useEffect(() => {
    if (soundEnabled) {
      startAmbientHum();
    } else {
      stopAmbientHum();
    }
    return () => {
      stopAmbientHum();
    };
  }, [soundEnabled, startAmbientHum, stopAmbientHum]);

  return {
    soundEnabled,
    toggleSound,
    playElectricalCrackle,
    playTransmissionBlip,
    playPowerSurge,
  };
}
