/**
 * Import code-seeded content (src/data) into the database.
 * Run with: npm run db:seed-content
 *
 * Idempotent — upserts courses by slug and rebuilds their modules.
 * Safe to run repeatedly; existing edits to a course in the DB will be
 * overwritten by the seed values, so only run this for the initial migration
 * (or to reset a course back to its seed defaults).
 */
import { PrismaClient, type FacultyRoleType } from "../src/generated/prisma";
import { COURSES } from "../src/data/courses";
import { FACULTY } from "../src/data/faculty";
import { TESTIMONIALS } from "../src/data/testimonials";

const prisma = new PrismaClient();

/** Map the public role label to the DB enum. */
const ROLE_TO_ENUM: Record<string, FacultyRoleType> = {
  Tutor: "TUTOR",
  Assessor: "ASSESSOR",
  "Internal Quality Assessor": "IQA",
  Author: "AUTHOR",
};

async function importCourses() {
  for (const c of COURSES) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        level: c.level,
        levelLabel: c.levelLabel,
        category: c.category,
        summary: c.summary,
        description: c.description,
        duration: c.duration,
        format: c.format,
        price: c.price,
        eligibility: c.eligibility,
        certification: c.certification,
        outcomes: c.outcomes,
        featured: c.featured ?? false,
        isPublished: true,
      },
      create: {
        slug: c.slug,
        title: c.title,
        level: c.level,
        levelLabel: c.levelLabel,
        category: c.category,
        summary: c.summary,
        description: c.description,
        duration: c.duration,
        format: c.format,
        price: c.price,
        eligibility: c.eligibility,
        certification: c.certification,
        outcomes: c.outcomes,
        featured: c.featured ?? false,
        isPublished: true,
      },
    });

    // Rebuild modules
    await prisma.courseModule.deleteMany({ where: { courseId: course.id } });
    await prisma.courseModule.createMany({
      data: c.modules.map((m, i) => ({
        courseId: course.id,
        title: m.title,
        description: m.description ?? null,
        sortOrder: i,
      })),
    });

    console.log(`  ✔ ${c.slug}`);
  }
}

async function importFaculty() {
  for (const [i, f] of FACULTY.entries()) {
    const faculty = await prisma.faculty.upsert({
      where: { slug: f.slug },
      update: { name: f.name, bio: f.bio, photoUrl: f.photoUrl ?? null, isPublished: true, sortOrder: i },
      create: { slug: f.slug, name: f.name, bio: f.bio, photoUrl: f.photoUrl ?? null, isPublished: true, sortOrder: i },
    });

    // Rebuild roles
    await prisma.facultyRole.deleteMany({ where: { facultyId: faculty.id } });
    await prisma.facultyRole.createMany({
      data: f.roles.map((r) => ({ facultyId: faculty.id, role: ROLE_TO_ENUM[r] })),
      skipDuplicates: true,
    });

    // Rebuild course links (skip slugs that don't resolve to a course)
    await prisma.courseFaculty.deleteMany({ where: { facultyId: faculty.id } });
    for (const slug of f.courses ?? []) {
      const course = await prisma.course.findUnique({ where: { slug }, select: { id: true } });
      if (course) {
        await prisma.courseFaculty.create({ data: { facultyId: faculty.id, courseId: course.id } });
      }
    }

    console.log(`  ✔ ${f.slug}`);
  }
}

async function importTestimonials() {
  // Testimonials have no natural key — reset and recreate from seed.
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: TESTIMONIALS.map((t, i) => ({
      authorName: t.authorName,
      courseSlug: t.courseSlug ?? null,
      quote: t.quote,
      outcome: t.outcome ?? null,
      isPublished: true,
      sortOrder: i,
    })),
  });
  console.log(`  ✔ ${TESTIMONIALS.length} testimonials`);
}

async function main() {
  console.log("Importing courses…");
  await importCourses();
  console.log("Importing faculty…");
  await importFaculty();
  console.log("Importing testimonials…");
  await importTestimonials();

  const [courses, faculty, testimonials] = await Promise.all([
    prisma.course.count(),
    prisma.faculty.count(),
    prisma.testimonial.count(),
  ]);
  console.log(`Done. ${courses} courses, ${faculty} faculty, ${testimonials} testimonials.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
