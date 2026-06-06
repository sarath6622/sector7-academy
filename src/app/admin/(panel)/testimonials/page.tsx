import Link from "next/link";
import { Plus, Quote } from "lucide-react";
import { getAllTestimonialsAdmin } from "@/lib/queries/testimonials";
import { cn } from "@/lib/utils";
import { TestimonialRowActions } from "./TestimonialRowActions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return (
    <div className="px-8 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">{testimonials.length} total</p>
        </div>
        <Link href="/admin/testimonials/new" className="inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover">
          <Plus className="h-4 w-4" /> Add testimonial
        </Link>
      </header>

      {testimonials.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
          <Quote className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm text-muted">No testimonials yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Author</th>
                <th className="px-5 py-3 font-medium">Quote</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-bg-primary">
              {testimonials.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-bg-secondary">
                  <td className="px-5 py-3">
                    <Link href={`/admin/testimonials/${t.id}/edit`} className="font-medium text-white hover:text-accent">{t.authorName}</Link>
                    {t.outcome && <p className="text-xs text-accent">{t.outcome}</p>}
                  </td>
                  <td className="max-w-md px-5 py-3 text-white/70">
                    <span className="line-clamp-2">{t.quote}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", t.isPublished ? "border-green-500/30 bg-green-500/15 text-green-400" : "border-border bg-white/5 text-muted")}>
                      {t.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <TestimonialRowActions id={t.id} isPublished={t.isPublished} name={t.authorName} />
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
