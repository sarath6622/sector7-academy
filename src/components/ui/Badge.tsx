import { cn } from "@/lib/utils";

type BadgeTone = "accent" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  accent: "bg-accent/15 text-accent border-accent/30",
  neutral: "bg-white/5 text-muted border-border",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
