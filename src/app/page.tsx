"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  const [pageReady, setPageReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setPageReady(true)} />
      <div className={`transition-opacity duration-1000 ${pageReady ? "opacity-100 animate-in fade-in" : "opacity-0"}`}>
        <Hero active={pageReady} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </>
  );
}
