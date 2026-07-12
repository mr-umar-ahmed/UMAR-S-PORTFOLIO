"use client";

import React, { useRef, useState, useEffect } from "react";
import { Award, Trophy, Star, ShieldCheck, Zap, Medal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title: string;
  subtitle: string;
  detail: string;
  icon: any;
}

const achievementsData = [
  {
    title: "NXT Hackathon & NIIC",
    subtitle: "Top Position & Incubation",
    detail: "ShopIQ selected for Incubation Support under NIIC. Empowering the Next Generation of Local Commerce.",
    icon: Trophy,
  },
  {
    title: "Pixels 2K25",
    subtitle: "1st Prize Winner",
    detail: "Took home the 1st Prize Trophy. Built relentlessly and embraced the problem-solving chaos with the team.",
    icon: Award,
  },
  {
    title: "Pixel 2K25 Hackathon",
    subtitle: "2nd Place",
    detail: "Built a real-time Hospital Queue Management System using React, Node.js, and Socket.IO for web and mobile.",
    icon: Medal,
  },
  {
    title: "OpenAI x NxtWave",
    subtitle: "State-Level Qualifier",
    detail: "Back-to-back wins with ShopSync AI. Scaling a low-code automation system for retail merchants.",
    icon: Zap,
  },
  {
    title: "YUKTI Innovation",
    subtitle: "1st Position",
    detail: "Inter Institutional Start-up Competition winner for Best Start-ups Deposition at Navodaya Institute of Technology.",
    icon: Star,
  },
  {
    title: "Hackvyuha",
    subtitle: "National Finalist",
    detail: "National level hackathon finalist, competing among top minds to build innovative solutions.",
    icon: ShieldCheck,
  },
];

function TiltCard({ title, subtitle, detail, icon: Icon }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxTilt = 7;
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
      className="relative w-full h-full min-h-[220px] bg-surface/30 dark:bg-surface-dark/20 glassmorphism p-8 flex flex-col justify-between rounded-[4px] border border-black/5 dark:border-white/5 hover:border-accent/30 dark:hover:border-accent-dark/30 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out select-text group cursor-none"
      style={{
        transform: isTouchDevice ? "none" : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glint Shine Layer using CSS theme accent variables */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.1] dark:group-hover:opacity-[0.14] transition-opacity duration-300 pointer-events-none rounded-[2px]"
        style={{
          background: `radial-gradient(circle 140px at ${shineX}% ${shineY}%, var(--color-accent), transparent 75%)`,
        }}
      />

      <div style={{ transform: isTouchDevice ? "none" : "translateZ(30px)" }} className="flex justify-between items-start">
        <div className="w-9 h-9 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-300">
          <Icon className="w-4 h-4 text-accent dark:text-accent-dark" />
        </div>
        <span className="text-[9px] font-mono tracking-widest text-muted/50 dark:text-muted-dark/50 uppercase">
          HONOR
        </span>
      </div>

      <div style={{ transform: isTouchDevice ? "none" : "translateZ(40px)" }} className="space-y-2 mt-auto pt-8">
        <h4 className="text-[10px] font-semibold font-display tracking-widest text-accent dark:text-accent-dark uppercase">
          {subtitle}
        </h4>
        <h3 className="text-xl md:text-[22px] font-bold font-display tracking-tight text-[#1A1A18] dark:text-[#F2F1ED] leading-tight">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted dark:text-muted-dark leading-relaxed pt-1.5 font-body">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards Stagger Animation
      gsap.to(".achievement-card-wrapper", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={containerRef} className="relative py-24 md:py-36 px-8 md:px-16 bg-background dark:bg-background-dark border-t border-black/5 dark:border-white/5 transition-colors duration-500 overflow-hidden">
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
        05/
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div ref={headerRef} className="w-full text-left mb-16 md:mb-24 relative z-10 opacity-0">
          <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-4">
            COMPETITIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-[#1A1A18] dark:text-[#F2F1ED] select-text">
            ACHIEVEMENTS & HACKATHONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {achievementsData.map((achievement, index) => (
            <div key={index} className="achievement-card-wrapper opacity-0 translate-y-10">
              <TiltCard
                title={achievement.title}
                subtitle={achievement.subtitle}
                detail={achievement.detail}
                icon={achievement.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
