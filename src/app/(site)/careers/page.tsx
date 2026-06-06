import type { Metadata } from "next";
import { Briefcase, Users, Heart, MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { getPublishedTestimonials } from "@/lib/queries/testimonials";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Careers & Placement Support",
  description:
    "S7 Academy supports graduates with interview and placement help, plus ongoing community and alumni support — we don't just certify you, we help you build a career.",
  path: "/careers",
});

export default async function CareersPage() {
  const testimonials = await getPublishedTestimonials();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Careers", url: `${SITE.url}/careers` },
          ]),
        }}
      />

      <PageHero
        eyebrow="Careers & Placement"
        title="We don't just certify you — we launch you"
        subtitle="A certificate is the start. Our career support helps graduates land interviews, get placed, and keep growing within a community of fitness professionals."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Briefcase,
                title: "Interview & placement help",
                body: "Guidance and support to prepare for interviews and connect with hiring opportunities.",
              },
              {
                icon: MessagesSquare,
                title: "Marketing support",
                body: "Help graduates market themselves as professional, credible fitness trainers.",
              },
              {
                icon: Users,
                title: "Community support",
                body: "Join a network of trainers and peers who support each other's growth.",
              },
              {
                icon: Heart,
                title: "Alumni support",
                body: "Stay connected after you graduate with ongoing alumni resources and opportunities.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-bg-secondary p-7">
                <c.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 text-xl text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Outcomes */}
          <h2 className="mt-16 text-3xl text-white">Graduate outcomes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.authorName} className="rounded-xl border border-border bg-bg-secondary p-7">
                <blockquote className="text-sm leading-relaxed text-white/90">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  {t.outcome && <p className="mt-1 text-xs text-accent">{t.outcome}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Start a career, not just a course" />
    </>
  );
}
