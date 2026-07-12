"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

const freelanceCards = [
  {
    id: "medx",
    name: "MedX Laboratory",
    role: "Clinical Analytics",
    desc: "Volumetric diagnostic platform mapping real-time waiting logs and patient triage routing.",
    link: "https://medx-laboratory.netlify.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-medical-research-facility-and-microscope-40176-large.mp4"
  },
  {
    id: "skilledge",
    name: "SkillEdge OS",
    role: "EdTech Dashboard",
    desc: "Personalized educational milestone mapper with learning tracks and dashboard metrics.",
    link: "https://skill-edge-os.vercel.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-programming-code-scrolls-on-a-dark-screen-34351-large.mp4"
  },
  {
    id: "whitelabel",
    name: "WhiteLabel Watches",
    role: "Premium E-commerce",
    desc: "Editorial storefront with smooth micro-interactions, spring mechanics, and animations.",
    link: "https://whitelabelwatches.netlify.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-mechanism-rotating-close-up-42023-large.mp4"
  },
  {
    id: "nit",
    name: "NIT Grievance Portal",
    role: "System Administration",
    desc: "Secure role-based dashboard handling query pipelines and student grievance logs.",
    link: "https://github.com/mr-umar-ahmed",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-finger-pointing-at-a-screen-showing-charts-34352-large.mp4"
  },
  {
    id: "crafiraa-portfolio",
    name: "Crafiraa Portfolio",
    role: "Creative Agency",
    desc: "Highly interactive agency showcase built with immersive 3D Spline backgrounds and elegant scroll animations.",
    link: "https://crafiraa-protfolio.netlify.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-binary-code-31863-large.mp4"
  },
  {
    id: "crafiraa-studio",
    name: "Crafiraa Studio",
    role: "Digital Experience",
    desc: "Modern landing experience built on Next.js featuring smooth transitions, 3D interactive graphics, and micro-interactions.",
    link: "https://crafiraa-o0.web.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-data-center-network-connections-34356-large.mp4"
  },
  {
    id: "localfix",
    name: "LocalFix",
    role: "Service Marketplace",
    desc: "Hyperlocal B2C service platform connecting rural households in India with verified professionals and contractors.",
    link: "https://local-fixz.netlify.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-finger-pointing-at-a-screen-showing-charts-34352-large.mp4"
  },
  {
    id: "unveil-spark",
    name: "Unveil Spark Tech",
    role: "Tech Agency",
    desc: "Premium tech agency website displaying elegant typography, layout-driven animations, and theme-matching visual effects.",
    link: "http://unveil-spark-tech.web.app/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-server-room-under-digital-circuit-lines-and-numbers-31846-large.mp4"
  }
];

