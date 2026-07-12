"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Shield, Layers, Users, MapPin, Cpu, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "veris",
    title: "VERIS Secure Media",
    subtitle: "Detect Use",
    desc: "The ultimate cryptographic command center. Authenticate digital assets, embed invisible ownership signatures, and flag misappropriation across the web.",
    tech: ["Web3", "Cryptography", "Next.js", "TypeScript", "Tailwind CSS"],
    index: "01",
    url: "veris-blue.vercel.app",
    color: "rgba(255, 92, 51, 0.05)",
    icon: Shield,
    videoUrl: "/videos/veris-demo.mp4"
  },
  {
    id: "sparx",
    title: "Sparx Browser",
    subtitle: "Privacy-First AI Browser",
    desc: "Local privacy-first AI browser incorporating LLMs directly in the runtime for instant query processing, context management, and offline assistance.",
    tech: ["Electron", "React", "Llama 3", "Node.js", "Tailwind CSS"],
    index: "02",
    url: "sparx://browser.local",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Cpu,
    videoUrl: "/videos/sparx-demo.mp4"
  },
  {
    id: "prompt",
    title: "Prompt Vault",
    subtitle: "Prompt Tagging & Workflows",
    desc: "Scalable MERN stack storage & tagging library designed for LLM workflow engineers to test, categorize, version control, and export prompts.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    index: "03",
    url: "promptvault.io",
    color: "rgba(255, 92, 51, 0.05)",
    icon: Layers,
    videoUrl: "/videos/prompt-demo.mp4"
  },
  {
    id: "vanets",
    title: "Blockchain VANETs",
    subtitle: "Decentralized Vehicular Security",
    desc: "Decentralized security infrastructure for vehicular networks utilizing smart contracts to validate routing data and authenticate nodes.",
    tech: ["Solidity", "Ethers.js", "Web3", "Next.js", "Tailwind CSS"],
    index: "04",
    url: "vanet-network.eth",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Shield,
    videoUrl: "/videos/vanets-demo.mp4"
  },
  {
    id: "rahi",
    title: "RAHI (Rural Guide)",
    subtitle: "Career Mapping System",
    desc: "Role-based career guidance platform mapping personalized educational steps, courses, and resources for rural students with custom learning tracks.",
    tech: ["React.js", "Firebase", "CSS Modules", "Chart.js"],
    index: "05",
    url: "rahi-guide.org",
    color: "rgba(255, 92, 51, 0.05)",
    icon: MapPin,
    videoUrl: "/videos/rahi-demo.mp4"
  },
  {
    id: "hospital",
    title: "Hospital Queue",
    subtitle: "Healthcare Routing System",
    desc: "Multi-role queue routing system managing token allocation, patient triage routing, and real-time waiting logs in regional health centers.",
    tech: ["Node.js", "Express", "React", "MongoDB", "Socket.io"],
    index: "06",
    url: "queue-health.local",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Users,
    videoUrl: "/videos/hospital-demo.mp4"
  },
  {
    id: "deshstack",
    title: "DeshStack SaaS",
    subtitle: "Indian Software Reviews",
    desc: "Production-grade, Gartner-style B2B software review and discovery platform designed specifically for Indian-built software, displaying DPDP compliance, GST-ready invoicing status, and Razorpay integrations.",
    tech: ["Next.js", "React", "Clerk Auth", "Tailwind CSS", "TypeScript"],
    index: "07",
    url: "desh-stack.vercel.app",
    color: "rgba(255, 92, 51, 0.05)",
    icon: Star,
    videoUrl: "/videos/deshstack-demo.mp4"
  },
];

