"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { requireDb } from "@/lib/db";

async function ensureStaff() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "STAFF") throw new Error("Unauthorised");
}

function revalidateTestimonials() {
  revalidatePath("/");
  revalidatePath("/careers");
  revalidatePath("/admin/testimonials");
}

const testimonialSchema = z.object({
  authorName: z.string().min(2, "Author name is required"),
  quote: z.string().min(1, "Quote is required"),
  outcome: z.string().default(""),
  courseSlug: z.string().default(""),
  isPublished: z.boolean(),
  sortOrder: z.number().int(),
});

export type SaveState = { error?: string };

export async function saveTestimonial(
  id: string | null,
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await ensureStaff();
  const get = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";

  const parsed = testimonialSchema.safeParse({
    authorName: get("authorName"),
    quote: get("quote"),
    outcome: get("outcome"),
    courseSlug: get("courseSlug"),
    isPublished: formData.get("isPublished") === "on",
    sortOrder: Number(get("sortOrder")) || 0,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const d = parsed.data;

  const data = {
    authorName: d.authorName,
    quote: d.quote,
    outcome: d.outcome || null,
    courseSlug: d.courseSlug || null,
    isPublished: d.isPublished,
    sortOrder: d.sortOrder,
  };

  try {
    if (id) await requireDb().testimonial.update({ where: { id }, data });
    else await requireDb().testimonial.create({ data });
  } catch (e) {
    console.error("[saveTestimonial]", e);
    return { error: "Could not save. Please try again." };
  }

  revalidateTestimonials();
  redirect("/admin/testimonials");
}

export async function togglePublishTestimonial(id: string, next: boolean) {
  await ensureStaff();
  await requireDb().testimonial.update({ where: { id }, data: { isPublished: next } });
  revalidateTestimonials();
}

export async function deleteTestimonial(id: string) {
  await ensureStaff();
  await requireDb().testimonial.delete({ where: { id } });
  revalidateTestimonials();
  redirect("/admin/testimonials");
}
