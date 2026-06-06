import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCoursesAdmin } from "@/lib/queries/courses";
import { FacultyForm } from "../FacultyForm";

export const metadata = { title: "Add faculty" };
export const dynamic = "force-dynamic";

export default async function NewFacultyPage() {
  const courses = (await getAllCoursesAdmin()).map((c) => ({ slug: c.slug, title: c.title }));
  return (
    <div className="px-8 py-8">
      <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to faculty
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">Add faculty</h1>
      <FacultyForm courses={courses} />
    </div>
  );
}
