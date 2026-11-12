"use client";

import { useEffect, useRef, useState } from "react";
import { faqs as siteFaqs } from "../lib/site";

type Faq = {
  question: string;
  answer: string;
};

type FaqIndexProps = {
  items?: Faq[];
  id?: string;
  eyebrow?: string;
  title?: string;
  support?: string;
  embedded?: boolean;
};

export function FaqIndex({
  items = siteFaqs,
  id = "questions",
  eyebrow = "Questions / 01—05",
  title = "Before you book.",
  support = "Good questions deserve clear answers.",
  embedded = false,
}: FaqIndexProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

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
        node.classList.toggle("is-in", Boolean(entry?.isIntersecting));
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>(".faq-q")];
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % buttons.length;
    else if (event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next]?.focus();
  }

  return (
    <section className={`faq-index${embedded ? " is-embedded" : " section"}`} id={id} ref={rootRef} aria-labelledby={`${id}-title`}>
      <div className={embedded ? "exam-faq-shell" : "shell faq-shell"}>
        <header className="faq-head">
          <p className="eyebrow faq-rise" style={{ transitionDelay: "0ms" }}>
            {eyebrow}
          </p>
          <h2 className="faq-title faq-rise" id={`${id}-title`} style={{ transitionDelay: "70ms" }}>
            {title}
          </h2>
          <p className="faq-support faq-rise" style={{ transitionDelay: "140ms" }}>
            {support}
          </p>
        </header>
        <div className="faq-rule" aria-hidden="true" />
        <div className="faq-rows" onKeyDown={onKeyDown}>
          {items.map((faq, index) => {
            const on = open === index;
            const panelId = `${id}-panel-${index}`;
            const buttonId = `${id}-q-${index}`;
            return (
              <div
                key={faq.question}
                className={`faq-row faq-rise${on ? " is-open" : ""}`}
                style={{ transitionDelay: `${180 + index * 55}ms` }}
              >
                <h3 className="faq-heading">
                  <button
                    type="button"
                    className="faq-q"
                    id={buttonId}
                    aria-expanded={on}
                    aria-controls={panelId}
                    onClick={() => setOpen(on ? null : index)}
                  >
                    <span className="faq-no">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-mark" aria-hidden="true">
                      <span className="faq-mark-h" />
                      <span className="faq-mark-v" />
                    </span>
                  </button>
                </h3>
                <div className="faq-panel" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={on ? undefined : true}>
                  <div>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
