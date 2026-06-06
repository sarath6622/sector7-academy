"use client";

import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { STATUS_ORDER, STATUS_META, type ApplicationStatus } from "@/lib/applications";
import { updateStatus } from "../actions";

export function StatusSwitcher({ id, current }: { id: string; current: ApplicationStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_ORDER.map((status) => {
        const meta = STATUS_META[status];
        const active = status === current;
        return (
          <button
            key={status}
            type="button"
            disabled={pending || active}
            onClick={() => startTransition(() => updateStatus(id, status))}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:cursor-default",
              active ? meta.className : "border-border bg-bg-secondary text-white/70 hover:text-white",
              pending && "opacity-60"
            )}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
