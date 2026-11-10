"use client";

import { useState } from "react";
import { briefing, pad } from "../../lib/study-abroad";
import { useIn } from "../../lib/use-in";

export function Briefing() {
  const root = useIn<HTMLElement>({ threshold: 0.02, once: true });
  const [open, setOpen] = useState(0);

  return (
    <section className="brief chapter" ref={root} aria-labelledby="brief-title">
      <div className="folio-shell">
        <div className="brief-layout">
          <header className="folio-head folio-rise">
            <p className="eyebrow">Answers / 05</p>
            <h2 className="folio-heading" id="brief-title">
              Questions worth asking.
              <span>Answers worth knowing.</span>
            </h2>
            <p className="folio-support">
              Cost, language, work, length of study, and what happens after the degree — answered from the same
              counselling desk that reads the country guides.
            </p>
            <a className="brief-link" href="#consult">
              Speak to a counsellor
              <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className="brief-rows folio-rise" style={{ transitionDelay: "90ms" }}>
            {briefing.map((item, index) => {
              const on = open === index;
              const panelId = `brief-panel-${index}`;
              const buttonId = `brief-q-${index}`;
              return (
                <div className={`brief-item${on ? " is-open" : ""}`} key={item.question}>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      className="brief-q"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => setOpen(index)}
                    >
                      <span className="brief-num">{pad(index)}</span>
                      <span className="brief-q-text">{item.question}</span>
                      <span className="brief-mark" aria-hidden="true">
                        {on ? "–" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div className="brief-a" id={panelId} role="region" aria-labelledby={buttonId}>
                    <div className="brief-a-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
