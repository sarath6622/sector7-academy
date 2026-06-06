import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Award, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COURSES, getCourse } from "@/data/courses";
import { getFacultyForCourse } from "@/data/faculty";
import { buildMetadata, courseJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, ACCREDITATION_STATUS } from "@/lib/site";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return buildMetadata({ title: "Course not found", description: "", path: `/courses/${slug}` });
  return buildMetadata({
    title: course.title,
    description: course.summary,
    path: `/courses/${course.slug}`,
    keywords: [course.title, course.levelLabel, "fitness certification", "personal trainer course"],
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const faculty = getFacultyForCourse(course.slug);
  const applyHref = `/apply?course=${course.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: courseJsonLd(course) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Courses", url: `${SITE.url}/courses` },
            { name: course.title, url: `${SITE.url}/courses/${course.slug}` },
          ]),
        }}
      />

      {/* Hero */}
      <section className="bg-grid border-b border-border bg-academy/40">
        <div className="container-px mx-auto max-w-6xl py-16 lg:py-20">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{course.level}</Badge>
            <Badge tone="neutral">{course.levelLabel}</Badge>
            {course.category === "nutrition" && <Badge tone="accent">Nutrition</Badge>}
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">{course.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{course.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={applyHref} variant="primary" size="lg">
              Apply for this course <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <Clock className="h-4 w-4 text-accent" /> {course.duration}
            </span>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl text-white">Overview</h2>
            <p className="mt-4 leading-relaxed text-white/85">{course.description}</p>

            <h2 className="mt-12 text-3xl text-white">What you&apos;ll be able to do</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {o}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl text-white">Course modules</h2>
            <ol className="mt-5 space-y-3">
              {course.modules.map((m, i) => (
                <li
                  key={m.title}
                  className="flex items-start gap-4 rounded-lg border border-border bg-bg-secondary p-4"
                >
                  <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-semibold text-white">{m.title}</p>
                    {m.description && <p className="mt-1 text-sm text-muted">{m.description}</p>}
                  </div>
                </li>
              ))}
            </ol>

            {faculty.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl text-white">Taught & assessed by</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {faculty.map((f) => (
                    <Link
                      key={f.slug}
                      href="/faculty"
                      className="group flex items-start gap-3 rounded-lg border border-border bg-bg-secondary p-4 transition-colors hover:border-accent/50"
                    >
                      <Users className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                      <div>
                        <p className="font-semibold text-white group-hover:text-accent">{f.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{f.roles.join(" · ")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-bg-secondary p-6">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Duration</dt>
                  <dd className="mt-1 font-semibold text-white">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Format</dt>
                  <dd className="mt-1 text-white/90">{course.format}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Eligibility</dt>
                  <dd className="mt-1 text-white/90">{course.eligibility}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Certification</dt>
                  <dd className="mt-1 flex items-start gap-2 text-white/90">
                    <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {course.certification}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">Fees</dt>
                  <dd className="mt-1 text-white/90">
                    {course.price ?? "Shared on enquiry"}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-border pt-5">
                <Button href={applyHref} variant="primary" size="md" className="w-full">
                  Apply Now
                </Button>
                <p className="mt-3 text-center text-xs text-muted">{ACCREDITATION_STATUS}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
