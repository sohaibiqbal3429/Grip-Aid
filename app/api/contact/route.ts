import { NextResponse } from "next/server";

import { sendContactMail, type ContactMailInput } from "@/lib/mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  phone: 40,
  subject: 160,
  message: 4000,
} as const;

type ContactField = keyof typeof MAX_FIELD_LENGTHS;
type ContactPayload = Partial<Record<ContactField, string>>;

function sanitizeText(value: FormDataEntryValue | unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\0/g, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

async function parseContactPayload(request: Request): Promise<ContactPayload> {
  const contentType = request.headers.get("content-type") || "";
  const payload: Record<string, unknown> = {};

  if (contentType.includes("application/json")) {
    const body = await request.json();

    if (body && typeof body === "object" && !Array.isArray(body)) {
      Object.assign(payload, body);
    }
  } else {
    const formData = await request.formData();

    for (const field of Object.keys(MAX_FIELD_LENGTHS) as ContactField[]) {
      payload[field] = formData.get(field);
    }
  }

  return (Object.keys(MAX_FIELD_LENGTHS) as ContactField[]).reduce<ContactPayload>(
    (fields, field) => ({
      ...fields,
      [field]: sanitizeText(payload[field], MAX_FIELD_LENGTHS[field]),
    }),
    {},
  );
}

export async function POST(request: Request) {
  let fields: ContactPayload;

  try {
    fields = await parseContactPayload(request);
  } catch {
    return NextResponse.json(
      { success: false, error: "Please submit valid contact form data." },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = fields;

  if (!email || !message) {
    return NextResponse.json(
      { success: false, error: "Email and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  try {
    await sendContactMail({
      name,
      email,
      phone,
      subject,
      message,
    } satisfies ContactMailInput);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact form email", error);

    return NextResponse.json(
      { success: false, error: "We could not send your message. Please try again later." },
      { status: 500 },
    );
  }
}
