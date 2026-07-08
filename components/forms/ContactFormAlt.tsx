"use client";

import { FormEvent, useState } from "react";

import type { ContactFieldErrors } from "@/lib/validations";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactApiResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: ContactFieldErrors;
};

function formatFieldErrors(fieldErrors: ContactFieldErrors = {}) {
  return Object.values(fieldErrors).flat().join(" ");
}

export default function ContactFormAlt() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setStatusMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

    if (!response.ok || !result?.success) {
      const nextFieldErrors = result?.fieldErrors || {};

      setSubmitState("error");
      setFieldErrors(nextFieldErrors);
      setStatusMessage(
        formatFieldErrors(nextFieldErrors) || result?.error || "We could not send your message. Please try again.",
      );
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
          <input
            name="email"
            type="email"
            placeholder="Your Email*"
            autoComplete="email"
            aria-describedby={fieldErrors.email?.length ? "contact-alt-email-error" : undefined}
            required
          />
          {fieldErrors.email?.length ? (
            <p className="text-danger" id="contact-alt-email-error">
              {fieldErrors.email.join(" ")}
            </p>
          ) : null}
        </div>
        <div className="col-xl-6">
          <input name="phone" type="tel" placeholder="Your Phone" autoComplete="tel" />
        </div>
        <div className="col-xl-12">
          <textarea
            name="message"
            cols={20}
            rows={3}
            placeholder="Write your Message here"
            aria-describedby={fieldErrors.message?.length ? "contact-alt-message-error" : undefined}
            required
          />
          {fieldErrors.message?.length ? (
            <p className="text-danger" id="contact-alt-message-error">
              {fieldErrors.message.join(" ")}
            </p>
          ) : null}
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
