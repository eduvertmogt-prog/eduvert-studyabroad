import { compareRows, exams } from "../../lib/exams";

const choices = [
  "The receiving university, and the programme rather than the country in general.",
  "The intended country, including any visa that names a specific version of a test.",
  "Whether the route needs a Secure English Language Test, such as IELTS for UKVI or PTE Academic UKVI.",
  "Whether an at-home sitting is accepted. Several visa authorities refuse fully online tests.",
  "The format you can actually sit: an examiner interview, a recorded speaking section, or a single computer session.",
];

export function ExamHub() {
  return (
    <main id="content" className="exam-page">
      <header className="exam-hero exam-hub-hero">
        <div className="shell">
          <nav className="exam-crumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Exams</span>
          </nav>
          <p className="eyebrow">English proficiency</p>
          <h1>
            Your English proficiency journey starts with the <span className="mark">right test.</span>
          </h1>
          <p className="exam-lede">
            IELTS, TOEFL and PTE each offer a different approach to assessing English proficiency. Understand their formats, scores and requirements before deciding which examination fits your plans.
          </p>
        </div>
      </header>

      <section className="shell exam-block">
        <p className="eyebrow">Explore the examinations</p>
        <h2>Three tests. Three different bookings.</h2>
        <div className="exam-panels">
          {exams.map((exam) => (
            <article key={exam.slug}>
              <p className="exam-kicker">{exam.provider}</p>
              <h3>{exam.name}</h3>
              <p className="exam-full">{exam.fullName}</p>
              <p>{exam.panelBlurb}</p>
              <dl>
                <div>
                  <dt>Score</dt>
                  <dd>{exam.compare.score}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{exam.compare.duration}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>{exam.compare.delivery}</dd>
                </div>
              </dl>
              <a href={`/exams/${exam.slug}`}>
                Read the {exam.name} guide <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="shell exam-block">
        <p className="eyebrow">Compare</p>
        <h2>The same questions, side by side.</h2>
        <p>Fees are India figures only where the provider published them. PTE’s India price is confirmed on Pearson’s own finder.</p>
        <div className="exam-table-wrap">
          <table className="exam-table">
            <caption className="sr-only">IELTS, TOEFL and PTE Academic compared</caption>
            <thead>
              <tr>
                <th scope="col">Question</th>
                {exams.map((exam) => (
                  <th key={exam.slug} scope="col">{exam.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  {exams.map((exam) => (
                    <td key={exam.slug}>{exam.compare[row.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="exam-compare-stack">
          {exams.map((exam) => (
            <article key={exam.slug}>
              <h3>{exam.name}</h3>
              <dl>
                {compareRows.map((row) => (
                  <div key={row.key}>
                    <dt>{row.label}</dt>
                    <dd>{exam.compare[row.key]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="shell exam-block exam-choice">
        <p className="eyebrow">Choosing</p>
        <h2>The right exam is the one your offer names.</h2>
        <p>None of these tests is universally easier, cheaper, or more widely accepted. The decision sits with the institution and, where a visa is involved, with that country’s current rules.</p>
        <ul>
          {choices.map((choice) => (
            <li key={choice}>{choice}</li>
          ))}
        </ul>
      </section>

      <section className="exam-close">
        <div className="shell">
          <p className="eyebrow">Guides</p>
          <h2>Read the examination in full.</h2>
          <div className="exam-alts">
            {exams.map((exam) => (
              <a key={exam.slug} href={`/exams/${exam.slug}`}>
                <span>{exam.fullName}</span>
                <strong>{exam.headline}</strong>
                <p>{exam.panelBlurb}</p>
              </a>
            ))}
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
