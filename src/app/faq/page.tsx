import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { FAQS } from "@/data/faq";
import { buildMetadata, jsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about S7 Academy's fitness certification courses — accreditation, eligibility, delivery, fees, placements, and enrollment.",
  path: "/faq",
});

export default function FAQPage() {
  const faqLd = jsonLd("FAQPage", {
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "FAQ", url: `${SITE.url}/faq` },
          ]),
        }}
      />

      <PageHero eyebrow="FAQ" title="Questions, answered" />

      <section className="section-y">
        <div className="container-px mx-auto max-w-3xl">
          <div className="divide-y divide-border rounded-xl border border-border bg-bg-secondary">
            {FAQS.map((f) => (
              <details key={f.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-white">
                  {f.question}
                  <span className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
