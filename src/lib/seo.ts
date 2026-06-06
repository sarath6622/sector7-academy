import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface SEOPageProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}

/** Build a full Next.js Metadata object for any page. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: SEOPageProps): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? `${SITE.url}/images/og-image.jpg`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Serialize a JSON-LD object for a <script type="application/ld+json"> tag. */
export function jsonLd(type: string | string[], data: Record<string, unknown>): string {
  return JSON.stringify({ "@context": "https://schema.org", "@type": type, ...data });
}

/** BreadcrumbList JSON-LD for inner pages. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): string {
  return jsonLd("BreadcrumbList", {
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/** EducationalOrganization JSON-LD — used in the root layout on every page. */
export function educationalOrgJsonLd(): Record<string, unknown> {
  return {
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    parentOrganization: {
      "@type": "Organization",
      name: "Sector 7",
      url: SITE.parentSite,
    },
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    image: `${SITE.url}/images/og-image.jpg`,
  };
}

/** Course JSON-LD for a course detail page. */
export function courseJsonLd(course: {
  title: string;
  description: string;
  slug: string;
}): string {
  return jsonLd("Course", {
    name: course.title,
    description: course.description,
    url: `${SITE.url}/courses/${course.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.legalName,
      sameAs: SITE.url,
    },
  });
}