const certs = [
  "LINKEDIN JAVASCRIPT CERTIFICATE",
  "LINKEDIN REACT CERTIFICATE",
  "UDEMY COMPLETE PYTHON DEVELOPER",
  "NIT ACADEMIC HONOR ROLL",
  "OPENAI BUILDATHON QUALIFIER"
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Social magnetic hooks
  const social1 = useMagnetic(0.3);
  const social2 = useMagnetic(0.3);
  const social3 = useMagnetic(0.3);
  const social4 = useMagnetic(0.3);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const accessKey = formData.get("access_key");

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE" || accessKey === "") {
      // Fallback redirect if key is not configured
      setTimeout(() => {
         window.location.href = `mailto:umarahmedahmed24@gmail.com?subject=Portfolio Inquiry from ${name}&body=Sender: ${email}%0D%0A%0D%0A${message}`;
        setSubmitStatus("success");
        setIsSubmitting(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const nameEl = document.querySelector('input[name="name"]') as HTMLInputElement;
    const emailEl = document.querySelector('input[name="email"]') as HTMLInputElement;
    const messageEl = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;

    const name = nameEl?.value || "";
    const email = emailEl?.value || "";
    const message = messageEl?.value || "";

    if (!name || !email || !message) {
      alert("Please fill out Name, Email, and Message before launching WhatsApp dispatch.");
      return;
    }

    const text = encodeURIComponent(`Hello Umar,\n\nName: ${name}\nEmail: ${email}\n\nMessage: ${message}`);
    window.open(`https://wa.me/917204060651?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-8 md:px-16 bg-background dark:bg-background-dark border-t border-black/5 dark:border-white/5 transition-colors duration-500"
    >
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-muted/10 dark:text-muted-dark/10 select-none pointer-events-none">
        06/
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 relative z-10 select-text">
        
        {/* 3.8 Shipped Freelance Grid */}
        <div className="w-full flex flex-col">
          <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block mb-6">
            REAL-WORLD SOLVERS
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-[#1A1A18] dark:text-[#F2F1ED] mb-12 select-text">
            SHIPPED SOLUTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelanceCards.map((card) => {
              const isDimmed = hoveredCard !== null && hoveredCard !== card.id;
              const isActive = hoveredCard === card.id;

              return (
                <a
                  key={card.id}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`border border-black/5 dark:border-white/5 bg-surface/40 dark:bg-surface-dark/20 p-6 rounded-[2px] transition-all duration-300 flex flex-col justify-between min-h-[350px] group/item ${
                    isDimmed ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"
                  } ${isActive ? "border-accent/30 dark:border-accent-dark/30 bg-surface dark:bg-surface-dark" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-muted dark:text-muted-dark uppercase">
                      {card.role}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 text-accent dark:text-accent-dark transition-transform duration-300 ${
                        isActive ? "translate-x-1 -rotate-45" : "rotate-0"
                      }`}
                    />
                  </div>

                  {/* Micro Video Playback Screen */}
                  <div className="w-full aspect-video bg-black/40 dark:bg-black/70 border border-black/5 dark:border-white/5 rounded relative overflow-hidden flex items-center justify-center my-4 group-hover/item:border-accent/30 dark:group-hover/item:border-accent-dark/30 transition-colors">
                    <video
                      src={card.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover/item:opacity-55 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    
                    {/* Pulsing indicator */}
                    <div className="w-6 h-6 rounded-full bg-accent/20 dark:bg-accent-dark/20 border border-accent/30 dark:border-accent-dark/30 flex items-center justify-center text-accent dark:text-accent-dark relative z-10 transition-transform group-hover/item:scale-110">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark animate-pulse" />
                    </div>
                    
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 select-none z-10 opacity-60">
                      <span className="text-[7px] font-mono text-white/60 tracking-wider">LIVE_DEMO.MP4</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-2">
                    <h3 className="text-xl font-bold font-display tracking-tight text-[#1A1A18] dark:text-[#F2F1ED]">
                      {card.name}
                    </h3>
                    <p className="text-xs text-muted dark:text-muted-dark leading-relaxed font-body">
                      {card.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 3.8 Certifications minimalist ticker */}
        <div className="w-full border-y border-black/5 dark:border-white/5 py-6 overflow-hidden select-none relative">
          <div className="flex whitespace-nowrap animate-infinite-scroll-left gap-12 text-[10px] md:text-xs font-mono tracking-[0.2em] text-muted/40 dark:text-muted-dark/40">
            {[...certs, ...certs, ...certs].map((cert, index) => (
              <span key={index} className="flex items-center gap-2">
                <span>✦</span>
                <span>{cert}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 3.9 Contact details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Headline & Social Info */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <span className="text-xs tracking-[0.25em] text-accent dark:text-accent-dark font-display font-semibold uppercase block">
                GET IN TOUCH
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-extrabold tracking-tighter leading-[0.9] text-[#1A1A18] dark:text-[#F2F1ED] select-text">
                LET&apos;S BUILD<br />SOMETHING BOLD.
              </h2>
              <p className="text-sm text-muted dark:text-muted-dark leading-relaxed max-w-sm">
                Have a proposal, an API engineering challenge, or just want to grab a coffee? Send a direct dispatch message here.
              </p>
            </div>

            {/* Magnetic social triggers */}
            <div className="flex gap-4 pt-8">
              <div ref={social1}>
                <a
                  href="https://linkedin.com/in/mr-umar-ahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors flex items-center justify-center text-muted dark:text-muted-dark"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <div ref={social2}>
                <a
                  href="https://github.com/mr-umar-ahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors flex items-center justify-center text-muted dark:text-muted-dark"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div ref={social3}>
                <a
                  href="mailto:umarahmedahmed24@gmail.com"
                  className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors flex items-center justify-center text-muted dark:text-muted-dark"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <div ref={social4}>
                <a
                  href="https://wa.me/917204060651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 hover:border-accent dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-dark transition-colors flex items-center justify-center text-muted dark:text-muted-dark"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-surface/50 dark:bg-surface-dark/30 glassmorphism p-8 md:p-10 rounded-[2px]">
            <form onSubmit={handleSubmit} className="space-y-8 select-text">
              {/* Web3Forms access key, defaults to empty. Fallback uses mailto */}
              <input type="hidden" name="access_key" value="" />

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3.5 text-sm text-[#1A1A18] dark:text-[#F2F1ED] focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors font-body"
                  />
                  <label className="absolute left-0 top-3.5 text-muted/60 dark:text-muted-dark/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent dark:peer-focus:text-accent-dark">
                    YOUR NAME
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3.5 text-sm text-[#1A1A18] dark:text-[#F2F1ED] focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors font-body"
                  />
                  <label className="absolute left-0 top-3.5 text-muted/60 dark:text-muted-dark/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent dark:peer-focus:text-accent-dark">
                    EMAIL ADDRESS
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  name="message"
                  rows={4}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3.5 text-sm text-[#1A1A18] dark:text-[#F2F1ED] focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors resize-none font-body"
                />
                <label className="absolute left-0 top-3.5 text-muted/60 dark:text-muted-dark/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent dark:peer-focus:text-accent-dark">
                  YOUR DISPATCH MESSAGE
                </label>
              </div>

              {/* Submit buttons */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-[#1A1A18] dark:bg-[#F2F1ED] hover:bg-accent dark:hover:bg-accent-dark text-white dark:text-black hover:text-black dark:hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 group cursor-none"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT EMAIL"}
                    <Mail className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 py-4 bg-accent dark:bg-accent-dark hover:bg-black dark:hover:bg-white text-white dark:text-black hover:text-white dark:hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 group cursor-none"
                  >
                    TRANSMIT WHATSAPP
                    <MessageCircle className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-accent dark:text-accent-dark text-xs font-mono select-none">
                    <CheckCircle className="w-4 h-4" />
                    <span>DISPATCH SENT. WILL CORRESPOND SHARPLY.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-mono select-none">
                    <AlertCircle className="w-4 h-4" />
                    <span>TRANSMISSION ERROR. PLEASE TRY AGAIN.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
