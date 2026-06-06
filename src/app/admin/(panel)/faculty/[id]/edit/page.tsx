import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFacultyByIdAdmin } from "@/lib/queries/faculty";
import { getAllCoursesAdmin } from "@/lib/queries/courses";
import { FacultyForm } from "../../FacultyForm";

export const metadata = { title: "Edit faculty" };
export const dynamic = "force-dynamic";

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [faculty, allCourses] = await Promise.all([getFacultyByIdAdmin(id), getAllCoursesAdmin()]);
  if (!faculty) notFound();

  const courses = allCourses.map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to faculty
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">Edit faculty</h1>
      <FacultyForm
        courses={courses}
        faculty={{
          id: faculty.id,
          name: faculty.name,
          slug: faculty.slug,
          bio: faculty.bio,
          photoUrl: faculty.photoUrl,
          roles: faculty.roles.map((r) => r.role),
          courseSlugs: faculty.courses.map((c) => c.course.slug),
          isPublished: faculty.isPublished,
          sortOrder: faculty.sortOrder,
        }}
      />
    </div>
  );
}
