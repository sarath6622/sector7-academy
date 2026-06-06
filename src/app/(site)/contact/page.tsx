import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with S7 Academy of Fitness & Performance. Visit us, call, email, or message on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const waLink = `https://wa.me/${SITE.whatsapp}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Contact", url: `${SITE.url}/contact` },
          ]),
        }}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions about courses, batches, or fees? Reach out — or apply directly and we'll come to you."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="text-3xl text-white">Reach the academy</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Visit us</p>
                  <p className="mt-1 text-sm text-muted">
                    {SITE.address.street}, {SITE.address.locality}, {SITE.address.region}{" "}
                    {SITE.address.postalCode}
                  </p>
                  <p className="mt-1 text-xs text-muted">(Confirm academy location — see PRD.)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Call</p>
                  <a href={`tel:${SITE.phone}`} className="mt-1 block text-sm text-muted hover:text-accent">
                    {SITE.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-muted hover:text-accent">
                    {SITE.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={waLink} variant="primary" size="md" external>
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </Button>
              <Button href="/apply" variant="ghost" size="md">
                Apply for a course
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border border-border bg-academy/30">
            <iframe
              title="S7 Academy location"
              src="https://www.google.com/maps?q=Sector+7+Fitness+Kochi&output=embed"
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
