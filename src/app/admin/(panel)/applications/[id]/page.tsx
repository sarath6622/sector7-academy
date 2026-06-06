import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { requireDb } from "@/lib/db";
import { getCourse } from "@/data/courses";
import { STATUS_META, EXPERIENCE_LABELS, type ApplicationStatus } from "@/lib/applications";
import { cn } from "@/lib/utils";
import { StatusSwitcher } from "./StatusSwitcher";
import { saveNotes } from "../actions";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-white/90">{value || "—"}</dd>
    </div>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = requireDb();
  const { id } = await params;
  const app = await db.application.findUnique({ where: { id } });
  if (!app) notFound();

  const course = app.courseSlug ? getCourse(app.courseSlug) : undefined;
  const meta = STATUS_META[app.status as ApplicationStatus];

  return (
    <div className="px-8 py-8">
      <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to applications
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl text-white">{app.applicantName}</h1>
          <p className="mt-1 text-sm text-muted">
            Applied {app.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", meta.className)}>
          {meta.label}
        </span>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-bg-secondary p-6">
            <h2 className="text-xl text-white">Applicant details</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Course" value={course?.title ?? app.courseSlug} />
              <Field label="Preferred level" value={app.preferredLevel} />
              <Field label="Experience" value={app.experience ? EXPERIENCE_LABELS[app.experience] ?? app.experience : null} />
              <Field label="Preferred batch" value={app.preferredBatch} />
              <Field label="City" value={app.city} />
            </dl>
            {app.message && (
              <div className="mt-6 border-t border-border pt-5">
                <dt className="text-xs uppercase tracking-wider text-muted">Message</dt>
                <dd className="mt-2 whitespace-pre-line text-sm text-white/90">{app.message}</dd>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-border bg-bg-secondary p-6">
            <h2 className="text-xl text-white">Internal notes</h2>
            <p className="mt-1 text-xs text-muted">Visible to staff only.</p>
            <form action={saveNotes.bind(null, app.id)} className="mt-4">
              <textarea
                name="notes"
                rows={5}
                defaultValue={app.notes ?? ""}
                placeholder="Add a note about this applicant…"
                className="w-full rounded-lg border border-border bg-bg-primary px-4 py-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="mt-3 inline-flex items-center bg-accent px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
              >
                Save notes
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-bg-secondary p-6">
            <h2 className="text-xl text-white">Status</h2>
            <p className="mt-1 text-xs text-muted">Move the applicant through the pipeline.</p>
            <div className="mt-4">
              <StatusSwitcher id={app.id} current={app.status as ApplicationStatus} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-secondary p-6">
            <h2 className="text-xl text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${app.phone}`} className="text-white/90 hover:text-accent">{app.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${app.email}`} className="break-all text-white/90 hover:text-accent">{app.email}</a>
              </li>
              {app.city && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-white/90">{app.city}</span>
                </li>
              )}
            </ul>
            <a
              href={`https://wa.me/91${app.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-whatsapp/40 px-4 py-2.5 text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/10"
            >
              Message on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
