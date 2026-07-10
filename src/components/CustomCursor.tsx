"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") as any;
        setCursorType(type || "hover");
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorText(text);
      } else {
        const isInteractive = target.closest("a, button, [role='button']") !== null;
        if (isInteractive) {
          setCursorType("hover");
          setCursorText("");
        } else {
          setCursorType("default");
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "1px solid rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as any,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(198, 255, 58, 0.95)", // Acid Green
      border: "1px solid rgba(198, 255, 58, 0.95)",
      color: "#080809",
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(4px)",
    }
  };

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          display: cursorType === "hover" || cursorType === "view" ? "none" : "block",
        }}
      />

      {/* Outer Ring / Morphing Shape */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase select-none overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={outerVariants}
        animate={cursorType}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      >
        {cursorType === "view" && (
          <span className="text-black font-bold text-[10px] font-display">
            {cursorText || "VIEW"}
          </span>
        )}
        {cursorType === "drag" && (
          <span className="text-white font-bold text-[10px] font-display">
            {cursorText || "DRAG"}
          </span>
        )}
      </motion.div>
    </>
  );
}
