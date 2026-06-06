/** Central site configuration & shared constants for S7 Academy. */

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://academy.sector7.in",
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "S7 Academy",
  legalName: "S7 Academy of Fitness & Performance",
  tagline: "Train where the pros train.",
  description:
    "S7 Academy of Fitness & Performance offers accredited, multi-level fitness certification courses with hands-on coaching on a live commercial gym floor. Accreditation in progress — REPS India & Skill India / NSDC.",
  parentSite: "https://sector7.in",
  phone: process.env.NEXT_PUBLIC_ACADEMY_PHONE ?? "+919539108642",
  email: process.env.NEXT_PUBLIC_ACADEMY_EMAIL ?? "academy@sector7.in",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919539108642",
  // TODO(user): confirm academy address (same as gym, or separate location?)
  address: {
    street: "Sector 7 Fitness, Kakkanad",
    locality: "Kochi",
    region: "Kerala",
    postalCode: "682030",
    country: "IN",
  },
} as const;

export const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Faculty", href: "/faculty" },
  { label: "Accreditation", href: "/accreditation" },
  { label: "Facility", href: "/facility" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
] as const;

/** Honest accreditation framing used site-wide. */
export const ACCREDITATION_STATUS = "Accreditation in progress";
