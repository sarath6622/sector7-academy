"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Eye, EyeOff, Trash2, Loader2 } from "lucide-react";
import { togglePublishTestimonial, deleteTestimonial } from "./actions";

export function TestimonialRowActions({ id, isPublished, name }: { id: string; isPublished: boolean; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/admin/testimonials/${id}/edit`} className="rounded-md p-2 text-muted transition-colors hover:bg-white/5 hover:text-white" aria-label="Edit">
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => togglePublishTestimonial(id, !isPublished))}
        className="rounded-md p-2 text-muted transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
        title={isPublished ? "Unpublish" : "Publish"}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm(`Delete this testimonial by "${name}"? This cannot be undone.`)) startTransition(() => deleteTestimonial(id));
        }}
        className="rounded-md p-2 text-muted transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
