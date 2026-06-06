import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCourseByIdAdmin } from "@/lib/queries/courses";
import { CourseForm } from "../../CourseForm";

export const metadata = { title: "Edit course" };

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await getCourseByIdAdmin(id);
  if (!course) notFound();

  return (
    <div className="px-8 py-8">
      <Link href="/admin/courses" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">Edit course</h1>
      <CourseForm
        course={{
          id: course.id,
          title: course.title,
          slug: course.slug,
          level: course.level,
          levelLabel: course.levelLabel,
          category: course.category,
          summary: course.summary,
          description: course.description,
          duration: course.duration,
          format: course.format,
          price: course.price,
          eligibility: course.eligibility,
          certification: course.certification,
          outcomes: course.outcomes,
          featured: course.featured,
          isPublished: course.isPublished,
          sortOrder: course.sortOrder,
          modules: course.modules.map((m) => ({ title: m.title, description: m.description })),
        }}
      />
    </div>
  );
}
