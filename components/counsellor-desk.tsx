"use client";

import { useEffect, useRef, useState } from "react";

type TopicId = "academic" | "budget" | "direction" | "intake";

type Topic = {
  id: TopicId;
  index: string;
  label: string;
  short: string;
  title: string;
  text: string;
  note: string;
};

const topics: Topic[] = [
  {
    id: "academic",
    index: "01",
    label: "Academic profile",
    short: "Academics",
    title: "Understanding the starting point.",
    text: "Academic performance helps identify which programmes may be realistic. Entry requirements vary by university, course, and intake, so eligibility must always be assessed in context.",
    note: "Eligibility varies by programme",
  },
  {
    id: "budget",
    index: "02",
    label: "Financial considerations",
    short: "Finances",
    title: "A plan that respects the budget.",
    text: "Tuition is only part of the picture. Living costs, country-specific expenses, and available funding all influence what makes sense before a shortlist is built.",
    note: "Funding options need context",
  },
  {
    id: "direction",
    index: "03",
    label: "Career direction",
    short: "Direction",
    title: "Choosing fit, not just availability.",
    text: "The right direction depends on more than what is open for applications. Course content, specialisations, future goals, and career opportunities all shape the recommendation.",
    note: "Course fit should lead shortlist",
  },
  {
    id: "intake",
    index: "04",
    label: "Intake readiness",
    short: "Readiness",
    title: "Making the timing work.",
    text: "Application deadlines, required documents, language testing, and preparation time all influence which intake is realistic and worth pursuing.",
    note: "Timing shapes the application path",
  },
];

function Mark({ kind }: { kind: "ring" | "line" }) {
  if (kind === "ring") {
    return (
      <svg className="desk-mark desk-mark-ring" viewBox="0 0 120 36" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="60" cy="18" rx="54" ry="13" />
      </svg>
    );
  }
  return (
    <svg className="desk-mark desk-mark-line" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="4" x2="100" y2="4" />
    </svg>
  );
}

