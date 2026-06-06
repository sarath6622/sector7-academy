import { z } from "zod";

/** Shared validation schema for the course application form (client + server). */
export const applicationSchema = z.object({
  applicantName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  city: z.string().max(80).optional().or(z.literal("")),
  courseSlug: z.string().min(1, "Please select a course"),
  preferredLevel: z.string().optional().or(z.literal("")),
  experience: z.enum(["none", "some", "experienced", "professional"], {
    message: "Please select your experience level",
  }),
  preferredBatch: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(800).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please accept to be contacted" }),
  // Honeypot — humans leave this empty; bots fill it. Kept permissive on purpose
  // so the API can silently accept (and discard) bot submissions in the route
  // rather than returning a validation error that tips the bot off.
  _hp: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const EXPERIENCE_OPTIONS = [
  { value: "none", label: "Complete beginner" },
  { value: "some", label: "Some training experience" },
  { value: "experienced", label: "Experienced (train regularly)" },
  { value: "professional", label: "Working in fitness already" },
] as const;
