"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, type ComponentProps } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { AmbientLight, DirectionalLight, MeshPhongMaterial } from "three";
import { orderedDestinations } from "../lib/globe-destinations";
import { landFeatures, type LandFeature } from "../lib/land-features";

const ALTITUDE = 2.28;
const OCEAN = "#4c4c54";
const LAND = "#f6f3ec";
const LAND_SIDE = "#e7e2d8";
const ACTIVE = "#1b1b20";
const ACTIVE_SIDE = "#141418";
const STROKE = "rgba(88, 86, 80, 0.32)";
const ACTIVE_STROKE = "#f7f7f2";

export type DestinationGlobeHandle = {
  focus: (lat: number, lng: number, onFramed?: () => void) => void;
  pause: () => void;
  resume: () => void;
};

type Marker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  nudgeX: number;
  nudgeY: number;
  active: boolean;
  showLabel: boolean;
};

type Props = {
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
};

const GlobeCanvas = Globe as unknown as (
  props: ComponentProps<typeof Globe> & { animateIn?: boolean },
) => ReturnType<typeof Globe>;

function destIdOf(polygon: object | null) {
  if (!polygon || !("properties" in polygon)) return null;
  const properties = (polygon as LandFeature).properties;
  return properties?.destId ?? null;
}

function shortestLng(from: number, to: number) {
  const delta = (((to - from + 540) % 360) + 360) % 360 - 180;
  return from + delta;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function angularDegrees(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = Math.PI / 180;
  const phi1 = lat1 * toRad;
  const phi2 = lat2 * toRad;
  const dLat = (lat2 - lat1) * toRad;
  const dLng = (lng2 - lng1) * toRad;
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLng / 2) ** 2;
  return (2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(Math.max(0, 1 - haversine)))) / toRad;
}

function nearestFocus(lat: number, lng: number, current: string | null) {
  let bestId: string | null = null;
  let best = Infinity;
  let currentDist = Infinity;
  for (const place of orderedDestinations) {
    const dist = angularDegrees(lat, lng, place.lat, place.lng);
    if (dist > FOCUS_FRONT) continue;
    if (place.id === current) currentDist = dist;
    if (dist < best) {
      best = dist;
      bestId = place.id;
    }
  }
  const challenger = bestId && best <= FOCUS_ENTER ? bestId : null;
  if (current && currentDist <= FOCUS_STICK) {
    if (!challenger || challenger === current) return current;
    if (currentDist - best < FOCUS_MARGIN) return current;
    return challenger;
  }
  return challenger;
}

type Pose = "drift" | "seek" | "hold";

type Motion = {
  pose: Pose;
  anchorLat: number;
  anchorLng: number;
  speed: number;
  framed: (() => void) | null;
  suspended: boolean;
  user: boolean;
  discover: boolean;
  last: number;
  raf: number;
};

const FOCUS_ENTER = 24;
const FOCUS_STICK = 32;
const FOCUS_MARGIN = 2.2;
const FOCUS_FRONT = 78;
const FOCUS_HOLD = 200;

