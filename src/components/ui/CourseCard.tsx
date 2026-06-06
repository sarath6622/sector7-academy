import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "./Badge";
import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-bg-secondary p-6 transition-all hover:border-accent/50 hover:bg-surface"
    >
      <div className="mb-4 flex items-center gap-2">
        <Badge tone="accent">{course.level}</Badge>
        {course.category === "nutrition" && <Badge tone="accent">Nutrition</Badge>}
      </div>

      <h3 className="text-2xl text-white transition-colors group-hover:text-accent">{course.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{course.summary}</p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" /> {course.duration}
        </span>
        <span className="flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-accent">
          Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
