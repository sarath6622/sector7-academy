# S7 Academy — academy.sector7.in

Marketing & enrollment website for **S7 Academy of Fitness & Performance**, the education arm of [Sector 7](https://sector7.in). Phase 1 of the build described in [`../S7-ACADEMY-PRD.md`](../S7-ACADEMY-PRD.md).

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- Prisma + PostgreSQL (applications capture; full schema designed for Phase 2 admin)
- Resend (application emails) · Zod + react-hook-form (validation)

## Getting started
```bash
npm install            # also runs `prisma generate`
cp .env.example .env   # fill in values
npm run dev            # http://localhost:3000
```

The site runs **without** a database or email key — the application form degrades
gracefully (DB insert skipped; if email also unavailable it returns a clear error).

## Environment
See `.env.example`. Key vars:
- `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, `FROM_EMAIL` — application emails
- `DATABASE_URL` — Postgres (Neon/Supabase/Railway). Empty = no persistence.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID` — analytics (no-op until set)

## Database
```bash
npm run db:push      # sync schema to DATABASE_URL
npm run db:studio    # inspect data
```
Phase 1 only writes the `Application` table. The `User`/`Course`/`Faculty`/`Student`
models in `prisma/schema.prisma` are the **designed** data model for the Phase 2
admin panel + Phase 3 student portal (role-based auth is built into the schema).

## Content (Phase 1)
Courses, faculty, testimonials, and FAQs are **code-seeded** in `src/data/*`.
Several values are placeholders marked `NOTE(user)` — replace with the academy's
final, accreditation-approved details. In Phase 2 this content moves to Postgres
and becomes admin-editable.

## Structure
```
src/
  app/            routes (home, courses, faculty, about, accreditation,
                  facility, careers, apply, contact, faq, api/apply)
  components/     ui · layout · forms
  data/           seed content (courses, faculty, testimonials, faq)
  lib/            seo, site config, db, email, rateLimit, validation
  types/          shared types
prisma/           schema (Application live; rest designed for Phase 2)
```

## Deploy
Vercel. Point `academy.sector7.in` (CNAME) at the project. Set env vars in the
Vercel dashboard. Add `RESEND_API_KEY` and a verified `FROM_EMAIL` domain, and
`DATABASE_URL` once a Postgres instance is provisioned.
