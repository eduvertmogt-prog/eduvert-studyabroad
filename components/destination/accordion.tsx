"use client";

import { useState } from "react";
import type { DestinationPoint } from "../../lib/destination";

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function CountryAccordion({ items, idPrefix }: { items: DestinationPoint[]; idPrefix: string }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="country-acc">
      {items.map((item, index) => {
        const on = open === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-q-${index}`;
        return (
          <div className={`country-acc-item${on ? " is-open" : ""}`} key={item.title}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className="country-acc-q"
                aria-expanded={on}
                aria-controls={panelId}
                onClick={() => setOpen(on ? -1 : index)}
              >
                <span className="country-acc-no">{pad(index)}</span>
                <span className="country-acc-title">{item.title}</span>
                <span className="country-acc-mark" aria-hidden="true">
                  {on ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div className="country-acc-a" id={panelId} role="region" aria-labelledby={buttonId}>
              <div className="country-acc-a-inner">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
