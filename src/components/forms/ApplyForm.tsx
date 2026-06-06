"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { applicationSchema, EXPERIENCE_OPTIONS, type ApplicationInput } from "@/lib/applicationSchema";

type CourseOption = { slug: string; title: string };

const inputCls =
  "w-full rounded-lg border border-border bg-bg-primary px-4 py-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-white/80";
const errCls = "mt-1 text-xs text-accent";

export function ApplyForm({
  defaultCourse,
  courses,
}: {
  defaultCourse?: string;
  courses: CourseOption[];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      courseSlug: defaultCourse && courses.some((c) => c.slug === defaultCourse) ? defaultCourse : "",
      _hp: "",
    },
  });

  const onSubmit = async (data: ApplicationInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/40 bg-academy/30 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 text-2xl text-white">Application received!</h3>
        <p className="mt-2 text-sm text-muted">
          Thank you. Our team will review your application and get back to you within 1–2 working
          days with batch dates, fees, and next steps. Check your inbox for a confirmation.
        </p>
        <div className="mt-6">
          <Button onClick={() => setStatus("idle")} variant="ghost" size="md">
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0"
        {...register("_hp")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="applicantName">
            Full name *
          </label>
          <input id="applicantName" className={inputCls} placeholder="Your name" {...register("applicantName")} />
          {errors.applicantName && <p className={errCls}>{errors.applicantName.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">
            Mobile number *
          </label>
          <input id="phone" className={inputCls} placeholder="10-digit mobile" inputMode="numeric" {...register("phone")} />
          {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="email">
            Email *
          </label>
          <input id="email" type="email" className={inputCls} placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="city">
            City
          </label>
          <input id="city" className={inputCls} placeholder="City" {...register("city")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="courseSlug">
            Course of interest *
          </label>
          <select id="courseSlug" className={inputCls} {...register("courseSlug")}>
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
          {errors.courseSlug && <p className={errCls}>{errors.courseSlug.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="experience">
            Your experience *
          </label>
          <select id="experience" className={inputCls} defaultValue="" {...register("experience")}>
            <option value="" disabled>
              Select one
            </option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.experience && <p className={errCls}>{errors.experience.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="preferredBatch">
          Preferred start / batch (optional)
        </label>
        <input
          id="preferredBatch"
          className={inputCls}
          placeholder="e.g. As soon as possible, next month…"
          {...register("preferredBatch")}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          Anything else? (optional)
        </label>
        <textarea
          id="message"
          rows={4}
          className={inputCls}
          placeholder="Your goals, questions, or anything we should know"
          {...register("message")}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--color-accent)]" {...register("consent")} />
        <span>
          I agree to be contacted by S7 Academy about my application and courses. *
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent.message}</p>}

      {serverError && (
        <p className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
