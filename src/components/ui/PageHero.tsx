import { Badge } from "./Badge";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-px relative mx-auto max-w-6xl py-20 lg:py-28">
        {eyebrow && (
          <div className="mb-4">
            <Badge tone="accent">{eyebrow}</Badge>
          </div>
        )}
        <h1 className="max-w-3xl text-5xl text-white sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
