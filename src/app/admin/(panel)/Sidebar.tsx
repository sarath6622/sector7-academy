"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Inbox, BookOpen, Users, Quote, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { doSignOut } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: Inbox, exact: false },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/admin/faculty", label: "Faculty", icon: Users, exact: false },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote, exact: false },
];

export function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-bg-secondary">
      <div className="border-b border-border px-5 py-5">
        <p className="font-display text-2xl tracking-wide text-white">
          S7 <span className="text-accent">Academy</span>
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm font-medium transition-colors",
                active ? "bg-accent/15 text-accent" : "text-white/80 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-4">
        <p className="px-3 pb-3 text-xs text-muted">
          Signed in as<br />
          <span className="text-white/90">{userName}</span>
        </p>
        <form action={doSignOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
          >
            <LogOut className="h-4.5 w-4.5" /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
