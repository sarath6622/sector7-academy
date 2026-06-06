"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { authenticate } from "./actions";

const inputCls =
  "w-full rounded-lg border border-border bg-bg-primary px-4 py-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-white/80";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputCls} placeholder="admin@sector7.in" />
      </div>
      <div>
        <label htmlFor="password" className={labelCls}>
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputCls} placeholder="••••••••" />
      </div>

      {errorMessage && (
        <p className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" /> Sign in
          </>
        )}
      </button>
    </form>
  );
}
