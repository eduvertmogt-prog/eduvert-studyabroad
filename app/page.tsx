import type { Metadata } from "next";
import { DestinationExplorer } from "../components/destination-explorer";
import { EnquiryForm } from "../components/enquiry-form";
import { HeroFlight } from "../components/hero-flight";
import { JourneyRoadmap } from "../components/journey-roadmap";
import { ReachBand } from "../components/reach-band";
import { WhyBand } from "../components/why-band";
import { contact, faqs, services } from "../lib/site";

export const metadata: Metadata = {
  title: "Eduvert Study Abroad",
  description:
    "Your future has no borders. Eduvert helps students in Navi Mumbai choose a country, a university, and the steps that follow.",
};

export default function Home() {
  return (
      <main id="content">
        <HeroFlight />
        <ReachBand />

        <WhyBand />

        <DestinationExplorer />

        <JourneyRoadmap />

        <section className="section" id="services" aria-labelledby="services-title" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="eyebrow">Counselling</p>
            <h2 className="section-title" id="services-title">
              How Eduvert helps.
            </h2>
            <div className="card-grid">
              {services.map((service) => (
                <article key={service.title} className="card">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band-dark section" id="stories" aria-labelledby="stories-title">
          <div className="shell story-grid">
            <div>
              <p className="eyebrow" style={{ color: "#F9F91E" }}>
                Student stories
              </p>
              <h2 className="section-title" id="stories-title">
                Hear it from students who have already applied.
              </h2>
              <p className="lede" style={{ marginTop: "1.25rem" }}>
                Student testimonials are published on Eduvert’s testimonials page. Admission
                numbers appear there only when Eduvert has published them.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="https://www.eduvert.co/testimonials/">
                  Read testimonials <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-ghost" href="#consult">
                  Book a counselling
                </a>
              </div>
            </div>
            <div className="address-card">
              <p className="eyebrow" style={{ color: "#F9F91E" }}>
                Navi Mumbai
              </p>
              <p style={{ margin: "0 0 1rem", fontSize: "1.2rem", lineHeight: 1.45 }}>{contact.address}</p>
              <p style={{ margin: 0 }}>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <br />
                <a href={contact.emailHref}>{contact.email}</a>
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="questions" aria-labelledby="questions-title">
          <div className="shell" style={{ maxWidth: "52rem" }}>
            <p className="eyebrow">Questions</p>
            <h2 className="section-title" id="questions-title">
              Before you book.
            </h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question} className="faq-item" name="study-abroad-faq">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="consult" aria-labelledby="consult-title" style={{ paddingTop: 0 }}>
          <div className="shell consult-grid">
            <div>
              <p className="eyebrow">Counselling</p>
              <h2 className="section-title" id="consult-title">
                Your next chapter starts here.
              </h2>
              <p className="lede" style={{ marginTop: "1.25rem" }}>
                Share where you want to study and how to reach you. A counsellor can reply by email,
                phone, or WhatsApp.
              </p>
              <div className="hero-actions">
                <a className="btn btn-secondary" href={contact.phoneHref}>
                  Call {contact.phoneDisplay}
                </a>
                <a className="btn btn-secondary" href={contact.whatsappHref}>
                  WhatsApp
                </a>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>
  );
}