export function CounsellorDesk() {
  const rootRef = useRef<HTMLElement>(null);
  const seen = useRef(false);
  const [active, setActive] = useState<TopicId>("academic");
  const [swap, setSwap] = useState(0);
  const topic = topics.find((item) => item.id === active) ?? topics[0];

  useEffect(() => {
    seen.current = true;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle("is-in", Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.16));
      },
      { threshold: [0, 0.16, 0.32] },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const choose = (id: TopicId) => {
    if (id === active) return;
    setActive(id);
    if (seen.current) setSwap((value) => value + 1);
  };

  const field = (id: TopicId) => `desk-field${active === id ? " is-on" : ""}`;

  return (
    <section className="section desk" id="services" aria-labelledby="services-title" style={{ paddingTop: 0 }} ref={rootRef}>
      <div className="shell">
        <div className="desk-spread">
        <div className="desk-intro">
          <p className="eyebrow desk-rise">Counselling / A closer look</p>
          <div className="desk-intro-row">
            <h2 className="desk-title desk-rise" id="services-title">
              Every detail matters.
            </h2>
            <p className="lede desk-rise">A closer look at how a student’s profile shapes the guidance.</p>
          </div>
        </div>

          <div className="desk-folio desk-rise">
            <article className="desk-paper" data-focus={active} aria-label="Fictional student case file">
              <p className="desk-tab" aria-hidden="true">
                Open case
              </p>
              <header className="desk-dochead">
                <div>
                  <p className="desk-kicker">EDV / Student profile</p>
                  <p className="desk-case">Illustrative case / 001</p>
                  <p className="desk-doctitle">Initial assessment</p>
                </div>
                <div className="desk-stamp" aria-hidden="true">
                  <span>Illustrative</span>
                  <span>001</span>
                </div>
              </header>
              <p className="desk-fiction">Fictional illustrative example. Not an Eduvert student or an admissions outcome.</p>

              <div className="desk-identity">
                <p className="desk-label">Name</p>
                <p className="desk-name">Aarav Mehta</p>
                <button
                  type="button"
                  className={field("direction")}
                  aria-pressed={active === "direction"}
                  aria-controls="desk-topic-direction"
                  onClick={() => choose("direction")}
                >
                  <span className="desk-degree">
                    <span className="desk-value">
                      Master’s
                      <Mark kind="line" />
                    </span>
                    <span className="desk-in">in</span>
                    <span className="desk-value">
                      Data Science
                      <Mark kind="ring" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="desk-facts">
                <button
                  type="button"
                  className={field("academic")}
                  aria-pressed={active === "academic"}
                  aria-controls="desk-topic-academic"
                  onClick={() => choose("academic")}
                >
                  <span className="desk-label">Academic record</span>
                  <span className="desk-figure">
                    <span className="desk-value">
                      8.1
                      <Mark kind="ring" />
                    </span>
                    <span className="desk-unit">/10 CGPA</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={field("budget")}
                  aria-pressed={active === "budget"}
                  aria-controls="desk-topic-budget"
                  onClick={() => choose("budget")}
                >
                  <span className="desk-label">Estimated budget</span>
                  <span className="desk-figure">
                    <span className="desk-value">
                      ₹30–40
                      <Mark kind="line" />
                    </span>
                    <span className="desk-unit">lakh</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={field("intake")}
                  aria-pressed={active === "intake"}
                  aria-controls="desk-topic-intake"
                  onClick={() => choose("intake")}
                >
                  <span className="desk-label">Preferred intake</span>
                  <span className="desk-figure">
                    <span className="desk-value">
                      September
                      <Mark kind="ring" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="desk-priorities">
                <p className="desk-label">Priorities</p>
                <p className="desk-chips">
                  <span className="desk-chip is-career">Career opportunities</span>
                  <span className="desk-chip is-cost">Affordability</span>
                  <span className="desk-chip is-fit">Course fit</span>
                </p>
              </div>

              <p className={`desk-cue${active === "intake" ? " is-on" : ""}`} aria-hidden="true">
                <span>Documents</span>
                <span>Language tests</span>
                <span>Deadlines</span>
              </p>

              <p className="desk-aside" key={topic.note}>
                <span>nb</span>
                {topic.note}
              </p>
              <p className="desk-folio-no" aria-hidden="true">
                EDV · 001 · p. 01
              </p>
            </article>
          </div>

          <aside className="desk-notes desk-rise">
            <p className="desk-prompt">Select a detail to explore</p>
            <div className="desk-topics" role="group" aria-label="Assessment topics">
              {topics.map((item) => {
                const on = active === item.id;
                return (
                  <div key={item.id} className={`desk-topic-item${on ? " is-on" : ""}`}>
                    <button
                      type="button"
                      className={`desk-topic${on ? " is-on" : ""}`}
                      aria-pressed={on}
                      aria-expanded={on}
                      aria-controls={`desk-topic-${item.id}`}
                      onClick={() => choose(item.id)}
                    >
                      <span className="desk-topic-no">{item.index}</span>
                      <span>{item.label}</span>
                    </button>
                    <div className="desk-topic-panel" id={`desk-topic-${item.id}`} role="region" aria-hidden={on ? undefined : true}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="desk-pocket">
          <article className="pocket-file" data-focus={active} aria-label="Fictional student case file">
            <header className="pocket-head">
              <p className="pocket-kicker">EDV / Case file 001</p>
              <p className="pocket-assess">Illustrative assessment</p>
            </header>
            <p className="pocket-name">Aarav Mehta</p>
            <button
              type="button"
              className={`pocket-degree${active === "direction" ? " is-on" : ""}`}
              aria-pressed={active === "direction"}
              aria-controls="desk-pocket-observation"
              onClick={() => choose("direction")}
            >
              Master’s · Data Science
            </button>

            <div className="pocket-facts">
              <button
                type="button"
                className={`pocket-row${active === "academic" ? " is-on" : ""}`}
                aria-pressed={active === "academic"}
                aria-controls="desk-pocket-observation"
                onClick={() => choose("academic")}
              >
                <span className="pocket-label">Academic record</span>
                <span className="pocket-value">
                  8.1 <span className="pocket-unit">/ 10 CGPA</span>
                </span>
              </button>
              <button
                type="button"
                className={`pocket-row${active === "budget" ? " is-on" : ""}`}
                aria-pressed={active === "budget"}
                aria-controls="desk-pocket-observation"
                onClick={() => choose("budget")}
              >
                <span className="pocket-label">Budget</span>
                <span className="pocket-value">₹30–40 lakh</span>
              </button>
              <button
                type="button"
                className={`pocket-row${active === "intake" ? " is-on" : ""}`}
                aria-pressed={active === "intake"}
                aria-controls="desk-pocket-observation"
                onClick={() => choose("intake")}
              >
                <span className="pocket-label">Preferred intake</span>
                <span className="pocket-value">September</span>
              </button>
              <div className="pocket-row is-static">
                <span className="pocket-label">Priorities</span>
                <span className="pocket-value pocket-priority">
                  <span className="is-fit">Career fit</span>, <span className="is-cost">affordability</span>
                </span>
              </div>
            </div>

            <p className="pocket-note" key={topic.note}>
              {topic.note}
            </p>
            <p className="pocket-fiction">Fictional illustrative example. Not an Eduvert student or an admissions outcome.</p>
          </article>

          <div className="pocket-nav" role="group" aria-label="Assessment topics">
            {topics.map((item) => (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "is-on" : undefined}
                aria-pressed={active === item.id}
                aria-controls="desk-pocket-observation"
                onClick={() => choose(item.id)}
              >
                <span>{item.index}</span>
                {item.short}
              </button>
            ))}
          </div>

          <div
            className={`pocket-observe${swap ? " is-swap" : ""}`}
            id="desk-pocket-observation"
            aria-live="polite"
            key={`${topic.id}-${swap}`}
          >
            <p>{topic.index}</p>
            <h3>{topic.title}</h3>
            <p>{topic.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
