"use client";

import React, { useRef, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

const freelanceCards = [
  { id: "infynlab", name: "Infynlab", role: "Full-Stack Development", desc: "Crafting modern web dashboards and secure cloud systems." },
  { id: "crafiraa", name: "Crafiraa", role: "Frontend UI Architecture", desc: "Spearheaded premium UI interactions and page loaders." },
  { id: "unveil", name: "Unveil Spark Tech", role: "AI Integrations", desc: "Engineered LLM API pipelines and search indices." },
  { id: "nit", name: "NIT Grievance Portal", role: "Backend Systems", desc: "Refined SQL schemas and role-based auth structures." }
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
        window.location.href = `mailto:mr.umar.ahmed@outlook.com?subject=Portfolio Inquiry from ${name}&body=Sender: ${email}%0D%0A%0D%0A${message}`;
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

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-8 md:px-16 bg-[#080809] border-t border-white/5"
    >
      <div className="absolute top-12 left-8 md:left-16 text-[10vw] font-display font-black text-[#1e2024]/10 select-none pointer-events-none">
        06/
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 relative z-10 select-text">
        
        {/* 3.8 Shipped Freelance Grid */}
        <div className="w-full flex flex-col">
          <span className="text-xs tracking-[0.25em] text-accent font-display font-semibold uppercase block mb-6">
            REAL-WORLD SOLVERS
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-white mb-12 select-text">
            SHIPPED SOLUTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelanceCards.map((card) => {
              const isDimmed = hoveredCard !== null && hoveredCard !== card.id;
              const isActive = hoveredCard === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`border border-white/5 bg-surface/20 p-6 rounded-[2px] transition-all duration-300 flex flex-col justify-between aspect-square group/item ${
                    isDimmed ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"
                  } ${isActive ? "border-accent/30 bg-surface/50" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                      {card.role}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 text-accent transition-transform duration-300 ${
                        isActive ? "translate-x-1 -rotate-45" : "rotate-0"
                      }`}
                    />
                  </div>

                  <div className="mt-auto space-y-2">
                    <h3 className="text-xl font-bold font-display tracking-tight text-white">
                      {card.name}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed font-body">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3.8 Certifications minimalist ticker */}
        <div className="w-full border-y border-white/5 py-6 overflow-hidden select-none relative">
          <div className="flex whitespace-nowrap animate-infinite-scroll-left gap-12 text-[10px] md:text-xs font-mono tracking-[0.2em] text-muted/40">
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
              <span className="text-xs tracking-[0.25em] text-accent font-display font-semibold uppercase block">
                GET IN TOUCH
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-extrabold tracking-tighter leading-[0.9] text-white select-text">
                LET&apos;S BUILD<br />SOMETHING BOLD.
              </h2>
              <p className="text-sm text-muted font-body leading-relaxed max-w-sm">
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
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-muted"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <div ref={social2}>
                <a
                  href="https://github.com/mr-umar-ahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-muted"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div ref={social3}>
                <a
                  href="mailto:mr.umar.ahmed@outlook.com"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-muted"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-surface/30 glassmorphism p-8 md:p-10 rounded-[2px]">
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
                    className="peer w-full bg-transparent border-b border-white/10 py-3.5 text-sm text-white focus:outline-none focus:border-accent transition-colors font-body"
                  />
                  <label className="absolute left-0 top-3.5 text-muted/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
                    YOUR NAME
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-white/10 py-3.5 text-sm text-white focus:outline-none focus:border-accent transition-colors font-body"
                  />
                  <label className="absolute left-0 top-3.5 text-muted/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
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
                  className="peer w-full bg-transparent border-b border-white/10 py-3.5 text-sm text-white focus:outline-none focus:border-accent transition-colors resize-none font-body"
                />
                <label className="absolute left-0 top-3.5 text-muted/60 text-xs tracking-widest font-display font-medium pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
                  YOUR DISPATCH MESSAGE
                </label>
              </div>

              {/* Submit button */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent hover:bg-white text-black font-display font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 group cursor-none"
                >
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT DISPATCH"}
                  <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-accent text-xs font-mono select-none">
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
