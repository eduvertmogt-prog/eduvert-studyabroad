"use client";

import { type FormEvent, useState } from "react";
import { contact, destinations } from "../lib/site";

export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const destination = String(data.get("destination") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
      `Destination: ${destination || "Not specified"}`,
      "",
      message || "I would like to book a study abroad counselling session.",
    ].join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      "Study abroad counselling enquiry",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate={false}>
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
          <span>Message</span>
          <textarea name="message" placeholder="Course level, intake, or the question you want answered." />
        </label>
        <button className="btn btn-primary" type="submit">
          Send enquiry <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p className="form-note">
        This opens an email to {contact.email}. You can also call{" "}
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a> or message on{" "}
        <a href={contact.whatsappHref}>WhatsApp</a>.
      </p>
      {sent ? (
        <p className="form-note" role="status">
          Your email app should open with this enquiry. If it does not, write to {contact.email}.
        </p>
      ) : null}
    </form>
  );
}
