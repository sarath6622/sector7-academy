/** Shared application-status metadata for the admin pipeline. */

export type ApplicationStatus = "NEW" | "CONTACTED" | "ENROLLED" | "REJECTED";

export const STATUS_ORDER: ApplicationStatus[] = ["NEW", "CONTACTED", "ENROLLED", "REJECTED"];

export const STATUS_META: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  NEW: { label: "New", className: "bg-accent/15 text-accent border-accent/30" },
  CONTACTED: { label: "Contacted", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  ENROLLED: { label: "Enrolled", className: "bg-green-500/15 text-green-400 border-green-500/30" },
  REJECTED: { label: "Rejected", className: "bg-white/5 text-muted border-border" },
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  none: "Complete beginner",
  some: "Some training experience",
  experienced: "Experienced (trains regularly)",
  professional: "Working in fitness already",
};
