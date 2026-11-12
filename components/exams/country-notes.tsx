"use client";

import { useState } from "react";
import type { CountryNote } from "../../lib/exams/types";

export function CountryNotes({ notes }: { notes: CountryNote[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="exam-countries">
      <div className="exam-country-tabs" role="tablist" aria-label="Destinations">
        {notes.map((note, index) => (
          <button
            key={note.name}
            type="button"
            role="tab"
            aria-selected={index === current}
            onClick={() => setCurrent(index)}
          >
            {note.name}
          </button>
        ))}
      </div>
      <div className="exam-country-list">
        {notes.map((note, index) => (
          <article key={note.name} className={index === current ? "is-on" : undefined}>
            <h3>
              {note.href ? <a href={note.href}>{note.name}</a> : note.name}
            </h3>
            <p>{note.admission}</p>
            <p>{note.immigration}</p>
            <p>{note.atHome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
