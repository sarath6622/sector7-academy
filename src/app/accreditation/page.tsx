import type { Metadata } from "next";
import { ShieldCheck, Clock, Award, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { CTABand } from "@/components/ui/CTABand";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE, ACCREDITATION_STATUS } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Accreditation",
  description:
    "S7 Academy is pursuing affiliation with REPS India and Skill India / NSDC. Learn what accreditation means for your certification and career.",
  path: "/accreditation",
  keywords: ["REPS India", "Skill India", "NSDC", "fitness accreditation"],
});

const BODIES = [
  {
    name: "REPS India",
    full: "Register of Exercise Professionals, India",
    body: "A professional register that recognises qualified fitness professionals, helping employers and clients trust your credentials.",
  },
  {
    name: "Skill India / NSDC",
    full: "National Skill Development Corporation",
    body: "A national framework recognising vocational skill certifications, supporting employability across India.",
  },
];

export default function AccreditationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Accreditation", url: `${SITE.url}/accreditation` },
          ]),
        }}
      />

      <PageHero
        eyebrow="Accreditation"
        title="Certification that carries weight"
        subtitle="We are building S7 Academy to meet the standards of leading accreditation bodies — so your qualification is recognised and respected."
      />

      {/* Honest status banner */}
      <section className="border-b border-border bg-academy/40">
        <div className="container-px mx-auto flex max-w-6xl items-center gap-4 py-6">
          <Clock className="h-6 w-6 shrink-0 text-accent" />
          <p className="text-sm text-white/90">
            <strong className="text-accent">{ACCREDITATION_STATUS}.</strong> We are actively pursuing
            affiliation with the bodies below. This page will be updated as each accreditation is
            confirmed.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {BODIES.map((b) => (
              <div key={b.name} className="rounded-xl border border-border bg-bg-secondary p-7">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="h-8 w-8 text-accent" />
                  <Badge tone="accent">In progress</Badge>
                </div>
                <h3 className="mt-4 text-2xl text-white">{b.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">{b.full}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-academy/30 p-8">
            <Award className="h-9 w-9 text-accent" />
            <h2 className="mt-4 text-3xl text-white">What accreditation means for you</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Industry-recognised credentials",
                "Stronger employability and trust with clients",
                "A qualification aligned to national standards",
                "A clear, structured path of professional levels",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABand title="Get certified the right way" />
    </>
  );
}
