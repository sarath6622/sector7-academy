import { Button } from "./Button";

export function CTABand({
  title = "Ready to start your fitness career?",
  subtitle = "Apply now and our team will guide you through courses, batch dates, and fees.",
  primaryLabel = "Apply Now",
  primaryHref = "/apply",
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-grid border-y border-border bg-academy/50">
      <div className="container-px mx-auto max-w-4xl py-16 text-center lg:py-20">
        <h2 className="text-4xl text-white sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button href="/courses" variant="secondary" size="lg">
            Browse Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
