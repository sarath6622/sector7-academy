import type { Metadata } from "next";
import { User } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { FACULTY, ROLE_DESCRIPTIONS } from "@/data/faculty";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FacultyRoleType } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Our Faculty",
  description:
    "Meet the S7 Academy faculty — qualified tutors, assessors, internal quality assessors, and authors who ensure the quality of every certification.",
  path: "/faculty",
});

const ROLES: FacultyRoleType[] = ["Tutor", "Assessor", "Internal Quality Assessor", "Author"];

export default function FacultyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Faculty", url: `${SITE.url}/faculty` },
          ]),
        }}
      />

      <PageHero
        eyebrow="Our Faculty"
        title="The people behind your certification"
        subtitle="An accredited academy is only as strong as the people who run it. Our team is structured around the quality-assurance roles that certification bodies require."
      />

      {/* Role explainer */}
      <section className="section-y border-b border-border">
        <div className="container-px mx-auto max-w-6xl">
          <h2 className="text-3xl text-white">Our quality-assurance roles</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role) => (
              <div key={role} className="rounded-xl border border-border bg-bg-secondary p-6">
                <Badge tone="accent">{role}</Badge>
                <p className="mt-4 text-sm leading-relaxed text-muted">{ROLE_DESCRIPTIONS[role]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* People */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <h2 className="text-3xl text-white">Meet the team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACULTY.map((f) => (
              <article key={f.slug} className="rounded-xl border border-border bg-bg-secondary p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-academy/60">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-4 text-2xl text-white">{f.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {f.roles.map((r) => (
                    <Badge key={r} tone="neutral">
                      {r}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{f.bio}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted">
            Faculty profiles shown are being finalised ahead of accreditation review.
          </p>
        </div>
      </section>

      <CTABand title="Learn from a properly accredited team" />
    </>
  );
}
