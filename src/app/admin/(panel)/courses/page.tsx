import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { getAllCoursesAdmin } from "@/lib/queries/courses";
import { cn } from "@/lib/utils";
import { CourseRowActions } from "./CourseRowActions";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await getAllCoursesAdmin();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white">Courses</h1>
          <p className="mt-1 text-sm text-muted">{courses.length} total</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" /> New course
        </Link>
      </header>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">No courses yet.</p>
          <Link href="/admin/courses/new" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
            Create your first course
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Level</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Modules</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-bg-primary">
              {courses.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-bg-secondary">
                  <td className="px-5 py-3">
                    <Link href={`/admin/courses/${c.id}/edit`} className="font-medium text-white hover:text-accent">
                      {c.title}
                    </Link>
                    <p className="text-xs text-muted">/{c.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-white/80">{c.level}</td>
                  <td className="px-5 py-3 text-white/80 capitalize">{c.category}</td>
                  <td className="px-5 py-3 text-white/80">{c._count.modules}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                        c.isPublished
                          ? "border-green-500/30 bg-green-500/15 text-green-400"
                          : "border-border bg-white/5 text-muted"
                      )}
                    >
                      {c.isPublished ? "Published" : "Draft"}
                    </span>
                    {c.featured && (
                      <span className="ml-2 inline-flex rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <CourseRowActions id={c.id} isPublished={c.isPublished} title={c.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
