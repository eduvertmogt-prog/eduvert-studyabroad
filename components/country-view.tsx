import { EnquiryForm } from "./enquiry-form";
import type { Country } from "../lib/countries";
import { contact } from "../lib/site";

const support = [
  "Profile, budget, and a realistic country-and-course shortlist.",
  "Applications, documents, and a statement of purpose where the form needs one.",
  "Scholarship checks against awards the university or a public scheme has actually published.",
  "Visa paperwork for that country, and interview practice if an interview is part of the process.",
  "IELTS guidance. Eduvert lists this on its country pages. Other tests count when the university accepts them.",
  "Pre-departure help once the offer and the visa path are in place.",
];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CountryView({ country }: { country: Country }) {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell">
          <p className="eyebrow">Study in {country.name}</p>
          <h1 className="display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
            {country.headline}
          </h1>
          <p className="lede" style={{ marginTop: "1.25rem" }}>
            {country.overview}
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#consult">
              Book a counselling <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-secondary" href="/#destinations">
              All destinations
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="why-country">
        <div className="shell split">
          <div>
            <p className="eyebrow">Why this country</p>
            <h2 className="section-title" id="why-country">
              Why study here.
            </h2>
          </div>
          <ol className="reason-list">
            {country.reasons.map((reason, index) => (
              <li key={reason.title}>
                <span className="index-num">{pad(index)}</span>
                <div>
                  <strong>{reason.title}</strong>
                  <p>{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="courses-title">
        <div className="shell">
          <p className="eyebrow">Courses and universities</p>
          <h2 className="section-title" id="courses-title">
            Popular subjects.
          </h2>
          <p className="lede" style={{ marginTop: "1.25rem" }}>
            {country.universities}
          </p>
          <div className="chip-row">
            {country.courses.map((course) => (
              <span className="chip" key={course}>
                {course}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="eligibility-title">
        <div className="shell split">
          <div>
            <p className="eyebrow">Eligibility</p>
            <h2 className="section-title" id="eligibility-title">
              What an application usually needs.
            </h2>
          </div>
          <ol className="reason-list">
            {country.eligibility.map((item, index) => (
              <li key={item}>
                <span className="index-num">{pad(index)}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="costs-title">
        <div className="shell">
          <p className="eyebrow">Money</p>
          <h2 className="section-title" id="costs-title">
            Tuition, living costs, scholarships.
          </h2>
          <div className="card-grid">
            <article className="card">
              <h3>Tuition</h3>
              <p>{country.tuition}</p>
            </article>
            <article className="card">
              <h3>Living costs</h3>
              <p>{country.living}</p>
            </article>
            <article className="card">
              <h3>Scholarships</h3>
              <p>{country.scholarships}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="intake-title">
        <div className="shell split">
          <div>
            <p className="eyebrow">Timing</p>
            <h2 className="section-title" id="intake-title">
              Intakes.
            </h2>
          </div>
          <ol className="reason-list">
            {country.intakes.map((intake, index) => (
              <li key={intake.title}>
                <span className="index-num">{pad(index)}</span>
                <div>
                  <strong>{intake.title}</strong>
                  <p>{intake.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="visa-title">
        <div className="shell split">
          <div>
            <p className="eyebrow">Visa</p>
            <h2 className="section-title" id="visa-title">
              Permission to study, and to work.
            </h2>
          </div>
          <div className="reason-list">
            <article className="card">
              <h3>Student visa</h3>
              <p>{country.visa}</p>
            </article>
            <article className="card" style={{ marginTop: "1rem" }}>
              <h3>Work</h3>
              <p>{country.work}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="eduvert-title">
        <div className="shell">
          <p className="eyebrow">Why Eduvert</p>
          <h2 className="section-title" id="eduvert-title">
            The same counselling, for this country.
          </h2>
          <div className="card-grid">
            {support.map((item, index) => (
              <article className="card" key={item}>
                <span className="step-num">{pad(index)}</span>
                <p style={{ marginTop: "0.9rem" }}>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="country-faq">
        <div className="shell" style={{ maxWidth: "52rem" }}>
          <p className="eyebrow">Questions</p>
          <h2 className="section-title" id="country-faq">
            Before you decide.
          </h2>
          <div className="faq-list">
            {country.faqs.map((faq) => (
              <details key={faq.title} className="faq-item" name={country.slug}>
                <summary>{faq.title}</summary>
                <p>{faq.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="consult" style={{ paddingTop: 0 }}>
        <div className="shell consult-grid">
          <div>
            <p className="eyebrow">{country.name}</p>
            <h2 className="section-title">Talk it through.</h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              Tell Eduvert you are looking at {country.name}. You can also call {contact.phoneDisplay} or use WhatsApp.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
