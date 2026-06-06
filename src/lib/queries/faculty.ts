import { db } from "@/lib/db";
import { FACULTY, getFacultyForCourse as seedFacultyForCourse } from "@/data/faculty";
import type { Faculty, FacultyRoleType } from "@/types";
import type { FacultyRoleType as DbRole } from "@/generated/prisma";

/**
 * Faculty data access. Reads from Postgres when available, with a graceful
 * fallback to the code-seeded list (src/data/faculty.ts).
 */

const ENUM_TO_LABEL: Record<DbRole, FacultyRoleType> = {
  TUTOR: "Tutor",
  ASSESSOR: "Assessor",
  IQA: "Internal Quality Assessor",
  AUTHOR: "Author",
};

export const LABEL_TO_ENUM: Record<FacultyRoleType, DbRole> = {
  Tutor: "TUTOR",
  Assessor: "ASSESSOR",
  "Internal Quality Assessor": "IQA",
  Author: "AUTHOR",
};

type DbFacultyWithRelations = {
  slug: string;
  name: string;
  bio: string;
  photoUrl: string | null;
  roles: { role: DbRole }[];
  courses?: { course: { slug: string } }[];
};

function mapFaculty(f: DbFacultyWithRelations): Faculty {
  return {
    slug: f.slug,
    name: f.name,
    bio: f.bio,
    photoUrl: f.photoUrl ?? undefined,
    roles: f.roles.map((r) => ENUM_TO_LABEL[r.role]),
    courses: f.courses?.map((c) => c.course.slug),
  };
}

/** All published faculty for the public faculty page. Falls back to seed data. */
export async function getPublishedFaculty(): Promise<Faculty[]> {
  if (!db) return FACULTY;
  const rows = await db.faculty.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { roles: true, courses: { include: { course: { select: { slug: true } } } } },
  });
  if (rows.length === 0) return FACULTY;
  return rows.map(mapFaculty);
}

/** Published faculty linked to a course (course detail page). Falls back to seed. */
export async function getFacultyForCourse(courseSlug: string): Promise<Faculty[]> {
  if (!db) return seedFacultyForCourse(courseSlug);
  const rows = await db.faculty.findMany({
    where: { isPublished: true, courses: { some: { course: { slug: courseSlug } } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { roles: true },
  });
  return rows.map(mapFaculty);
}

// ── Admin queries ────────────────────────────────────────────────────────────

export async function getAllFacultyAdmin() {
  if (!db) return [];
  return db.faculty.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { roles: true, _count: { select: { courses: true } } },
  });
}

export async function getFacultyByIdAdmin(id: string) {
  if (!db) return null;
  return db.faculty.findUnique({
    where: { id },
    include: { roles: true, courses: { include: { course: { select: { slug: true } } } } },
  });
}
