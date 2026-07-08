"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setStatusMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      setSubmitState("error");
      setStatusMessage(result?.error || "We could not send your message. Please try again.");
      return;
    }

    form.reset();
    setSubmitState("success");
    setStatusMessage("Your message has been sent. We will contact you shortly.");
  }

  return (
    <form onSubmit={handleSubmit} className="te-comment-form">
      <h3>
        We Can Take Your <br /> Business To Growth
      </h3>
      <div className="row gx-4">
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input name="name" type="text" placeholder="Your Name" autoComplete="name" />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-email">
            <input name="email" type="email" placeholder="Your Email*" autoComplete="email" required />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input name="phone" type="tel" placeholder="Your Phone" autoComplete="tel" />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input name="subject" type="text" placeholder="Subject" />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="te-contacts-message">
            <textarea name="message" cols={20} rows={3} placeholder="Write your Message here" required />
          </div>
        </div>
        {statusMessage ? (
          <div className="col-12" role="status" aria-live="polite">
            <p className={submitState === "error" ? "text-danger" : "text-success"}>{statusMessage}</p>
          </div>
        ) : null}
        <div className="col-12">
          <button className="te-theme-btn style-2" type="submit" disabled={submitState === "submitting"}>
            {submitState === "submitting" ? "SENDING..." : "SEND NOW"}
          </button>
        </div>
      </div>
    </form>
  );
}
