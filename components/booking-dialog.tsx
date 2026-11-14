"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { contact, courseOptions, destinations } from "../lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function BookingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      return;
    }
    if (dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) setStatus("idle");
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
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
    <dialog
      ref={dialogRef}
      className="booking-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="booking-panel">
        <div className="booking-head">
          <div>
            <p className="eyebrow">Counselling</p>
            <h2 id={titleId}>Book a counselling</h2>
            <p className="booking-lead">A counsellor will reply by phone, email, or WhatsApp.</p>
          </div>
          <button className="booking-close" type="button" autoFocus onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {status === "sent" ? (
          <div className="booking-done" role="status">
            <p>Enquiry received. A counsellor can reply by email, phone, or WhatsApp.</p>
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={onSubmit}>
            {status === "error" ? (
              <p className="booking-alert" role="alert">
                The enquiry was not saved. Call {contact.phoneDisplay} or write to {contact.email}.
              </p>
            ) : null}
            <label className="field">
              <span>Full name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <div className="booking-pair">
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="field">
                <span>Mobile</span>
                <input name="mobile" type="tel" autoComplete="tel" inputMode="tel" required />
              </label>
            </div>
            <div className="booking-pair">
              <label className="field">
                <span>Destination</span>
                <span className="booking-select">
                  <select name="destination" defaultValue="">
                    <option value="">Not sure yet</option>
                    {destinations.map((destination) => (
                      <option key={destination.name} value={destination.name}>
                        {destination.name}
                      </option>
                    ))}
                  </select>
                  <span className="booking-chevron" aria-hidden="true" />
                </span>
              </label>
              <label className="field">
                <span>Course</span>
                <span className="booking-select">
                  <select name="course" defaultValue="">
                    <option value="">Not sure yet</option>
                    {courseOptions.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  <span className="booking-chevron" aria-hidden="true" />
                </span>
              </label>
            </div>
            <label className="field">
              <span>Message</span>
              <textarea name="message" placeholder="Course level, intake, or the question you want answered." />
            </label>
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Send enquiry"}{" "}
              <span className="arrow" aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
