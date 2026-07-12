"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Volumetric blob references
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  const exploreBtnRef = useMagnetic(0.25);
  const navItem1 = useMagnetic(0.25);
  const navItem2 = useMagnetic(0.25);
  const navItem3 = useMagnetic(0.25);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch capability to safely optimize mobile interactions
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Smooth pointer/parallax tracking for desktop view only
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      // Convert to normalized coordinates (-0.5 to 0.5)
      const x = (e.clientX / clientWidth) - 0.5;
      const y = (e.clientY / clientHeight) - 0.5;

      // Animate blobs with subtle spring-like offsets for depth
      gsap.to(blob1Ref.current, {
        x: x * 60,
        y: y * 60,
        duration: 2.2,
        ease: "power2.out",
      });

      gsap.to(blob2Ref.current, {
        x: -x * 80,
        y: -y * 80,
        duration: 2.8,
        ease: "power2.out",
      });

      gsap.to(blob3Ref.current, {
        x: x * 40,
        y: -y * 40,
        duration: 3.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  // Organic drifting & scaling loops
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, {
        scale: 1.12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        scale: 0.88,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob3Ref.current, {
        scale: 1.15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  // Section Entrance Reveals
  useEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const heading = titleRef.current;
      if (heading) {
        const words = heading.innerText.split(" ");
        heading.innerHTML = words
          .map((w) => `<span class="inline-block overflow-hidden"><span class="word inline-block translate-y-[100%]">${w}&nbsp;</span></span>`)
          .join("");

        gsap.to(heading.querySelectorAll(".word"), {
          translateY: "0%",
          duration: 1.2,
          ease: "back.out(1.5)",
          stagger: 0.04,
          delay: 0.1,
        });
      }

      const navItems = navRef.current?.querySelectorAll(".nav-item");
      if (navItems) {
        gsap.fromTo(
          navItems,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.08, delay: 0.6 }
        );
      }

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.7 }
      );

      gsap.fromTo(
        exploreBtnRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)", delay: 0.9 }
      );

      // Section visual transition parallax on scroll
      gsap.to(".grid-lines", {
        y: "15%",
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [active, exploreBtnRef]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-background dark:bg-background-dark transition-colors duration-500"
    >
      {/* Background Volumetric Liquid Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-60">
        {/* Blob 1: Accent Accent (Burnt Orange / Acid Green) */}
        <div
          ref={blob1Ref}
          className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] -top-[10%] -left-[10%] rounded-full bg-accent/8 dark:bg-accent/12 blur-[100px] md:blur-[140px] transition-colors duration-500"
        />
        {/* Blob 2: Cyan Accent (Teal / Cyan) */}
        <div
          ref={blob2Ref}
          className="absolute w-[65vw] h-[65vw] md:w-[38vw] md:h-[38vw] top-[25%] -right-[15%] rounded-full bg-[#00E5FF]/6 dark:bg-[#00E5FF]/10 blur-[100px] md:blur-[140px] transition-colors duration-500"
        />
        {/* Blob 3: Deep Peach / Soft Red Accent */}
        <div
          ref={blob3Ref}
          className="absolute w-[55vw] h-[55vw] md:w-[28vw] md:h-[28vw] -bottom-[10%] left-[25%] rounded-full bg-[#FF5C33]/5 dark:bg-[#FF5C33]/8 blur-[100px] md:blur-[140px] transition-colors duration-500"
        />
      </div>

      {/* Background Grid Lines (Subtle visual transition) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04] grid-lines" />

      {/* Navigation Header */}
      <header ref={navRef} className="relative z-10 w-full flex justify-between items-center select-none">
        <div className="nav-item font-display font-bold tracking-[0.15em] text-[12px] md:text-[13px] text-[#1A1A18] dark:text-[#F2F1ED]">
          UMAR AHMED <span className="text-accent dark:text-accent-dark">/</span> CSE
        </div>
        <nav className="flex space-x-6 md:space-x-8 text-[10px] md:text-xs tracking-[0.25em] font-semibold font-display uppercase">
          <div ref={navItem1} className="nav-item">
            <button
              onClick={() => scrollToSection("projects")}
              className="relative py-2 text-muted dark:text-muted-dark hover:text-[#1A1A18] dark:hover:text-[#F2F1ED] transition-colors group"
            >
              PROJECTS
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent dark:bg-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
          <div ref={navItem2} className="nav-item">
            <button
              onClick={() => scrollToSection("about")}
              className="relative py-2 text-muted dark:text-muted-dark hover:text-[#1A1A18] dark:hover:text-[#F2F1ED] transition-colors group"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent dark:bg-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
          <div ref={navItem3} className="nav-item">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative py-2 text-muted dark:text-muted-dark hover:text-[#1A1A18] dark:hover:text-[#F2F1ED] transition-colors group"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent dark:bg-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* Center Headline */}
      <main className="relative z-10 my-auto flex flex-col justify-center max-w-full lg:max-w-[85%] pt-24 pb-12">
        <h1
          ref={titleRef}
          className="text-[9.5vw] lg:text-[7vw] font-display font-extrabold tracking-tighter leading-[0.85] text-[#1A1A18] dark:text-[#F2F1ED] mb-10 md:mb-14 select-text"
        >
          BUILDING SYSTEMS TO BRING IDEAS TO LIFE.
        </h1>

        <div ref={textRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full">
          <p className="max-w-lg text-sm md:text-[15px] font-light text-muted dark:text-muted-dark leading-relaxed select-text font-body">
            Full-stack engineer & founder of <span className="text-[#1A1A18] dark:text-[#F2F1ED] font-medium">MedX Laboratory</span>, crafting scalable, local-first software from concept to production. NIT CSE Class of &apos;2027.
          </p>

          <div className="flex items-center">
            <button
              ref={exploreBtnRef}
              onClick={() => scrollToSection("projects")}
              data-cursor="view"
              data-cursor-text="EXPLORE"
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-accent dark:bg-accent-dark text-white dark:text-black font-display font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span className="mb-1">EXPLORE</span>
              <span>WORK</span>
              <ArrowUpRight className="w-4 h-4 absolute top-6 right-6 text-white dark:text-black opacity-60" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom bar info */}
      <footer className="relative z-10 w-full flex justify-between items-center text-[9px] tracking-widest text-muted/40 dark:text-muted-dark/40 uppercase select-none border-t border-black/5 dark:border-white/5 pt-4">
        <span>© {new Date().getFullYear()} UMAR AHMED</span>
        <span className="hidden sm:inline">SCROLL TO DISCOVER</span>
        <span>NIT RAIPUR CSE</span>
      </footer>
    </div>
  );
}
