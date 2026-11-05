import type { Metadata } from "next";
import { EnquiryForm } from "../../components/enquiry-form";
import { contact, destinations, faqs, services } from "../../lib/site";

export const metadata: Metadata = {
  title: "Study Abroad Consultants in Navi Mumbai | Overseas Education Consultant for International Colleges",
  description:
    "Our expert overseas education consultants in Navi Mumbai provide personalized support for students seeking to study in top colleges worldwide. Start your study abroad journey today.",
};

const demand = [
  {
    title: "Globalization of careers",
    text: "Employers look for candidates with a wider view of how work happens in more than one country. An international education is one way students build that.",
  },
  {
    title: "Academic choice",
    text: "Students look abroad when a course, a teaching style, or a university they want is not available in the same form at home. The USA, the UK, Canada, and Australia come up most often.",
  },
  {
    title: "Cultural exchange and personal growth",
    text: "Living in another country is part of the education: new routines, new people, and more independence alongside the degree.",
  },
  {
    title: "Language skills",
    text: "Study in a country with a different daily language can strengthen that language. Many programmes are still taught in English.",
  },
  {
    title: "Networking",
    text: "Classmates, faculty, and workplaces become contacts that are difficult to build from one city.",
  },
];

const eligibility = [
  {
    title: "Academic record",
    text: "Universities set their own grade requirements. For a longer degree, they often want proof you have already started or finished the level below the one you are applying for.",
  },
  {
    title: "Language",
    text: "If the course is not taught in your first language, the university may ask for a test such as IELTS. Some courses taught in English do not remove that requirement.",
  },
  {
    title: "Visa",
    text: "Most countries need a student visa or study permit before you travel. Each country sets its own documents, funds, and timing.",
  },
  {
    title: "Money",
    text: "You need a way to show tuition, living costs, and travel. The amount depends on the country and the university, not on a single Eduvert package.",
  },
  {
    title: "Health cover",
    text: "Many countries require health insurance for the length of the course. Some universities offer a plan. Others expect you to buy one.",
  },
];

const application = [
  "Research programmes that match the subject, the budget, and the intake you can actually make.",
  "Prepare transcripts, test scores, references, and a personal statement.",
  "Submit applications before each university’s deadline, with every document the form asks for.",
  "After an offer, apply for that country’s student visa with the acceptance letter, funds, and other papers it lists.",
  "Plan tuition, housing, and living costs. A counsellor can help you read what is required. The payments themselves go to the university, the insurer, or the visa authority.",
  "Before departure, book travel, confirm housing, and attend any pre-departure briefing the university or Eduvert provides.",
];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function StudyAbroadPage() {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell" style={{ maxWidth: "52rem" }}>
          <p className="eyebrow">Navi Mumbai</p>
          <h1 className="section-title">Study abroad consultants in Navi Mumbai.</h1>
          <div className="copy">
            <p>
              Planning to study abroad means more decisions than a single brochure covers: which country fits the course
              and the budget, which universities to shortlist, which documents you need, and how to time the application
              around intake deadlines. Eduvert’s consultants in Navi Mumbai work through those steps, from the first
              shortlist to visa preparation.
            </p>
            <p>
              Students compare options in the UK, Australia, Ireland, Canada, and the USA, and Eduvert also publishes
              guides for France and New Zealand. The shortlist follows the academic record and the career direction,
              including engineering, business, healthcare, and the arts.
            </p>
          </div>
          <div className="chip-row">
            {destinations.map((destination) => (
              <a className="chip" key={destination.href} href={destination.href}>
                {destination.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="counsel-title">
        <div className="shell">
          <p className="eyebrow">Counselling</p>
          <h2 className="section-title" id="counsel-title">
            How we help you decide.
          </h2>
          <p className="lede" style={{ marginTop: "1.25rem" }}>
            Most students do not need convincing to study abroad. They need help with the specific choices.
          </p>
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

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="demand-title">
        <div className="shell split">
          <div>
            <p className="eyebrow">Context</p>
            <h2 className="section-title" id="demand-title">
              Why study abroad is in demand.
            </h2>
          </div>
          <ol className="reason-list">
            {demand.map((item, index) => (
              <li key={item.title}>
                <span className="index-num">{pad(index)}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="eligible-title">
        <div className="shell split">
          <div>
            <p className="eyebrow">Before you apply</p>
            <h2 className="section-title" id="eligible-title">
              Eligibility, then the application.
            </h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              Who can apply, and the order of the application, both depend on the country and the university.
            </p>
          </div>
          <div>
            <ol className="reason-list">
              {eligibility.map((item, index) => (
                <li key={item.title}>
                  <span className="index-num">{pad(index)}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ol className="reason-list" style={{ marginTop: "2rem" }}>
              {application.map((step, index) => (
                <li key={step}>
                  <span className="index-num">{pad(index)}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
        <div className="shell" style={{ maxWidth: "52rem" }}>
          <p className="eyebrow">Questions</p>
          <h2 className="section-title" id="faq-title">
            Frequently asked questions.
          </h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item" name="study-abroad-guide">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="consult" style={{ paddingTop: 0 }}>
        <div className="shell consult-grid">
          <div>
            <p className="eyebrow">Enquiry</p>
            <h2 className="section-title">Talk to a consultant.</h2>
            <p className="lede" style={{ marginTop: "1.25rem" }}>
              The office is at {contact.address}. Call {contact.phoneDisplay} or send a note to {contact.email}.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </main>
  );
}
