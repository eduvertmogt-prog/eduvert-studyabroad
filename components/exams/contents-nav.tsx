"use client";

import { useEffect, useState } from "react";
import { examSections } from "../../lib/exams";

export function ContentsNav() {
  const [active, setActive] = useState<string>(examSections[0].id);

  useEffect(() => {
    const nodes = examSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="exam-contents" aria-label="On this page">
      <p className="exam-contents-label">On this page</p>
      <ol>
        {examSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
