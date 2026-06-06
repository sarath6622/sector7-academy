"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { saveTestimonial, type SaveState } from "./actions";

export interface TestimonialFormValues {
  id?: string;
  authorName?: string;
  quote?: string;
  outcome?: string | null;
  courseSlug?: string | null;
  isPublished?: boolean;
  sortOrder?: number;
}

const inputCls =
  "w-full rounded-lg border border-border bg-bg-primary px-3.5 py-2.5 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-white/80";

export function TestimonialForm({
  testimonial,
  courses,
}: {
  testimonial?: TestimonialFormValues;
  courses: { slug: string; title: string }[];
}) {
  const action = saveTestimonial.bind(null, testimonial?.id ?? null);
  const [state, formAction, pending] = useActionState<SaveState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div>
        <label className={labelCls}>Author name *</label>
        <input name="authorName" required defaultValue={testimonial?.authorName} className={inputCls} placeholder="e.g. Graduate, Level 5 Personal Trainer" />
      </div>

      <div>
        <label className={labelCls}>Quote *</label>
        <textarea name="quote" required rows={4} defaultValue={testimonial?.quote} className={inputCls} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Outcome</label>
          <input name="outcome" defaultValue={testimonial?.outcome ?? ""} className={inputCls} placeholder="e.g. Now a personal trainer at Sector 7" />
        </div>
        <div>
          <label className={labelCls}>Related course</label>
          <select name="courseSlug" defaultValue={testimonial?.courseSlug ?? ""} className={inputCls}>
            <option value="">— None —</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Sort order</label>
          <input name="sortOrder" type="number" defaultValue={testimonial?.sortOrder ?? 0} className={inputCls} />
        </div>
        <label className="flex items-center gap-3 pt-7 text-sm text-white/90">
          <input type="checkbox" name="isPublished" defaultChecked={testimonial?.isPublished ?? true} className="h-4 w-4 accent-[var(--color-accent)]" />
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
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : testimonial?.id ? "Save changes" : "Add testimonial"}
        </button>
        <Link href="/admin/testimonials" className="text-sm text-muted hover:text-white">Cancel</Link>
      </div>
    </form>
  );
}
