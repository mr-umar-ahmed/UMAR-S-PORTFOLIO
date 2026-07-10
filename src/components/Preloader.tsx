"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const words = ["INVENT", "DESIGN", "ENGINEER", "DEPLOY"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoadedBefore = sessionStorage.getItem("portfolio-loaded");
      if (hasLoadedBefore === "true") {
        setIsLoaded(true);
        onComplete();
        return;
      }
    }

    document.body.style.overflow = "hidden";

    let start = 0;
    const end = 100;
    const duration = 2.2; // seconds
    const intervalTime = (duration * 1000) / end;

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      
      const wordStep = Math.floor(end / words.length);
      const currentWordIdx = Math.min(
        Math.floor(start / wordStep),
        words.length - 1
      );
      setWordIndex(currentWordIdx);

      if (start >= end) {
        clearInterval(counter);
        
        setTimeout(() => {
          const preloaderEl = document.getElementById("preloader-container");
          if (preloaderEl) {
            gsap.to(preloaderEl, {
              clipPath: "inset(0 0 100% 0)",
              duration: 1.2,
              ease: "power4.inOut",
              onComplete: () => {
                sessionStorage.setItem("portfolio-loaded", "true");
                document.body.style.overflow = "";
                setIsLoaded(true);
                onComplete();
              }
            });
          } else {
            sessionStorage.setItem("portfolio-loaded", "true");
            document.body.style.overflow = "";
            setIsLoaded(true);
            onComplete();
          }
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(counter);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isLoaded) return null;

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 bg-background z-[99999] flex flex-col justify-between p-12 select-none"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-muted/50 font-semibold font-display">
        <span>PORTFOLIO / UMAR AHMED</span>
        <span>NIT CSE / CLASS OF 2027</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-12 overflow-hidden mb-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[wordIndex]}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="block text-xl md:text-2xl font-display font-semibold text-accent tracking-[0.25em]"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <span className="text-[14vw] md:text-[9vw] font-display font-extrabold tracking-tighter leading-none select-none text-white tabular-nums">
          {count.toString().padStart(2, "0")}%
        </span>
      </div>

      <div className="w-full">
        <div className="w-full h-[1px] bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] tracking-[0.2em] text-muted/40 mt-4 uppercase">
          <span>LOADING SYSTEM ASSETS</span>
          <span>EST. TIME 2.2S</span>
        </div>
      </div>
    </div>
  );
}
