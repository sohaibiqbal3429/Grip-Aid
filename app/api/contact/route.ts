import { NextResponse } from "next/server";

import { sendContactMail } from "@/lib/mail";
import { CONTACT_FIELD_LIMITS, validateContactPayload, type ContactField } from "@/lib/validations";

type RawContactPayload = Partial<Record<ContactField, unknown>>;

async function parseContactPayload(request: Request): Promise<RawContactPayload> {
  const contentType = request.headers.get("content-type") || "";
  const payload: Record<string, unknown> = {};

  if (contentType.includes("application/json")) {
    const body = await request.json();

    if (body && typeof body === "object" && !Array.isArray(body)) {
      Object.assign(payload, body);
    }
  } else {
    const formData = await request.formData();

    for (const field of Object.keys(CONTACT_FIELD_LIMITS) as ContactField[]) {
      payload[field] = formData.get(field);
    }
  }

  return payload;
}

export async function POST(request: Request) {
  let payload: RawContactPayload;

  try {
    payload = await parseContactPayload(request);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Please submit valid contact form data.",
        fieldErrors: {},
      },
      { status: 400 },
    );
  }

  const validation = validateContactPayload(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await sendContactMail(validation.data);

    return NextResponse.json({ success: true, fieldErrors: {} });
  } catch (error) {
    console.error("Failed to send contact form email", error);

    return NextResponse.json(
      {
        success: false,
        error: "We could not send your message. Please try again later.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
