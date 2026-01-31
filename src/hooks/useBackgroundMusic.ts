import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_CACHE_KEY = "stranger-music-blob";

export function useBackgroundMusic(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const blobUrlRef = useRef<string | null>(null);

  const fetchMusic = useCallback(async () => {
    // Check if we already have a cached blob URL
    if (blobUrlRef.current) {
      return blobUrlRef.current;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-stranger-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Music generation failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      blobUrlRef.current = audioUrl;
      
      console.log("Stranger Things music loaded successfully");
      return audioUrl;
    } catch (error) {
      console.error("Failed to fetch music:", error);
      setHasError(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startMusic = useCallback(async () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.warn);
      return;
    }

    const audioUrl = await fetchMusic();
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.15; // Keep it subtle as background

    // Fade in
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.01;
        if (vol >= 0.15) {
          audio.volume = 0.15;
          clearInterval(fadeIn);
        } else {
          audio.volume = vol;
        }
      }, 50);
    }).catch((e) => {
      console.warn("Audio autoplay blocked:", e);
    });

    audioRef.current = audio;
  }, [fetchMusic]);

  const stopMusic = useCallback(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // Fade out
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.01) {
        audio.volume = Math.max(0, audio.volume - 0.01);
      } else {
        audio.pause();
        audio.volume = 0;
        clearInterval(fadeOut);
      }
    }, 30);
  }, []);

  useEffect(() => {
    if (enabled) {
      startMusic();
    } else {
      stopMusic();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [enabled, startMusic, stopMusic]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  return { isLoading, hasError };
}
