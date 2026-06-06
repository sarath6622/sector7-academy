import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CourseCard } from "@/components/ui/CourseCard";
import { CTABand } from "@/components/ui/CTABand";
import { getPublishedCourses } from "@/lib/queries/courses";
import { buildMetadata, jsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Courses",
  description:
    "Explore S7 Academy's accredited, multi-level fitness certification courses — Level 1 Foundation, Level 4 Fitness Instructor, Level 5 Personal Trainer, and Nutrition & Wellness.",
  path: "/courses",
  keywords: [
    "fitness trainer course",
    "personal trainer certification India",
    "REPS India course",
    "gym instructor course Kochi",
    "nutrition course",
  ],
});

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  const certification = courses.filter((c) => c.category === "certification");
  const nutrition = courses.filter((c) => c.category === "nutrition");

  const itemListLd = jsonLd("ItemList", {
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${SITE.url}/courses/${c.slug}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Courses", url: `${SITE.url}/courses` },
          ]),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListLd }} />

      <PageHero
        eyebrow="Courses"
        title="Certification courses for every level"
        subtitle="A clear progression from foundation to flagship personal-trainer certification — each with hands-on coaching on a live commercial gym floor."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <h2 className="text-3xl text-white">Fitness certification path</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Progress level by level toward a professional personal-trainer qualification.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certification.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <h2 className="mt-16 text-3xl text-white">Specialist courses</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Add in-demand specialisations to your professional offering.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nutrition.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
