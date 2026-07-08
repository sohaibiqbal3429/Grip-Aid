import nodemailer from "nodemailer";

export type ContactMailInput = {
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "CONTACT_TO_EMAIL",
] as const;

function getRequiredEnv(name: (typeof requiredEnvVars)[number]): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function formatOptionalLine(label: string, value?: string): string {
  return value ? `${label}: ${value}\n` : "";
}

export async function sendContactMail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactMailInput): Promise<void> {
  const smtpPort = Number(getRequiredEnv("SMTP_PORT"));

  if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
    throw new Error("SMTP_PORT must be a valid positive integer");
  }

  const transporter = nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });

  const mailSubject = subject || "New contact form submission";
  const senderName = name || "Website visitor";

  await transporter.sendMail({
    from: getRequiredEnv("SMTP_FROM"),
    to: getRequiredEnv("CONTACT_TO_EMAIL"),
    replyTo: email,
    subject: mailSubject,
    text: [
      `From: ${senderName}`,
      `Email: ${email}`,
      formatOptionalLine("Phone", phone).trim(),
      formatOptionalLine("Subject", subject).trim(),
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
