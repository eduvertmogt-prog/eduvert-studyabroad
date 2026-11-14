import type { Metadata } from "next";
import { EnquiryForm } from "../../components/enquiry-form";
import { contact } from "../../lib/site";
import "@/app/contact.css";

export const metadata: Metadata = {
  title: "Contact Eduvert Study Abroad",
  description: "Call, email, or visit Eduvert at Haware Centurion Mall, Seawoods, Navi Mumbai.",
};

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=Haware+Centurion+Mall+Seawoods+Navi+Mumbai+400706";

export default function ContactPage() {
  return (
    <main className="contact-page" id="content">
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h1 className="contact-title" id="contact-title">
              <span>The office,</span> <span>and a direct line.</span>
            </h1>
            <address className="contact-address">
              <p>{contact.address}</p>
              <p className="contact-note">
                The same office is listed on eduvert.co as Sector 19, Nerul East, Navi Mumbai 400706.
              </p>
            </address>
            <ul className="contact-lines">
              <li>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </li>
              <li>
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
            </ul>
            <div className="hero-actions">
              <a className="btn btn-secondary" href={contact.whatsappHref} rel="noopener noreferrer">
                WhatsApp
              </a>
              <a className="btn btn-secondary" href={mapHref} rel="noopener noreferrer">
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
