import { FaqIndex } from "../faq-index";
import { otherExams } from "../../lib/exams";
import type { Exam } from "../../lib/exams/types";
import { ContentsNav } from "./contents-nav";
import { CountryNotes } from "./country-notes";
import { FormatTabs } from "./format-tabs";

export function ExamView({ exam }: { exam: Exam }) {
  const others = otherExams(exam.slug);

  return (
    <main id="content" className="exam-page">
      <header className="exam-hero">
        <div className="shell exam-hero-grid">
          <div>
            <nav className="exam-crumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/exams">Exams</a>
              <span aria-hidden="true">/</span>
              <span>{exam.name}</span>
            </nav>
            <p className="eyebrow">English proficiency examination</p>
            <h1>{exam.headline}</h1>
            <p className="exam-lede">{exam.lede}</p>
            <p className="exam-provider">{exam.provider}</p>
            <a className="btn btn-primary" href="#format">
              See the format <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <aside className="exam-sheet" aria-label="Examination facts">
            <p className="exam-kicker">{exam.name}</p>
            <p>{exam.fullName}</p>
            <dl className="exam-facts">
              {exam.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </header>

      <div className="shell exam-layout">
        <ContentsNav />
        <div className="exam-main">
          <section id="overview" className="exam-block">
            <p className="eyebrow">01 — Overview</p>
            <h2>What this examination is.</h2>
            {exam.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="exam-warning">{exam.variantWarning}</p>
            <div className="exam-variants">
              {exam.variants.map((variant) => (
                <article key={variant.title}>
                  <h3>{variant.title}</h3>
                  <p>{variant.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="format" className="exam-block">
            <p className="eyebrow">02 — Inside the examination</p>
            <h2>How the test is built.</h2>
            <p>Choose a section. The timings below are the ones the provider publishes for the tasks. Check-in and instructions sit outside those figures.</p>
            <FormatTabs sections={exam.sections} />
          </section>

          <section id="scoring" className="exam-block">
            <p className="eyebrow">03 — Scoring</p>
            <h2>How the result is read.</h2>
            <p>{exam.scoring.intro}</p>
            <ol className="exam-scale" aria-label="Score scale">
              {exam.scoring.markers.map((marker) => (
                <li key={marker.label}>
                  <span>{marker.label}</span>
                  <small>{marker.note}</small>
                </li>
              ))}
            </ol>
            <div className="exam-points">
              {exam.scoring.points.map((point) => (
                <article key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
            <p className="exam-note">{exam.scoring.caveat}</p>
          </section>

          <section id="acceptance" className="exam-block">
            <p className="eyebrow">04 — Countries</p>
            <h2>Where the result is used.</h2>
            <p>
              Acceptance is decided by the university and, separately, by the visa authority. A country link below opens Eduvert’s study guide where one exists. Germany is included because students ask about it. Eduvert does not yet publish a Germany study page.
            </p>
            <CountryNotes notes={exam.countries} />
          </section>

          <section id="eligibility" className="exam-block">
            <p className="eyebrow">05 — Eligibility</p>
            <h2>Who can register.</h2>
            <div className="exam-points">
              {exam.eligibility.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="fees" className="exam-block">
            <p className="eyebrow">06 — Fees in India</p>
            <h2>What the provider listed.</h2>
            <p className="exam-verified">Last checked {exam.lastVerified}.</p>
            <ul className="exam-fees">
              {exam.fees.map((fee) => (
                <li key={fee.label}>
                  <div>
                    <p>{fee.label}</p>
                    {fee.note ? <p className="exam-fee-note">{fee.note}</p> : null}
                  </div>
                  <p className="exam-fee-amount">
                    {fee.status === "listed" && fee.amountLabel ? fee.amountLabel : "Confirm the current fee"}
                  </p>
                  <a href={fee.sourceUrl}>{fee.sourceLabel}</a>
                </li>
              ))}
            </ul>
            <p className="exam-note">{exam.feeNote}</p>
          </section>

          <section id="registration" className="exam-block">
            <p className="eyebrow">07 — Registration</p>
            <h2>How to book the official test.</h2>
            <ol className="exam-steps">
              {exam.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p>
              <a className="exam-external" href={exam.bookingUrl}>
                {exam.bookingLabel}
              </a>
            </p>
            <p className="exam-note">Eduvert does not run IELTS, TOEFL or PTE, and this site cannot book a seat for you.</p>
          </section>

          <section id="results" className="exam-block">
            <p className="eyebrow">08 — Test day and results</p>
            <h2>After you have a place.</h2>
            <div className="exam-split">
              <div>
                <h3>On the day</h3>
                {exam.testDay.map((item) => (
                  <p key={item.title}>
                    <strong>{item.title}. </strong>
                    {item.text}
                  </p>
                ))}
              </div>
              <div>
                <h3>The result</h3>
                {exam.results.map((item) => (
                  <p key={item.title}>
                    <strong>{item.title}. </strong>
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <FaqIndex
            embedded
            id="faqs"
            items={exam.faqs}
            eyebrow="09 — Questions"
            title="Questions people ask before they book."
            support="Short answers. The provider’s own page is still the rule if a policy has changed."
          />

          <aside className="exam-sources">
            <h2>Official sources</h2>
            <ul>
              {exam.references.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href}>{reference.label}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <section className="exam-close">
        <div className="shell">
          <p className="eyebrow">Continue</p>
          <h2>Exploring other English proficiency exams?</h2>
          <div className="exam-alts">
            {others.map((other) => {
              const note = exam.alternatives.find((item) => item.slug === other.slug);
              return (
                <a key={other.slug} href={`/exams/${other.slug}`}>
                  <span>{other.name}</span>
                  <strong>{other.headline}</strong>
                  <p>{note?.difference}</p>
                </a>
              );
            })}
          </div>
          <div className="exam-cta">
            <h2>Not sure which English test your university requires?</h2>
            <p>Eduvert can help you understand English language requirements as part of planning your study-abroad application.</p>
            <a className="btn btn-primary" href="/contact">
              Talk to Eduvert <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
