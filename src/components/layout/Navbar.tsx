"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-md">
      <nav className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-white/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/apply" variant="primary" size="sm">
            Apply Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg-secondary lg:hidden">
          <div className="container-px mx-auto flex max-w-6xl flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 font-body text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/apply" variant="primary" size="md" className="mt-3 w-full">
              Apply Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
