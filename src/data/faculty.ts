import type { Faculty, FacultyRoleType } from "@/types";

/**
 * Phase 1 faculty — code-seeded. Moves to Postgres (admin-editable) in Phase 2.
 *
 * NOTE(user): these are PLACEHOLDER profiles. Replace with the academy's real
 * people, bios, photos, and role assignments — this page is important for the
 * REPS/NSDC accreditation review (it shows the academy is properly staffed
 * across all required quality-assurance roles). See PRD §16.
 */
export const FACULTY: Faculty[] = [
  {
    slug: "head-of-academy",
    name: "Head of Academy",
    roles: ["Tutor", "Author"],
    bio: "Leads course delivery and curriculum development at S7 Academy, with years of coaching experience on the Sector 7 commercial floor. (Placeholder — replace with real bio.)",
    courses: ["level-5-personal-trainer", "level-4-fitness-instructor"],
  },
  {
    slug: "lead-assessor",
    name: "Lead Assessor",
    roles: ["Assessor", "Tutor"],
    bio: "Responsible for assessing student competence against course standards and mentoring learners through practical evaluation. (Placeholder — replace with real bio.)",
    courses: ["level-1-gym-instructor", "level-4-fitness-instructor"],
  },
  {
    slug: "internal-quality-assessor",
    name: "Internal Quality Assessor",
    roles: ["Internal Quality Assessor"],
    bio: "Assures the quality and consistency of assessment across all courses, upholding the standards required for accreditation. (Placeholder — replace with real bio.)",
  },
  {
    slug: "nutrition-author",
    name: "Nutrition Course Author",
    roles: ["Author", "Tutor"],
    bio: "Develops and delivers the academy's nutrition & wellness curriculum, grounding it in current evidence-based practice. (Placeholder — replace with real bio.)",
    courses: ["nutrition-and-wellness"],
  },
];

/** The academy's quality-assurance roles, explained (used on About + Faculty pages). */
export const ROLE_DESCRIPTIONS: Record<FacultyRoleType, string> = {
  Tutor: "Delivers training and teaches students through the course.",
  Assessor: "Assesses student competence against the qualification standards.",
  "Internal Quality Assessor":
    "Assures the quality and consistency of assessment — a key accreditation requirement.",
  Author: "Develops the course content and curriculum.",
};

export function getFaculty(slug: string): Faculty | undefined {
  return FACULTY.find((f) => f.slug === slug);
}

export function getFacultyForCourse(courseSlug: string): Faculty[] {
  return FACULTY.filter((f) => f.courses?.includes(courseSlug));
}
