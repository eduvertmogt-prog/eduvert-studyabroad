"use client";

import type { DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CountryWhy({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });

  return (
    <section className="country-sec" ref={ref} aria-labelledby="why-country">
      <div className="country-shell country-why">
        <figure className="country-frame country-rise" aria-hidden="true">
          <img
            className="country-photo"
            src={content.photo}
            srcSet={`${content.photoSm} 800w, ${content.photo} 1600w`}
            sizes="(max-width: 899px) 92vw, 46vw"
            width={1600}
            height={900}
            alt=""
            style={{ objectPosition: content.whyPosition }}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div>
          <p className="country-kicker country-rise">02 / Why this destination</p>
          <h2 className="country-heading country-rise" id="why-country" style={{ transitionDelay: "70ms" }}>
            What to consider in {content.place}.
          </h2>
          <ol className="country-reasons">
            {content.country.reasons.map((reason, index) => (
              <li className="country-reason country-rise" key={reason.title} style={{ transitionDelay: `${140 + index * 70}ms` }}>
                <span className="country-no">{pad(index)}</span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
