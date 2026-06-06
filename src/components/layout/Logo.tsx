import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Text-based logo lockup for S7 Academy (sub-brand of Sector 7).
 * NOTE(user): swap for the final academy logo asset when available.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-baseline gap-2", className)} aria-label="S7 Academy home">
      <span className="font-display text-2xl leading-none tracking-wide text-white">
        S7 <span className="text-accent">Academy</span>
      </span>
      <span className="hidden font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-muted sm:inline">
        of Fitness &amp; Performance
      </span>
    </Link>
  );
}
