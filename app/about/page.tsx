import type { Metadata } from "next";
import { contact, services } from "../../lib/site";

export const metadata: Metadata = {
  title: "About Eduvert Study Abroad",
  description:
    "Eduvert counsels students in Navi Mumbai on international universities, applications, scholarships, and visas.",
};

export default function AboutPage() {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell" style={{ maxWidth: "48rem" }}>
          <p className="eyebrow">About</p>
          <h1 className="section-title">Counselling from Seawoods.</h1>
          <div className="copy">
            <p>
              Eduvert is based at {contact.address}. For study abroad, the work is practical: which country fits the
              course and the budget, which universities are realistic, what the application needs, and what the visa
              will ask for.
            </p>
            <p>
              The main Eduvert website also describes professional courses, including digital marketing. This set of
              pages is only the study abroad section. Claims about course length, placement, or brand counts on those
              other programmes are not repeated here.
            </p>
            <p>
              Reach the counselling team on {contact.phoneDisplay}, at {contact.email}, or on WhatsApp.
            </p>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact">
              Contact Eduvert
            </a>
            <a className="btn btn-secondary" href="/study-abroad">
              Study Abroad
            </a>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <h2 className="section-title">What the counselling covers.</h2>
          <div className="card-grid">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
