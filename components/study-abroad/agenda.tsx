"use client";

import { counselChapters } from "../../lib/study-abroad";
import { useIn } from "../../lib/use-in";

export function Agenda() {
  const root = useIn<HTMLElement>({ threshold: 0.02, once: true });

  return (
    <section className="agenda chapter" ref={root} aria-labelledby="agenda-title">
      <div className="folio-shell agenda-layout">
        <header className="folio-head folio-rise">
          <p className="eyebrow">Guidance / 03</p>
          <h2 className="folio-heading" id="agenda-title">
            Every big decision
            <span>starts with a clear plan.</span>
          </h2>
          <p className="folio-support">
            From choosing a destination to preparing for departure, Eduvert helps students navigate the decisions that
            matter.
          </p>
        </header>

        <ol className="agenda-list folio-rise">
          {counselChapters.map((chapter) => (
            <li className="agenda-panel" key={chapter.title}>
              <p className="agenda-index">{chapter.index}</p>
              <div>
                <h3>{chapter.title}</h3>
                <ul>
                  {chapter.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
