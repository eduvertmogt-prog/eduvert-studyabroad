"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { contact, destinations } from "../lib/site";

const links = [
  { label: "How we help", href: "/study-abroad#services" },
  { label: "Testimonials", href: "https://www.eduvert.co/testimonials/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function close() {
    setOpen(false);
  }

  function current(href: string) {
    const pathOnly = href.split("#")[0];
    if (!pathOnly || pathOnly.startsWith("http")) return undefined;
    return pathname === pathOnly ? "page" : undefined;
  }

  return (
    <header className="site-header is-scrolled">
      <div className="shell header-bar">
        <a href="/" className="brand-logo" onClick={close}>
          <img src="/brand/eduvert-logo.png" alt="Eduvert Overseas Education" />
        </a>

        <nav className="nav-desktop" aria-label="Study abroad">
          <a href="/study-abroad" aria-current={current("/study-abroad")}>
            Study Abroad
          </a>
          <details className="dest-menu">
            <summary className="nav-summary">Destinations</summary>
            <div className="dest-panel">
              {destinations.map((destination) => (
                <a key={destination.href} href={destination.href} aria-current={current(destination.href)}>
                  {destination.name}
                </a>
              ))}
            </div>
          </details>
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={current(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary" href="/study-abroad#consult">
            Book a counselling <span className="arrow" aria-hidden="true">→</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-panel" hidden={!open}>
        <a href="/" onClick={close} aria-current={current("/")}>
          Home
        </a>
        <a href="/study-abroad" onClick={close} aria-current={current("/study-abroad")}>
          Study Abroad
        </a>
        <details>
          <summary>Destinations</summary>
          <div className="dest-panel">
            {destinations.map((destination) => (
              <a key={destination.href} href={destination.href} onClick={close}>
                {destination.name}
              </a>
            ))}
          </div>
        </details>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <div className="mobile-actions">
          <a className="btn btn-primary" href="/study-abroad#consult" onClick={close}>
            Book a counselling
          </a>
          <a className="btn btn-secondary" href={contact.phoneHref}>
            Call {contact.phoneDisplay}
          </a>
          <a className="btn btn-secondary" href={contact.whatsappHref}>
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
