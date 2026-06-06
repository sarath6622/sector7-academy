import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="hero-glow flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl tracking-wide text-white">
            S7 <span className="text-accent">Academy</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">Admin Panel</p>
        </div>
        <div className="rounded-xl border border-border bg-bg-secondary p-7">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-muted">Authorised staff only.</p>
      </div>
    </div>
  );
}
