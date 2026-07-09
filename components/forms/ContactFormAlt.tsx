"use client";

import { FormEvent, useState } from "react";

import type {
  ContactApiRequestBody,
  ContactField,
  ContactFieldErrors,
} from "@/lib/validations";

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
    .flatMap(([field, messages]) =>
      messages.map((message) => `${FIELD_LABELS[field]}: ${message}`),
    )
    .join(" ");
}

function getContactRequestBody(form: HTMLFormElement): ContactApiRequestBody {
  const formData = new FormData(form);

  return {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    subject: String(formData.get("subject") || ""),
    message: String(formData.get("message") || ""),
  };
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
    const requestBody = getContactRequestBody(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
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

  function renderFieldErrors(field: ContactField) {
    const messages = fieldErrors[field];

    if (!messages?.length) {
      return null;
    }

    return (
      <p className="text-danger" id={`contact-alt-${field}-error`}>
        {messages.join(" ")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="te-comment-form" noValidate>
      <div className="row gx-4">
        <div className="col-xl-6">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            autoComplete="name"
            aria-describedby={fieldErrors.name?.length ? "contact-alt-name-error" : undefined}
          />
          {renderFieldErrors("name")}
        </div>
        <div className="col-xl-6">
          <input
            name="email"
            type="email"
            placeholder="Your Email*"
            autoComplete="email"
            aria-describedby={fieldErrors.email?.length ? "contact-alt-email-error" : undefined}
          />
          {renderFieldErrors("email")}
        </div>
        <div className="col-xl-6">
          <input
            name="phone"
            type="tel"
            placeholder="Your Phone"
            autoComplete="tel"
            aria-describedby={fieldErrors.phone?.length ? "contact-alt-phone-error" : undefined}
          />
          {renderFieldErrors("phone")}
        </div>
        <div className="col-xl-6">
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            aria-describedby={fieldErrors.subject?.length ? "contact-alt-subject-error" : undefined}
          />
          {renderFieldErrors("subject")}
        </div>
        <div className="col-xl-12">
          <textarea
            name="message"
            cols={20}
            rows={3}
            placeholder="Write your Message here"
            aria-describedby={fieldErrors.message?.length ? "contact-alt-message-error" : undefined}
          />
          {renderFieldErrors("message")}
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
