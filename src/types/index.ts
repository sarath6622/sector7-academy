export type FacultyRoleType = "Tutor" | "Assessor" | "Internal Quality Assessor" | "Author";

export type CourseCategory = "certification" | "nutrition";

export interface CourseModule {
  title: string;
  description?: string;
}

export interface Course {
  slug: string;
  title: string;
  level: string; // e.g. "Level 1", "Level 5"
  levelLabel: string; // e.g. "Foundation", "Personal Trainer"
  category: CourseCategory;
  summary: string;
  description: string;
  duration: string;
  format: string;
  /** Display string; null => "Price on request" (see PRD open question on pricing). */
  price: string | null;
  eligibility: string;
  certification: string;
  outcomes: string[];
  modules: CourseModule[];
  featured?: boolean;
}

export interface Faculty {
  slug: string;
  name: string;
  roles: FacultyRoleType[];
  bio: string;
  photoUrl?: string;
  /** Course slugs this person teaches/assesses. */
  courses?: string[];
}

export interface Testimonial {
  authorName: string;
  courseSlug?: string;
  quote: string;
  outcome?: string;
}
