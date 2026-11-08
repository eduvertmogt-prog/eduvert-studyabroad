"use client";

import { useEffect, useRef } from "react";
import { contact, destinations, legalLinks, social } from "../lib/site";

const eduvertLinks = [
  { label: "Home", href: "/" },
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "How we help", href: "/#services" },
  { label: "Testimonials", href: "https://www.eduvert.co/testimonials/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialOrder = ["Instagram", "Facebook", "YouTube"];

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const channels = socialOrder
    .map((label) => social.find((item) => item.label === label))
    .filter((item): item is (typeof social)[number] => Boolean(item));

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => node.classList.toggle("is-in", Boolean(entry?.isIntersecting)),
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer className="sig" ref={rootRef}>
      <div className="shell">
        <div className="sig-statement">
          <div className="sig-orbit" aria-hidden="true">
            <span />
            <span />
          </div>
          <p className="sig-eyebrow sig-rise" style={{ transitionDelay: "0ms" }}>
            <span>Eduvert</span>
            <span className="sig-slash" aria-hidden="true">
              {" "}
              /{" "}
            </span>
            <span>Overseas education</span>
          </p>
          <button type="button" className="sig-top" onClick={toTop}>
            Back to top
            <span className="sig-up" aria-hidden="true">
              ↑
            </span>
          </button>
          <h2 className="sig-title sig-rise" style={{ transitionDelay: "80ms" }}>
            GO PLACES.
          </h2>
          <p className="sig-support sig-rise" style={{ transitionDelay: "150ms" }}>
            Your journey doesn&apos;t end here. It&apos;s just getting started.
          </p>
        </div>

        <div className="sig-rule" aria-hidden="true" />

        <div className="sig-nav">
          <nav className="sig-group sig-rise" aria-label="Destinations" style={{ transitionDelay: "220ms" }}>
            <p className="sig-label">Destinations</p>
            <ul className="sig-list sig-dest">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <a href={destination.href}>{destination.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="sig-group sig-rise" aria-label="Eduvert" style={{ transitionDelay: "280ms" }}>
            <p className="sig-label">Eduvert</p>
            <ul className="sig-list sig-edu">
              {eduvertLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sig-group sig-rise" style={{ transitionDelay: "340ms" }}>
            <p className="sig-label">Connect</p>
            <ul className="sig-list sig-social">
              {channels.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <div className="sig-contact">
              <p>{contact.address}</p>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <a href={contact.emailHref}>{contact.email}</a>
            </div>
          </div>
        </div>

        <div className="sig-close">
          <a href="/" className="brand-logo sig-logo">
            <img src="/brand/eduvert-logo.png" alt="Eduvert Overseas Education" />
          </a>
          <p className="sig-copy">© {year} Eduvert</p>
          <ul className="sig-legal">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
