"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { saveFaculty, type SaveState } from "./actions";

const ROLE_OPTIONS = [
  { value: "TUTOR", label: "Tutor" },
  { value: "ASSESSOR", label: "Assessor" },
  { value: "IQA", label: "Internal Quality Assessor" },
  { value: "AUTHOR", label: "Author" },
] as const;

export interface FacultyFormValues {
  id?: string;
  name?: string;
  slug?: string;
  bio?: string;
  photoUrl?: string | null;
  roles?: string[]; // enum values
  courseSlugs?: string[];
  isPublished?: boolean;
  sortOrder?: number;
}

const inputCls =
  "w-full rounded-lg border border-border bg-bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-white/80";

export function FacultyForm({
  faculty,
  courses,
}: {
  faculty?: FacultyFormValues;
  courses: { slug: string; title: string }[];
}) {
  const action = saveFaculty.bind(null, faculty?.id ?? null);
  const [state, formAction, pending] = useActionState<SaveState, FormData>(action, {});

  const selectedRoles = new Set(faculty?.roles ?? []);
  const selectedCourses = new Set(faculty?.courseSlugs ?? []);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name *</label>
          <input name="name" required defaultValue={faculty?.name} className={inputCls} placeholder="Full name" />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input name="slug" defaultValue={faculty?.slug} className={inputCls} placeholder="Auto from name if blank" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Bio *</label>
        <textarea name="bio" required rows={4} defaultValue={faculty?.bio} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Photo URL</label>
        <input name="photoUrl" defaultValue={faculty?.photoUrl ?? ""} className={inputCls} placeholder="https://…" />
      </div>

      <div>
        <label className={labelCls}>Roles</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {ROLE_OPTIONS.map((r) => (
            <label key={r.value} className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-white/90">
              <input type="checkbox" name="roles" value={r.value} defaultChecked={selectedRoles.has(r.value)} className="h-4 w-4 accent-[var(--color-accent)]" />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls}>Teaches / assesses courses</label>
        {courses.length === 0 ? (
          <p className="text-sm text-muted">No courses yet.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {courses.map((c) => (
              <label key={c.slug} className="flex items-center gap-3 rounded-lg border border-border bg-bg-primary px-3 py-2.5 text-sm text-white/90">
                <input type="checkbox" name="courseSlugs" value={c.slug} defaultChecked={selectedCourses.has(c.slug)} className="h-4 w-4 accent-[var(--color-accent)]" />
                {c.title}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Sort order</label>
          <input name="sortOrder" type="number" defaultValue={faculty?.sortOrder ?? 0} className={inputCls} />
        </div>
        <label className="flex items-center gap-3 pt-7 text-sm text-white/90">
          <input type="checkbox" name="isPublished" defaultChecked={faculty?.isPublished ?? true} className="h-4 w-4 accent-[var(--color-accent)]" />
          Published (visible publicly)
        </label>
      </div>

      {state.error && (
        <p className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">{state.error}</p>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : faculty?.id ? "Save changes" : "Add faculty"}
        </button>
        <Link href="/admin/faculty" className="text-sm text-muted hover:text-white">Cancel</Link>
      </div>
    </form>
  );
}
