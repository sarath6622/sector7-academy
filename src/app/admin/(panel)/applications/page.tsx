import Link from "next/link";
import { Inbox } from "lucide-react";
import type { Prisma } from "@/generated/prisma";
import { requireDb } from "@/lib/db";
import { getCourse } from "@/data/courses";
import { STATUS_ORDER, STATUS_META, type ApplicationStatus } from "@/lib/applications";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FILTERS: { value: string; label: string }[] = [
  { value: "ALL", label: "All" },
  ...STATUS_ORDER.map((s) => ({ value: s, label: STATUS_META[s].label })),
];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const db = requireDb();
  const { status } = await searchParams;
  const active = status && STATUS_ORDER.includes(status as ApplicationStatus) ? status : "ALL";

  const where: Prisma.ApplicationWhereInput =
    active === "ALL" ? {} : { status: active as ApplicationStatus };

  const applications = await db.application.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6">
        <h1 className="text-4xl text-white">Applications</h1>
        <p className="mt-1 text-sm text-muted">{applications.length} shown</p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          const href = f.value === "ALL" ? "/admin/applications" : `/admin/applications?status=${f.value}`;
          return (
            <Link
              key={f.value}
              href={href}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                isActive
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-bg-secondary text-white/70 hover:text-white"
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
          <Inbox className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">No applications in this view.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Applicant</th>
                <th className="px-5 py-3 font-medium">Course</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-bg-primary">
              {applications.map((app) => {
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
                    <td className="px-5 py-3 text-white/80">{app.phone}</td>
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
  );
}
