"use client";

import type { ReactNode } from "react";
import { useIn } from "../lib/use-in";

type GuideHeroProps = {
  tone?: "yellow" | "paper";
  kicker: string;
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

export function GuideHero({ tone = "paper", kicker, title, lede, actions, children }: GuideHeroProps) {
  const rootRef = useIn<HTMLElement>();

  return (
    <section className={`guide-hero section is-${tone}`} ref={rootRef} aria-labelledby="guide-title">
      <div className="shell">
        <div className="guide-sheet">
          <p className="eyebrow guide-rise" style={{ transitionDelay: "0ms" }}>
            {kicker}
          </p>
          <h1 className="guide-title guide-rise" id="guide-title" style={{ transitionDelay: "70ms" }}>
            {title}
          </h1>
          <div className="guide-lede guide-rise" style={{ transitionDelay: "140ms" }}>
            {lede}
          </div>
          {actions ? (
            <div className="hero-actions guide-rise" style={{ transitionDelay: "210ms" }}>
              {actions}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
