import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/applicationSchema";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendApplicationEmails } from "@/lib/email";
import { getCourse } from "@/data/courses";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = applicationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.issues }, { status: 400 });
  }

  const data = result.data;

  // Honeypot — silently accept to not tip off bots
  if (data._hp) {
    return NextResponse.json({ success: true, message: "Application received." });
  }

  const course = getCourse(data.courseSlug);
  const courseTitle = course?.title ?? data.courseSlug;

  // 1) Persist to Postgres if a database is configured (Phase 1: capture leads).
  //    Failure here must NOT block the applicant — we still email.
  if (db) {
    try {
      await db.application.create({
        data: {
          applicantName: data.applicantName,
          email: data.email,
          phone: data.phone,
          city: data.city || null,
          courseSlug: data.courseSlug,
          preferredLevel: course?.level ?? null,
          experience: data.experience,
          preferredBatch: data.preferredBatch || null,
          message: data.message || null,
        },
      });
    } catch (err) {
      console.error("[/api/apply] DB insert failed (continuing):", err);
    }
  }

  // 2) Send notification + acknowledgement emails.
  let emailed = false;
  try {
    emailed = await sendApplicationEmails({
      applicantName: data.applicantName,
      email: data.email,
      phone: data.phone,
      city: data.city || undefined,
      courseTitle,
      preferredLevel: course?.level,
      experience: data.experience,
      preferredBatch: data.preferredBatch || undefined,
      message: data.message || undefined,
    });
  } catch (err) {
    console.error("[/api/apply] Email send failed:", err);
  }

  // If neither persistence nor email worked, surface an error so nothing is lost silently.
  if (!emailed && !db) {
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your application right now. Please WhatsApp or call us, or try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, message: "Application received." });
}
