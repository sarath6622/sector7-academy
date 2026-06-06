import { db } from "@/lib/db";
import { COURSES, getCourse as getSeedCourse } from "@/data/courses";
import type { Course, CourseCategory } from "@/types";

/**
 * Course data access. Reads from Postgres when available, and falls back to the
 * code-seeded catalog (src/data/courses.ts) when there is no database or the DB
 * has no courses yet — so the public site always renders.
 *
 * Public functions return only PUBLISHED courses. Admin functions (below)
 * return everything, including drafts.
 */

type DbCourseWithModules = NonNullable<Awaited<ReturnType<typeof findDbCourse>>>;

function findDbCourse(slug: string) {
  if (!db) return Promise.resolve(null);
  return db.course.findUnique({
    where: { slug },
    include: { modules: { orderBy: { sortOrder: "asc" } } },
  });
}

function mapCourse(c: DbCourseWithModules): Course {
  return {
    slug: c.slug,
    title: c.title,
    level: c.level,
    levelLabel: c.levelLabel,
    category: c.category as CourseCategory,
    summary: c.summary,
    description: c.description,
    duration: c.duration ?? "",
    format: c.format ?? "",
    price: c.price,
    eligibility: c.eligibility ?? "",
    certification: c.certification ?? "",
    outcomes: c.outcomes,
    featured: c.featured,
    modules: c.modules.map((m) => ({ title: m.title, description: m.description ?? undefined })),
  };
}

/** All published courses (public catalog). Falls back to seed data. */
export async function getPublishedCourses(): Promise<Course[]> {
  if (!db) return COURSES;
  const rows = await db.course.findMany({
    where: { isPublished: true },
    include: { modules: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  if (rows.length === 0) return COURSES; // DB configured but not yet imported
  return rows.map(mapCourse);
}

/** Published courses flagged as featured (homepage). */
export async function getFeaturedCourses(): Promise<Course[]> {
  const courses = await getPublishedCourses();
  const featured = courses.filter((c) => c.featured);
  return featured.length > 0 ? featured : courses.slice(0, 3);
}

/** A single published course by slug, or null. Falls back to seed data. */
export async function getPublishedCourseBySlug(slug: string): Promise<Course | null> {
  if (!db) return getSeedCourse(slug) ?? null;
  const row = await findDbCourse(slug);
  if (row && row.isPublished) return mapCourse(row);
  // If the DB has no courses at all, fall back to seed (pre-import resilience).
  if (!row && (await db.course.count()) === 0) return getSeedCourse(slug) ?? null;
  return null;
}

/** Slugs for static generation. Falls back to seed slugs. */
export async function getAllCourseSlugs(): Promise<string[]> {
  if (!db) return COURSES.map((c) => c.slug);
  const rows = await db.course.findMany({ where: { isPublished: true }, select: { slug: true } });
  if (rows.length === 0) return COURSES.map((c) => c.slug);
  return rows.map((r) => r.slug);
}

// ── Admin queries (include drafts; require a database) ───────────────────────

/** All courses including unpublished, for the admin list. */
export async function getAllCoursesAdmin() {
  if (!db) return [];
  return db.course.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { modules: true } } },
  });
}

/** A single course (any status) with modules, for the admin edit form. */
export async function getCourseByIdAdmin(id: string) {
  if (!db) return null;
  return db.course.findUnique({
    where: { id },
    include: { modules: { orderBy: { sortOrder: "asc" } } },
  });
}
