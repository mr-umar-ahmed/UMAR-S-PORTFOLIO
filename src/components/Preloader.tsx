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
          const matrixMain = document.getElementById("burn-matrix-main");
          const matrixEdge = document.getElementById("burn-matrix-edge");

          if (preloaderEl && matrixMain && matrixEdge) {
            // Apply the SVG burn-dissolve filter to the container
            preloaderEl.style.filter = "url(#burn-dissolve)";

            const obj = { progress: 0 };
            gsap.to(obj, {
              progress: 1,
              duration: 1.5,
              ease: "power2.inOut",
              onUpdate: () => {
                const mainOffset = -18 * obj.progress;
                // Edge glowing offset is slightly ahead (wider) but decays to -18 at the end
                const edgeOffset = 1.3 * (1 - obj.progress) - 18 * obj.progress;
                
                matrixMain.setAttribute(
                  "values",
                  `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 ${mainOffset}`
                );
                matrixEdge.setAttribute(
                  "values",
                  `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 15 ${edgeOffset}`
                );
              },
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
        }, 350);
      }
    }, intervalTime);

    return () => {
      clearInterval(counter);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isLoaded) return null;

  return (
    <>
      <div
        id="preloader-container"
        className="fixed inset-0 bg-[#0D0C0F] z-[99999] flex flex-col justify-between p-8 md:p-12 select-none overflow-hidden"
      >
        {/* Background Interactive Mesh Glow & Grid Lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] grid-lines" />
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(198, 255, 58, 0.15), transparent 70%)"
          }}
        />

        {/* Header Metadata */}
        <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-[#8F8E89]/60 font-semibold font-display relative z-10">
          <span>PORTFOLIO / UMAR AHMED</span>
          <span>NIT CSE / CLASS OF 2027</span>
        </div>

        {/* Center Word & Count display */}
        <div className="flex flex-col items-center relative z-10">
          <div className="h-12 overflow-hidden mb-2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="block text-xl md:text-2xl font-display font-bold text-[#C6FF3A] tracking-[0.25em]"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <span className="text-[16vw] md:text-[10vw] font-display font-black tracking-tighter leading-none select-none text-[#F2F1ED] tabular-nums">
            {count.toString().padStart(2, "0")}%
          </span>
        </div>

        {/* Progress Bar & Footer */}
        <div className="w-full relative z-10">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#C6FF3A]"
              style={{ width: `${count}%` }}
            />
            {/* Subtle pulse light moving across progress */}
            <div 
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
              style={{ left: `${count - 15}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] tracking-[0.2em] text-[#8F8E89]/40 mt-4 uppercase">
            <span>LOADING SYSTEM ASSETS</span>
            <span>EST. TIME 2.2S</span>
          </div>
        </div>
      </div>

      {/* SVG Burn Dissolve Filter definition injected to the DOM */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="burn-dissolve" x="-10%" y="-10%" width="120%" height="120%">
            {/* 1. Generate fractal noise */}
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" result="noise" />
            
            {/* 2. Main Erode Mask */}
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 15 0" 
              in="noise" 
              result="mainMask" 
              id="burn-matrix-main"
            />
            
            {/* 3. Glowing Edge Mask (slightly wider offset) */}
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 15 1.3" 
              in="noise" 
              result="edgeMask" 
              id="burn-matrix-edge"
            />
            
            {/* 4. Color edge mask with your theme's acid green accent color (#C6FF3A) */}
            <feFlood floodColor="#C6FF3A" floodOpacity="1" result="edgeColor" />
            <feComposite operator="in" in="edgeColor" in2="edgeMask" result="coloredEdge" />
            
            {/* 5. Composite main container Graphic with main erosion mask */}
            <feComposite operator="in" in="SourceGraphic" in2="mainMask" result="erodedGraphic" />
            
            {/* 6. Merge the colored glowing edge outline and the eroded main graphic */}
            <feMerge>
              <feMergeNode in="coloredEdge" />
              <feMergeNode in="erodedGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </>
  );
}
