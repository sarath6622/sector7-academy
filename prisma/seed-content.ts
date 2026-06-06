/**
 * Import code-seeded content (src/data) into the database.
 * Run with: npm run db:seed-content
 *
 * Idempotent — upserts courses by slug and rebuilds their modules.
 * Safe to run repeatedly; existing edits to a course in the DB will be
 * overwritten by the seed values, so only run this for the initial migration
 * (or to reset a course back to its seed defaults).
 */
import { PrismaClient } from "../src/generated/prisma";
import { COURSES } from "../src/data/courses";

const prisma = new PrismaClient();

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

async function main() {
  console.log("Importing courses…");
  await importCourses();
  const count = await prisma.course.count();
  console.log(`Done. ${count} courses in the database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
