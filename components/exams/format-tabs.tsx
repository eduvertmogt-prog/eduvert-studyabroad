"use client";

import { type KeyboardEvent, useState } from "react";
import type { ExamSection } from "../../lib/exams/types";

export function FormatTabs({ sections }: { sections: ExamSection[] }) {
  const [current, setCurrent] = useState(0);
  const active = sections[current] ?? sections[0];

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const last = sections.length - 1;
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(last, current + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, current - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    setCurrent(next);
    const tab = document.getElementById(`exam-tab-${sections[next]?.id}`);
    tab?.focus();
  }

  if (!active) return null;

  return (
    <div className="exam-tabs">
      <div className="exam-tablist" role="tablist" aria-label="Exam sections" onKeyDown={onKey}>
        {sections.map((section, index) => {
          const selected = index === current;
          return (
            <button
              key={section.id}
              id={`exam-tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`exam-panel-${section.id}`}
              tabIndex={selected ? 0 : -1}
              className={selected ? "is-on" : undefined}
              onClick={() => setCurrent(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.name}
            </button>
          );
        })}
      </div>
      {sections.map((section, index) => (
        <div
          key={section.id}
          id={`exam-panel-${section.id}`}
          role="tabpanel"
          aria-labelledby={`exam-tab-${section.id}`}
          hidden={index !== current}
          className="exam-panel"
        >
          <p className="exam-panel-lead">{section.purpose}</p>
          <dl className="exam-facts exam-facts-compact">
            <div>
              <dt>Duration</dt>
              <dd>{section.duration}</dd>
            </div>
            <div>
              <dt>Structure</dt>
              <dd>{section.structure}</dd>
            </div>
            <div>
              <dt>Assessment</dt>
              <dd>{section.assessment}</dd>
            </div>
            <div>
              <dt>On the day</dt>
              <dd>{section.rules}</dd>
            </div>
          </dl>
          <ul className="exam-tasks">
            {section.tasks.map((task) => (
              <li key={task.name}>
                <p>
                  <strong>{task.name}</strong>
                  {task.marker ? <span className="exam-marker">{task.marker}</span> : null}
                </p>
                <p>{task.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
