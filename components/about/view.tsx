"use client";

import { contact } from "../../lib/site";
import { useIn } from "../../lib/use-in";

const services = [
  {
    title: "Country and course selection",
    text: "Explore destinations and academic programmes according to study interests, qualifications, career direction, and budget.",
  },
  {
    title: "Academic eligibility",
    text: "Understand entry requirements, academic prerequisites, English-language proficiency tests, and programme-specific expectations.",
  },
  {
    title: "University shortlisting",
    text: "Build a realistic shortlist by comparing academic fit, tuition fees, programme structure, entry criteria, and relevant application deadlines.",
  },
  {
    title: "Applications and documentation",
    text: "Understand application timelines, academic transcripts, statements of purpose, recommendations, and other required supporting documents.",
  },
  {
    title: "Scholarships and financial planning",
    text: "Explore available scholarship opportunities, estimated living expenses, tuition fees, and the financial requirements of studying overseas. A scholarship is not guaranteed.",
  },
  {
    title: "Visa and pre-departure preparation",
    text: "Understand relevant visa documentation requirements and the practical steps students may need to complete before travelling. Approval is decided by the visa authority.",
  },
];

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function AboutView() {
  const heroRef = useIn<HTMLElement>({ threshold: 0.08, once: true });
  const servicesRef = useIn<HTMLElement>({ threshold: 0.12, once: true });

  return (
    <main className="about-page" id="content">
      <section className="about-hero about-block" aria-labelledby="about-hero-title" ref={heroRef}>
        <div className="shell about-hero-grid">
          <div className="about-hero-copy about-rise">
            <p className="eyebrow">About Eduvert</p>
            <h1 className="about-display" id="about-hero-title">
              <span className="about-line">Better decisions begin</span>{" "}
              <span className="about-line">before the application.</span>
            </h1>
            <div className="about-hero-lead">
              <p>
                Studying abroad starts with questions. Where should you go? What should you study? Which universities
                make sense for your academic background and budget?
              </p>
              <p>
                At Eduvert, we help students work through those decisions with practical study-abroad counselling, from
                exploring destinations to understanding applications and the steps that follow.
              </p>
            </div>
            <p className="about-reach">
              {contact.address}
              <br />
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              {" · "}
              <a href={contact.emailHref}>{contact.email}</a>
              {" · "}
              <a href={contact.whatsappHref} rel="noopener noreferrer">
                WhatsApp
              </a>
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/contact">
                Speak with a Counsellor
              </a>
              <a className="btn btn-secondary" href="/study-abroad">
                Explore Study Abroad
              </a>
            </div>
          </div>
          <figure className="about-figure about-rise about-rise-2">
            <div className="about-photo">
              <img
                src="/study-abroad/campus.jpg"
                srcSet="/study-abroad/campus-sm.jpg 800w, /study-abroad/campus.jpg 1600w"
                sizes="(max-width: 899px) 92vw, 42vw"
                width={1600}
                height={1067}
                alt="Students with backpacks walking toward a brick university building."
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="about-caption">Seawoods, Navi Mumbai</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-section about-services about-block" aria-labelledby="about-services-title" ref={servicesRef}>
        <div className="shell">
          <header className="about-head about-rise">
            <p className="eyebrow">What we help you navigate</p>
            <h2 className="about-display" id="about-services-title">
              <span className="about-line">From your first question</span>{" "}
              <span className="about-line">to your next big move.</span>
            </h2>
          </header>
          <ol className="about-service-list about-rise about-rise-2">
            {services.map((service, index) => (
              <li className="about-service" key={service.title}>
                <span className="about-num" aria-hidden="true">
                  {indexLabel(index)}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
