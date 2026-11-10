"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = "power3.out";

export function Masthead() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;

      const q = gsap.utils.selector(node);
      const mm = gsap.matchMedia();
      node.classList.add("is-ready");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const wide = window.matchMedia("(min-width: 901px)").matches;
        const tl = gsap.timeline({ defaults: { ease, force3D: true } });

        tl.fromTo(
          q(".mast-line span"),
          { yPercent: wide ? 108 : 72 },
          { yPercent: 0, duration: wide ? 0.78 : 0.62, stagger: 0.12 },
          0,
        );
        tl.fromTo(
          q(".mast-photo"),
          { yPercent: wide ? 14 : 10, scale: 1.06 },
          { yPercent: 0, scale: 1, duration: wide ? 1.05 : 0.82, ease: "power3.out" },
          0.2,
        );
        tl.fromTo(q(".mast-kicker"), { y: 10 }, { y: 0, duration: 0.5 }, 0.08);
        tl.fromTo(q(".mast-lede"), { y: 12 }, { y: 0, duration: 0.52 }, 0.28);
        tl.fromTo(q(".mast-actions"), { y: 12 }, { y: 0, duration: 0.5 }, 0.4);
        tl.fromTo(q(".mast-why"), { y: 8 }, { y: 0, duration: 0.45 }, 0.55);
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
        const drift = q(".mast-drift")[0];
        const frame = q(".mast-frame")[0] as HTMLElement | undefined;
        const shift = q(".mast-shift")[0] as HTMLElement | undefined;
        if (!drift || !frame) return;

        gsap.fromTo(
          drift,
          { y: 6 },
          {
            y: -6,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
        if (!fine.matches || !shift) return;

        const xTo = gsap.quickTo(shift, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(shift, "y", { duration: 0.7, ease: "power3" });

        const onMove = (event: PointerEvent) => {
          const box = frame.getBoundingClientRect();
          if (!box.width || !box.height) return;
          xTo(((event.clientX - box.left) / box.width - 0.5) * 8);
          yTo(((event.clientY - box.top) / box.height - 0.5) * 6);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };

        frame.addEventListener("pointermove", onMove);
        frame.addEventListener("pointerleave", reset);
        return () => {
          frame.removeEventListener("pointermove", onMove);
          frame.removeEventListener("pointerleave", reset);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="mast" ref={root} aria-labelledby="mast-title">
      <div className="mast-shell">
        <div className="mast-copy">
          <div className="mast-lead">
            <p className="mast-kicker">Eduvert / Study abroad / 01</p>
            <h1 className="mast-title" id="mast-title">
              <span className="mast-line">
                <span>A bigger world.</span>
              </span>
              <span className="mast-line is-soft">
                <span>A clearer way forward.</span>
              </span>
            </h1>
            <p className="mast-lede">
              A course you couldn't study at home. A new city to figure out. People who challenge how you think.
              Studying abroad is shaped by these experiences, not just the degree.
            </p>
            <div className="mast-actions">
              <a className="btn btn-primary" href="#destinations">
                Explore destinations
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="mast-link" href="#consult">
                Speak to a counsellor
                <span className="mast-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
          <div className="mast-why">
            <p>07 destinations / one journey</p>
          </div>
        </div>

        <figure className="mast-visual">
          <div className="mast-frame">
            <div className="mast-drift">
              <div className="mast-shift">
                <img
                  className="mast-photo"
                  src="/study-abroad/campus.jpg"
                  srcSet="/study-abroad/campus-sm.jpg 800w, /study-abroad/campus.jpg 1600w"
                  sizes="(max-width: 899px) 92vw, 42vw"
                  width={1600}
                  height={1067}
                  alt="Students walking toward campus buildings on a tree-lined path."
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <figcaption className="mast-cap">Campus, study abroad</figcaption>
        </figure>
      </div>
    </section>
  );
}
