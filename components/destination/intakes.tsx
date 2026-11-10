"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CountryIntakes({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" ref={ref} aria-labelledby="intake-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">06 / Intakes and timing</p>
          <h2 className="country-heading country-rise" id="intake-title" style={{ transitionDelay: "70ms" }}>
            When a course can start.
          </h2>
        </header>
        <ol className="country-timeline" data-steps={content.country.intakes.length}>
          {content.country.intakes.map((intake, index) => (
            <li className="country-rise" key={intake.title} style={{ transitionDelay: `${140 + index * 80}ms` }}>
              <span className="country-no">{pad(index)}</span>
              <h3>{intake.title}</h3>
              <p>{intake.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
