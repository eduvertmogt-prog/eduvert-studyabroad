"use client";

import { type KeyboardEvent, useEffect, useId, useState } from "react";
import { costNote, folioPlates, type FolioPlate } from "../../lib/study-abroad";
import { useIn } from "../../lib/use-in";

function FolioShot({ plate }: { plate: FolioPlate }) {
  const firstSlug = folioPlates[0]?.slug;
  const [base, setBase] = useState(plate);
  const [overlay, setOverlay] = useState<FolioPlate | null>(null);
  const [overlayOn, setOverlayOn] = useState(false);

  useEffect(() => {
    if (plate.slug === base.slug) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBase(plate);
      setOverlay(null);
      setOverlayOn(false);
      return;
    }
    setOverlay(plate);
    setOverlayOn(false);
  }, [plate, base.slug]);

  useEffect(() => {
    if (!overlay) return;
    const id = window.setTimeout(() => {
      setBase(overlay);
      setOverlay(null);
      setOverlayOn(false);
    }, 900);
    return () => window.clearTimeout(id);
  }, [overlay]);

  const isFirst = base.slug === firstSlug && !overlay;

  return (
    <figure className="folio-shot">
      <img
        className="folio-still"
        src={base.photo}
        srcSet={`${base.photoSm} 800w, ${base.photo} 1600w`}
        sizes="(max-width: 899px) 92vw, 40vw"
        width={1600}
        height={900}
        alt={base.photoAlt}
        fetchPriority={isFirst ? "high" : undefined}
        loading={isFirst ? "eager" : "lazy"}
        decoding="async"
      />
      {overlay ? (
        <img
          className={`folio-still folio-still-over${overlayOn ? " is-on" : ""}`}
          src={overlay.photo}
          srcSet={`${overlay.photoSm} 800w, ${overlay.photo} 1600w`}
          sizes="(max-width: 899px) 92vw, 40vw"
          width={1600}
          height={900}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => {
            window.requestAnimationFrame(() => setOverlayOn(true));
          }}
          onTransitionEnd={() => {
            if (!overlayOn) return;
            setBase(overlay);
            setOverlay(null);
            setOverlayOn(false);
          }}
        />
      ) : null}
    </figure>
  );
}

function Feature({ plate }: { plate: FolioPlate }) {
  return (
    <article className="folio-feature">
      <p className="folio-plate-kicker">
        {plate.index} / 07 — Destination feature
      </p>
      <h3 className="folio-plate-title">{plate.name}</h3>
      <p className="folio-plate-lede">{plate.description}</p>
      <dl className="folio-figures">
        <div>
          <dt>Tuition / year</dt>
          <dd>{plate.tuitionShort}</dd>
        </div>
        <div>
          <dt>Living</dt>
          <dd>{plate.livingShort}</dd>
        </div>
        <div>
          <dt>{plate.afterStudyLabel}</dt>
          <dd>{plate.afterStudy}</dd>
        </div>
      </dl>
      <p className="ledger-note">{costNote}</p>
      <p className="folio-intake">
        <span>Main intake</span>
        <strong>{plate.intake}</strong>
      </p>
      <p className="folio-courses">{plate.courses.join(" · ")}</p>
      <a className="folio-guide" href={plate.href}>
        Explore {plate.name}
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

export function Folio({ onSelect }: { onSelect?: (name: string) => void }) {
  const root = useIn<HTMLElement>({ threshold: 0.02, once: true });
  const listId = useId();
  const [active, setActive] = useState(folioPlates[0]?.slug ?? "uk");
  const selected = folioPlates.find((item) => item.slug === active) ?? folioPlates[0];
  if (!selected) return null;

  function preview(plate: FolioPlate) {
    setActive(plate.slug);
  }

  function commit(plate: FolioPlate) {
    setActive(plate.slug);
    onSelect?.(plate.name);
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = folioPlates.findIndex((item) => item.slug === active);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(folioPlates.length - 1, index + 1);
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, index - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = folioPlates.length - 1;
    const plate = folioPlates[next];
    if (!plate) return;
    commit(plate);
    event.currentTarget.querySelector<HTMLElement>(`#destination-${plate.slug}`)?.focus();
  }

  return (
    <section className="folio-sec chapter" id="destinations" ref={root} aria-labelledby="folio-title">
      <div className="guide-shell folio-spread">
        <div className="folio-intro folio-rise">
          <header className="folio-head">
            <p className="eyebrow">Destinations / 02</p>
            <h2 className="folio-heading" id="folio-title">
              Seven countries.
              <span>One atlas.</span>
            </h2>
            <p className="folio-support">
              Explore seven study destinations and discover the opportunities each has to offer.
            </p>
          </header>

          <ul className="folio-index" aria-labelledby="folio-title" id={listId} onKeyDown={onKeyDown}>
            {folioPlates.map((plate) => {
              const isActive = plate.slug === selected.slug;
              return (
                <li className="folio-item" key={plate.slug}>
                  <button
                    type="button"
                    className={`folio-row${isActive ? " is-active" : ""}`}
                    id={`destination-${plate.slug}`}
                    aria-pressed={isActive}
                    onPointerEnter={() => {
                      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) preview(plate);
                    }}
                    onFocus={() => commit(plate)}
                    onClick={() => commit(plate)}
                  >
                    <span className="folio-num">{plate.index}</span>
                    <span className="folio-name">{plate.name}</span>
                    <span className="folio-go" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="folio-stage">
          <FolioShot plate={selected} />
          <Feature plate={selected} />
        </div>
      </div>
    </section>
  );
}
