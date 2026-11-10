"use client";

import type { ReactNode } from "react";
import { useIn } from "../lib/use-in";

type Item = {
  title?: string;
  text: string;
};

type GuideIndexProps = {
  kicker: string;
  title: ReactNode;
  support?: string;
  lede?: string;
  items: Item[];
  id: string;
};

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function GuideIndex({ kicker, title, support, lede, items, id }: GuideIndexProps) {
  const rootRef = useIn<HTMLElement>();

  return (
    <section className="guide-index section" ref={rootRef} aria-labelledby={id}>
      <div className="shell guide-shell">
        <header className="guide-head">
          <p className="eyebrow guide-rise" style={{ transitionDelay: "0ms" }}>
            {kicker}
          </p>
          <h2 className="guide-heading guide-rise" id={id} style={{ transitionDelay: "70ms" }}>
            {title}
          </h2>
          {support ? (
            <p className="guide-support guide-rise" style={{ transitionDelay: "140ms" }}>
              {support}
            </p>
          ) : null}
        </header>
        <div className="guide-rule" aria-hidden="true" />
        {lede ? (
          <p className="guide-intro guide-rise" style={{ transitionDelay: "160ms" }}>
            {lede}
          </p>
        ) : null}
        <ol className="guide-rows">
          {items.map((item, index) => (
            <li className="guide-row guide-rise" key={item.title ?? item.text} style={{ transitionDelay: `${180 + index * 50}ms` }}>
              <span className="guide-no">{pad(index)}</span>
              <div className="guide-body">
                {item.title ? <h3>{item.title}</h3> : null}
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
