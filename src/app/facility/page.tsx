import type { Metadata } from "next";
import { Dumbbell, Users, Activity, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { Button } from "@/components/ui/Button";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "The Facility",
  description:
    "S7 Academy students train on a live, fully operational, state-of-the-art commercial gym floor at Sector 7 — learn where you'll work.",
  path: "/facility",
});

export default function FacilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Facility", url: `${SITE.url}/facility` },
          ]),
        }}
      />

      <PageHero
        eyebrow="The Facility"
        title="Learn where you'll work"
        subtitle="Most academies teach in classrooms. At S7 Academy, you train on the floor of a fully operational, state-of-the-art commercial gym."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Dumbbell,
                title: "Commercial-grade equipment",
                body: "Train on the same professional equipment you'll coach clients on in the industry.",
              },
              {
                icon: Users,
                title: "Real members, real coaching",
                body: "Practise coaching in a live environment with supervised, hands-on experience.",
              },
              {
                icon: Activity,
                title: "A working gym, every day",
                body: "Experience the rhythm of a real fitness business — not a simulated classroom.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-bg-secondary p-7">
                <c.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-2xl text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Placeholder gallery — replace with real facility photos */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-academy/30 text-xs uppercase tracking-wider text-muted"
              >
                Facility photo {n}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            NOTE: replace placeholders with real photos of the Sector 7 floor.
          </p>

          <div className="mt-12 rounded-xl border border-border bg-bg-secondary p-8">
            <h2 className="text-3xl text-white">The S7 Academy advantage</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Hands-on coaching from day one",
                "Supervised practice with real members",
                "Exposure to gym operations & culture",
                "A direct pathway from learning to working",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href={SITE.parentSite} variant="ghost" size="md" external>
                Visit the Sector 7 gym site
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
