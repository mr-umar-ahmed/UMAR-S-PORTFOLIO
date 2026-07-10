"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Shield, Layers, Users, MapPin, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "sparx",
    title: "Sparx Browser",
    subtitle: "Privacy-First AI Browser",
    desc: "Local privacy-first AI browser incorporating LLMs directly in the runtime for instant query processing, context management, and offline assistance.",
    tech: ["Electron", "React", "Llama 3", "Node.js", "Tailwind CSS"],
    index: "01",
    url: "sparx://browser.local",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Cpu,
  },
  {
    id: "prompt",
    title: "Prompt Vault",
    subtitle: "Prompt Tagging & Workflows",
    desc: "Scalable MERN stack storage & tagging library designed for LLM workflow engineers to test, categorize, version control, and export prompts.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    index: "02",
    url: "promptvault.io",
    color: "rgba(255, 92, 51, 0.05)",
    icon: Layers,
  },
  {
    id: "vanets",
    title: "Blockchain VANETs",
    subtitle: "Decentralized Vehicular Security",
    desc: "Decentralized security infrastructure for vehicular networks utilizing smart contracts to validate routing data and authenticate nodes.",
    tech: ["Solidity", "Ethers.js", "Web3", "Next.js", "Tailwind CSS"],
    index: "03",
    url: "vanet-network.eth",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Shield,
  },
  {
    id: "rahi",
    title: "RAHI (Rural Guide)",
    subtitle: "Career Mapping System",
    desc: "Role-based career guidance platform mapping personalized educational steps, courses, and resources for rural students with custom learning tracks.",
    tech: ["React.js", "Firebase", "CSS Modules", "Chart.js"],
    index: "04",
    url: "rahi-guide.org",
    color: "rgba(255, 92, 51, 0.05)",
    icon: MapPin,
  },
  {
    id: "hospital",
    title: "Hospital Queue",
    subtitle: "Healthcare Routing System",
    desc: "Multi-role queue routing system managing token allocation, patient triage routing, and real-time waiting logs in regional health centers.",
    tech: ["Node.js", "Express", "React", "MongoDB", "Socket.io"],
    index: "05",
    url: "queue-health.local",
    color: "rgba(198, 255, 58, 0.05)",
    icon: Users,
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll logic only applies to medium screens and above
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = section.querySelectorAll(".project-panel");
        const amountToScroll = section.scrollWidth - window.innerWidth;

        gsap.to(section, {
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

        // Parallax scroll effect inside mockups
        panels.forEach((panel) => {
          const mockup = panel.querySelector(".mockup-inner");
          gsap.fromTo(
            mockup,
            { x: -50 },
            {
              x: 50,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.globalTimeline, // sync horizontal scroll
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="projects" className="relative bg-background">
      {/* For desktop, container pins and triggers horizontal slide. For mobile, it scrolls normally vertically */}
      <div className="lg:h-screen lg:overflow-hidden">
        <div
          ref={scrollSectionRef}
          className="flex flex-col lg:flex-row w-full h-full lg:whitespace-nowrap"
        >
          {/* Header Panel */}
          <div className="project-panel w-full lg:w-[45vw] flex-shrink-0 h-screen bg-[#080809] flex flex-col justify-between p-8 md:p-16 relative border-r border-white/5">
            <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-[#1e2024]/10 select-none pointer-events-none">
              04/
            </div>
            <div className="my-auto relative z-10 select-text">
              <span className="text-xs tracking-[0.25em] text-accent font-display font-semibold uppercase block mb-4">
                WORK
              </span>
              <h2 className="text-4xl md:text-[4vw] font-display font-extrabold tracking-tighter leading-[0.9] text-white">
                SELECTED<br />PROJECTS
              </h2>
              <p className="text-sm text-muted font-body leading-relaxed max-w-sm mt-6 whitespace-normal">
                A curation of software systems built at the intersection of AI integration, blockchain networks, and local-first architectures.
              </p>
            </div>
            <div className="hidden lg:block text-[11px] tracking-widest text-muted/30 uppercase font-display font-medium select-none">
              SCROLL DOWN OR DRAG TO SHIFT →
            </div>
          </div>

          {/* Project Panels */}
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="project-panel w-full lg:w-[85vw] flex-shrink-0 h-screen bg-background border-r border-white/5 flex flex-col lg:flex-row items-center justify-center p-8 md:p-16 gap-8 lg:gap-16 select-text whitespace-normal"
                style={{ backgroundColor: proj.color }}
              >
                {/* Info block */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs tracking-wider text-accent font-display font-bold font-mono">
                      {proj.subtitle}
                    </span>
                    <span className="text-[10px] text-muted py-0.5 px-2 bg-white/5 border border-white/10 rounded font-mono">
                      SYSTEM {proj.index}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
                    {proj.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted font-body leading-relaxed mb-8">
                    {proj.desc}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono tracking-wider text-white/70 py-1 px-3 bg-white/5 border border-white/5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="flex">
                    <a
                      href="https://github.com/mr-umar-ahmed"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="view"
                      data-cursor-text="CODE"
                      className="group/btn flex items-center gap-2 border-b border-accent pb-2 text-accent text-xs font-semibold font-display tracking-widest uppercase transition-all hover:text-white hover:border-white"
                    >
                      EXPLORE REPOSITORY
                      <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Browser Mockup */}
                <div className="w-full lg:w-[60%] flex items-center justify-center order-1 lg:order-2">
                  <div className="mockup-inner relative w-full aspect-video bg-[#1e2024]/40 glassmorphism rounded-md border border-white/10 overflow-hidden shadow-2xl flex flex-col group/mockup">
                    {/* Header */}
                    <div className="h-7 bg-[#151619]/80 border-b border-white/5 px-4 flex items-center gap-2 select-none">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover/mockup:bg-red-500/60 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover/mockup:bg-yellow-500/60 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover/mockup:bg-green-500/60 transition-colors" />
                      </div>
                      <div className="mx-auto bg-surface/50 border border-white/5 text-[8px] text-muted/40 px-5 py-0.5 rounded-full font-mono max-w-[150px] truncate select-none">
                        {proj.url}
                      </div>
                    </div>
                    {/* Visual Graphic */}
                    <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-br from-[#0c0d10] to-[#151619] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,255,58,0.08),transparent_50%)]" />
                      
                      <div className="flex justify-between items-center z-10">
                        <Icon className="w-8 h-8 text-accent opacity-60" />
                        <span className="text-[3vw] lg:text-[2vw] font-display font-black text-white/5 font-mono select-none">
                          SYS.{proj.index}
                        </span>
                      </div>

                      <div className="space-y-3 z-10 mt-6 select-none pointer-events-none">
                        <div className="h-1 bg-accent/40 w-1/3 rounded" />
                        <div className="h-1 bg-white/10 w-2/3 rounded" />
                        <div className="h-1 bg-white/5 w-1/2 rounded" />
                      </div>

                      <div className="flex justify-between items-end mt-8 z-10">
                        <div className="flex gap-1">
                          <div className="w-5 h-2 bg-white/10 rounded-sm" />
                          <div className="w-8 h-2 bg-accent/20 rounded-sm" />
                          <div className="w-4 h-2 bg-white/5 rounded-sm" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        </div>
                      </div>
                    </div>
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
