import { Resend } from "resend";
import { SITE } from "@/lib/site";

/** Lazy init — avoids build-time crash when RESEND_API_KEY is not set. */
function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "");
}

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? SITE.email;
const FROM_EMAIL = process.env.FROM_EMAIL ?? `S7 Academy <noreply@sector7.in>`;

export interface ApplicationEmailData {
  applicantName: string;
  email: string;
  phone: string;
  city?: string;
  courseTitle: string;
  preferredLevel?: string;
  experience?: string;
  preferredBatch?: string;
  message?: string;
}

const row = (label: string, value?: string) =>
  `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;width:160px">${label}</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">${value || "—"}</td></tr>`;

/**
 * Send the application notification (to academy) + acknowledgement (to applicant).
 * Returns false if email could not be sent (e.g. no API key) — caller decides
 * whether that's fatal. Throwing is avoided so the route can degrade gracefully.
 */
export async function sendApplicationEmails(data: ApplicationEmailData): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send.");
    return false;
  }

  const resend = getResend();
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1) Notify the academy team
  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `[S7 Academy] New Application — ${data.courseTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="color:#C9A23F;margin-bottom:4px">New Course Application</h2>
        <p style="color:#666;margin-top:0">${now} IST</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          ${row("Applicant", data.applicantName)}
          ${row("Phone", data.phone)}
          ${row("Email", data.email)}
          ${row("City", data.city)}
          ${row("Course", data.courseTitle)}
          ${row("Preferred level", data.preferredLevel)}
          ${row("Preferred batch", data.preferredBatch)}
          ${row("Experience", data.experience)}
        </table>
        ${
          data.message
            ? `<div style="margin-top:16px;padding:16px;background:#f9f9f9;border-left:3px solid #C9A23F"><p style="margin:0;white-space:pre-line">${data.message}</p></div>`
            : ""
        }
        <p style="color:#999;font-size:12px;margin-top:24px">Submitted from the S7 Academy application form.</p>
      </div>
    `,
  });

  // 2) Acknowledge the applicant
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "We received your application — S7 Academy",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="color:#C9A23F">Thank you, ${data.applicantName}!</h2>
        <p>We've received your application for <strong>${data.courseTitle}</strong>. Our team will review it and get back to you within 1–2 working days with batch dates, fees, and next steps.</p>
        <p>Questions in the meantime? WhatsApp us at <strong>${SITE.phone}</strong>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px">${SITE.legalName} — a Sector 7 institution.</p>
      </div>
    `,
  });

  return true;
}
