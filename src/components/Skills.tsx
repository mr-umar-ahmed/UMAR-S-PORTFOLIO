"use client";

import React from "react";

const track1 = ["JavaScript", "Python", "C", "React.js", "Tailwind CSS", "TypeScript", "Next.js", "HTML5", "CSS3"];
const track2 = ["Node.js", "Express.js", "MongoDB", "Firebase", "REST APIs", "Electron", "PostgreSQL", "GraphQL", "Docker"];
const track3 = ["Llama 3", "Prompt Engineering", "Machine Learning", "Web3", "Blockchain", "Solidity", "Git", "AI Integration", "Security"];

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
}

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const listItems = [...items, ...items, ...items, ...items];
  const animateClass = direction === "left" ? "animate-infinite-scroll-left" : "animate-infinite-scroll-right";

  return (
    <div className="w-full overflow-hidden py-2.5 flex select-none">
      <div className={`flex whitespace-nowrap gap-4 ${animateClass} hover:[animation-play-state:paused] transition-all`}>
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="px-6 py-3.5 bg-surface/30 glassmorphism rounded-full text-xs md:text-sm font-semibold tracking-wider font-display text-[#1A1A18] dark:text-white/90 hover:text-accent dark:hover:text-accent-dark hover:border-accent/40 dark:hover:border-accent-dark/40 transition-all duration-300 flex items-center gap-2"
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
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
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
        <div className="absolute top-0 left-0 h-full w-16 md:w-40 bg-gradient-to-r from-background dark:from-background-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-16 md:w-40 bg-gradient-to-l from-background dark:from-background-dark to-transparent z-20 pointer-events-none" />

        <MarqueeRow items={track1} direction="left" />
        <MarqueeRow items={track2} direction="right" />
        <MarqueeRow items={track3} direction="left" />
      </div>
    </section>
  );
}
