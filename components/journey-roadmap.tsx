"use client";

import { useEffect, useRef } from "react";
import { journey } from "../lib/site";

type Point = { x: number; y: number };

type Route = {
  d: string;
  arrivals: number[];
  length: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function n(value: number) {
  return (Math.round(value * 2) / 2).toFixed(1);
}

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function desktopRoute(points: Point[]): Route {
  const arrivals = [0];
  const commands = [`M ${n(points[0].x)} ${n(points[0].y)}`];
  let length = 0;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const next = points[index];
    length += Math.abs(next.x - previous.x) + Math.abs(next.y - previous.y);
    commands.push(`H ${n(next.x)}`, `V ${n(next.y)}`);
    arrivals.push(length);
  }
  return { d: commands.join(" "), arrivals, length: Math.max(length, 1) };
}

function mobileRoute(points: Point[]): Route {
  const spineX = Math.max(7, points[0].x - 18);
  const arrivals = [0];
  const commands = [`M ${n(points[0].x)} ${n(points[0].y)}`, `H ${n(spineX)}`];
  let length = Math.abs(points[0].x - spineX);
  for (let index = 1; index < points.length; index += 1) {
    length += Math.abs(points[index].y - points[index - 1].y);
    commands.push(`V ${n(points[index].y)}`);
    length += Math.abs(points[index].x - spineX);
    commands.push(`H ${n(points[index].x)}`);
    arrivals.push(length);
    if (index < points.length - 1) {
      length += Math.abs(points[index].x - spineX);
      commands.push(`H ${n(spineX)}`);
    }
  }
  return { d: commands.join(" "), arrivals, length: Math.max(length, 1) };
}

function buildRoute(points: Point[]) {
  if (points.length < 2) return null;
  const span = Math.max(...points.map((point) => point.x)) - Math.min(...points.map((point) => point.x));
  return span < 36 ? mobileRoute(points) : desktopRoute(points);
}

export function JourneyRoadmap() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const routeRef = useRef<Route | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    let frame = 0;

    const measure = () => {
      const marks = track.querySelectorAll<HTMLElement>(".roadmap-mark");
      const base = track.getBoundingClientRect();
      const width = track.clientWidth;
      const height = track.clientHeight;
      if (width < 2 || height < 2 || marks.length !== journey.length) return;
      const points = Array.from(marks, (mark) => {
        const rect = mark.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - base.left,
          y: rect.top + rect.height / 2 - base.top,
        };
      });
      const next = buildRoute(points);
      const svg = svgRef.current;
      const basePath = baseRef.current;
      const progress = progressRef.current;
      if (!next || !svg || !basePath || !progress) return;
      routeRef.current = next;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      basePath.setAttribute("d", next.d);
      progress.setAttribute("d", next.d);
    };

    const paint = () => {
      const current = routeRef.current;
      const steps = track.querySelectorAll<HTMLElement>(".roadmap-step");
      const progressPath = progressRef.current;
      if (!current || !progressPath || steps.length === 0) return;
      const rect = track.getBoundingClientRect();
      const start = window.innerHeight * 0.8;
      const finish = window.innerHeight * 0.34;
      const total = rect.height + start - finish;
      const progress = reduced ? 1 : clamp((start - rect.top) / total, 0, 1);
      progressPath.style.strokeDashoffset = (1 - progress).toFixed(4);
      steps.forEach((step, index) => {
        const at = current.arrivals[index] / current.length;
        const end = index === 0 ? Math.max(at, 0.045) : at;
        const from = Math.max(0, end - 0.075);
        const reveal = reduced ? 1 : clamp((progress - from) / (end - from || 1), 0, 1);
        step.style.setProperty("--reveal", reveal.toFixed(3));
      });
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    };

    const resize = new ResizeObserver(() => {
      measure();
      request();
    });
    resize.observe(track);

    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) root.classList.add("is-in");
      },
      { threshold: 0.12 },
    );
    seen.observe(root);

    const onMotion = () => {
      reduced = motion.matches;
      request();
    };

    measure();
    paint();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    motion.addEventListener("change", onMotion);
    document.fonts?.ready.then(() => {
      measure();
      request();
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <section className="section roadmap" id="journey" aria-labelledby="journey-title" style={{ paddingTop: 0 }} ref={rootRef}>
      <div className="shell">
        <div className="roadmap-intro">
          <p className="eyebrow roadmap-rise">The path</p>
          <h2 className="section-title roadmap-rise" id="journey-title">
            Every ambition has a starting point.
          </h2>
          <p className="lede roadmap-rise">
            From understanding your possibilities to preparing for departure, every step brings you closer to studying abroad.
          </p>
        </div>

        <div className="roadmap-track" ref={trackRef}>
          <svg className="roadmap-svg" aria-hidden="true" ref={svgRef}>
            <path className="roadmap-route" pathLength={1} ref={baseRef} />
            <path className="roadmap-progress" pathLength={1} ref={progressRef} />
          </svg>
          <ol className="roadmap-steps">
            {journey.map((step, index) => (
              <li className={`roadmap-step${index % 2 === 0 ? " is-left" : " is-right"}`} key={step.title}>
                <span className="roadmap-mark" aria-hidden="true">
                  <span className="roadmap-mark-fill" />
                </span>
                <div className="roadmap-body">
                  <span className="roadmap-num" aria-hidden="true">
                    {pad(index)}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
