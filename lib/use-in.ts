"use client";

import { useEffect, useRef } from "react";

type UseInOptions = {
  threshold?: number;
  once?: boolean;
};

export function useIn<T extends HTMLElement>(thresholdOrOptions: number | UseInOptions = 0.18) {
  const threshold = typeof thresholdOrOptions === "number" ? thresholdOrOptions : (thresholdOrOptions.threshold ?? 0.18);
  const once = typeof thresholdOrOptions === "object" ? Boolean(thresholdOrOptions.once) : false;
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          if (!once) node.classList.remove("is-in");
          return;
        }
        node.classList.add("is-in");
        if (once) observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}
