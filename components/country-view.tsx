"use client";

import type { Country } from "../lib/countries";
import { destinations } from "../lib/site";
import { FaqIndex } from "./faq-index";
import { GuideBoard } from "./guide-board";
import { GuideHero } from "./guide-hero";
import { GuideIndex } from "./guide-index";
import { PersonalInvitation } from "./personal-invitation";
import { useIn } from "../lib/use-in";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CountryBand({ country }: { country: Country }) {
  const moneyRef = useIn<HTMLElement>(0.16);
  const courseRef = useIn<HTMLElement>(0.16);
  const visaRef = useIn<HTMLElement>(0.16);
  const moreRef = useIn<HTMLElement>(0.16);
  const stats = [
    { label: "Tuition / year", value: country.planning.tuitionShort },
    { label: "Living / year", value: country.planning.livingShort },
    { label: "After study", value: country.planning.afterStudy },
  ];
  const href = destinations.find((item) => item.name === country.name)?.href;

  return (
    <>
      <section className="guide-money section" ref={moneyRef} aria-labelledby="costs-title">
        <div className="shell guide-shell">
          <header className="guide-head">
            <p className="eyebrow guide-rise" style={{ transitionDelay: "0ms" }}>
              Money / Planning ranges
            </p>
            <h2 className="guide-heading guide-rise" id="costs-title" style={{ transitionDelay: "70ms" }}>
              Tuition, living, what comes after.
            </h2>
            <p className="guide-support guide-rise" style={{ transitionDelay: "140ms" }}>
              Figures for planning. Not an offer.
            </p>
          </header>
          <div className="guide-rule" aria-hidden="true" />
          <div className="guide-figures">
            {stats.map((item, index) => (
              <article className="guide-figure guide-rise" key={item.label} style={{ transitionDelay: `${180 + index * 70}ms` }}>
                <p className="guide-figure-kicker">{item.label}</p>
                <p className="guide-figure-value">{item.value}</p>
              </article>
            ))}
          </div>
          <div className="guide-money-copy">
            <p className="guide-rise" style={{ transitionDelay: "280ms" }}>
              <strong>Tuition.</strong> {country.tuition}
            </p>
            <p className="guide-rise" style={{ transitionDelay: "330ms" }}>
              <strong>Living costs.</strong> {country.living}
            </p>
            <p className="guide-rise" style={{ transitionDelay: "380ms" }}>
              <strong>Scholarships.</strong> {country.scholarships}
            </p>
          </div>
        </div>
      </section>

      <section className="guide-courses section" ref={courseRef} aria-labelledby="courses-title">
        <div className="shell">
          <header className="guide-head">
            <p className="eyebrow guide-rise" style={{ transitionDelay: "0ms" }}>
              Courses / Universities
            </p>
            <h2 className="guide-heading guide-rise" id="courses-title" style={{ transitionDelay: "70ms" }}>
              Popular subjects.
            </h2>
          </header>
          <div className="guide-rule" aria-hidden="true" />
          <p className="guide-intro guide-rise" style={{ transitionDelay: "160ms" }}>
            {country.universities}
          </p>
          <div className="dest-card guide-board guide-rise" style={{ transitionDelay: "220ms" }}>
            <p className="dest-kicker">Subjects students ask about</p>
            <div className="dest-grid guide-course-grid">
              {country.courses.map((course, index) => (
                <span key={course}>
                  <span>{pad(index)}</span>
                  <span>{course}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuideIndex
        id="intake-title"
        kicker={`Timing / 01—${pad(country.intakes.length - 1)}`}
        title="Intakes."
        support="The main window first."
        items={country.intakes}
      />

      <section className="guide-visa section" ref={visaRef} aria-labelledby="visa-title">
        <div className="shell">
          <header className="guide-head">
            <p className="eyebrow guide-rise" style={{ transitionDelay: "0ms" }}>
              Visa / Work
            </p>
            <h2 className="guide-heading guide-rise" id="visa-title" style={{ transitionDelay: "70ms" }}>
              Permission to study, and to work.
            </h2>
          </header>
          <div className="guide-rule" aria-hidden="true" />
          <div className="guide-pair">
            <article className="dest-card guide-rise" style={{ transitionDelay: "180ms" }}>
              <p className="dest-kicker">Student visa</p>
              <h3>The file after the offer.</h3>
              <p>{country.visa}</p>
            </article>
            <article className="dest-card guide-rise" style={{ transitionDelay: "240ms" }}>
              <p className="dest-kicker">Work</p>
              <h3>During the course, then after.</h3>
              <p>{country.work}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="guide-more section" ref={moreRef} aria-labelledby="more-title">
        <div className="shell">
          <header className="guide-head">
            <p className="eyebrow">Destinations</p>
            <h2 className="guide-heading" id="more-title">
              Other countries.
            </h2>
            <p className="guide-support">
              <a href="/study-abroad">All seven guides</a>
            </p>
          </header>
          <div className="guide-rule" aria-hidden="true" />
          <GuideBoard current={href} />
        </div>
      </section>
    </>
  );
}

export function CountryView({ country }: { country: Country }) {
  return (
    <main id="content">
      <GuideHero
        tone="paper"
        kicker={`Study in ${country.name}`}
        title={country.headline}
        lede={<p>{country.overview}</p>}
        actions={
          <>
            <a className="btn btn-primary" href="#consult">
              Book a counselling <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-secondary" href="/study-abroad">
              All destinations
            </a>
          </>
        }
      />

      <GuideIndex
        id="why-country"
        kicker={`Why ${country.name} / 01—${pad(country.reasons.length - 1)}`}
        title="Why study here."
        support="The shortlist still follows your record."
        items={country.reasons}
      />

      <GuideIndex
        id="eligibility-title"
        kicker="Eligibility"
        title="What an application usually needs."
        items={country.eligibility.map((item) => ({ text: item }))}
      />

      <CountryBand country={country} />

      <FaqIndex
        id="country-faq"
        items={country.faqs.map((faq) => ({ question: faq.title, answer: faq.text }))}
        eyebrow={`Questions / ${country.name}`}
        title="Before you decide."
        support="Clear answers for this destination."
      />

      <PersonalInvitation destination={country.name} />
    </main>
  );
}
