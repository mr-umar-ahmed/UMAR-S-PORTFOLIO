"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, label: "Shipped Products", suffix: "+" },
  { value: 3, label: "Hackathon Awards", suffix: "" },
  { value: 2, label: "Professional Internships", suffix: "" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image Reveal clip-path swipe
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtle zoom-in animation of the image inside
      gsap.fromTo(
        imageRef.current,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Philosophy text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Stats counting up stagger animation
      const statBlocks = statsRef.current?.querySelectorAll(".stat-block");
      if (statBlocks) {
        gsap.fromTo(
          statBlocks,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        statBlocks.forEach((block) => {
          const valEl = block.querySelector(".stat-value") as HTMLElement;
          if (valEl) {
            const targetVal = parseInt(valEl.getAttribute("data-target") || "0", 10);
            const obj = { value: 0 };
            gsap.to(obj, {
              value: targetVal,
              duration: 2.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              onUpdate: () => {
                valEl.innerText = Math.floor(obj.value).toString();
              },
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-8 md:px-16 flex flex-col justify-center border-t border-white/5 bg-[#0b0c0e]"
    >
      {/* Subdued numbering indicator */}
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-[#1e2024]/10 select-none pointer-events-none">
        01/
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left Column: Stats & Image */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          {/* Portrait container with clip-path reveal */}
          <div
            ref={imageWrapperRef}
            data-cursor="drag"
            data-cursor-text="ABOUT"
            className="relative w-full aspect-[4/5] bg-surface overflow-hidden rounded-[2px]"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            <Image
              ref={imageRef}
              src="/images/umar-portrait.png"
              alt="Umar Ahmed profile shot"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>

          {/* Counters Grid */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6 md:gap-8 select-text">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-block flex flex-col">
                <span className="text-[10vw] lg:text-[4vw] font-display font-bold leading-none text-accent tracking-tighter tabular-nums">
                  <span className="stat-value" data-target={stat.value}>
                    0
                  </span>
                  {stat.suffix}
                </span>
                <span className="text-xs md:text-[13px] text-muted font-body mt-2 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Rich Text Philosophy Block */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-xs tracking-[0.25em] text-accent font-display font-semibold uppercase mb-6">
            ABOUT & PHILOSOPHY
          </span>
          <h2 className="text-[7.5vw] lg:text-[4.5vw] font-display font-bold tracking-tighter leading-[0.95] text-white mb-8 select-text">
            BRIDGING DIGITAL LOGIC AND SEAMLESS EXPERIENCES.
          </h2>

          <div className="space-y-6 text-sm md:text-base font-light text-muted leading-relaxed select-text font-body">
            <p className="border-l-[3px] border-accent pl-6 py-1 text-white font-medium text-lg md:text-xl">
              &ldquo;I write code that bridges the gap between design systems and complex backends. My work focuses on performance, local-first architectures, and Web3 security.&rdquo;
            </p>
            <p>
              As a Computer Science student at the National Institute of Technology (NIT), full-stack developer, and the founder of <span className="text-white font-medium">MedX Laboratory</span>, I build production-ready digital products. I combine solid engineering concepts with slick typography and fluid visual structures to create experiences that stand out.
            </p>
            <p>
              Whether structuring localized AI browsers, architecting decentralized secure networks for vehicles, or building role-based education paths, I prioritize rapid delivery, robust architecture, and high aesthetic standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
