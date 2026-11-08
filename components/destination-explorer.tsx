"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType, type Ref } from "react";
import { orderedDestinations } from "../lib/globe-destinations";
import type { DestinationGlobeHandle } from "./destination-globe";

type Mode = "auto" | "manual";
type Phase = "idle" | "entering" | "rotating" | "focused" | "manual" | "paused";
type GlobeComponent = ComponentType<{
  ref?: Ref<DestinationGlobeHandle>;
  activeId: string | null;
  hoverId: string | null;
  reduced: boolean;
  quality: "high" | "low";
  onReady: () => void;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDiscover: (id: string | null) => void;
  onFail: () => void;
}>;

const HOLD_MS = 4600;
const RESUME_MS = 9000;
const COUNT = orderedDestinations.length;

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function lowPower() {
  const cores = navigator.hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return cores <= 4 || memory <= 4;
}

export function DestinationExplorer() {
  const rootRef = useRef<HTMLElement>(null);
  const globeRef = useRef<DestinationGlobeHandle>(null);
  const [GlobeView, setGlobeView] = useState<GlobeComponent | null>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [dim, setDim] = useState(false);
  const [shown, setShown] = useState<number | null>(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [reduced, setReduced] = useState(false);

  const phaseRef = useRef<Phase>("idle");
  const intentRef = useRef<Mode>("auto");
  const indexRef = useRef(0);
  const timers = useRef<number[]>([]);
  const readyRef = useRef(false);
  const pendingRef = useRef<{ index: number; mode: Mode } | null>(null);
  const startedRef = useRef(false);
  const inViewRef = useRef(false);
  const reducedRef = useRef(false);
  const resumeAt = useRef<number | null>(null);
  const discoveredRef = useRef<number | null>(0);
  const blockRef = useRef({ drag: false, hover: false, panel: false, controls: false });

  const destination = shown === null ? null : orderedDestinations[shown] ?? null;

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const blocked = useCallback(
    () => blockRef.current.drag || blockRef.current.hover || blockRef.current.panel || blockRef.current.controls,
    [],
  );

  const rotateToRef = useRef<(index: number, mode: Mode) => void>(() => {});

  const scheduleHold = useCallback(() => {
    clearTimers();
    const timer = window.setTimeout(() => {
      if (phaseRef.current !== "focused" || !inViewRef.current || reducedRef.current || blocked()) return;
      rotateToRef.current(indexRef.current + 1, "auto");
    }, HOLD_MS);
    timers.current.push(timer);
  }, [blocked, clearTimers]);

  const scheduleResume = useCallback(() => {
    if (reducedRef.current) return;
    clearTimers();
    const timer = window.setTimeout(() => {
      if (!inViewRef.current || reducedRef.current || blocked()) return;
      if (phaseRef.current === "rotating" || phaseRef.current === "entering") return;
      const target = discoveredRef.current ?? indexRef.current + 1;
      resumeAt.current = null;
      rotateToRef.current(target, "auto");
    }, RESUME_MS);
    timers.current.push(timer);
  }, [blocked, clearTimers]);

  const rotateTo = useCallback(
    (index: number, mode: Mode) => {
      const next = ((index % COUNT) + COUNT) % COUNT;
      resumeAt.current = null;
      indexRef.current = next;
      intentRef.current = mode;
      phaseRef.current = "rotating";
      clearTimers();
      const globe = globeRef.current;
      if (!readyRef.current || !globe) {
        pendingRef.current = { index: next, mode };
        return;
      }
      const place = orderedDestinations[next];
      globe.focus(place.lat, place.lng, () => {
        if (phaseRef.current !== "rotating" || indexRef.current !== next) return;
        discoveredRef.current = next;
        setShown(next);
        phaseRef.current = mode === "auto" ? "focused" : "manual";
        if (reducedRef.current || !inViewRef.current || blocked()) return;
        if (mode === "auto") scheduleHold();
        else scheduleResume();
      });
    },
    [blocked, clearTimers, scheduleHold, scheduleResume],
  );

  useEffect(() => {
    rotateToRef.current = rotateTo;
  }, [rotateTo]);

  const resumeFromBlock = useCallback(() => {
    if (blocked() || !inViewRef.current || reducedRef.current) return;
    if (phaseRef.current === "rotating" || phaseRef.current === "entering" || phaseRef.current === "idle") return;
    if (intentRef.current === "auto") scheduleHold();
    else scheduleResume();
  }, [blocked, scheduleHold, scheduleResume]);

  useEffect(() => {
    reducedRef.current = reduced;
    if (reduced) clearTimers();
  }, [clearTimers, reduced]);

  useEffect(() => {
    setWebgl(hasWebGL());
    setQuality(lowPower() ? "low" : "high");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0;
        const visible = Boolean(entry?.isIntersecting);
        if (visible) setMounted(true);
        setReveal(visible && ratio > 0.14);
        setDim(visible && ratio < 0.38);
        inViewRef.current = visible && ratio > 0.2;
        if (!inViewRef.current) {
          clearTimers();
          globeRef.current?.pause();
          return;
        }
        globeRef.current?.resume();
        if (!startedRef.current) {
          startedRef.current = true;
          if (reducedRef.current) {
            rotateTo(indexRef.current, "manual");
            return;
          }
          phaseRef.current = "entering";
          const timer = window.setTimeout(() => rotateTo(0, "auto"), 880);
          timers.current.push(timer);
          return;
        }
        if (phaseRef.current === "idle" || phaseRef.current === "entering" || phaseRef.current === "rotating") {
          rotateTo(indexRef.current, reducedRef.current ? "manual" : intentRef.current === "manual" ? "manual" : "auto");
          return;
        }
        resumeFromBlock();
      },
      { threshold: [0, 0.14, 0.2, 0.38, 0.7], rootMargin: "80px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [clearTimers, resumeFromBlock, rotateTo]);

  useEffect(() => {
    if (!mounted || webgl !== true || failed) return;
    let alive = true;
    import("./destination-globe")
      .then((mod) => {
        if (alive) setGlobeView(() => mod.DestinationGlobe);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [failed, mounted, webgl]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onReady = useCallback(() => {
    readyRef.current = true;
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) rotateTo(pending.index, pending.mode);
    else if (startedRef.current && phaseRef.current !== "idle" && phaseRef.current !== "entering") {
      rotateTo(indexRef.current, reducedRef.current ? "manual" : intentRef.current);
    }
  }, [rotateTo]);

  const onHover = useCallback(
    (id: string | null) => {
      setHoverId((current) => (current === id ? current : id));
      blockRef.current.hover = Boolean(id);
      if (id) {
        if (phaseRef.current !== "rotating") {
          clearTimers();
          phaseRef.current = "paused";
        }
        return;
      }
      resumeFromBlock();
    },
    [clearTimers, resumeFromBlock],
  );

  const onSelect = useCallback((id: string) => {
    const match = orderedDestinations.find((item) => item.id === id);
    if (match) window.location.assign(match.href);
  }, []);

  const onDiscover = useCallback((id: string | null) => {
    if (!id) {
      discoveredRef.current = null;
      setShown((current) => (current === null ? current : null));
      return;
    }
    const index = orderedDestinations.findIndex((item) => item.id === id);
    if (index < 0) return;
    discoveredRef.current = index;
    indexRef.current = index;
    setShown((current) => (current === index ? current : index));
  }, []);

  const onDragStart = useCallback(() => {
    blockRef.current.drag = true;
    if (resumeAt.current === null) {
      resumeAt.current = phaseRef.current === "rotating" ? indexRef.current : indexRef.current + 1;
    }
    intentRef.current = "manual";
    phaseRef.current = "manual";
    clearTimers();
  }, [clearTimers]);

  const onDragEnd = useCallback(() => {
    blockRef.current.drag = false;
    if (phaseRef.current !== "rotating") phaseRef.current = "manual";
    resumeFromBlock();
  }, [resumeFromBlock]);

  const onFail = useCallback(() => setFailed(true), []);

  const step = (direction: number) => {
    intentRef.current = "manual";
    rotateTo(indexRef.current + direction, "manual");
  };

  const setPanel = (active: boolean) => {
    blockRef.current.panel = active;
    if (active) {
      if (phaseRef.current !== "rotating") {
        clearTimers();
        phaseRef.current = "paused";
      }
      return;
    }
    resumeFromBlock();
  };

  const setControls = (active: boolean) => {
    blockRef.current.controls = active;
    if (active) {
      if (phaseRef.current !== "rotating") {
        clearTimers();
        phaseRef.current = "paused";
      }
      return;
    }
    resumeFromBlock();
  };

  const showFallback = webgl === false || failed;

  return (
    <section
      className={`section explore${reveal ? " is-visible" : ""}${dim ? " is-dim" : ""}`}
      id="destinations"
      aria-labelledby="destinations-title"
      ref={rootRef}
      style={{ paddingTop: 0 }}
    >
      <div className="shell explore-grid">
        <div className="explore-copy">
          <div className="explore-intro">
            <p className="eyebrow explore-rise">Seven destinations. Endless possibilities.</p>
            <h2 className="section-title explore-rise" id="destinations-title">
              Your future has no borders.
            </h2>
            <p className="lede explore-rise">
              Explore world-class study destinations and discover where your next chapter could begin.
            </p>
          </div>

          <div
            className="explore-detail"
            onPointerEnter={() => setPanel(true)}
            onPointerLeave={() => setPanel(false)}
            onFocus={() => setPanel(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPanel(false);
            }}
          >
            <div className="explore-swap" key={destination?.id ?? "open"}>
              {destination ? (
                <>
                  <p className="explore-kicker">Currently exploring / {pad(shown ?? 0)} of 07</p>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <a className="explore-link" href={destination.href}>
                    Explore {destination.name} <span aria-hidden="true">↗</span>
                  </a>
                </>
              ) : (
                <>
                  <p className="explore-kicker">In view</p>
                  <h3>Keep exploring</h3>
                  <p>A featured destination appears here when you bring it into the centre of the globe.</p>
                </>
              )}
            </div>
          </div>

          <div className="explore-cta">
            <a className="btn btn-secondary" href="/study-abroad">
              Explore all destinations <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="explore-visual">
          <div className="explore-stage" aria-hidden={showFallback ? undefined : true}>
            {showFallback ? (
              <DestinationList current={destination?.id ?? ""} />
            ) : (
              GlobeView && (
                <GlobeView
                  ref={globeRef}
                  activeId={destination?.id ?? null}
                  hoverId={hoverId}
                  reduced={reduced}
                  quality={quality}
                  onReady={onReady}
                  onHover={onHover}
                  onSelect={onSelect}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDiscover={onDiscover}
                  onFail={onFail}
                />
              )
            )}
          </div>
          <div
            className="explore-nav"
            onFocus={() => setControls(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setControls(false);
            }}
          >
            <div className="explore-controls">
              <button type="button" className="explore-arrow" aria-label="Previous destination" onClick={() => step(-1)}>
                <span aria-hidden="true">←</span>
              </button>
              <p className="explore-count" aria-hidden="true">
                {shown === null ? "— / 07" : `${pad(shown)} / 07`}
              </p>
              <button type="button" className="explore-arrow" aria-label="Next destination" onClick={() => step(1)}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className="explore-hint">{showFallback ? "Choose a destination" : "Drag the globe to explore"}</p>
          </div>
        </div>
        <p className="sr-only">
          Interactive globe of seven study destinations. Use the destination controls or the country link to open a
          guide.
        </p>
      </div>
    </section>
  );
}

function DestinationList({ current }: { current: string }) {
  return (
    <ul className="explore-list">
      {orderedDestinations.map((item) => (
        <li key={item.id}>
          <a href={item.href} aria-current={item.id === current ? "true" : undefined}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
