"use client";

import "../lib/server-raf";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { openBooking } from "../lib/booking";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  {
    count: 1500,
    suffix: "+",
    grouped: true,
    label: "Universities",
    text: "1,500+",
    image: "/reach/universities.jpg",
    alt: "Stone university courtyard with arched walkways and a central path",
    photo: "reach-photo-campus",
  },
  {
    count: 3,
    suffix: "L+",
    grouped: false,
    label: "Courses",
    text: "3L+",
    image: "/reach/courses.jpg",
    alt: "Study desk with an open textbook, laptop, notebooks, and a reading lamp",
    photo: "reach-photo-books",
  },
  {
    count: 22,
    suffix: "+",
    grouped: false,
    label: "Countries",
    text: "22+",
    image: "/reach/countries.jpg",
    alt: "Travel map with a passport, a camera, and a model plane",
    photo: "reach-photo-map",
  },
] as const;

function formatCount(value: number, grouped: boolean, suffix: string) {
  const rounded = Math.round(value);
  const body = grouped ? rounded.toLocaleString("en-US") : String(rounded);
  return body + suffix;
}

export function ReachBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
        const sheet = section.querySelector<HTMLElement>(".reach-sheet");
        const releaseSheet = () => {
          if (sheet) gsap.set(sheet, { y: 0 });
        };
        ScrollTrigger.addEventListener("refreshInit", releaseSheet);

        if (sheet) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 74%",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          }).fromTo(sheet, { y: 22 }, { y: 0, duration: 1, ease: "none", force3D: true });
        }

        const head = section.querySelector(".reach-head");
        const lines = section.querySelectorAll(".reach-line");
        const reveals = section.querySelectorAll(".reach-reveal");
        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: head,
            start: "top 92%",
            end: "top 56%",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
        intro
          .fromTo(
            section.querySelector(".reach-kicker"),
            { "--reach-kicker": "100%", x: -10, autoAlpha: 0.15 },
            {
              "--reach-kicker": "0%",
              x: 0,
              autoAlpha: 1,
              duration: 0.28,
              ease: "power2.inOut",
              force3D: false,
            },
            0,
          )
          .fromTo(
            lines[0],
            { "--reach-line": "100%" },
            { "--reach-line": "0%", duration: 0.48, ease: "power1.inOut" },
            0.08,
          )
          .fromTo(
            reveals[0],
            { y: 48, scale: 0.97, autoAlpha: 0.4 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.48,
              ease: "power2.inOut",
              transformOrigin: "50% 100%",
              force3D: false,
            },
            0.08,
          )
          .fromTo(
            lines[1],
            { "--reach-line": "100%" },
            { "--reach-line": "0%", duration: 0.48, ease: "power1.inOut" },
            0.22,
          )
          .fromTo(
            reveals[1],
            { y: 48, scale: 0.97, autoAlpha: 0.4 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.48,
              ease: "power2.inOut",
              transformOrigin: "50% 100%",
              force3D: false,
            },
            0.22,
          )
          .fromTo(
            section.querySelector(".reach-scribble path"),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.36, ease: "power1.inOut" },
            0.52,
          )
          .fromTo(
            section.querySelector(".reach-scribble"),
            { y: 4 },
            { y: 0, duration: 0.36, ease: "power1.inOut", force3D: false },
            0.52,
          )
          .fromTo(
            section.querySelector(".reach-accent"),
            { scaleY: 0, autoAlpha: 0 },
            { scaleY: 1, autoAlpha: 1, duration: 0.18, ease: "power2.out", transformOrigin: "top center" },
            0.4,
          )
          .fromTo(
            section.querySelector(".reach-rule"),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.32, ease: "power2.inOut", transformOrigin: "top center" },
            0.48,
          )
          .fromTo(
            section.querySelector(".reach-support-mask"),
            { "--reach-copy": "100%" },
            { "--reach-copy": "0%", duration: 0.36, ease: "power2.inOut" },
            0.64,
          )
          .fromTo(
            section.querySelector(".reach-support-copy"),
            { x: 14 },
            { x: 0, duration: 0.36, ease: "power2.inOut", force3D: false },
            0.64,
          );

        const cleanups: Array<() => void> = [];
        const countEase = gsap.parseEase("power1.inOut");
        const revealFigure = (
          figure: HTMLElement | null,
          countAt: number,
          travel: { scale: number; x?: number; y?: number },
          range: { start: string; end: string },
        ) => {
          if (!figure) return;
          const media = figure.querySelector(".reach-media");
          const num = figure.querySelector<HTMLElement>(".reach-num");
          const label = figure.querySelector(".reach-label-text");
          if (!media || !num || !label) return;

          const target = Number(num.dataset.count);
          const suffix = num.dataset.suffix ?? "";
          const grouped = num.dataset.grouped === "true";
          const finalText = formatCount(target, grouped, suffix);
          const lockWidth = () => {
            const shown = num.textContent;
            num.textContent = finalText;
            const width = Math.ceil(num.getBoundingClientRect().width);
            if (width > 0) num.style.minWidth = `${width}px`;
            num.textContent = shown;
          };
          lockWidth();

          const paintCount = (progress: number) => {
            const local = gsap.utils.clamp(0, 1, (progress - countAt) / (1 - countAt));
            const next = formatCount(target * countEase(local), grouped, suffix);
            if (num.textContent !== next) num.textContent = next;
          };

          const photo = gsap.timeline({
            scrollTrigger: {
              trigger: figure,
              start: range.start,
              end: range.end,
              scrub: 0.45,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                lockWidth();
                paintCount(self.progress);
              },
              onUpdate: (self) => {
                figure.classList.toggle("is-open", self.progress > 0.72);
                paintCount(self.progress);
              },
            },
          });
          photo
            .fromTo(figure, { "--reach-wipe": "100%" }, { "--reach-wipe": "0%", duration: 1, ease: "power1.inOut" }, 0)
            .fromTo(
              media,
              { scale: travel.scale, x: travel.x ?? 0, y: travel.y ?? 0, transformOrigin: "center center" },
              { scale: 1, x: 0, y: 0, duration: 1, ease: "power1.inOut", force3D: true },
              0,
            )
            .fromTo(num, { yPercent: 115 }, { yPercent: 0, duration: 0.28, ease: "power2.out", force3D: false }, countAt)
            .fromTo(
              label,
              { yPercent: 120 },
              { yPercent: 0, duration: 0.22, ease: "power2.out", force3D: false },
              countAt + 0.08,
            );

          paintCount(photo.scrollTrigger?.progress ?? 0);
          cleanups.push(() => {
            figure.classList.remove("is-open");
            num.style.minWidth = "";
            num.textContent = finalText;
          });
        };

        revealFigure(
          section.querySelector(".reach-hero"),
          0.42,
          { scale: 1.08, y: 12 },
          { start: "top 90%", end: "top 52%" },
        );
        revealFigure(
          section.querySelector(".reach-courses"),
          0.48,
          { scale: 1.05, x: 8 },
          { start: "top 82%", end: "top 54%" },
        );
        revealFigure(
          section.querySelector(".reach-countries"),
          0.34,
          { scale: 1.05, x: -8 },
          { start: "top 96%", end: "top 78%" },
        );

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        const images = Array.from(section.querySelectorAll("img"));
        images.forEach((img) => {
          if (!img.complete) img.addEventListener("load", refresh, { once: true });
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", releaseSheet);
          cleanups.forEach((fn) => fn());
          images.forEach((img) => img.removeEventListener("load", refresh));
        };
      });

      motion.add("(prefers-reduced-motion: no-preference) and (max-width: 900px)", () => {
        const sheet = section.querySelector<HTMLElement>(".reach-sheet");
        const releaseSheet = () => {
          if (sheet) gsap.set(sheet, { y: 0 });
        };
        ScrollTrigger.addEventListener("refreshInit", releaseSheet);

        if (sheet) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 82%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          }).fromTo(sheet, { y: 12 }, { y: 0, duration: 1, ease: "none", force3D: true });
        }

        const head = section.querySelector(".reach-head");
        const lines = section.querySelectorAll(".reach-line");
        const reveals = section.querySelectorAll(".reach-reveal");
        const ease = "power1.inOut";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: head,
              start: "top 93%",
              end: "top 64%",
              scrub: 0.32,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            section.querySelector(".reach-kicker"),
            { "--reach-kicker": "100%", y: 12, autoAlpha: 0.35 },
            { "--reach-kicker": "0%", y: 0, autoAlpha: 1, duration: 0.28, ease, force3D: false },
            0,
          )
          .fromTo(lines[0], { "--reach-line": "100%" }, { "--reach-line": "0%", duration: 0.42, ease }, 0.08)
          .fromTo(
            reveals[0],
            { y: 24, autoAlpha: 0.4 },
            { y: 0, autoAlpha: 1, duration: 0.42, ease, force3D: false },
            0.08,
          )
          .fromTo(lines[1], { "--reach-line": "100%" }, { "--reach-line": "0%", duration: 0.42, ease }, 0.2)
          .fromTo(
            reveals[1],
            { y: 24, autoAlpha: 0.4 },
            { y: 0, autoAlpha: 1, duration: 0.42, ease, force3D: false },
            0.2,
          )
          .fromTo(
            section.querySelector(".reach-scribble path"),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.3, ease },
            0.48,
          )
          .fromTo(
            section.querySelector(".reach-support-mask"),
            { "--reach-copy": "100%" },
            { "--reach-copy": "0%", duration: 0.32, ease },
            0.58,
          )
          .fromTo(
            section.querySelector(".reach-support-copy"),
            { y: 14 },
            { y: 0, duration: 0.32, ease, force3D: false },
            0.58,
          );

        const countEase = gsap.parseEase("power1.inOut");
        const cleanups: Array<() => void> = [];
        const revealFigure = (
          figure: HTMLElement | null,
          countAt: number,
          travel: { scale: number; x?: number; y?: number },
          range: { start: string; end: string },
        ) => {
          if (!figure) return;
          const media = figure.querySelector(".reach-media");
          const num = figure.querySelector<HTMLElement>(".reach-num");
          const label = figure.querySelector(".reach-label-text");
          if (!media || !num || !label) return;
          const target = Number(num.dataset.count);
          const suffix = num.dataset.suffix ?? "";
          const grouped = num.dataset.grouped === "true";
          const finalText = formatCount(target, grouped, suffix);
          const lockWidth = () => {
            const shown = num.textContent;
            num.textContent = finalText;
            const width = Math.ceil(num.getBoundingClientRect().width);
            if (width > 0) num.style.minWidth = `${width}px`;
            num.textContent = shown;
          };
          const paintCount = (progress: number) => {
            const local = gsap.utils.clamp(0, 1, (progress - countAt) / (1 - countAt));
            const next = formatCount(target * countEase(local), grouped, suffix);
            if (num.textContent !== next) num.textContent = next;
          };
          lockWidth();
          const photo = gsap.timeline({
            scrollTrigger: {
              trigger: figure,
              start: range.start,
              end: range.end,
              scrub: 0.34,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                lockWidth();
                paintCount(self.progress);
              },
              onUpdate: (self) => paintCount(self.progress),
            },
          });
          photo
            .fromTo(figure, { "--reach-wipe": "100%" }, { "--reach-wipe": "0%", duration: 1, ease }, 0)
            .fromTo(
              media,
              { scale: travel.scale, x: travel.x ?? 0, y: travel.y ?? 0, transformOrigin: "center center" },
              { scale: 1, x: 0, y: 0, duration: 1, ease, force3D: true },
              0,
            )
            .fromTo(num, { yPercent: 110 }, { yPercent: 0, duration: 0.26, ease: "power2.out", force3D: false }, countAt)
            .fromTo(
              label,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.22, ease: "power2.out", force3D: false },
              countAt + 0.08,
            );
          paintCount(photo.scrollTrigger?.progress ?? 0);
          cleanups.push(() => {
            num.style.minWidth = "";
            num.textContent = finalText;
          });
        };

        revealFigure(section.querySelector(".reach-hero"), 0.48, { scale: 1.05, y: 8 }, { start: "top 92%", end: "top 68%" });
        revealFigure(section.querySelector(".reach-courses"), 0.55, { scale: 1.04, x: 6 }, { start: "top 90%", end: "top 70%" });
        revealFigure(
          section.querySelector(".reach-countries"),
          0.28,
          { scale: 1.04, x: -6 },
          { start: "top 86%", end: "top 66%" },
        );

        gsap.fromTo(
          section.querySelector(".reach-trust"),
          { y: 14, autoAlpha: 0.4 },
          {
            y: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".reach-trust"),
              start: "top 94%",
              end: "top 74%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          },
        );

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        const images = Array.from(section.querySelectorAll("img"));
        images.forEach((img) => {
          if (!img.complete) img.addEventListener("load", refresh, { once: true });
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", releaseSheet);
          cleanups.forEach((fn) => fn());
          images.forEach((img) => img.removeEventListener("load", refresh));
        };
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  const [universities, courses, countries] = stats;

  return (
    <section className="reach" id="reach" aria-labelledby="reach-title" ref={root}>
      <div className="reach-sheet">
      <div className="shell">
        <header className="reach-head">
          <div>
            <p className="reach-kicker">The possibilities</p>
            <h2 className="reach-title" id="reach-title">
              <span className="reach-line">
                <span className="reach-reveal">A world of options.</span>
              </span>
              <span className="reach-line reach-line-mark">
                <span className="reach-reveal">
                  A clearer{" "}
                  <span className="reach-mark">
                    way forward.
                    <svg className="reach-scribble" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
                      <path
                        pathLength="1"
                        d="M1 8.4 C 14 4.6, 24 11.2, 40 7 C 56 2.8, 68 10.6, 86 7.4 C 108 3.6, 122 11.4, 144 6.6 C 166 2.4, 180 9.8, 199 6"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h2>
          </div>
          <p className="reach-support">
            <span className="reach-accent" aria-hidden="true" />
            <span className="reach-rule" aria-hidden="true" />
            <span className="reach-support-mask">
              <span className="reach-support-copy">
                Explore courses, countries, and universities with guidance built around your ambitions.
              </span>
            </span>
          </p>
        </header>

        <div className="reach-spread">
          <figure className="reach-figure reach-hero">
            <span className="reach-media">
              <img
                className={`reach-photo ${universities.photo}`}
                src={universities.image}
                alt={universities.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="reach-caption">
              <p className="reach-value">
                <span className="reach-rise">
                  <span className="reach-num" data-count={universities.count} data-suffix={universities.suffix} data-grouped="true">
                    {universities.text}
                  </span>
                </span>
              </p>
              <p className="reach-label">
                <span className="reach-rise">
                  <span className="reach-label-text">{universities.label}</span>
                </span>
              </p>
            </figcaption>
          </figure>

          <figure className="reach-figure reach-courses">
            <span className="reach-media">
              <img
                className={`reach-photo ${courses.photo}`}
                src={courses.image}
                alt={courses.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="reach-caption reach-caption-top">
              <p className="reach-value">
                <span className="reach-rise">
                  <span className="reach-num" data-count={courses.count} data-suffix={courses.suffix}>
                    {courses.text}
                  </span>
                </span>
              </p>
              <p className="reach-label">
                <span className="reach-rise">
                  <span className="reach-label-text">{courses.label}</span>
                </span>
              </p>
            </figcaption>
          </figure>

          <figure className="reach-figure reach-countries">
            <span className="reach-media">
              <img
                className={`reach-photo ${countries.photo}`}
                src={countries.image}
                alt={countries.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
            <figcaption className="reach-caption">
              <p className="reach-value">
                <span className="reach-rise">
                  <span className="reach-num" data-count={countries.count} data-suffix={countries.suffix}>
                    {countries.text}
                  </span>
                </span>
              </p>
              <p className="reach-label">
                <span className="reach-rise">
                  <span className="reach-label-text">{countries.label}</span>
                </span>
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="reach-trust">
          <img className="reach-seal" src="/cca-certified.png" alt="CCA Certified Career Analyst" />
          <div className="reach-trust-copy">
            <h3>Guidance backed by credentials.</h3>
            <p>CCA Certified Career Analyst.</p>
          </div>
          <button className="btn btn-primary" type="button" onClick={openBooking}>
            Book a counselling <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
