"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    role: "AI Software Engineering Intern",
    company: "NEXSUS CYBER SOLUTIONS PVT LTD",
    duration: "Apr – Sep 2026",
    description: "Worked on AI powered web applications using React.js, Node.js, and Python. Built and integrated LLM-based features into real world products.",
  },
  {
    role: "Python Programming Intern",
    company: "CodTech IT Solutions",
    duration: "Nov – Dec 2025",
    description: "Automated manual data handling processes, designing and introducing automated utility scripts that reduced processing cycles and data error rates by 30%.",
  },
  {
    role: "AI Intern",
    company: "Y-Hills Tech Community",
    duration: "May – June 2024",
    description: "Built and optimized machine learning data pipelines, focusing on raw data parsing pipelines, quality checks, and model training data validation checks.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile layout animations
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );

        const items = containerRef.current?.querySelectorAll(".timeline-item");
        if (items) {
          items.forEach((item) => {
            const dot = item.querySelector(".timeline-dot");
            const card = item.querySelector(".timeline-card");

            gsap.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );

            gsap.fromTo(
              card,
              { opacity: 0, x: 40 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }
      });

      // Desktop layout animations (horizontal timeline)
      mm.add("(min-width: 1024px)", () => {
        const track = containerRef.current?.querySelector(".horizontal-track") as HTMLElement;
        const hLine = containerRef.current?.querySelector(".horizontal-line") as HTMLElement;
        if (!track) return;

        const amountToScroll = track.scrollWidth - window.innerWidth + 128;

        const scrollTween = gsap.to(track, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          hLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              start: "top top",
              end: () => `+=${amountToScroll}`,
              invalidateOnRefresh: true,
            },
          }
        );

        const cards = track.querySelectorAll(".horizontal-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-8 md:px-16 bg-surface dark:bg-surface-dark border-t border-black/5 dark:border-white/5 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
        03/
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="w-full text-left mb-16 md:mb-24">
          <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-4">
            JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-[#1A1A18] dark:text-[#F2F1ED] select-text">
            PROFESSIONAL TIMELINE
          </h2>
        </div>

        {/* Mobile View: Vertical Timeline */}
        <div className="relative w-full max-w-4xl min-h-[500px] lg:hidden select-text">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-black/10 dark:bg-white/10 -translate-x-1/2 z-0" />
          
          <div
            ref={lineRef}
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-accent dark:bg-accent-dark -translate-x-1/2 z-0 origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative flex flex-col items-start w-full z-10 pl-10"
              >
                <div className="absolute left-4 top-1.5 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                  <div
                    className="timeline-dot w-3.5 h-3.5 rounded-full bg-accent dark:bg-accent-dark relative z-10 border border-background dark:border-background-dark"
                    style={{ boxShadow: "0 0 12px var(--color-accent)" }}
                  />
                  <div className="absolute w-full h-full rounded-full bg-accent/20 dark:bg-accent-dark/20 animate-ping z-0" />
                </div>

                <div className="timeline-card w-full bg-background/50 dark:bg-background-dark/30 glassmorphism p-6 rounded-[2px] hover:border-accent/20 dark:hover:border-accent-dark/20 transition-all duration-300 text-left">
                  <span className="text-[10px] md:text-xs font-semibold tracking-widest text-accent dark:text-accent-dark font-display uppercase block mb-2">
                    {item.duration}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A1A18] dark:text-[#F2F1ED] font-display leading-tight mb-1">
                    {item.role}
                  </h3>
                  <h4 className="text-sm md:text-base text-muted dark:text-muted-dark font-body font-medium mb-4">
                    {item.company}
                  </h4>
                  <p className="text-xs md:text-sm text-muted dark:text-muted-dark font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Horizontal scroll timeline */}
        <div className="hidden lg:block w-full relative">
          <div className="horizontal-track flex items-center gap-16 py-32 px-12 w-max relative">
            {/* Horizontal Line backdrop */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-black/10 dark:bg-white/10 z-0" />
            
            {/* Filled Horizontal Line on scroll */}
            <div className="horizontal-line absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent dark:bg-accent-dark z-0 origin-left scale-x-0" />

            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="horizontal-card relative flex flex-col items-center w-[380px] flex-shrink-0 z-10"
                >
                  {/* Central timeline connector dot */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                    <div
                      className="w-3.5 h-3.5 rounded-full bg-accent dark:bg-accent-dark relative z-10 border border-background dark:border-background-dark"
                      style={{ boxShadow: "0 0 12px var(--color-accent)" }}
                    />
                    <div className="absolute w-full h-full rounded-full bg-accent/20 dark:bg-accent-dark/20 animate-ping z-0" />
                  </div>

                  {/* Offset cards alternately top/bottom */}
                  <div
                    className={`timeline-card bg-background/50 dark:bg-background-dark/30 glassmorphism p-6 md:p-8 rounded-[2px] hover:border-accent/20 dark:hover:border-accent-dark/20 transition-all duration-300 text-left w-full ${
                      isEven ? "mb-44" : "mt-44"
                    }`}
                  >
                    <span className="text-[10px] md:text-xs font-semibold tracking-widest text-accent dark:text-accent-dark font-display uppercase block mb-2">
                      {item.duration}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#1A1A18] dark:text-[#F2F1ED] font-display leading-tight mb-1">
                      {item.role}
                    </h3>
                    <h4 className="text-xs md:text-sm text-muted dark:text-muted-dark font-body font-medium mb-4">
                      {item.company}
                    </h4>
                    <p className="text-xs md:text-sm text-[#555] dark:text-white/60 font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
