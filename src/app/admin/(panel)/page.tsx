import Link from "next/link";
import { ArrowRight, Inbox } from "lucide-react";
import { requireDb } from "@/lib/db";
import { getCourse } from "@/data/courses";
import { STATUS_ORDER, STATUS_META, type ApplicationStatus } from "@/lib/applications";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const db = requireDb();

  const [grouped, recent, total] = await Promise.all([
    db.application.groupBy({ by: ["status"], _count: { _all: true } }),
    db.application.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    db.application.count(),
  ]);

  const counts: Record<string, number> = {};
  for (const g of grouped) counts[g.status] = g._count._all;

  return (
    <div className="px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">{total} total applications</p>
      </header>

      {/* Status counts */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATUS_ORDER.map((status) => {
          const meta = STATUS_META[status];
          return (
            <Link
              key={status}
              href={`/admin/applications?status=${status}`}
              className="rounded-xl border border-border bg-bg-secondary p-5 transition-colors hover:border-accent/40"
            >
              <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", meta.className)}>
                {meta.label}
              </span>
              <p className="mt-3 font-display text-4xl text-white">{counts[status] ?? 0}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-white">Recent applications</h2>
          <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-secondary p-10 text-center">
            <Inbox className="mx-auto h-8 w-8 text-muted" />
            <p className="mt-3 text-sm text-muted">No applications yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-secondary text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Applicant</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg-primary">
                {recent.map((app) => {
                  const meta = STATUS_META[app.status as ApplicationStatus];
                  const course = app.courseSlug ? getCourse(app.courseSlug) : undefined;
                  return (
                    <tr key={app.id} className="transition-colors hover:bg-bg-secondary">
                      <td className="px-5 py-3">
                        <Link href={`/admin/applications/${app.id}`} className="font-medium text-white hover:text-accent">
                          {app.applicantName}
                        </Link>
                        <p className="text-xs text-muted">{app.email}</p>
                      </td>
                      <td className="px-5 py-3 text-white/80">{course?.title ?? app.courseSlug ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", meta.className)}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted">
                        {app.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
