"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

export function CountryVisa({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" ref={ref} aria-labelledby="visa-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">07 / Visa and work</p>
          <h2 className="country-heading country-rise" id="visa-title" style={{ transitionDelay: "70ms" }}>
            From an offer to the next step.
          </h2>
        </header>
        <div className="country-visa">
          <article className="country-rise" style={{ transitionDelay: "120ms" }}>
            <h3>Permission to study</h3>
            <p>{content.country.visa}</p>
            <p className="country-source">
              <a href={content.guidance.href} target="_blank" rel="noopener noreferrer">
                {content.guidance.label}
              </a>
              <span> Rules change. Read the current official page before you apply. This guide does not replace it.</span>
            </p>
          </article>
          <article className="country-rise" style={{ transitionDelay: "180ms" }}>
            <h3>Working during and after study</h3>
            <p>{content.country.work}</p>
            <p className="country-source">
              A study permission, a post-study work permission, and permanent residence are separate decisions. Eduvert does not
              grant any of them.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
