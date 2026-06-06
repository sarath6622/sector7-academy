"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { saveCourse, type SaveState } from "./actions";

export interface CourseFormValues {
  id?: string;
  title?: string;
  slug?: string;
  level?: string;
  levelLabel?: string;
  category?: string;
  summary?: string;
  description?: string;
  duration?: string | null;
  format?: string | null;
  price?: string | null;
  eligibility?: string | null;
  certification?: string | null;
  outcomes?: string[];
  featured?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
  modules?: { title: string; description?: string | null }[];
}

const inputCls =
  "w-full rounded-lg border border-border bg-bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-white/80";
const hintCls = "mt-1 text-xs text-muted";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function CourseForm({ course }: { course?: CourseFormValues }) {
  const action = saveCourse.bind(null, course?.id ?? null);
  const [state, formAction, pending] = useActionState<SaveState, FormData>(action, {});

  const modulesText = (course?.modules ?? [])
    .map((m) => (m.description ? `${m.title} | ${m.description}` : m.title))
    .join("\n");

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title *">
          <input name="title" required defaultValue={course?.title} className={inputCls} placeholder="Level 5 — Personal Trainer" />
        </Field>
        <Field label="Slug" hint="URL path. Leave blank to auto-generate from the title.">
          <input name="slug" defaultValue={course?.slug} className={inputCls} placeholder="level-5-personal-trainer" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Level *">
          <input name="level" required defaultValue={course?.level} className={inputCls} placeholder="Level 5" />
        </Field>
        <Field label="Level label">
          <input name="levelLabel" defaultValue={course?.levelLabel} className={inputCls} placeholder="Personal Trainer" />
        </Field>
        <Field label="Category *">
          <select name="category" defaultValue={course?.category ?? "certification"} className={inputCls}>
            <option value="certification">Certification</option>
            <option value="nutrition">Nutrition / Specialist</option>
          </select>
        </Field>
      </div>

      <Field label="Summary *" hint="One-line description shown on cards.">
        <textarea name="summary" required rows={2} defaultValue={course?.summary} className={inputCls} />
      </Field>

      <Field label="Description *" hint="Full overview shown on the course page.">
        <textarea name="description" required rows={4} defaultValue={course?.description} className={inputCls} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Duration">
          <input name="duration" defaultValue={course?.duration ?? ""} className={inputCls} placeholder="12–16 weeks" />
        </Field>
        <Field label="Price" hint="Leave blank to show 'Shared on enquiry'.">
          <input name="price" defaultValue={course?.price ?? ""} className={inputCls} placeholder="e.g. ₹45,000" />
        </Field>
      </div>

      <Field label="Format">
        <input name="format" defaultValue={course?.format ?? ""} className={inputCls} placeholder="In-person, batch-based…" />
      </Field>

      <Field label="Eligibility">
        <input name="eligibility" defaultValue={course?.eligibility ?? ""} className={inputCls} placeholder="Level 4 completion or equivalent" />
      </Field>

      <Field label="Certification awarded">
        <input name="certification" defaultValue={course?.certification ?? ""} className={inputCls} />
      </Field>

      <Field label="Outcomes" hint="One per line.">
        <textarea name="outcomes" rows={4} defaultValue={(course?.outcomes ?? []).join("\n")} className={inputCls} placeholder={"Coach real clients\nDesign advanced programs"} />
      </Field>

      <Field label="Modules" hint="One per line. Optional description after a | — e.g. 'Nutrition basics | Macros & energy'.">
        <textarea name="modules" rows={5} defaultValue={modulesText} className={inputCls} placeholder={"Advanced programme design\nNutrition for personal training | Applied basics"} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Sort order" hint="Lower shows first.">
          <input name="sortOrder" type="number" defaultValue={course?.sortOrder ?? 0} className={inputCls} />
        </Field>
        <label className="flex items-center gap-3 pt-7 text-sm text-white/90">
          <input type="checkbox" name="featured" defaultChecked={course?.featured} className="h-4 w-4 accent-[var(--color-accent)]" />
          Featured on homepage
        </label>
        <label className="flex items-center gap-3 pt-7 text-sm text-white/90">
          <input type="checkbox" name="isPublished" defaultChecked={course?.isPublished ?? true} className="h-4 w-4 accent-[var(--color-accent)]" />
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
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : course?.id ? "Save changes" : "Create course"}
        </button>
        <Link href="/admin/courses" className="text-sm text-muted hover:text-white">
          Cancel
        </Link>
      </div>
    </form>
  );
}
