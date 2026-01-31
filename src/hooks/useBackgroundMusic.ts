import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CACHED_MUSIC_PATH = "stranger-music.mp3";
const BUCKET_NAME = "audio-assets";

export function useBackgroundMusic(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cachedUrlRef = useRef<string | null>(null);

  const fetchMusic = useCallback(async () => {
    // Return cached URL if we have it
    if (cachedUrlRef.current) {
      return cachedUrlRef.current;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      // First, try to get the pre-cached music from storage
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(CACHED_MUSIC_PATH);

      // Check if the file exists by making a HEAD request
      const checkResponse = await fetch(urlData.publicUrl, { method: "HEAD" });
      
      if (checkResponse.ok) {
        console.log("Using pre-cached Stranger Things music");
        cachedUrlRef.current = urlData.publicUrl;
        return urlData.publicUrl;
      }

      // If not cached, generate it on-the-fly (fallback)
      console.log("Music not cached, generating...");
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
      cachedUrlRef.current = audioUrl;
      
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
      setIsPlaying(true);
      return;
    }

    const audioUrl = await fetchMusic();
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;

    // Fade in
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
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
      setIsPlaying(false);
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
        setIsPlaying(false);
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
        setIsPlaying(false);
      }
    };
  }, [enabled, startMusic, stopMusic]);

  return { isLoading, hasError, isPlaying };
}
