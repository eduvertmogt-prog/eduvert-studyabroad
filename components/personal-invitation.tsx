"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { contact, courseOptions, destinations } from "../lib/site";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "mobile";
type Errors = Partial<Record<Field, string>>;

const fieldCopy: Record<Field, string> = {
  name: "Add your name.",
  email: "Add a valid email.",
  mobile: "Add a mobile number.",
};

type PersonalInvitationProps = {
  destination?: string;
  layout?: "destination";
};

export function PersonalInvitation({ destination: preset, layout }: PersonalInvitationProps = {}) {
  const rootRef = useRef<HTMLElement>(null);
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [destination, setDestination] = useState(preset ?? "");

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => node.classList.toggle("is-in", Boolean(entry?.isIntersecting)),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
    <section
      className={`invite section${layout === "destination" ? " is-destination" : ""}`}
      id="consult"
      ref={rootRef}
      aria-labelledby="consult-title"
    >
      <div className="shell invite-grid">
        <div className="invite-copy">
          <div>
            <p className="eyebrow invite-rise" style={{ transitionDelay: "0ms" }}>
              Counselling / Start here
            </p>
            <h2 className="invite-title invite-rise" id="consult-title" style={{ transitionDelay: "70ms" }}>
              Let&apos;s talk about what&apos;s next.
            </h2>
            <p className="invite-lede invite-rise" style={{ transitionDelay: "140ms" }}>
              Have a destination in mind? Still exploring? Tell us a little about yourself, and we&apos;ll take it from there.
            </p>
          </div>
          <div className="invite-direct invite-rise" style={{ transitionDelay: "220ms" }}>
            <div className="invite-rule" aria-hidden="true" />
            <h3>Prefer a direct conversation?</h3>
            <p>Call or send a WhatsApp message. Both reach the same counselling team.</p>
            <div className="invite-actions">
              <a className="btn btn-secondary" href={contact.phoneHref}>
                Call {contact.phoneDisplay}
              </a>
              <a className="btn btn-secondary" href={contact.whatsappHref}>
                WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="invite-card invite-rise" style={{ transitionDelay: "180ms" }}>
          {status === "sent" ? (
            <div className="invite-done" role="status">
              <p className="eyebrow">Enquiry received</p>
              <p className="invite-done-title">We&apos;ll take it from here.</p>
              <p>A counsellor can reply by email, phone, or WhatsApp.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStatus("idle")}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <p className="invite-kicker invite-rise" style={{ transitionDelay: "240ms" }}>
                Your enquiry
              </p>
              <p className="invite-form-title invite-rise" style={{ transitionDelay: "280ms" }}>
                Tell us a little about yourself.
              </p>
              {status === "error" ? (
                <p className="invite-alert" role="alert">
                  The enquiry was not saved. Call {contact.phoneDisplay} or write to {contact.email}.
                </p>
              ) : null}
              <div className="invite-fields">
                <label className={`invite-field invite-rise${errors.name ? " is-invalid" : ""}`} style={{ transitionDelay: "300ms" }}>
                  <span>Full name</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "consult-name-error" : undefined}
                    onChange={() => clearError("name")}
                  />
                  {errors.name ? (
                    <small id="consult-name-error" className="invite-error">
                      {errors.name}
                    </small>
                  ) : null}
                </label>
                <div className="invite-pair">
                  <label className={`invite-field invite-rise${errors.email ? " is-invalid" : ""}`} style={{ transitionDelay: "340ms" }}>
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "consult-email-error" : undefined}
                      onChange={() => clearError("email")}
                    />
                    {errors.email ? (
                      <small id="consult-email-error" className="invite-error">
                        {errors.email}
                      </small>
                    ) : null}
                  </label>
                  <label className={`invite-field invite-rise${errors.mobile ? " is-invalid" : ""}`} style={{ transitionDelay: "380ms" }}>
                    <span>Mobile</span>
                    <input
                      name="mobile"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={errors.mobile ? true : undefined}
                      aria-describedby={errors.mobile ? "consult-mobile-error" : undefined}
                      onChange={() => clearError("mobile")}
                    />
                    {errors.mobile ? (
                      <small id="consult-mobile-error" className="invite-error">
                        {errors.mobile}
                      </small>
                    ) : null}
                  </label>
                </div>
                <label className="invite-field invite-rise" style={{ transitionDelay: "420ms" }}>
                  <span>Preferred destination</span>
                  <select
                    name="destination"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                  >
                    <option value="">Not sure yet</option>
                    {destinations.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="invite-field invite-rise" style={{ transitionDelay: "440ms" }}>
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
                <label className="invite-field invite-rise" style={{ transitionDelay: "460ms" }}>
                  <span>
                    Message <em>Optional</em>
                  </span>
                  <textarea
                    name="message"
                    autoComplete="off"
                    placeholder="Course level, intake, or the question you want answered."
                  />
                </label>
                <div className="invite-rise" style={{ transitionDelay: "520ms" }}>
                  <button className="btn btn-primary invite-submit" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
                    {status === "sending" ? "Sending" : "Send enquiry"}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <p className="invite-note">
                    Saved for the counselling team.{" "}
                    <a href="/privacy-policy">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
