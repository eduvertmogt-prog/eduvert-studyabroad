"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";
import { CountryAccordion } from "./accordion";

export function CountryFaq({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" id="country-faq" ref={ref} aria-labelledby="country-faq-title">
      <div className="country-shell country-faq">
        <header>
          <p className="country-kicker country-rise">Answers</p>
          <h2 className="country-heading country-rise" id="country-faq-title" style={{ transitionDelay: "70ms" }}>
            Questions worth asking.
            <span>Before you decide.</span>
          </h2>
          <a className="country-text-link country-rise" href="#consult" style={{ transitionDelay: "140ms" }}>
            Speak to a counsellor
            <span aria-hidden="true">→</span>
          </a>
        </header>
        <div className="country-rise" style={{ transitionDelay: "120ms" }}>
          <CountryAccordion items={content.country.faqs} idPrefix="country-faq" />
        </div>
      </div>
    </section>
  );
}
