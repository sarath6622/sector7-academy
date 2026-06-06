import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "../CourseForm";

export const metadata = { title: "New course" };

export default function NewCoursePage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Link href="/admin/courses" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>
      <h1 className="mt-4 mb-8 text-4xl text-white">New course</h1>
      <CourseForm />
    </div>
  );
}