export const DestinationGlobe = forwardRef<DestinationGlobeHandle, Props>(function DestinationGlobe(
  { activeId, hoverId, reduced, quality, onReady, onHover, onSelect, onDragStart, onDragEnd, onDiscover, onFail },
  ref,
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const dragRef = useRef(false);
  const coastRef = useRef(0);
  const readyRef = useRef(false);
  const reducedMotion = useRef(reduced);
  const unbindRef = useRef<(() => void) | null>(null);
  const motionRef = useRef<Motion>({
    pose: "drift",
    anchorLat: 18,
    anchorLng: 46,
    speed: 1.5,
    framed: null,
    suspended: false,
    user: false,
    discover: false,
    last: 0,
    raf: 0,
  });
  const watchRef = useRef({ live: false, pending: null as string | null, since: 0, committed: null as string | null });
  const activeIdRef = useRef(activeId);
  const onDiscoverRef = useRef(onDiscover);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);

  const material = useMemo(
    () =>
      new MeshPhongMaterial({
        color: OCEAN,
        emissive: "#24242a",
        shininess: 5,
        specular: "#7d7d84",
      }),
    [],
  );

  const markers = useMemo<Marker[]>(
    () =>
      orderedDestinations.map((destination) => ({
        id: destination.id,
        name: destination.name,
        lat: destination.lat,
        lng: destination.lng,
        nudgeX: destination.nudgeX,
        nudgeY: destination.nudgeY,
        active: destination.id === activeId,
        showLabel: hoverId ? destination.id === hoverId : destination.id === activeId,
      })),
    [activeId, hoverId],
  );

  const stopCoast = useCallback(() => {
    if (coastRef.current) cancelAnimationFrame(coastRef.current);
    coastRef.current = 0;
  }, []);

  const releaseUser = useCallback(() => {
    motionRef.current.user = false;
  }, []);

  const claimUser = useCallback(() => {
    const motion = motionRef.current;
    motion.user = true;
    motion.discover = true;
    motion.pose = "drift";
    motion.framed = null;
    motion.speed = 1.5;
  }, []);

  const focus = useCallback(
    (lat: number, lng: number, onFramed?: () => void) => {
      const motion = motionRef.current;
      const resting = motion.pose !== "seek";
      motion.anchorLat = lat;
      motion.anchorLng = lng;
      motion.framed = onFramed ?? null;
      motion.discover = false;
      watchRef.current.live = false;
      stopCoast();
      if (reducedMotion.current) {
        motion.pose = "hold";
        motion.framed = null;
        globeRef.current?.pointOfView({ lat, lng, altitude: ALTITUDE }, 0);
        onFramed?.();
        return;
      }
      motion.pose = "seek";
      if (resting) motion.speed = 1.5;
    },
    [stopCoast],
  );

  useImperativeHandle(ref, () => ({
    focus,
    pause: () => {
      motionRef.current.suspended = true;
      motionRef.current.last = 0;
      globeRef.current?.pauseAnimation();
    },
    resume: () => {
      motionRef.current.suspended = false;
      motionRef.current.last = 0;
      globeRef.current?.resumeAnimation();
    },
  }), [focus]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const box = wrap.getBoundingClientRect();
      const width = Math.max(1, Math.round(box.width));
      const height = Math.max(1, Math.round(box.height));
      setSize((current) => (current.width === width && current.height === height ? current : { width, height }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    onDiscoverRef.current = onDiscover;
  }, [onDiscover]);

  useEffect(() => {
    reducedMotion.current = reduced;
    if (!reduced) return;
    const motion = motionRef.current;
    if (motion.pose !== "seek") return;
    globeRef.current?.pointOfView({ lat: motion.anchorLat, lng: motion.anchorLng, altitude: ALTITUDE }, 0);
    const done = motion.framed;
    motion.framed = null;
    motion.pose = "hold";
    done?.();
  }, [reduced]);

  useEffect(() => {
    const tick = (now: number) => {
      const motion = motionRef.current;
      motion.raf = requestAnimationFrame(tick);
      const globe = globeRef.current;
      if (!globe || motion.suspended) {
        motion.last = 0;
        return;
      }
      const pov = globe.pointOfView();
      const watch = watchRef.current;
      if (motion.discover && motion.pose === "drift") {
        if (!watch.live) {
          watch.live = true;
          watch.committed = activeIdRef.current;
          watch.pending = watch.committed;
          watch.since = now;
        }
        const candidate = nearestFocus(pov.lat, pov.lng, watch.committed);
        if (candidate !== watch.pending) {
          watch.pending = candidate;
          watch.since = now;
        } else if (now - watch.since >= FOCUS_HOLD && candidate !== watch.committed) {
          watch.committed = candidate;
          onDiscoverRef.current(candidate);
        }
      } else {
        watch.live = false;
      }
      if (motion.user || reducedMotion.current) {
        motion.last = 0;
        return;
      }
      const dt = Math.min(0.05, motion.last ? (now - motion.last) / 1000 : 0.016);
      motion.last = now;
      if (dt <= 0) return;
      let lat = pov.lat;
      let lng = pov.lng;
      const t = now / 1000;
      const breatheLng = 1.8 * Math.sin(t * 0.55) + 0.45 * Math.sin(t * 0.31);
      const breatheLat = 0.48 * Math.sin(t * 0.4 + 1.1);

      if (motion.pose === "drift") {
        lng += 1.45 * dt;
      } else if (motion.pose === "seek") {
        const dLat = motion.anchorLat - lat;
        const dLng = shortestLng(lng, motion.anchorLng) - lng;
        const dist = Math.hypot(dLat, dLng);
        const far = smoothstep(1.4, 26, dist);
        const desired = 1.6 + 15.4 * far;
        motion.speed += (desired - motion.speed) * (1 - Math.exp(-dt / 0.75));
        const mix = 1 - far;
        const aimLat = motion.anchorLat + breatheLat * mix;
        const aimLng = shortestLng(lng, motion.anchorLng + breatheLng * mix);
        const aimLatDelta = aimLat - lat;
        const aimLngDelta = aimLng - lng;
        const aimDist = Math.hypot(aimLatDelta, aimLngDelta);
        if (aimDist < 1.05) {
          motion.pose = "hold";
          motion.speed = 1.5;
          const done = motion.framed;
          motion.framed = null;
          done?.();
        } else {
          const step = Math.min(aimDist, Math.max(0.4, motion.speed) * dt);
          const scale = step / aimDist;
          lat += aimLatDelta * scale;
          lng += aimLngDelta * scale;
        }
      } else {
        const aimLat = motion.anchorLat + breatheLat;
        const aimLng = shortestLng(lng, motion.anchorLng + breatheLng);
        const k = 1 - Math.exp(-dt / 0.48);
        lat += (aimLat - lat) * k;
        lng += (aimLng - lng) * k;
      }

      globe.pointOfView({ lat, lng, altitude: ALTITUDE }, 0);
    };
    motionRef.current.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(motionRef.current.raf);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let moved = false;
    let turning = false;
    let velocity = 0;

    const coast = () => {
      velocity *= 0.9;
      const globe = globeRef.current;
      if (!globe || Math.abs(velocity) < 0.04) {
        coastRef.current = 0;
        dragRef.current = false;
        releaseUser();
        onDragEnd();
        return;
      }
      const current = globe.pointOfView();
      globe.pointOfView({ lat: current.lat, lng: current.lng + velocity, altitude: ALTITUDE }, 0);
      coastRef.current = requestAnimationFrame(coast);
    };

    const onDown = (event: PointerEvent) => {
      stopCoast();
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
      moved = false;
      turning = false;
      velocity = 0;
      dragRef.current = false;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        if (event.buttons === 0) return;
        if (Math.hypot(event.clientX - startX, event.clientY - startY) > 7) dragRef.current = true;
        return;
      }
      const dx = event.clientX - lastX;
      const totalX = event.clientX - startX;
      const totalY = event.clientY - startY;
      if (!turning) {
        if (Math.hypot(totalX, totalY) < 8) return;
        if (Math.abs(totalY) > Math.abs(totalX)) return;
        turning = true;
        moved = true;
        dragRef.current = true;
        claimUser();
        setDragging(true);
        const globe = globeRef.current;
        if (globe) {
          const pov = globe.pointOfView();
          globe.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: ALTITUDE }, 0);
        }
        onDragStart();
        wrap.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      const globe = globeRef.current;
      if (!globe) return;
      const current = globe.pointOfView();
      const step = dx * 0.28;
      velocity = step;
      globe.pointOfView({ lat: current.lat, lng: current.lng + step, altitude: ALTITUDE }, 0);
      lastX = event.clientX;
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      setDragging(false);
      if (!moved) return;
      coastRef.current = requestAnimationFrame(coast);
    };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    return () => {
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      stopCoast();
    };
  }, [claimUser, onDragEnd, onDragStart, releaseUser, stopCoast]);

  useEffect(() => {
    return () => {
      stopCoast();
      unbindRef.current?.();
      const globe = globeRef.current;
      globe?.pauseAnimation();
      globe?.renderer()?.dispose();
    };
  }, [stopCoast]);

  const handleReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe || readyRef.current) return;
    readyRef.current = true;
    const renderer = globe.renderer();
    const ratio = quality === "low" ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(ratio);
    renderer.setClearColor(0x000000, 0);
    const controls = globe.controls();
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.55;
    renderer.domElement.style.touchAction = "pan-y";
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.82;
    controls.touches.ONE = 1;
    const start = () => {
      const pov = globe.pointOfView();
      globe.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: ALTITUDE }, 0);
      claimUser();
      setDragging(true);
      onDragStart();
    };
    let dragRelease = 0;
    const end = () => {
      setDragging(false);
      window.clearTimeout(dragRelease);
      dragRelease = window.setTimeout(() => {
        dragRef.current = false;
      }, 220);
      releaseUser();
      onDragEnd();
    };
    controls.addEventListener("start", start);
    controls.addEventListener("end", end);
    unbindRef.current = () => {
      controls.removeEventListener("start", start);
      controls.removeEventListener("end", end);
      window.clearTimeout(dragRelease);
    };
    const key = new DirectionalLight(0xffffff, 0.7);
    key.position.set(0.8, 0.9, 1.8);
    const fill = new DirectionalLight(0xe7e2d8, 0.28);
    fill.position.set(-1.2, -0.2, 0.6);
    globe.lights([new AmbientLight(0xffffff, 1.35), key, fill]);
    globe.pointOfView({ lat: 18, lng: 46, altitude: ALTITUDE }, 0);
    renderer.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      onFail();
    });
    onReady();
  }, [claimUser, onDragEnd, onDragStart, onFail, onReady, quality, releaseUser]);

  const markerElement = useCallback((item: object) => {
    const marker = item as Marker;
    const root = document.createElement("div");
    root.className = `explore-marker${marker.active ? " is-active" : ""}`;
    const dot = document.createElement("span");
    dot.className = "explore-marker-dot";
    root.appendChild(dot);
    if (marker.showLabel) {
      const label = document.createElement("span");
      label.className = "explore-marker-label";
      label.textContent = marker.name;
      label.style.transform = `translate(${marker.nudgeX}px, ${marker.nudgeY}px)`;
      root.appendChild(label);
    }
    return root;
  }, [activeId, hoverId]);

  return (
    <div ref={wrapRef} className={`explore-canvas${dragging ? " is-dragging" : ""}`}>
      {size.width > 0 && (
        <GlobeCanvas
          ref={globeRef}
          animateIn={false}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          rendererConfig={{ antialias: quality === "high", alpha: true, powerPreference: quality === "high" ? "high-performance" : "low-power" }}
          showAtmosphere={false}
          globeMaterial={material}
          polygonsData={landFeatures}
          polygonGeoJsonGeometry={(polygon: object) =>
            (polygon as LandFeature).geometry as { type: string; coordinates: number[] }
          }
          polygonCapColor={(polygon: object) => (activeId && (polygon as LandFeature).properties.destId === activeId ? ACTIVE : LAND)}
          polygonSideColor={(polygon: object) => (activeId && (polygon as LandFeature).properties.destId === activeId ? ACTIVE_SIDE : LAND_SIDE)}
          polygonStrokeColor={(polygon: object) => (activeId && (polygon as LandFeature).properties.destId === activeId ? ACTIVE_STROKE : STROKE)}
          polygonAltitude={(polygon: object) => (activeId && (polygon as LandFeature).properties.destId === activeId ? 0.01 : 0.005)}
          polygonCapCurvatureResolution={quality === "low" ? 2 : 4}
          polygonsTransitionDuration={reduced ? 0 : 420}
          htmlElementsData={markers}
          htmlLat={(marker: object) => (marker as Marker).lat}
          htmlLng={(marker: object) => (marker as Marker).lng}
          htmlAltitude={0.012}
          htmlTransitionDuration={0}
          htmlElement={markerElement}
          onPolygonHover={(polygon: object | null) => onHover(destIdOf(polygon))}
          onPolygonClick={(polygon: object) => {
            if (dragRef.current) return;
            const id = destIdOf(polygon);
            if (id) onSelect(id);
          }}
          onGlobeReady={handleReady}
          showPointerCursor={(type, data) => type === "polygon" && Boolean(destIdOf(data))}
        />
      )}
    </div>
  );
});
