import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { getPublishedCourses } from "@/lib/queries/courses";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, ACCREDITATION_STATUS } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Apply",
  description:
    "Apply to S7 Academy of Fitness & Performance. Submit your application and our team will guide you through eligibility, batch dates, and fees.",
  path: "/apply",
});

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const courses = (await getPublishedCourses()).map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Apply", url: `${SITE.url}/apply` },
          ]),
        }}
      />

      <PageHero
        eyebrow="Apply"
        title="Start your application"
        subtitle="Tell us a bit about yourself and the course you're interested in. There's no payment now — our team will reach out with everything you need to enroll."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApplyForm defaultCourse={course} courses={courses} />
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-bg-secondary p-6">
              <h2 className="text-2xl text-white">What happens next</h2>
              <ol className="mt-5 space-y-4 text-sm">
                {[
                  "You submit this application — no payment required.",
                  "We review it and confirm eligibility & batch availability.",
                  "Our team contacts you with fees and enrollment steps.",
                  "You join and start training on a live commercial gym floor.",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-white/90">
                    <span className="font-display text-xl text-accent">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-xs text-muted">
                <CheckCircle2 className="h-4 w-4 text-accent" /> {ACCREDITATION_STATUS}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
