export function ReachBand() {
  return (
    <section className="reach" aria-labelledby="reach-title">
      <div className="shell">
        <h2 className="reach-title" id="reach-title">
          <span className="reach-line">Courses, countries, universities.</span>
          <span className="reach-line">
            The counselling still starts with <em>one student.</em>
          </span>
        </h2>
        <div className="reach-grid">
          <article className="reach-card reach-card-yellow">
            <p className="reach-value">
              3<span className="reach-plus">+</span>
            </p>
            <p className="reach-label">lakh courses</p>
            <div className="reach-art">
              <img
                className="reach-photo reach-photo-books"
                src="/reach/courses.jpg"
                alt="Library shelves packed with books"
              />
            </div>
          </article>
          <article className="reach-card reach-card-ink">
            <p className="reach-value">
              22<span className="reach-plus">+</span>
            </p>
            <p className="reach-label">countries</p>
            <div className="reach-art">
              <img
                className="reach-photo reach-photo-flight"
                src="/reach/countries.jpg"
                alt="Airplane wing seen through a cabin window"
              />
            </div>
          </article>
          <article className="reach-card reach-card-cyan">
            <p className="reach-value">
              1,500<span className="reach-plus">+</span>
            </p>
            <p className="reach-label">universities</p>
            <div className="reach-art">
              <img
                className="reach-photo reach-photo-campus"
                src="/reach/universities.jpg"
                alt="Collegiate gothic university building on a campus lawn"
              />
            </div>
          </article>
          <article className="reach-card reach-card-seal">
            <img className="reach-seal" src="/cca-certified.png" alt="CCA Certified Career Analyst" />
          </article>
        </div>
        <div className="reach-cta">
          <a className="btn btn-primary" href="#consult">
            Book a counselling <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
