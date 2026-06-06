import Link from "next/link";
import {
  Dumbbell,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/ui/CourseCard";
import { CTABand } from "@/components/ui/CTABand";
import { getFeaturedCourses } from "@/data/courses";
import { TESTIMONIALS } from "@/data/testimonials";
import { ACCREDITATION_STATUS, SITE } from "@/lib/site";

const HIGHLIGHTS = [
  {
    icon: Dumbbell,
    title: "Train on a live commercial floor",
    body: "Students gain exclusive, hands-on coaching experience at our fully operational, state-of-the-art commercial gym — you learn where you'll work.",
  },
  {
    icon: ClipboardCheck,
    title: "Feedback & evaluation system",
    body: "Structured assessment and continuous feedback from qualified assessors, so you graduate genuinely competent — not just certified.",
  },
  {
    icon: Users,
    title: "Industry-expert guest lectures",
    body: "Learn from working professionals and specialists who bring real-world insight into the classroom.",
  },
  {
    icon: Briefcase,
    title: "Career & placement support",
    body: "Help with interviews and placements, plus ongoing community and alumni support for graduates.",
  },
];

export default function HomePage() {
  const featured = getFeaturedCourses();

  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="container-px mx-auto max-w-6xl py-24 lg:py-32">
          <Badge tone="accent">{ACCREDITATION_STATUS} · REPS India · Skill India / NSDC</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
            Become a certified fitness professional
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {SITE.legalName} offers accredited, multi-level certification courses with hands-on
            coaching on a live commercial gym floor. Train where the pros train.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/apply" variant="primary" size="lg">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/courses" variant="secondary" size="lg">
              Explore Courses
            </Button>
          </div>

          {/* Quick stats / trust row */}
          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {[
              { k: "3+", v: "Course levels" },
              { k: "100%", v: "Hands-on practice" },
              { k: "Live", v: "Commercial gym floor" },
              { k: "Career", v: "Placement support" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-4xl text-accent">{s.k}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-y border-t border-border">
        <div className="container-px mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why S7 Academy"
            title="An education built on a real gym floor"
            subtitle="We pair accredited coursework with the one thing most academies can't offer — daily practice in a fully operational commercial gym."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="rounded-xl border border-border bg-bg-secondary p-7">
                <h.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-2xl text-white">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-y border-t border-border bg-bg-secondary/40">
        <div className="container-px mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Courses"
              title="Multiple levels, one clear path"
              subtitle="From foundation to flagship personal-trainer certification, plus nutrition & wellness."
            />
            <Link
              href="/courses"
              className="hidden shrink-0 items-center gap-1 font-body text-sm font-semibold uppercase tracking-wider text-accent hover:underline sm:flex"
            >
              All courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation strip */}
      <section className="section-y border-t border-border">
        <div className="container-px mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Accreditation"
              title="Recognition that means something"
              subtitle="We are pursuing affiliation with leading bodies so your certification carries real weight in the industry."
            />
            <ul className="mt-6 space-y-3">
              {[
                "REPS India — Register of Exercise Professionals",
                "Skill India / NSDC — National Skill Development",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              <Badge tone="accent">{ACCREDITATION_STATUS}</Badge>
            </p>
            <div className="mt-7">
              <Button href="/accreditation" variant="ghost" size="md">
                Learn about accreditation
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-academy/40 p-8">
            <Award className="h-10 w-10 text-accent" />
            <h3 className="mt-4 text-2xl text-white">Properly staffed for quality</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Our academy is structured around the quality-assurance roles accreditation bodies
              expect — Tutors, Assessors, Internal Quality Assessors, and Authors.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Tutor", "Assessor", "Internal Quality Assessor", "Author"].map((r) => (
                <Badge key={r} tone="neutral">
                  {r}
                </Badge>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/faculty"
                className="inline-flex items-center gap-1 font-body text-sm font-semibold uppercase tracking-wider text-accent hover:underline"
              >
                Meet the faculty <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y border-t border-border bg-bg-secondary/40">
        <div className="container-px mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Outcomes"
            title="Graduates who get to work"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.authorName} className="rounded-xl border border-border bg-bg-secondary p-7">
                <GraduationCap className="h-7 w-7 text-accent" />
                <blockquote className="mt-4 text-sm leading-relaxed text-white/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  {t.outcome && <p className="mt-1 text-xs text-accent">{t.outcome}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
