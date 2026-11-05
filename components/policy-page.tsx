import type { ReactNode } from "react";

export function PolicyPage({
  eyebrow,
  title,
  lede,
  children,
  sourceHref,
  sourceLabel,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  sourceHref: string;
  sourceLabel: string;
}) {
  return (
    <main id="content">
      <section className="section page-hero">
        <div className="shell" style={{ maxWidth: "46rem" }}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="section-title">{title}</h1>
          <p className="lede" style={{ marginTop: "1.25rem" }}>
            {lede}
          </p>
          <div className="copy">{children}</div>
          <p className="note">
            The full document published by Eduvert is at{" "}
            <a href={sourceHref}>{sourceLabel}</a>. If the two texts ever differ, that published page is the one to follow.
          </p>
        </div>
      </section>
    </main>
  );
}
