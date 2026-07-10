"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useMagnetic(0.25);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[998] w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-[#1A1A18] dark:text-[#F2F1ED] hover:text-accent dark:hover:text-accent-dark shadow-lg transition-transform"
      data-cursor="hover"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 transition-transform hover:rotate-12 duration-300" />
      ) : (
        <Moon className="w-4.5 h-4.5 transition-transform hover:-rotate-12 duration-300" />
      )}
    </button>
  );
}
