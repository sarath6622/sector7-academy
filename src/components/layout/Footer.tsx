import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { SITE, NAV_LINKS, ACCREDITATION_STATUS } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-px mx-auto max-w-6xl py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{SITE.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">
              {ACCREDITATION_STATUS}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apply" className="text-sm text-muted transition-colors hover:text-accent">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted transition-colors hover:text-accent">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-body text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  {SITE.address.street}, {SITE.address.locality}, {SITE.address.region}{" "}
                  {SITE.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${SITE.phone}`} className="transition-colors hover:text-accent">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-accent">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={SITE.parentSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Visit Sector 7 Gym
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {SITE.legalName}. A Sector 7 institution.
          </p>
          <p>Hands-on training on a live commercial gym floor.</p>
        </div>
      </div>
    </footer>
  );
}
