"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { contact, destinations } from "../lib/site";

const links = [
  { label: "How we help", href: "/#services" },
  { label: "Testimonials", href: "https://www.eduvert.co/testimonials/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const openRef = useRef(false);
  const studyRef = useRef<HTMLDivElement>(null);
  const studyTimer = useRef(0);
  const pathname = usePathname();
  const onDestination = pathname.startsWith("/study-in");

  openRef.current = open;

  useEffect(() => {
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (open || studyOpen) setHidden(false);
  }, [open, studyOpen]);

  useEffect(() => () => window.clearTimeout(studyTimer.current), []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;

      const study = studyRef.current;
      const studyHeld = Boolean(study && (study.matches(":hover") || study.matches(":focus-within")));
      if (openRef.current || studyHeld || y < 40) {
        setHidden(false);
        return;
      }

      if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  function holdStudy() {
    window.clearTimeout(studyTimer.current);
    setStudyOpen(true);
  }

  function releaseStudy() {
    window.clearTimeout(studyTimer.current);
    studyTimer.current = window.setTimeout(() => {
      const study = studyRef.current;
      if (study && (study.matches(":hover") || study.matches(":focus-within"))) return;
      setStudyOpen(false);
    }, 420);
  }

  function current(href: string) {
    if (href.includes("#") || href.startsWith("http")) return undefined;
    return pathname === href ? "page" : undefined;
  }

  return (
    <header className="site-header" data-hidden={hidden && !open ? "true" : "false"}>
      <a href="/" className="brand-logo" onClick={close}>
        <img src="/brand/eduvert-logo.png" alt="Eduvert Overseas Education" />
      </a>

      <nav className="nav-desktop" aria-label="Study abroad">
        <div
          className={`study-menu${studyOpen ? " is-open" : ""}`}
          ref={studyRef}
          onMouseEnter={holdStudy}
          onMouseLeave={releaseStudy}
          onFocus={holdStudy}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (next instanceof Node && event.currentTarget.contains(next)) return;
            releaseStudy();
          }}
        >
          <a
            className="nav-summary"
            href="/study-abroad"
            aria-current={pathname === "/study-abroad" || onDestination ? "page" : undefined}
            aria-haspopup="true"
            aria-expanded={studyOpen}
          >
            Study Abroad
            <span className="nav-caret" aria-hidden="true" />
          </a>
          <div className="dest-panel">
            <div className="dest-card">
              <p className="dest-kicker">Seven countries</p>
              <div className="dest-grid">
                {destinations.map((destination, index) => (
                  <a key={destination.href} href={destination.href} aria-current={current(destination.href)}>
                    <span>{pad(index)}</span>
                    <span>{destination.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={current(link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-end">
        <a className="header-cta" href="/#consult">
          Book a counselling
        </a>
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="menu-mark" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div id="mobile-nav" className="mobile-panel" hidden={!open}>
        <a href="/" onClick={close} aria-current={current("/")}>
          Home
        </a>
        <details>
          <summary>
            Study Abroad
            <span className="nav-caret" aria-hidden="true" />
          </summary>
          <div className="dest-panel">
            <a href="/study-abroad" onClick={close} aria-current={current("/study-abroad")}>
              Study abroad
            </a>
            <div className="dest-grid">
              {destinations.map((destination, index) => (
                <a key={destination.href} href={destination.href} onClick={close} aria-current={current(destination.href)}>
                  <span>{pad(index)}</span>
                  <span>{destination.name}</span>
                </a>
              ))}
            </div>
          </div>
        </details>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={close} aria-current={current(link.href)}>
            {link.label}
          </a>
        ))}
        <div className="mobile-actions">
          <a className="btn btn-primary" href="/#consult" onClick={close}>
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
