"use client";

import React, { useRef, useState } from "react";
import { Award, Trophy, Star } from "lucide-react";

interface CardProps {
  title: string;
  subtitle: string;
  detail: string;
  icon: any;
}

function TiltCard({ title, subtitle, detail, icon: Icon }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    const maxTilt = 8;
    const rX = -(mouseY / (height / 2)) * maxTilt;
    const rY = (mouseX / (width / 2)) * maxTilt;
    
    setRotateX(rX);
    setRotateY(rY);

    const sX = ((e.clientX - rect.left) / width) * 100;
    const sY = ((e.clientY - rect.top) / height) * 100;
    setShineX(sX);
    setShineY(sY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShineX(50);
    setShineY(50);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] bg-surface/30 glassmorphism p-8 flex flex-col justify-between rounded-[2px] transition-all duration-300 ease-out select-text group"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glint Shine Layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[2px]"
        style={{
          background: `radial-gradient(circle 120px at ${shineX}% ${shineY}%, rgba(128, 128, 128, 0.08), transparent 70%)`,
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-start">
        <div className="w-9 h-9 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent dark:text-accent-dark" />
        </div>
        <span className="text-[9px] font-mono tracking-widest text-muted/50 dark:text-muted-dark/50 uppercase">
          HONOR
        </span>
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="space-y-2 mt-auto">
        <h4 className="text-[10px] font-semibold font-display tracking-widest text-accent dark:text-accent-dark uppercase">
          {subtitle}
        </h4>
        <h3 className="text-xl md:text-[22px] font-bold font-display tracking-tight text-[#1A1A18] dark:text-[#F2F1ED] leading-tight">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted dark:text-muted-dark leading-relaxed pt-1.5">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-36 px-8 md:px-16 bg-background dark:bg-background-dark border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
        05/
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full text-left mb-16 md:mb-24 relative z-10">
          <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-4">
            COMPETITIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-[#1A1A18] dark:text-[#F2F1ED] select-text">
            ACHIEVEMENTS & HACKATHONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <TiltCard
            title="AIXPO 2026 (IIIT Raichur)"
            subtitle="Most Impactful Project"
            detail="Awarded for 'Save Era' project which leveraged AI routing logic to automate carbon emission predictions."
            icon={Award}
          />
          <TiltCard
            title="Ideathon 2025"
            subtitle="1st Prize Winner"
            detail="Won first prize with 'ShopSync AI' at the OpenAI Buildathon Qualifier, creating smart retail sync pipelines."
            icon={Trophy}
          />
          <TiltCard
            title="Smart India Hackathon 2025"
            subtitle="National Finalist"
            detail="Recognized at the national level for designing role-based resource routing systems for local health clinics."
            icon={Star}
          />
        </div>
      </div>
    </section>
  );
}
