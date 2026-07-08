export const NEWSLETTER_FIELD_LIMITS = {
  email: 254,
} as const;

export type NewsletterField = keyof typeof NEWSLETTER_FIELD_LIMITS;
export type NewsletterFieldErrors = Partial<Record<NewsletterField, string[]>>;
export type NewsletterValidationInput = Partial<Record<NewsletterField, unknown>>;
export type ValidatedNewsletterPayload = {
  email: string;
};

export type NewsletterValidationResult =
  | { success: true; data: ValidatedNewsletterPayload }
  | { success: false; data: Partial<Record<NewsletterField, string>>; fieldErrors: NewsletterFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function coerceField(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\0/g, "");
}

function normalizeEmail(value: string): string {
  return value.replace(/[\r\n\t ]+/g, "").trim().toLowerCase();
}

function addFieldError(
  fieldErrors: NewsletterFieldErrors,
  field: NewsletterField,
  message: string,
): NewsletterFieldErrors {
  return {
    ...fieldErrors,
    [field]: [...(fieldErrors[field] || []), message],
  };
}

export function validateNewsletterPayload(
  input: NewsletterValidationInput,
): NewsletterValidationResult {
  let fieldErrors: NewsletterFieldErrors = {};
  const email = normalizeEmail(coerceField(input.email));

  if (!email) {
    fieldErrors = addFieldError(fieldErrors, "email", "Email is required.");
  } else if (email.length > NEWSLETTER_FIELD_LIMITS.email) {
    fieldErrors = addFieldError(
      fieldErrors,
      "email",
      `Must be ${NEWSLETTER_FIELD_LIMITS.email} characters or fewer.`,
    );
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors = addFieldError(fieldErrors, "email", "Please provide a valid email address.");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, data: { email }, fieldErrors };
  }

  return { success: true, data: { email } };
}
