"use client";

import { type FormEvent, useState } from "react";
import { contact, courseOptions, destinations } from "../lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          mobile: data.get("mobile"),
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
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Full name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>Mobile</span>
          <input name="mobile" type="tel" autoComplete="tel" inputMode="tel" required />
        </label>
        <label className="field">
          <span>Destination</span>
          <select name="destination" defaultValue="">
            <option value="">Not sure yet</option>
            {destinations.map((destination) => (
              <option key={destination.name} value={destination.name}>
                {destination.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
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
        <label className="field">
          <span>Message</span>
          <textarea name="message" placeholder="Course level, intake, or the question you want answered." />
        </label>
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send enquiry"}{" "}
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p className="form-note">
        This is saved for the counselling team. You can also call{" "}
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a> or message on{" "}
        <a href={contact.whatsappHref}>WhatsApp</a>.
      </p>
      {status === "sent" ? (
        <p className="form-note" role="status">
          Enquiry received. A counsellor can reply by email, phone, or WhatsApp.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-note" role="alert">
          The enquiry was not saved. Call {contact.phoneDisplay} or write to {contact.email}.
        </p>
      ) : null}
    </form>
  );
}
