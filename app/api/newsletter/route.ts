import { NextResponse } from "next/server";

import {
  NEWSLETTER_FIELD_LIMITS,
  validateNewsletterPayload,
  type NewsletterValidationInput,
} from "@/lib/newsletter";

type RawNewsletterPayload = NewsletterValidationInput;

async function parseNewsletterPayload(request: Request): Promise<RawNewsletterPayload> {
  const contentType = request.headers.get("content-type") || "";
  const payload: Record<string, unknown> = {};

  if (contentType.includes("application/json")) {
    const body = await request.json();

    if (body && typeof body === "object" && !Array.isArray(body)) {
      const bodyFields = body as Record<string, unknown>;

      for (const field of Object.keys(NEWSLETTER_FIELD_LIMITS) as Array<
        keyof typeof NEWSLETTER_FIELD_LIMITS
      >) {
        payload[field] = bodyFields[field] ?? "";
      }
    }
  } else {
    const formData = await request.formData();

    for (const field of Object.keys(NEWSLETTER_FIELD_LIMITS) as Array<
      keyof typeof NEWSLETTER_FIELD_LIMITS
    >) {
      payload[field] = formData.get(field) ?? "";
    }
  }

  return payload;
}

async function subscribeEmail(email: string) {
  const apiUrl = process.env.NEWSLETTER_API_URL;
  const apiKey = process.env.NEWSLETTER_API_KEY;
  const listId = process.env.NEWSLETTER_LIST_ID;

  if (!apiUrl || !apiKey || !listId) {
    throw new Error("Newsletter provider environment variables are not configured.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listId,
      source: "website-newsletter",
    }),
  });

  if (!response.ok) {
    throw new Error(`Newsletter provider returned ${response.status}.`);
  }
}

export async function POST(request: Request) {
  let payload: RawNewsletterPayload;

  try {
    payload = await parseNewsletterPayload(request);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Please submit valid newsletter form data.",
        fieldErrors: {},
      },
      { status: 400 },
    );
  }

  const validation = validateNewsletterPayload(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please provide a valid email address.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await subscribeEmail(validation.data.email);

    return NextResponse.json({ success: true, fieldErrors: {} });
  } catch (error) {
    console.error("Failed to subscribe newsletter email", error);

    return NextResponse.json(
      {
        success: false,
        error: "We could not add you to the newsletter. Please try again later.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
