"use client";

import { costNote, type DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

export function CountryIntroduction({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" id="destination" ref={ref} aria-labelledby="destination-title">
      <div className="country-shell">
        <div className="country-split">
          <header>
            <p className="country-kicker country-rise">01 / The destination</p>
            <h2 className="country-heading country-rise" id="destination-title" style={{ transitionDelay: "70ms" }}>
              A closer look at studying in {content.place}.
            </h2>
          </header>
          <div className="country-prose country-rise" style={{ transitionDelay: "120ms" }}>
            <p>{content.country.overview}</p>
            <p>{content.consider}</p>
          </div>
        </div>
        <dl className="country-facts">
          {content.facts.map((fact, index) => (
            <div className="country-rise" key={fact.label} style={{ transitionDelay: `${180 + index * 60}ms` }}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="country-note country-rise" style={{ transitionDelay: "420ms" }}>
          {costNote}
        </p>
      </div>
    </section>
  );
}
