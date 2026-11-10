"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CountryAcademics({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });
  const named = content.institutions.length > 0;

  return (
    <section className="country-sec" ref={ref} aria-labelledby="courses-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">03 / Academic possibilities</p>
          <h2 className="country-heading country-rise" id="courses-title" style={{ transitionDelay: "70ms" }}>
            Find the right place to begin.
          </h2>
        </header>
        <div className="country-study">
          <div className="country-rise" style={{ transitionDelay: "120ms" }}>
            {named ? (
              <ol className="country-unis">
                {content.institutions.map((name, index) => (
                  <li key={name}>
                    <span className="country-no">{pad(index)}</span>
                    <span>{name}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            <p className="country-prose-single">{content.country.universities}</p>
          </div>
          <figure className="country-frame country-frame-study" aria-hidden="true">
            <img
              className="country-photo"
              src={content.photo}
              srcSet={`${content.photoSm} 800w, ${content.photo} 1600w`}
              sizes="(max-width: 899px) 92vw, 38vw"
              width={1600}
              height={900}
              alt=""
              style={{ objectPosition: content.studyPosition }}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
        <div className="country-subjects country-rise" style={{ transitionDelay: "180ms" }}>
          <h3>Subject interests</h3>
          <ul className="country-courses">
            {content.country.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
          <p className="country-note">
            These are areas of interest. They are not a promise that every university on a shortlist teaches each subject.
          </p>
        </div>
      </div>
    </section>
  );
}
