import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { getAllFacultyAdmin } from "@/lib/queries/faculty";
import { cn } from "@/lib/utils";
import { FacultyRowActions } from "./FacultyRowActions";

export const dynamic = "force-dynamic";

const ROLE_LABEL: Record<string, string> = {
  TUTOR: "Tutor",
  ASSESSOR: "Assessor",
  IQA: "IQA",
  AUTHOR: "Author",
};

export default async function AdminFacultyPage() {
  const faculty = await getAllFacultyAdmin();

  return (
    <div className="px-8 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white">Faculty</h1>
          <p className="mt-1 text-sm text-muted">{faculty.length} total</p>
        </div>
        <Link href="/admin/faculty/new" className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover">
          <Plus className="h-4 w-4" /> Add faculty
        </Link>
      </header>

      {faculty.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
          <Users className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">No faculty yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Roles</th>
                <th className="px-5 py-3 font-medium">Courses</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-bg-primary">
              {faculty.map((f) => (
                <tr key={f.id} className="transition-colors hover:bg-bg-secondary">
                  <td className="px-5 py-3">
                    <Link href={`/admin/faculty/${f.id}/edit`} className="font-medium text-white hover:text-accent">{f.name}</Link>
                    <p className="text-xs text-muted">/{f.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-white/80">{f.roles.map((r) => ROLE_LABEL[r.role]).join(", ") || "—"}</td>
                  <td className="px-5 py-3 text-white/80">{f._count.courses}</td>
                  <td className="px-5 py-3">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", f.isPublished ? "border-green-500/30 bg-green-500/15 text-green-400" : "border-border bg-white/5 text-muted")}>
                      {f.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <FacultyRowActions id={f.id} isPublished={f.isPublished} name={f.name} />
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
