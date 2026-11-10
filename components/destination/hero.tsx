"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { DestinationContent } from "../../lib/destination";

gsap.registerPlugin(useGSAP);

const ease = "power3.out";

export function CountryHero({ content }: { content: DestinationContent }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const node = root.current;
      if (!node) return;
      const mm = gsap.matchMedia();
      node.classList.add("is-ready");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(node);
        const tl = gsap.timeline({ defaults: { ease, force3D: true } });
        tl.fromTo(
          q(".country-hero-photo"),
          { opacity: 0, scale: 1.035 },
          { opacity: 1, scale: 1, duration: 1.15 },
          0,
        );
        tl.fromTo(q(".country-hero-kicker"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.12);
        tl.fromTo(q(".country-hero-line span"), { yPercent: 108 }, { yPercent: 0, duration: 0.74, stagger: 0.1 }, 0.16);
        tl.fromTo(q(".country-hero-copy"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.42);
        tl.fromTo(
          q(".country-hero-actions, .country-hero-foot, .country-hero-scroll"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
          0.56,
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="country-hero" ref={root} aria-labelledby="guide-title">
      <div className="country-hero-media">
        <img
          className="country-hero-photo"
          src={content.photo}
          srcSet={`${content.photoSm} 800w, ${content.photo} 1600w`}
          sizes="100vw"
          width={1600}
          height={900}
          alt={content.photoAlt}
          style={{ objectPosition: content.heroPosition }}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="country-hero-scrim" aria-hidden="true" />
      <div className="country-hero-shell">
        <p className="country-hero-kicker">
          Eduvert / Destinations / {content.index} of {content.total}
        </p>
        <h1 className={`country-hero-title${content.longName ? " is-long" : ""}`} id="guide-title">
          <span className="country-hero-line is-soft">
            <span>Study in</span>
          </span>
          <span className="country-hero-line">
            <span>{content.country.name}.</span>
          </span>
        </h1>
        <div className="country-hero-copy">
          <p>{content.heroSupport}</p>
          <p>{content.decision}</p>
        </div>
        <div className="country-hero-actions">
          <a className="btn btn-primary" href="#consult">
            Plan your {content.country.name} journey
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <div className="country-hero-foot">
          <p className="country-hero-place">
            {content.region} / {content.country.name}
          </p>
          <a className="country-hero-back" href="/study-abroad">
            All destinations
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <a className="country-hero-scroll" href="#destination">
          <span className="sr-only">Scroll to the introduction</span>
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
