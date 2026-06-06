import { db } from "@/lib/db";
import { TESTIMONIALS } from "@/data/testimonials";
import type { Testimonial } from "@/types";

/**
 * Testimonial data access. Reads from Postgres when available, with a graceful
 * fallback to the code-seeded list (src/data/testimonials.ts).
 */

/** All published testimonials (home + careers). Falls back to seed data. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!db) return TESTIMONIALS;
  const rows = await db.testimonial.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  if (rows.length === 0) return TESTIMONIALS;
  return rows.map((t) => ({
    authorName: t.authorName,
    courseSlug: t.courseSlug ?? undefined,
    quote: t.quote,
    outcome: t.outcome ?? undefined,
  }));
}

// ── Admin queries ────────────────────────────────────────────────────────────

export async function getAllTestimonialsAdmin() {
  if (!db) return [];
  return db.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
}

export async function getTestimonialByIdAdmin(id: string) {
  if (!db) return null;
  return db.testimonial.findUnique({ where: { id } });
}
