import type { Metadata } from "next";
import { Target, Building2, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { ROLE_DESCRIPTIONS } from "@/data/faculty";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FacultyRoleType } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "S7 Academy of Fitness & Performance is the education arm of Sector 7 — training the next generation of fitness professionals on a live commercial gym floor.",
  path: "/about",
});

const ROLES: FacultyRoleType[] = ["Tutor", "Assessor", "Internal Quality Assessor", "Author"];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "About", url: `${SITE.url}/about` },
          ]),
        }}
      />

      <PageHero
        eyebrow="About"
        title="The education arm of Sector 7"
        subtitle="Built on a fully operational commercial gym, S7 Academy exists to turn passionate people into job-ready, professionally certified fitness experts."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our mission",
              body: "To raise the standard of fitness education in India by combining accredited coursework with real, hands-on coaching experience — so our graduates are genuinely ready to work.",
            },
            {
              icon: Building2,
              title: "Our advantage",
              body: "Students learn and practise on the live Sector 7 commercial gym floor — a state-of-the-art facility — gaining experience most academies simply can't offer.",
            },
            {
              icon: ShieldCheck,
              title: "Our commitment",
              body: "We're building the academy to meet the quality standards of leading accreditation bodies, with structured assessment and continuous feedback at the core.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-bg-secondary p-7">
              <c.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 text-2xl text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality structure */}
      <section className="section-y border-t border-border bg-bg-secondary/40">
        <div className="container-px mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Quality structure"
            title="How we assure quality"
            subtitle="Accreditation isn't just a logo — it's a structure. Our academy is organised around four core quality-assurance roles, each with a clear responsibility."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role) => (
              <div key={role} className="rounded-xl border border-border bg-bg-secondary p-6">
                <Badge tone="accent">{role}</Badge>
                <p className="mt-4 text-sm leading-relaxed text-muted">{ROLE_DESCRIPTIONS[role]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
