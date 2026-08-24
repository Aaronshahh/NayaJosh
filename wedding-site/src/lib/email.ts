import { Resend } from "resend";
import type { InviteeResponse } from "./supabase";

type ConfirmationInput = {
  fullName: string;
  email: string;
  attending: boolean;
  inviteeResponses: InviteeResponse[];
  guestNames: string[];
  message?: string | null;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendRsvpConfirmation(input: ConfirmationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Resend env vars are missing (RESEND_API_KEY / RESEND_FROM_EMAIL)");
  }

  const resend = new Resend(apiKey);
  const statusLine = input.attending
    ? `We're so glad members of your party will be joining us for ${input.eventName}.`
    : `We're sorry your party can't make ${input.eventName}, but thank you for letting us know.`;

  const details = [
    ["Event", input.eventName],
    ["Date", input.eventDate],
    ["Time", input.eventTime],
    ["Location", input.eventLocation],
    ["Invitation", input.fullName],
    ["Email", input.email],
    [
      "Responses",
      input.inviteeResponses
        .map((response) => `${response.name}: ${response.attending ? "Accept" : "Decline"}`)
        .join(", "),
    ],
    ["Additional guests", String(input.guestNames.length)],
  ];

  if (input.guestNames.length) {
    details.push(["Guest names", input.guestNames.join(", ")]);
  }

  if (input.message?.trim()) {
    details.push(["Message", input.message.trim()]);
  }

  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#74635E;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#4A3D3A;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 20px;color:#4A3D3A;background:#F4ECE6;">
      <p style="margin:0 0 8px;font-style:italic;color:#A87B7E;">Naya &amp; Josh</p>
      <h1 style="margin:0 0 16px;font-weight:500;font-size:28px;">RSVP Confirmation</h1>
      <p style="margin:0 0 24px;line-height:1.6;">Hi ${escapeHtml(input.fullName)},</p>
      <p style="margin:0 0 24px;line-height:1.6;">${escapeHtml(statusLine)}</p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">${rows}</table>
      <p style="margin:0;line-height:1.6;color:#74635E;">With love,<br/>Naya &amp; Josh</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to: input.email,
    subject: `RSVP confirmation — ${input.eventName}`,
    html,
  });

  if (error) {
    throw new Error(error.message || "Failed to send confirmation email");
  }
}
