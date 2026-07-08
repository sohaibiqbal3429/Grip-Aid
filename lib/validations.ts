export const CONTACT_FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  subject: 160,
  message: 4000,
} as const;

export type ContactField = keyof typeof CONTACT_FIELD_LIMITS;
export type ContactFieldErrors = Partial<Record<ContactField, string[]>>;
export type ContactValidationInput = Partial<Record<ContactField, unknown>>;
export type ContactApiRequestBody = Partial<Record<ContactField, string>>;
export type ValidatedContactPayload = Partial<Record<ContactField, string>> & {
  email: string;
  message: string;
};

export type ContactValidationResult =
  | { success: true; data: ValidatedContactPayload }
  | { success: false; data: Partial<Record<ContactField, string>>; fieldErrors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_FIELDS = new Set<ContactField>(["name", "email", "phone", "subject"]);
const HTML_ESCAPE_PATTERN = /[&<>'"]/g;
const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
};

function coerceField(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\0/g, "");
}

function stripCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function normalizeWhitespace(value: string): string {
  return value.replace(/[\t ]+/g, " ").trim();
}

function normalizeMessage(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => normalizeWhitespace(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function escapeUserContent(value: string): string {
  return value.replace(HTML_ESCAPE_PATTERN, (character) => HTML_ESCAPE_MAP[character]);
}

function addFieldError(
  fieldErrors: ContactFieldErrors,
  field: ContactField,
  message: string,
): ContactFieldErrors {
  return {
    ...fieldErrors,
    [field]: [...(fieldErrors[field] || []), message],
  };
}

export function validateContactPayload(input: ContactValidationInput): ContactValidationResult {
  let fieldErrors: ContactFieldErrors = {};
  const data = (Object.keys(CONTACT_FIELD_LIMITS) as ContactField[]).reduce<Partial<Record<ContactField, string>>>(
    (fields, field) => {
      const rawValue = coerceField(input[field]);
      const withoutHeaderBreaks = HEADER_FIELDS.has(field) ? stripCrlf(rawValue) : rawValue;
      const normalized = field === "message" ? normalizeMessage(withoutHeaderBreaks) : normalizeWhitespace(withoutHeaderBreaks);
      const limit = CONTACT_FIELD_LIMITS[field];

      if (normalized.length > limit) {
        fieldErrors = addFieldError(fieldErrors, field, `Must be ${limit} characters or fewer.`);
      }

      return {
        ...fields,
        [field]: escapeUserContent(normalized.slice(0, limit)),
      };
    },
    {},
  );

  if (!data.email) {
    fieldErrors = addFieldError(fieldErrors, "email", "Email is required.");
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fieldErrors = addFieldError(fieldErrors, "email", "Please provide a valid email address.");
  }

  if (!data.message) {
    fieldErrors = addFieldError(fieldErrors, "message", "Message is required.");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, data, fieldErrors };
  }

  return {
    success: true,
    data: {
      ...data,
      email: data.email || "",
      message: data.message || "",
    },
  };
}
