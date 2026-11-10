"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";
import { CountryAccordion } from "./accordion";

export function CountryEligibility({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" ref={ref} aria-labelledby="eligibility-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">04 / Eligibility and preparation</p>
          <h2 className="country-heading country-rise" id="eligibility-title" style={{ transitionDelay: "70ms" }}>
            What your application needs.
          </h2>
          <p className="country-support country-rise" style={{ transitionDelay: "120ms" }}>
            Requirements are set by the university and, after an offer, by the visa authority. This is the usual set, not a guarantee of admission.
          </p>
        </header>
        <div className="country-rise" style={{ transitionDelay: "160ms" }}>
          <CountryAccordion items={content.eligibility} idPrefix="ready" />
        </div>
      </div>
    </section>
  );
}
