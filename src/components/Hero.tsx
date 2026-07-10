"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Hero({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const exploreBtnRef = useMagnetic(0.25);
  const navItem1 = useMagnetic(0.25);
  const navItem2 = useMagnetic(0.25);
  const navItem3 = useMagnetic(0.25);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth) * 100;
      const y = (e.clientY / clientHeight) * 100;
      
      gsap.to(mousePos, {
        x: x,
        y: y,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          setMousePos({ x: mousePos.x, y: mousePos.y });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mousePos]);

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
          duration: 1.4,
          ease: "power4.out",
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
      className="relative w-full min-h-screen flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-background"
    >
      {/* Background Interactive Mesh Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.35] grid-lines">
        <svg
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] blur-[100px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="meshGradient1" cx={`${mousePos.x}%`} cy={`${mousePos.y}%`} r="35%">
              <stop offset="0%" stopColor="rgba(198, 255, 58, 0.22)" />
              <stop offset="100%" stopColor="rgba(8, 8, 9, 0)" />
            </radialGradient>
            <radialGradient id="meshGradient2" cx={`${100 - mousePos.x}%`} cy={`${100 - mousePos.y}%`} r="40%">
              <stop offset="0%" stopColor="rgba(255, 92, 51, 0.12)" />
              <stop offset="100%" stopColor="rgba(8, 8, 9, 0)" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#meshGradient1)" />
          <rect width="100%" height="100%" fill="url(#meshGradient2)" />
        </svg>
      </div>

      {/* Navigation Header */}
      <header ref={navRef} className="relative z-10 w-full flex justify-between items-center select-none">
        <div className="nav-item font-display font-bold tracking-[0.15em] text-[12px] md:text-[13px] text-white">
          UMAR AHMED <span className="text-accent">/</span> CSE
        </div>
        <nav className="flex space-x-6 md:space-x-8 text-[10px] md:text-xs tracking-[0.25em] font-semibold font-display uppercase">
          <div ref={navItem1} className="nav-item">
            <button
              onClick={() => scrollToSection("projects")}
              className="relative py-2 text-muted hover:text-white transition-colors group"
            >
              PROJECTS
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
          <div ref={navItem2} className="nav-item">
            <button
              onClick={() => scrollToSection("about")}
              className="relative py-2 text-muted hover:text-white transition-colors group"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
          <div ref={navItem3} className="nav-item">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative py-2 text-muted hover:text-white transition-colors group"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* Center Headline */}
      <main className="relative z-10 my-auto flex flex-col justify-center max-w-full lg:max-w-[85%] pt-24 pb-12">
        <h1
          ref={titleRef}
          className="text-[9.5vw] lg:text-[7vw] font-display font-extrabold tracking-tighter leading-[0.85] text-white mb-10 md:mb-14 select-text"
        >
          BUILDING SYSTEMS TO BRING IDEAS TO LIFE.
        </h1>

        <div ref={textRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 w-full">
          <p className="max-w-lg text-sm md:text-[15px] font-light text-muted leading-relaxed select-text font-body">
            Full-stack engineer & founder of <span className="text-white font-medium">MedX Laboratory</span>, crafting scalable, local-first software from concept to production. NIT CSE Class of &apos;2027.
          </p>

          <div className="flex items-center">
            <button
              ref={exploreBtnRef}
              onClick={() => scrollToSection("projects")}
              data-cursor="view"
              data-cursor-text="EXPLORE"
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-accent text-black font-display font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span className="mb-1">EXPLORE</span>
              <span>WORK</span>
              <ArrowUpRight className="w-4 h-4 absolute top-6 right-6 text-black opacity-60" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom bar info */}
      <footer className="relative z-10 w-full flex justify-between items-center text-[9px] tracking-widest text-muted/40 uppercase select-none border-t border-white/5 pt-4">
        <span>© {new Date().getFullYear()} UMAR AHMED</span>
        <span className="hidden sm:inline">SCROLL TO DISCOVER</span>
        <span>NIT RAIPUR CSE</span>
      </footer>
    </div>
  );
}
