import type { Testimonial } from "@/types";

/**
 * Phase 1 testimonials — code-seeded. Moves to Postgres (admin-editable) in Phase 2.
 * NOTE(user): replace with real student/graduate stories and placement outcomes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    authorName: "Graduate, Level 5 Personal Trainer",
    courseSlug: "level-5-personal-trainer",
    quote:
      "Training on a real commercial floor while I studied made all the difference — I walked into my first job already confident with clients.",
    outcome: "Now a personal trainer at Sector 7",
  },
  {
    authorName: "Graduate, Level 4 Fitness Instructor",
    courseSlug: "level-4-fitness-instructor",
    quote:
      "The assessors pushed me to actually coach, not just memorise. The placement support helped me land interviews fast.",
    outcome: "Placed as a fitness instructor",
  },
  {
    authorName: "Graduate, Nutrition & Wellness",
    courseSlug: "nutrition-and-wellness",
    quote:
      "I added nutrition coaching to my services and my client results improved immediately.",
    outcome: "Expanded into nutrition coaching",
  },
];
