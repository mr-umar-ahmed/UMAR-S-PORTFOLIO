"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(true); // Default to muted to comply with browser safety
  const buttonRef = useMagnetic(0.25);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set a very low, subtle ambient volume level
    audio.volume = 0.08;

    // Check if the user previously unmuted/muted
    const savedMuted = localStorage.getItem("audio-muted");
    const initialMuted = savedMuted === null ? true : savedMuted === "true";
    setIsMuted(initialMuted);
    audio.muted = initialMuted;

    // Start playback on first user gesture if not muted
    const startAudio = () => {
      if (audio && !audio.muted && audio.paused) {
        audio.play().catch((err) => {
          console.log("Autoplay gesture block handled:", err);
        });
      }
      // Remove event listeners once the user interacts
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("mousemove", startAudio);
    };

    if (!initialMuted) {
      window.addEventListener("click", startAudio);
      window.addEventListener("scroll", startAudio);
      window.addEventListener("mousemove", startAudio);
    }

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("mousemove", startAudio);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.muted) {
      audio.muted = false;
      setIsMuted(false);
      localStorage.setItem("audio-muted", "false");
      audio.play().catch((err) => {
        console.log("Audio play failed on click toggle:", err);
      });
    } else {
      audio.muted = true;
      setIsMuted(true);
      localStorage.setItem("audio-muted", "true");
      audio.pause();
    }
  };

  return (
    <>
      {/* Background loopable ambient audio */}
      <audio ref={audioRef} src="/audio/ambient-loop.mp3" loop />
      
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="fixed bottom-8 right-24 z-[998] w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-[#1A1A18] dark:text-[#F2F1ED] hover:text-accent dark:hover:text-accent-dark shadow-lg transition-transform cursor-none"
        data-cursor="hover"
        aria-label="Toggle Background Sound"
      >
        {isMuted ? (
          <VolumeX className="w-4.5 h-4.5 text-[#1A1A18] dark:text-[#F2F1ED]" />
        ) : (
          <Volume2 className="w-4.5 h-4.5 text-accent dark:text-accent-dark animate-pulse" />
        )}
      </button>
    </>
  );
}
