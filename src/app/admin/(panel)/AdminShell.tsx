"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Inbox, BookOpen, Users, Quote, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { doSignOut } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: Inbox, exact: false },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/admin/faculty", label: "Faculty", icon: Users, exact: false },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote, exact: false },
];

function Brand() {
  return (
    <div>
      <p className="font-display text-2xl tracking-wide text-white">
        S7 <span className="text-accent">Academy</span>
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted">Admin Panel</p>
    </div>
  );
}

function SidebarInner({ userName, onNavigate }: { userName: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="hidden border-b border-border px-5 py-5 lg:block">
        <Brand />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm font-medium transition-colors",
                active ? "bg-accent/15 text-accent" : "text-white/80 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-[1.125rem] w-[1.125rem]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-4">
        <p className="px-3 pb-3 text-xs text-muted">
          Signed in as
          <br />
          <span className="text-white/90">{userName}</span>
        </p>
        <form action={doSignOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-accent"
          >
            <LogOut className="h-[1.125rem] w-[1.125rem]" /> Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminShell({ userName, children }: { userName: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:min-h-screen lg:w-60 lg:shrink-0 lg:border-r lg:border-border lg:bg-bg-secondary">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <SidebarInner userName={userName} />
        </div>
      </aside>

      {/* Main column. overflow-x-clip prevents stray few-px horizontal page
          overflow without creating a scroll container (so the sticky top bar
          and the tables' own overflow-x-auto keep working). */}
      <div className="min-w-0 flex-1 overflow-x-clip">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-bg-secondary/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-1 text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Brand />
        </div>

        {children}
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[80%] border-r border-border bg-bg-secondary">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Brand />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-md p-1 text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[calc(100%-4.5rem)]">
              <SidebarInner userName={userName} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