// Interactive 3D tilt component for mockups
function TiltMockup({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxTilt = 5; // gentle, premium tilt
    const rX = -(mouseY / (height / 2)) * maxTilt;
    const rY = (mouseX / (width / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: pin and horizontal slide
      mm.add("(min-width: 1024px)", () => {
        const panels = section.querySelectorAll(".project-panel");
        const amountToScroll = section.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(section, {
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

        // Parallax and reveals inside panel
        panels.forEach((panel) => {
          const mockup = panel.querySelector(".mockup-parallax-wrapper");
          if (mockup) {
            gsap.fromTo(
              mockup,
              { x: -40 },
              {
                x: 40,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          // Staggered text reveals
          const info = panel.querySelector(".project-info");
          if (info) {
            const elements = info.querySelectorAll(".reveal-item");
            gsap.fromTo(
              elements,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="projects" className="relative bg-background dark:bg-background-dark transition-colors duration-500">
      {/* For desktop, container pins and triggers horizontal slide. For mobile, it scrolls normally vertically */}
      <div className="lg:h-screen lg:overflow-hidden">
        <div
          ref={scrollSectionRef}
          className="flex flex-col lg:flex-row w-full h-full lg:whitespace-nowrap"
        >
          {/* Header Panel */}
          <div className="project-panel w-full lg:w-[45vw] flex-shrink-0 h-[100dvh] lg:h-screen bg-background dark:bg-background-dark flex flex-col justify-between p-8 md:p-16 relative sticky top-0 lg:relative z-[1] border-r border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
              04/
            </div>
            <div className="my-auto relative z-10 select-text">
              <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-4">
                WORK
              </span>
              <h2 className="text-4xl md:text-[4vw] font-display font-extrabold tracking-tighter leading-[0.9] text-[#1A1A18] dark:text-[#F2F1ED]">
                SELECTED<br />PROJECTS
              </h2>
              <p className="text-sm text-muted dark:text-muted-dark font-body leading-relaxed max-w-sm mt-6 whitespace-normal">
                A curation of software systems built at the intersection of AI integration, blockchain networks, and local-first architectures.
              </p>
            </div>
            <div className="hidden lg:block text-[11px] tracking-widest text-muted/30 dark:text-muted-dark/30 uppercase font-display font-medium select-none">
              SCROLL DOWN OR DRAG TO SHIFT →
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="project-panel w-full lg:w-[85vw] flex-shrink-0 h-[100dvh] lg:h-screen bg-[#F7F5F1] dark:bg-[#0D0C0F] border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5 flex flex-col lg:flex-row items-center justify-center p-8 md:p-16 gap-8 lg:gap-16 select-text whitespace-normal transition-colors duration-500 sticky top-0 lg:relative overflow-hidden"
                style={{ zIndex: idx + 2 }}
              >
                {/* Opaque Brand Tint Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0"
                  style={{ backgroundColor: proj.color }}
                />
                
                {/* Info block */}
                <div className="project-info w-full lg:w-[40%] flex flex-col justify-center order-2 lg:order-1 relative z-10">
                  <div className="reveal-item flex items-center gap-3 mb-6">
                    <span className="text-xs tracking-wider text-accent dark:text-accent-dark font-display font-bold font-mono">
                      {proj.subtitle}
                    </span>
                    <span className="text-[10px] text-muted dark:text-muted-dark py-0.5 px-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded font-mono">
                      SYSTEM {proj.index}
                    </span>
                  </div>
                  <h3 className="reveal-item text-3xl md:text-5xl font-display font-bold tracking-tight text-[#1A1A18] dark:text-[#F2F1ED] mb-6">
                    {proj.title}
                  </h3>
                  <p className="reveal-item text-sm md:text-base text-muted dark:text-muted-dark font-body leading-relaxed mb-8">
                    {proj.desc}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="reveal-item flex flex-wrap gap-2 mb-8">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-wider text-muted dark:text-white/70 py-1 px-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="reveal-item flex">
                    <a
                      href="https://github.com/mr-umar-ahmed"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="view"
                      data-cursor-text="CODE"
                      className="group/btn flex items-center gap-2 border-b border-accent dark:border-accent-dark pb-2 text-accent dark:text-accent-dark text-xs font-semibold font-display tracking-widest uppercase transition-all hover:text-[#1A1A18] dark:hover:text-[#F2F1ED] hover:border-[#1A1A18] dark:hover:border-[#F2F1ED]"
                    >
                      EXPLORE REPOSITORY
                      <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Browser Mockup Container */}
                <div className="w-full lg:w-[60%] flex items-center justify-center order-1 lg:order-2 relative z-10">
                  <div className="mockup-parallax-wrapper w-full aspect-video relative">
                    <TiltMockup>
                      <div 
                        data-cursor="view"
                        data-cursor-text="DEMO"
                        className="mockup-inner relative w-full h-full bg-surface/50 dark:bg-surface-dark/40 glassmorphism rounded-md border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col group/mockup cursor-none"
                      >
                        {/* Header */}
                        <div className="h-7 bg-background/80 dark:bg-[#151619]/80 border-b border-black/5 dark:border-white/5 px-4 flex items-center gap-2 select-none">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 group-hover/mockup:bg-red-500/60 transition-colors" />
                            <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 group-hover/mockup:bg-yellow-500/60 transition-colors" />
                            <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10 group-hover/mockup:bg-green-500/60 transition-colors" />
                          </div>
                          <div className="mx-auto bg-background/80 dark:bg-surface-dark/50 border border-black/5 dark:border-white/5 text-[8px] text-muted/40 dark:text-muted-dark/40 px-5 py-0.5 rounded-full font-mono max-w-[150px] truncate select-none">
                            {proj.url}
                          </div>
                        </div>
                        {/* Visual Graphic - Video Player Placeholder */}
                        <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
                          <video
                            src={proj.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                          />
                          {/* Dark screen shading */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                          {/* Video Player Floating controls to make it look like a mockup */}
                          <div className="absolute inset-x-4 bottom-4 flex justify-between items-center z-10 select-none">
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-accent/20 dark:bg-accent-dark/20 flex items-center justify-center border border-accent/20 dark:border-accent-dark/20 text-accent dark:text-accent-dark">
                                <div className="w-1.5 h-1.5 bg-accent dark:bg-accent-dark rounded-full animate-ping" />
                              </div>
                              <span className="text-[9px] font-mono tracking-widest text-white/70">
                                SYS.{proj.index} // LIVE PLAY
                              </span>
                            </div>
                            <div className="h-1 bg-white/20 w-24 rounded overflow-hidden relative">
                              <div className="absolute top-0 left-0 h-full bg-accent dark:bg-accent-dark w-2/3 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltMockup>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
