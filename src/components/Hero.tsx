"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const exploreBtnRef = useMagnetic(0.25);
  const navItem1 = useMagnetic(0.25);
  const navItem2 = useMagnetic(0.25);
  const navItem3 = useMagnetic(0.25);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Pointer movement tracking (mouse + touch screens)
  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (clientX / clientWidth) * 100;
      const y = (clientY / clientHeight) * 100;
      
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

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mousePos]);

  // High-performance HTML5 Canvas Constellation Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 65;
    const connectionDistance = 115;
    const forceRadius = 160;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slow organic floating speed
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 1.2;
      }

      update(w: number, h: number, mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        // Containment check
        if (this.x < 0) this.x = 0;
        if (this.x > w) this.x = w;
        if (this.y < 0) this.y = 0;
        if (this.y > h) this.y = h;

        // Tactile cursor repulsion force
        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          this.x += (dx / dist) * force * 1.2;
          this.y += (dy / dist) * force * 1.2;
        }
      }

      draw(c: CanvasRenderingContext2D, color: string) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = color;
        c.fill();
      }
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = (mousePos.x / 100) * canvas.width;
      const my = (mousePos.y / 100) * canvas.height;

      // Extract current theme accent color dynamically
      let accentColor = "#C6FF3A"; 
      if (typeof window !== "undefined") {
        const computedAccent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
        if (computedAccent) {
          accentColor = computedAccent;
        }
      }

      // Convert accent color (hex/rgb) into decimal components
      let r = 198, g = 255, b = 58;
      if (accentColor.startsWith("#")) {
        const hex = accentColor.substring(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (accentColor.startsWith("rgb")) {
        const rgbVals = accentColor.match(/\d+/g);
        if (rgbVals && rgbVals.length >= 3) {
          r = parseInt(rgbVals[0], 10);
          g = parseInt(rgbVals[1], 10);
          b = parseInt(rgbVals[2], 10);
        }
      }

      // Render & update particles
      particles.forEach(p => {
        p.update(canvas.width, canvas.height, mx, my);
        p.draw(ctx, `rgba(${r}, ${g}, ${b}, 0.5)`);
      });

      // Draw connection lines between neighboring nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw glowing lines connecting particles directly to cursor coordinates
      particles.forEach(p => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < forceRadius) {
          const alpha = (1 - dist / forceRadius) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
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

      // Background Parallax
      gsap.to(".grid-lines", {
        y: "20%",
        scale: 1.1,
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
      {/* Background Interactive Mesh Glow (Soft color fog) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.25]">
        <svg
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%] blur-[100px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="meshGradient1" cx={`${mousePos.x}%`} cy={`${mousePos.y}%`} r="35%">
              <stop offset="0%" className="mesh-stop-1" />
              <stop offset="100%" className="mesh-stop-2" />
            </radialGradient>
            <radialGradient id="meshGradient2" cx={`${100 - mousePos.x}%`} cy={`${100 - mousePos.y}%`} r="40%">
              <stop offset="0%" className="mesh-stop-3" />
              <stop offset="100%" className="mesh-stop-2" />
            </radialGradient>
            {/* Added third gradient stop for electric blue overlay on dark mode */}
            <radialGradient id="meshGradient3" cx={`${mousePos.y}%`} cy={`${100 - mousePos.x}%`} r="30%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#meshGradient1)" />
          <rect width="100%" height="100%" fill="url(#meshGradient2)" />
          <rect width="100%" height="100%" fill="url(#meshGradient3)" />
        </svg>
      </div>

      {/* Background Spotlight Masked Canvas Constellation Network */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

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
