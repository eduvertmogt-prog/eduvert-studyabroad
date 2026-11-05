import type { Metadata } from "next";
import { EnquiryForm } from "../../components/enquiry-form";
import { contact } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact Eduvert Study Abroad",
  description: "Call, email, or visit Eduvert at Haware Centurion Mall, Seawoods, Navi Mumbai.",
};

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=Haware+Centurion+Mall+Seawoods+Navi+Mumbai+400706";

export default function ContactPage() {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell consult-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="section-title">The office, and a direct line.</h1>
            <div className="copy">
              <p>{contact.address}</p>
              <p>
                The contact page on eduvert.co lists the same mall as Sector 19, Nerul East, Navi Mumbai 400706. That
                is this office.
              </p>
              <p>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <br />
                <a href={contact.emailHref}>{contact.email}</a>
              </p>
            </div>
            <div className="hero-actions">
              <a className="btn btn-secondary" href={contact.whatsappHref}>
                WhatsApp
              </a>
              <a className="btn btn-secondary" href={mapHref}>
                Map
              </a>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
