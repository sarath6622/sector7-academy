import type { Course } from "@/types";

/**
 * Phase 1 course catalog — code-seeded.
 * In Phase 2 this moves to Postgres and becomes admin-editable (see Prisma `Course`).
 *
 * NOTE(user): durations, prices, eligibility and certification names below are
 * sensible placeholders aligned with the REPS/RQF level structure from your
 * mindmap. Replace with the academy's final, accreditation-approved details.
 * (See PRD §16 open questions: final course list + pricing display rule.)
 */
export const COURSES: Course[] = [
  {
    slug: "level-1-gym-instructor",
    title: "Level 1 — Foundation in Fitness",
    level: "Level 1",
    levelLabel: "Foundation",
    category: "certification",
    summary:
      "Your entry into the fitness industry — core anatomy, gym floor fundamentals, and safe exercise coaching.",
    description:
      "A foundation certification for anyone starting out in fitness. Build the essential knowledge of anatomy, physiology, and gym-floor coaching needed to step confidently onto a commercial training floor and progress toward instructor and personal-trainer levels.",
    duration: "4–6 weeks",
    format: "In-person, batch-based, hands-on at the Sector 7 floor",
    price: null,
    eligibility: "16+; no prior qualification required. Passion for fitness essential.",
    certification: "S7 Academy Level 1 Certificate (accreditation in progress)",
    outcomes: [
      "Understand basic anatomy & physiology",
      "Coach foundational exercises safely",
      "Confidently operate on a commercial gym floor",
      "Progress to Level 4 / Level 5 qualifications",
    ],
    modules: [
      { title: "Functional anatomy & physiology" },
      { title: "Principles of fitness & health" },
      { title: "Gym floor safety & equipment" },
      { title: "Foundational exercise technique" },
    ],
    featured: true,
  },
  {
    slug: "level-4-fitness-instructor",
    title: "Level 4 — Advanced Fitness Instructor",
    level: "Level 4",
    levelLabel: "Fitness Instructor",
    category: "certification",
    summary:
      "Advance from foundation to instructing — program design, class delivery, and client coaching.",
    description:
      "Step up to instructing clients and groups. Develop deeper programming knowledge, learn to design and deliver effective sessions, and gain the assessed competence expected of a professional fitness instructor.",
    duration: "8–10 weeks",
    format: "In-person, batch-based, with live coaching practice",
    price: null,
    eligibility: "Level 1 / Foundation completion or equivalent experience.",
    certification: "S7 Academy Level 4 Certificate (accreditation in progress)",
    outcomes: [
      "Design safe, effective fitness programs",
      "Instruct individuals and groups",
      "Apply periodisation & progression principles",
      "Conduct fitness assessments",
    ],
    modules: [
      { title: "Advanced anatomy & biomechanics" },
      { title: "Programme design & periodisation" },
      { title: "Group & individual instruction" },
      { title: "Client assessment & screening" },
    ],
    featured: true,
  },
  {
    slug: "level-5-personal-trainer",
    title: "Level 5 — Personal Trainer",
    level: "Level 5",
    levelLabel: "Personal Trainer",
    category: "certification",
    summary:
      "The flagship qualification — become a job-ready, professional personal trainer.",
    description:
      "Our flagship certification. Master advanced programming, behaviour-change coaching, nutrition fundamentals, and the professional skills to build a career as a personal trainer. Includes hands-on coaching hours on a live commercial gym floor and career & placement support.",
    duration: "12–16 weeks",
    format: "In-person, batch-based, with supervised real-client coaching hours",
    price: null,
    eligibility: "Level 4 completion or equivalent. Foundational fitness knowledge required.",
    certification: "S7 Academy Level 5 Personal Trainer Certificate (accreditation in progress)",
    outcomes: [
      "Coach real clients toward results",
      "Design advanced, individualised programs",
      "Apply behaviour-change & nutrition coaching",
      "Be job-ready with placement support",
    ],
    modules: [
      { title: "Advanced programme design" },
      { title: "Nutrition for personal training" },
      { title: "Behaviour change & client psychology" },
      { title: "Supervised real-client coaching hours" },
      { title: "Business & professional practice" },
    ],
    featured: true,
  },
  {
    slug: "nutrition-and-wellness",
    title: "Nutrition & Wellness Coaching",
    level: "Specialist",
    levelLabel: "Nutrition & Wellness",
    category: "nutrition",
    summary:
      "Specialise in nutrition and holistic wellness coaching to complement your fitness expertise.",
    description:
      "A specialist course covering applied nutrition, dietary strategies, and holistic wellness coaching. Ideal for trainers wanting to offer evidence-based nutrition guidance and for those entering wellness coaching as a profession.",
    duration: "6–8 weeks",
    format: "In-person / blended, batch-based",
    price: null,
    eligibility: "Open to fitness professionals and motivated beginners.",
    certification: "S7 Academy Nutrition & Wellness Certificate (accreditation in progress)",
    outcomes: [
      "Apply nutrition science to client goals",
      "Build practical, sustainable meal strategies",
      "Coach holistic wellness & lifestyle change",
      "Add nutrition services to your offering",
    ],
    modules: [
      { title: "Foundations of nutrition science" },
      { title: "Macronutrients, energy & body composition" },
      { title: "Practical dietary strategies" },
      { title: "Wellness & lifestyle coaching" },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((c) => c.featured);
}

export const COURSE_LEVELS = ["Level 1", "Level 4", "Level 5", "Specialist"] as const;
