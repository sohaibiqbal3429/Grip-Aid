"use client";

import { FormEvent, useState } from "react";

import type { ContactField, ContactFieldErrors } from "@/lib/validations";

type SubmitState = "idle" | "submitting" | "success" | "error";

type ContactApiResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: ContactFieldErrors;
};

const FIELD_LABELS: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
};

function formatFieldErrors(fieldErrors: ContactFieldErrors = {}) {
  return (Object.entries(fieldErrors) as Array<[ContactField, string[]]>)
    .flatMap(([field, messages]) => messages.map((message) => `${FIELD_LABELS[field]}: ${message}`))
    .join(" ");
}

export default function ContactForm() {
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
      body: new FormData(form),
    });
    const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

    if (!response.ok || !result?.success) {
      const nextFieldErrors = result?.fieldErrors || {};
      const formattedErrors = formatFieldErrors(nextFieldErrors);

      setSubmitState("error");
      setFieldErrors(nextFieldErrors);
      setStatusMessage(
        formattedErrors || result?.error || "We could not send your message. Please try again.",
      );
      return;
    }

    form.reset();
    setSubmitState("success");
    setStatusMessage("Your message has been sent. We will contact you shortly.");
  }

  function renderFieldErrors(field: ContactField) {
    const messages = fieldErrors[field];

    if (!messages?.length) {
      return null;
    }

    return (
      <p className="text-danger" id={`contact-${field}-error`}>
        {messages.join(" ")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="te-comment-form" noValidate>
      <h3>
        Request Mobile <br /> Roadside Assistance
      </h3>
      <div className="row gx-4">
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              aria-describedby={fieldErrors.name?.length ? "contact-name-error" : undefined}
            />
            {renderFieldErrors("name")}
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-email">
            <input
              name="email"
              type="email"
              placeholder="Your Email*"
              autoComplete="email"
              aria-describedby={fieldErrors.email?.length ? "contact-email-error" : undefined}
            />
            {renderFieldErrors("email")}
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input
              name="phone"
              type="tel"
              placeholder="Your Phone"
              autoComplete="tel"
              aria-describedby={fieldErrors.phone?.length ? "contact-phone-error" : undefined}
            />
            {renderFieldErrors("phone")}
          </div>
        </div>
        <div className="col-xl-6">
          <div className="te-contacts-name">
            <input
              name="subject"
              type="text"
              placeholder="Service Needed"
              aria-describedby={fieldErrors.subject?.length ? "contact-subject-error" : undefined}
            />
            {renderFieldErrors("subject")}
          </div>
        </div>
        <div className="col-xl-12">
          <div className="te-contacts-message">
            <textarea
              name="message"
              cols={20}
              rows={3}
              placeholder="Tell us your location and what happened"
              aria-describedby={fieldErrors.message?.length ? "contact-message-error" : undefined}
            />
            {renderFieldErrors("message")}
          </div>
        </div>
        {statusMessage ? (
          <div className="col-12" role="status" aria-live="polite">
            <p className={submitState === "error" ? "text-danger" : "text-success"}>{statusMessage}</p>
          </div>
        ) : null}
        <div className="col-12">
          <button className="te-theme-btn style-2" type="submit" disabled={submitState === "submitting"}>
            {submitState === "submitting" ? "SENDING..." : "REQUEST HELP"}
          </button>
        </div>
      </div>
    </form>
  );
}
