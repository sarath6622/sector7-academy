import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTestimonialByIdAdmin } from "@/lib/queries/testimonials";
import { getAllCoursesAdmin } from "@/lib/queries/courses";
import { TestimonialForm } from "../../TestimonialForm";

export const metadata = { title: "Edit testimonial" };
export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial, allCourses] = await Promise.all([getTestimonialByIdAdmin(id), getAllCoursesAdmin()]);
  if (!testimonial) notFound();

  const courses = allCourses.map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <div className="px-8 py-8">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to testimonials
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">Edit testimonial</h1>
      <TestimonialForm
        courses={courses}
        testimonial={{
          id: testimonial.id,
          authorName: testimonial.authorName,
          quote: testimonial.quote,
          outcome: testimonial.outcome,
          courseSlug: testimonial.courseSlug,
          isPublished: testimonial.isPublished,
          sortOrder: testimonial.sortOrder,
        }}
      />
    </div>
  );
}
