import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCoursesAdmin } from "@/lib/queries/courses";
import { TestimonialForm } from "../TestimonialForm";

export const metadata = { title: "Add testimonial" };
export const dynamic = "force-dynamic";

export default async function NewTestimonialPage() {
  const courses = (await getAllCoursesAdmin()).map((c) => ({ slug: c.slug, title: c.title }));
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to testimonials
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">Add testimonial</h1>
      <TestimonialForm courses={courses} />
    </div>
  );
}
