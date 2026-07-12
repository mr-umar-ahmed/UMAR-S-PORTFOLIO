"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const track1 = ["JavaScript", "Python", "C", "React.js", "Tailwind CSS", "TypeScript", "Next.js", "HTML5", "CSS3"];
const track2 = ["Node.js", "Express.js", "MongoDB", "Firebase", "REST APIs", "Electron", "PostgreSQL", "GraphQL", "Docker"];
const track3 = ["Llama 3", "Prompt Engineering", "Machine Learning", "Web3", "Blockchain", "Solidity", "Git", "AI Integration", "Security"];

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
}

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Double the array for seamless scrolling
  const listItems = [...items, ...items];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // Scroll settings
    const startX = direction === "left" ? 0 : -50;
    const endX = direction === "left" ? -50 : 0;

    const tween = gsap.fromTo(
      row,
      { xPercent: startX },
      {
        xPercent: endX,
        duration: 35,
        repeat: -1,
        ease: "none",
      }
    );

    // Scroll velocity responsive trigger (only on desktop to prevent mobile overhead)
    let trigger: ScrollTrigger | null = null;
    let decayInterval: NodeJS.Timeout | null = null;

    if (!isTouchDevice) {
      trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Scale timeScale with smooth capping (up to 6x speed)
          const speedMultiplier = 1 + Math.min(Math.abs(velocity) * 0.0025, 5);
          gsap.to(tween, {
            timeScale: speedMultiplier,
            duration: 0.35,
            overwrite: "auto",
          });
        },
      });

      // Decays speed back to normal (1) when scrolling stops
      decayInterval = setInterval(() => {
        if (!ScrollTrigger.isScrolling()) {
          gsap.to(tween, {
            timeScale: 1,
            duration: 0.6,
            overwrite: "auto",
          });
        }
      }, 150);
    }

    return () => {
      tween.kill();
      if (trigger) trigger.kill();
      if (decayInterval) clearInterval(decayInterval);
    };
  }, [direction, isTouchDevice]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="w-full overflow-hidden py-3 flex select-none relative cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight Backglow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none w-64 h-64 rounded-full bg-accent/8 dark:bg-accent-dark/8 blur-3xl z-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      <div
        ref={rowRef}
        className="flex whitespace-nowrap gap-4 z-10 relative"
      >
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="px-6 py-3.5 bg-surface/30 dark:bg-surface-dark/20 glassmorphism rounded-full text-xs md:text-sm font-semibold tracking-wider font-display text-[#1A1A18] dark:text-white/90 hover:text-accent dark:hover:text-accent-dark hover:border-accent/40 dark:hover:border-accent-dark/40 transition-all duration-300 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark opacity-60" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 bg-background dark:bg-background-dark overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none z-0">
        02/
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-12 relative z-10">
        <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-4">
          TECHNICAL STACK
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-[#1A1A18] dark:text-[#F2F1ED] select-text">
          LANGUAGES & POWERED TOOLS
        </h2>
      </div>

      <div className="w-full flex flex-col gap-2 relative z-10 py-6">
        {/* Soft edge blur overlays */}
        <div className="absolute top-0 left-0 h-full w-16 md:w-40 bg-gradient-to-r from-background dark:from-background-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 md:w-40 bg-gradient-to-l from-background dark:from-background-dark to-transparent z-20 pointer-events-none" />

        <MarqueeRow items={track1} direction="left" />
        <MarqueeRow items={track2} direction="right" />
        <MarqueeRow items={track3} direction="left" />
      </div>
    </section>
  );
}
