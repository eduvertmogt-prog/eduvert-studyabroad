"use client";

import { type KeyboardEvent, useState } from "react";
import { application, eligibility, pad } from "../../lib/study-abroad";
import { useIn } from "../../lib/use-in";

type Tab = "need" | "path";

const chapters: { id: Tab; label: string; note: string; index: string }[] = [
  {
    id: "need",
    label: "What you’ll need",
    note: "Five things universities and visa offices often ask about.",
    index: "01",
  },
  {
    id: "path",
    label: "Application journey",
    note: "Six stages, from the first shortlist to the day you leave.",
    index: "02",
  },
];

export function Readiness() {
  const root = useIn<HTMLElement>({ threshold: 0.02, once: true });
  const [tab, setTab] = useState<Tab>("need");

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const order: Tab[] = ["need", "path"];
    const index = order.indexOf(tab);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(order.length - 1, index + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, index - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = order.length - 1;
    const id = order[next];
    if (!id) return;
    setTab(id);
    event.currentTarget.querySelector<HTMLElement>(`#ready-tab-${id}`)?.focus();
  }

  return (
    <section className="ready chapter" ref={root} aria-labelledby="ready-title">
      <div className="guide-shell ready-spread">
        <div className="ready-nav folio-rise">
          <header className="folio-head ready-head">
            <p className="eyebrow">Preparation / 04</p>
            <h2 className="folio-heading" id="ready-title">
              From planning
              <span>to departure.</span>
            </h2>
            <p className="folio-support">
              The essentials to prepare, and the steps that bring your application together.
            </p>
          </header>

          <div
            className="ready-chapters"
            role="tablist"
            aria-label="Preparation guide"
            aria-orientation="vertical"
            onKeyDown={onTabKey}
          >
            {chapters.map((item) => {
              const selected = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`ready-tab-${item.id}`}
                  className={`ready-chapter${selected ? " is-on" : ""}`}
                  aria-selected={selected}
                  aria-controls={`ready-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(item.id)}
                >
                  <span className="ready-chapter-index">{item.index}</span>
                  <span className="ready-chapter-copy">
                    <span className="ready-chapter-title">{item.label}</span>
                    <span className="ready-chapter-note">{item.note}</span>
                  </span>
                  <span className="ready-chapter-go" aria-hidden="true">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ready-stage">
          <div
            className="ready-panel"
            role="tabpanel"
            id="ready-panel-need"
            aria-labelledby="ready-tab-need"
            hidden={tab !== "need"}
          >
            {tab === "need" ? (
              <>
                <ol className="ready-ledger">
                  {eligibility.map((item, index) => (
                    <li key={item.title}>
                      <span className="ready-ledger-num">{pad(index)}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ol>
                <p className="ready-disclaimer">
                  These are the considerations universities and visa offices often raise. They are not a universal
                  checklist, and they are not a guarantee of admission.
                </p>
              </>
            ) : null}
          </div>

          <div
            className="ready-panel"
            role="tabpanel"
            id="ready-panel-path"
            aria-labelledby="ready-tab-path"
            hidden={tab !== "path"}
          >
            {tab === "path" ? (
              <ol className="ready-ledger is-path">
                {application.map((item, index) => (
                  <li key={item.title}>
                    <span className="ready-ledger-num">{pad(index)}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
