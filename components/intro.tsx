"use client";

import "../lib/server-raf";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { BrandRings } from "./brand-rings";

gsap.registerPlugin(useGSAP);

const letters = ["E", "D", "U", "V", "E", "R", "T"];
const ringLength = 314.16;
const introKey = "eduvert-intro";

function navigationType() {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return entry?.type;
}

function introAlreadyShown() {
  try {
    return sessionStorage.getItem(introKey) === "1";
  } catch {
    return false;
  }
}

function shouldPlayIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (document.documentElement.classList.contains("intro-skip")) return false;
  if (navigationType() === "reload") return true;
  return !introAlreadyShown();
}

function rememberIntro() {
  try {
    sessionStorage.setItem(introKey, "1");
  } catch {
    /* private mode */
  }
}

const ringStarts = [
  { selector: ".ring-cyan", x: -76, y: -34, rotation: -68, at: 0.05 },
  { selector: ".ring-yellow", x: 80, y: -26, rotation: 62, at: 0.14 },
  { selector: ".ring-pink", x: 6, y: 74, rotation: 24, at: 0.24 },
];

export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  const close = () => {
    document.documentElement.classList.remove("intro-lock-scroll");
    setDone(true);
  };

  const skip = () => {
    rememberIntro();
    timeline.current?.kill();
    close();
  };

  useGSAP(
    () => {
      if (!shouldPlayIntro()) {
        close();
        return;
      }

      document.documentElement.classList.add("intro-lock-scroll");
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") skip();
      };
      const onLeave = () => rememberIntro();
      window.addEventListener("keydown", onKey);
      window.addEventListener("pagehide", onLeave);

      const sub = root.current?.querySelector<HTMLElement>(".intro-sub");
      const track = sub?.ownerDocument.defaultView
        ? getComputedStyle(sub).getPropertyValue("--sub-track").trim() || "0.28em"
        : "0.28em";

      const tl = gsap.timeline({
        onComplete: () => {
          rememberIntro();
          close();
        },
      });
      timeline.current = tl;

      tl.set(".ring", {
        strokeDasharray: ringLength,
        strokeDashoffset: ringLength,
        transformOrigin: "50% 50%",
      });

      for (const ring of ringStarts) {
        tl.fromTo(
          ring.selector,
          { x: ring.x, y: ring.y, rotation: ring.rotation, scale: 0.74, strokeDashoffset: ringLength },
          { strokeDashoffset: 0, duration: 0.92, ease: "power2.out" },
          ring.at,
        );
        tl.to(
          ring.selector,
          { x: 0, y: 0, rotation: 0, scale: 1, duration: 1.18, ease: "back.out(1.45)" },
          ring.at,
        );
      }

      tl.fromTo(".intro-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: "power3.inOut" }, 1.5).fromTo(
        ".intro-sub",
        { autoAlpha: 0, letterSpacing: "0.46em" },
        { autoAlpha: 1, letterSpacing: track, duration: 0.55, ease: "power2.out" },
        1.6,
      );

      tl.to(root.current, { yPercent: -100, duration: 0.84, ease: "power4.inOut" }, 2.4);

      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("pagehide", onLeave);
        document.documentElement.classList.remove("intro-lock-scroll");
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div className="intro" ref={root}>
      <motion.button
        type="button"
        className="intro-dismiss"
        onClick={skip}
        whileHover={{ backgroundColor: "#0B75A2", color: "#FFFFFF", borderColor: "#0B75A2" }}
        whileTap={{ scale: 0.96 }}
      >
        Skip
      </motion.button>
      <div className="intro-lock">
        <div className="intro-mark-wrap">
          <BrandRings className="intro-mark" animated />
        </div>
        <div className="intro-copy">
          <p className="intro-name" aria-label="Eduvert">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                aria-hidden="true"
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.64, delay: 1.02 + index * 0.045, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </p>
          <span className="intro-bar" aria-hidden="true" />
          <p className="intro-sub">Overseas Education</p>
        </div>
      </div>
    </div>
  );
}
