"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactFormAlt() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setStatusMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
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
      <div className="row gx-4">
        <div className="col-xl-6">
          <input name="email" type="email" placeholder="Your Email*" autoComplete="email" required />
        </div>
        <div className="col-xl-6">
          <input name="phone" type="tel" placeholder="Your Phone" autoComplete="tel" />
        </div>
        <div className="col-xl-12">
          <textarea name="message" cols={20} rows={3} placeholder="Write your Message here" required />
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
