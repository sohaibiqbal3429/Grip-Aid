"use client";

import { useEffect } from "react";

const SUCCESS_MESSAGE = "Thanks for subscribing.";
const ERROR_MESSAGE = "Please enter a valid email address.";

function setStatus(form: HTMLFormElement, message: string, isError = false) {
  let status = form.querySelector<HTMLParagraphElement>("[data-newsletter-status]");

  if (!status) {
    status = document.createElement("p");
    status.dataset.newsletterStatus = "";
    status.setAttribute("aria-live", "polite");
    status.style.marginTop = "12px";
    form.append(status);
  }

  status.textContent = message;
  status.style.color = isError ? "#ffffff" : "#ffffff";
}

export function NewsletterFormEnhancer() {
  useEffect(() => {
    const forms = Array.from(
      document.querySelectorAll<HTMLFormElement>(".te-subscribe-form-widget form"),
    );

    const controllers = forms.map((form) => {
      form.action = "/api/newsletter";
      form.method = "post";
      form.noValidate = true;

      const emailInput = form.querySelector<HTMLInputElement>('input[type="email"]');

      if (emailInput) {
        emailInput.name = "email";
        emailInput.autocomplete = "email";
        emailInput.required = true;
      }

      const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        const email = emailInput?.value.trim() || "";

        if (!emailInput?.checkValidity()) {
          setStatus(form, ERROR_MESSAGE, true);
          return;
        }

        const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        submitButton?.setAttribute("disabled", "true");

        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const result = (await response.json()) as { error?: string; success?: boolean };

          if (!response.ok || !result.success) {
            throw new Error(result.error || ERROR_MESSAGE);
          }

          form.reset();
          setStatus(form, SUCCESS_MESSAGE);
        } catch (error) {
          setStatus(form, error instanceof Error ? error.message : ERROR_MESSAGE, true);
        } finally {
          submitButton?.removeAttribute("disabled");
        }
      };

      form.addEventListener("submit", handleSubmit);

      return () => form.removeEventListener("submit", handleSubmit);
    });

    return () => {
      controllers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return null;
}
