import type { Metadata } from "next";
import { contact, destinations } from "../lib/site";

export const metadata: Metadata = {
  title: "Eduvert Study Abroad | Navi Mumbai",
  description:
    "Eduvert counsels students from Navi Mumbai on study in the UK, USA, Canada, Australia, Ireland, France, and New Zealand.",
};

export default function HomePage() {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Navi Mumbai</p>
            <h1 className="display">
              Study abroad,
              <br />
              with a plan.
            </h1>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              Eduvert advises students on countries, universities, applications, scholarships where they exist, and visas.
              The office is at Haware Centurion Mall, Seawoods.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/study-abroad">
                Open Study Abroad <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-secondary" href="/contact">
                Contact
              </a>
            </div>
          </div>
          <div className="address-card" style={{ borderColor: "var(--color-line)", color: "inherit" }}>
            <p className="eyebrow">Office</p>
            <p style={{ margin: "0 0 1rem", fontSize: "1.25rem", lineHeight: 1.45 }}>{contact.address}</p>
            <p style={{ margin: 0 }}>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <br />
              <a href={contact.emailHref}>{contact.email}</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="home-destinations">
        <div className="shell">
          <p className="eyebrow">Destinations</p>
          <h2 className="section-title" id="home-destinations">
            Seven country guides.
          </h2>
          <div className="card-grid">
            {destinations.map((destination) => (
              <a key={destination.href} className="card" href={destination.href} style={{ textDecoration: "none" }}>
                <h3>{destination.name}</h3>
                <p>Courses, intakes, costs, and the visa.</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
