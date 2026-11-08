"use client";

import { useEffect, useRef, useState } from "react";
import { voices, voicesHref, type Voice } from "../lib/voices";

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function Voices() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const [active, setActive] = useState(voices[0].id);
  const [swap, setSwap] = useState(0);
  const current = voices.findIndex((item) => item.id === active);
  const voice = voices[current] ?? voices[0];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.classList.add("is-in");
        observer.disconnect();
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!seen.current) {
      seen.current = true;
      return;
    }
    setSwap((value) => value + 1);
  }, [active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const align = (behavior: ScrollBehavior) => {
      const button = list.querySelector<HTMLButtonElement>(".is-on");
      if (!button || list.scrollWidth <= list.clientWidth + 1) return;
      const left = button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2;
      list.scrollTo({ left: Math.max(0, left), behavior });
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    align(reduce ? "auto" : "smooth");
    const observer = new ResizeObserver(() => align("auto"));
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  function choose(id: string) {
    setActive(id);
  }

  function step(direction: -1 | 1) {
    const next = (current + direction + voices.length) % voices.length;
    setActive(voices[next].id);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % voices.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current - 1 + voices.length) % voices.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = voices.length - 1;
    else return;
    event.preventDefault();
    const id = voices[next].id;
    setActive(id);
    listRef.current?.querySelector<HTMLButtonElement>(`[data-voice="${id}"]`)?.focus();
  }

  const progress = ((current + 1) / voices.length).toFixed(4);

  return (
    <section className="voices section" id="stories" ref={rootRef} aria-labelledby="stories-title">
      <div className="shell voices-spread">
        <header className="voices-intro">
          <p className="eyebrow voice-rise" style={{ animationDelay: "0ms" }}>
            Testimonials / The Eduvert experience
          </p>
          <h2 className="voices-title voice-rise" id="stories-title" style={{ animationDelay: "60ms" }}>
            Don’t take our word for it.
          </h2>
          <p className="voices-support voice-rise" style={{ animationDelay: "120ms" }}>
            How the counselling helps a student decide what to do next.
          </p>
        </header>

        <Quote voice={voice} swap={swap} onStep={step} />

        <div className="voices-actions voice-rise" style={{ animationDelay: "280ms" }}>
          <a className="btn btn-primary" href={voicesHref}>
            Read all testimonials <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-ghost" href="#consult">
            Book a counselling
          </a>
        </div>

        <aside className="voices-rail voice-rise" style={{ animationDelay: "180ms" }}>
          <p className="voices-kicker">Currently reading</p>
          <p className="voices-count" aria-hidden="true">
            <span>{indexLabel(current)}</span>
            <span className="voices-count-rest">/ {String(voices.length).padStart(2, "0")}</span>
          </p>
          <div className="voices-meter" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <div
            className="voices-list"
            ref={listRef}
            role="tablist"
            aria-label="Study abroad guidance"
            onKeyDown={onKeyDown}
          >
            {voices.map((item, index) => {
              const on = item.id === voice.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`voices-person${on ? " is-on" : ""}`}
                  id={`voice-tab-${item.id}`}
                  data-voice={item.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="voices-quote"
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(item.id)}
                >
                  <span className="voices-no">{indexLabel(index)}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
          <div className="voices-step">
            <button type="button" onClick={() => step(-1)}>
              Previous
            </button>
            <button type="button" onClick={() => step(1)}>
              Next
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Quote({ voice, swap, onStep }: { voice: Voice; swap: number; onStep: (direction: -1 | 1) => void }) {
  const start = useRef<{ x: number; y: number } | null>(null);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;
    start.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const origin = start.current;
    start.current = null;
    if (!origin || event.pointerType === "mouse") return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    onStep(dx < 0 ? 1 : -1);
  }

  return (
    <div
      className="voices-feature voice-rise"
      id="voices-quote"
      role="tabpanel"
      aria-labelledby={`voice-tab-${voice.id}`}
      style={{ animationDelay: "170ms" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <blockquote>
        <p className={swap ? "voices-quote is-swap" : "voices-quote"} key={`${voice.id}-${swap}`}>
          {voice.quote}
        </p>
      </blockquote>
      <div className={swap ? "voices-by is-swap" : "voices-by"} key={`${voice.id}-by-${swap}`}>
        <p className="voices-name">{voice.name}</p>
        <p className="voices-source">
          {voice.sourceLabel}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {voice.source}
        </p>
      </div>
    </div>
  );
}
