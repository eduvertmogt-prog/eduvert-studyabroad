"use client";

import { costNote, type DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

export function CountryCosts({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });
  const figures = [
    { label: "Tuition / year", value: content.country.planning.tuitionShort },
    { label: content.livingLabel, value: content.country.planning.livingShort },
  ];

  return (
    <section className="country-sec country-sec-surface" ref={ref} aria-labelledby="costs-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">05 / The cost of studying</p>
          <h2 className="country-heading country-rise" id="costs-title" style={{ transitionDelay: "70ms" }}>
            Plan beyond the tuition fee.
          </h2>
        </header>
        <div className="country-cost-figures">
          {figures.map((figure, index) => (
            <div className="country-rise" key={figure.label} style={{ transitionDelay: `${120 + index * 80}ms` }}>
              <p className="country-cost-label">{figure.label}</p>
              <p className="country-cost-value">{figure.value}</p>
            </div>
          ))}
        </div>
        <div className="country-cost-copy">
          <article className="country-rise" style={{ transitionDelay: "240ms" }}>
            <h3>Tuition</h3>
            <p>{content.tuitionText}</p>
          </article>
          <article className="country-rise" style={{ transitionDelay: "300ms" }}>
            <h3>Living costs</h3>
            <p>{content.country.living}</p>
          </article>
          <article className="country-rise" style={{ transitionDelay: "360ms" }}>
            <h3>Scholarships</h3>
            <p>{content.country.scholarships}</p>
          </article>
        </div>
        <p className="country-note country-rise" style={{ transitionDelay: "420ms" }}>
          {costNote} A personal budget and the official proof-of-funds figure are not the same number.
        </p>
      </div>
    </section>
  );
}
