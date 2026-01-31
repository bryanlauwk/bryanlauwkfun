import { useCallback, useEffect, useRef } from "react";

// Stranger Things-inspired synth ambient music generator
export function useBackgroundMusic(enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    masterGain: GainNode;
    oscillators: OscillatorNode[];
    gains: GainNode[];
    lfo: OscillatorNode;
    lfoGain: GainNode;
  } | null>(null);
  const isPlayingRef = useRef(false);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const startMusic = useCallback(() => {
    if (isPlayingRef.current) return;
    
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    try {
      // Master gain for overall volume
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0, audioContext.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 3); // Fade in
      masterGain.connect(audioContext.destination);

      // LFO for subtle pulsing/breathing effect
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.1, audioContext.currentTime); // Very slow pulse
      lfoGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      lfo.connect(lfoGain);
      lfo.start();

      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      // Deep bass drone (C1 - 32.7 Hz)
      const bass = audioContext.createOscillator();
      const bassGain = audioContext.createGain();
      bass.type = "sine";
      bass.frequency.setValueAtTime(32.7, audioContext.currentTime);
      bassGain.gain.setValueAtTime(0.4, audioContext.currentTime);
      lfoGain.connect(bassGain.gain);
      bass.connect(bassGain);
      bassGain.connect(masterGain);
      bass.start();
      oscillators.push(bass);
      gains.push(bassGain);

      // Sub-bass layer (C0 - 16.35 Hz) - felt more than heard
      const subBass = audioContext.createOscillator();
      const subBassGain = audioContext.createGain();
      subBass.type = "sine";
      subBass.frequency.setValueAtTime(16.35, audioContext.currentTime);
      subBassGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      subBass.connect(subBassGain);
      subBassGain.connect(masterGain);
      subBass.start();
      oscillators.push(subBass);
      gains.push(subBassGain);

      // Eerie pad - minor chord tones with detuning
      const padFrequencies = [130.81, 155.56, 196.0, 233.08]; // Cm7 chord
      padFrequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 2, audioContext.currentTime); // Slight detune
        
        // Slow frequency drift for unsettling effect
        osc.frequency.linearRampToValueAtTime(
          freq + (Math.random() - 0.5) * 5,
          audioContext.currentTime + 20
        );
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400 + i * 50, audioContext.currentTime);
        filter.Q.setValueAtTime(2, audioContext.currentTime);
        
        oscGain.gain.setValueAtTime(0.06, audioContext.currentTime);
        
        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(audioContext.currentTime + i * 0.5); // Staggered start
        
        oscillators.push(osc);
        gains.push(oscGain);
      });

      // High ethereal tone - like distant transmission
      const ethereal = audioContext.createOscillator();
      const etherealGain = audioContext.createGain();
      const etherealFilter = audioContext.createBiquadFilter();
      ethereal.type = "sine";
      ethereal.frequency.setValueAtTime(1046.5, audioContext.currentTime); // High C
      etherealFilter.type = "bandpass";
      etherealFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
      etherealFilter.Q.setValueAtTime(10, audioContext.currentTime);
      etherealGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      
      // Tremolo effect
      const tremolo = audioContext.createOscillator();
      const tremoloGain = audioContext.createGain();
      tremolo.type = "sine";
      tremolo.frequency.setValueAtTime(4, audioContext.currentTime);
      tremoloGain.gain.setValueAtTime(0.015, audioContext.currentTime);
      tremolo.connect(tremoloGain);
      tremoloGain.connect(etherealGain.gain);
      tremolo.start();
      
      ethereal.connect(etherealFilter);
      etherealFilter.connect(etherealGain);
      etherealGain.connect(masterGain);
      ethereal.start();
      oscillators.push(ethereal);
      oscillators.push(tremolo);
      gains.push(etherealGain);

      nodesRef.current = {
        masterGain,
        oscillators,
        gains,
        lfo,
        lfoGain,
      };
      isPlayingRef.current = true;
    } catch (e) {
      console.warn("Background music failed to start:", e);
    }
  }, [getAudioContext]);

  const stopMusic = useCallback(() => {
    if (!nodesRef.current || !isPlayingRef.current) return;
    
    const audioContext = getAudioContext();
    if (!audioContext) return;

    const { masterGain, oscillators, lfo } = nodesRef.current;
    
    // Fade out
    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
    
    // Stop all oscillators after fade
    setTimeout(() => {
      oscillators.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      try { lfo.stop(); } catch {}
      nodesRef.current = null;
      isPlayingRef.current = false;
    }, 1100);
  }, [getAudioContext]);

  useEffect(() => {
    if (enabled) {
      startMusic();
    } else {
      stopMusic();
    }

    return () => {
      stopMusic();
    };
  }, [enabled, startMusic, stopMusic]);

  return { isPlaying: isPlayingRef.current };
}
