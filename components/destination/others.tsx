"use client";

import { destinationNav, type DestinationContent } from "../../lib/destination";
import { useIn } from "../../lib/use-in";

export function CountryOthers({ content }: { content: DestinationContent }) {
  const ref = useIn<HTMLElement>({ threshold: 0.08 });
  const items = destinationNav(content.country.slug);

  return (
    <section className="country-sec" ref={ref} aria-labelledby="more-title">
      <div className="country-shell">
        <header className="country-block-head">
          <p className="country-kicker country-rise">The world doesn&apos;t end here.</p>
          <h2 className="country-heading country-rise" id="more-title" style={{ transitionDelay: "70ms" }}>
            Explore another destination.
          </h2>
        </header>
        <ol className="country-index country-rise" style={{ transitionDelay: "140ms" }}>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} aria-current={item.current ? "page" : undefined}>
                <span className="country-index-no">{item.index}</span>
                <span className="country-index-name">{item.name}</span>
                <span className="country-index-go" aria-hidden="true">
                  {item.current ? "Here" : "→"}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
