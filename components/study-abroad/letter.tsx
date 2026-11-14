"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { contact, courseOptions, destinations } from "../../lib/site";
import { useIn } from "../../lib/use-in";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "mobile";
type Errors = Partial<Record<Field, string>>;

const fieldCopy: Record<Field, string> = {
  name: "Add your name.",
  email: "Add a valid email.",
  mobile: "Add a mobile number.",
};

export function Letter({ destination: preset }: { destination?: string }) {
  const root = useIn<HTMLElement>({ threshold: 0.02, once: true });
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [destination, setDestination] = useState(preset ?? "");

  useEffect(() => {
    if (preset && destinations.some((item) => item.name === preset)) {
      setDestination(preset);
      return;
    }
    const value = new URLSearchParams(window.location.search).get("destination") ?? "";
    if (destinations.some((item) => item.name === value)) setDestination(value);
  }, [preset]);

  function clearError(field: Field) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = fieldCopy.name;
    if (!email || !email.includes("@")) next.email = fieldCopy.email;
    if (!mobile) next.mobile = fieldCopy.mobile;
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = (Object.keys(next) as Field[])[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile,
          destination: data.get("destination"),
          course: data.get("course"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setDestination("");
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <section className="letter" id="consult" ref={root} aria-labelledby="letter-title">
      <div className="folio-shell letter-grid">
        <div className="letter-copy folio-rise">
          <p className="letter-kicker">Your next chapter / Eduvert</p>
          <h2 className="letter-heading" id="letter-title">
            Your next move
            <span>starts with a conversation.</span>
          </h2>
          <p className="letter-lede">
            Tell us what you’re planning. We’ll help you explore your options and understand the next steps.
          </p>
          <p className="letter-contact">
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={contact.whatsappHref}>WhatsApp</a>
            <span>{contact.address}</span>
          </p>
          <p className="letter-note">
            Counselling covers courses, budgets, and destinations. It is not a guarantee of admission, a visa, or
            funding.
          </p>
        </div>

        <div className="letter-panel folio-rise" style={{ transitionDelay: "100ms" }}>
          {status === "sent" ? (
            <div className="letter-done" role="status">
              <p className="eyebrow">Enquiry received</p>
              <p className="letter-done-title">The desk has your note.</p>
              <p>A counsellor can reply by email, phone, or WhatsApp.</p>
              <button type="button" className="btn btn-secondary" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="letter-form" onSubmit={onSubmit} noValidate>
              {status === "error" ? (
                <p className="letter-alert" role="alert">
                  The enquiry was not saved. Call {contact.phoneDisplay} or write to {contact.email}.
                </p>
              ) : null}
              <label className={`letter-field${errors.name ? " is-invalid" : ""}`}>
                <span>Full name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "letter-name-error" : undefined}
                  onChange={() => clearError("name")}
                />
                {errors.name ? (
                  <small className="letter-error" id="letter-name-error">{errors.name}</small>
                ) : null}
              </label>
              <div className="letter-pair">
                <label className={`letter-field${errors.email ? " is-invalid" : ""}`}>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "letter-email-error" : undefined}
                    onChange={() => clearError("email")}
                  />
                  {errors.email ? (
                    <small className="letter-error" id="letter-email-error">{errors.email}</small>
                  ) : null}
                </label>
                <label className={`letter-field${errors.mobile ? " is-invalid" : ""}`}>
                  <span>Mobile</span>
                  <input
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Mobile number"
                    aria-invalid={errors.mobile ? true : undefined}
                    aria-describedby={errors.mobile ? "letter-mobile-error" : undefined}
                    onChange={() => clearError("mobile")}
                  />
                  {errors.mobile ? (
                    <small className="letter-error" id="letter-mobile-error">{errors.mobile}</small>
                  ) : null}
                </label>
              </div>
              <label className="letter-field">
                <span>Preferred destination</span>
                <select name="destination" value={destination} onChange={(event) => setDestination(event.target.value)}>
                  <option value="">Not sure yet</option>
                  {destinations.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="letter-field">
                <span>Course</span>
                <select name="course" defaultValue="">
                  <option value="">Not sure yet</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </label>
              <label className="letter-field">
                <span>
                  Message <em>Optional</em>
                </span>
                <textarea
                  name="message"
                  autoComplete="off"
                  placeholder="Course level, intake, or the question you want answered."
                  rows={4}
                />
              </label>
              <div className="letter-foot">
                <button className="btn btn-primary" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
                  {status === "sending" ? "Sending" : "Start the conversation"}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </button>
                <p>
                  Saved for the counselling team. <a href="/privacy-policy">Privacy Policy</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
