# Testing S7 Academy locally

How to run and test the site + admin panel on your machine.

- **Public site** (Phase 1): marketing pages + the course application form.
- **Admin panel** (Phase 2): staff login + applications pipeline, backed by Postgres.

---

## Prerequisites

- **Node.js** 20+
- **Docker** (for the local Postgres database)
- A `.env` file in the project root (copy from `.env.example` if you don't have one).
  The local dev defaults already live in `.env`:
  ```
  DATABASE_URL=postgresql://s7:s7local@localhost:5433/s7academy
  AUTH_SECRET=<dev placeholder>
  ADMIN_EMAIL=admin@sector7.in
  ADMIN_PASSWORD=ChangeMe!2026
  ```

---

## Cold start (after a reboot / fresh clone)

Run these in the project folder (`s7-academy/`):

```bash
# 1. Start the Postgres database (Docker must be running)
docker start s7-academy-pg
#   First time, or if the container no longer exists, create it instead:
#   docker run -d --name s7-academy-pg \
#     -e POSTGRES_USER=s7 -e POSTGRES_PASSWORD=s7local -e POSTGRES_DB=s7academy \
#     -p 5433:5432 postgres:16

# 2. Install dependencies (first time only)
npm install

# 3. Sync the schema + create the admin login + import the course catalog
#    (first time, or after recreating the database)
npm run db:push
npm run db:seed          # creates the admin user
npm run db:seed-content  # imports the courses from src/data into the DB

# 4. Start the app
npm run dev
```

Then open **http://localhost:3000**.

> If `npm run dev` says **"Port 3000 in use"**, an old dev server is still running —
> either use the port Next picks instead, or stop the old process first.

---

## Test the feature (step by step)

### 1. Submit a course application
1. Open **http://localhost:3000/apply**
2. Fill in the form and **Submit**.
3. You should see the success screen ("Application received").
   - This emails the academy **and** saves the application to Postgres.
   - Email sending is skipped if `RESEND_API_KEY` is empty — that's expected
     locally; the application is still saved to the database.

### 2. Log into the admin panel
1. Open **http://localhost:3000/admin/login**
2. Sign in:
   - **Email:** `admin@sector7.in`
   - **Password:** `ChangeMe!2026`

### 3. Manage applications
- **Dashboard** (`/admin`) — status counts + a recent-applications table.
- Click **Applications** in the sidebar → click an applicant to open their detail.
- On the detail page you can:
  - Change **status** (New → Contacted → Enrolled → Rejected) — one click.
  - Add an **internal note** and **Save**.
  - Use the **WhatsApp** / email shortcuts to reach the applicant.
- Return to the **Dashboard** — the counts reflect your changes.

### 4. Confirm access is protected
- Open an **incognito window** → go to **http://localhost:3000/admin**
- You should be redirected to the login page.

### 5. Manage courses (content)
- In the admin, click **Courses** in the sidebar.
- **Edit** a course → change the summary → **Save changes**. Within ~60s (or
  immediately in dev) the public **/courses** and course page reflect it.
- **New course** → fill the form → Create. New published courses appear on the
  public catalog and in the apply-form dropdown.
- Use the **eye** icon to publish/unpublish (drafts are hidden publicly), and
  the **trash** icon to delete.
- Course content lives in Postgres now; `src/data/courses.ts` is only a fallback
  used when the DB is empty/unavailable.

---

## Handy commands

```bash
# Visually browse the database (GUI at http://localhost:5555)
npm run db:studio

# Peek at applications straight from Postgres
docker exec s7-academy-pg psql -U s7 -d s7academy \
  -c 'SELECT "applicantName", status, "courseSlug" FROM "Application" ORDER BY "createdAt" DESC;'

# Re-seed / change the admin password
#   edit ADMIN_PASSWORD in .env, then:
npm run db:seed        # idempotent — updates the existing admin

# Stop the database when done (data persists for next time)
docker stop s7-academy-pg
```

---

## Quick health checks (optional, via terminal)

```bash
# Is the database container up?
docker ps --filter name=s7-academy-pg

# Does the admin login page respond?
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/login   # expect 200

# Is /admin gated when logged out?
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin          # expect 307 (redirect to login)

# Submit a test application from the terminal
curl -s -X POST http://localhost:3000/api/apply -H "Content-Type: application/json" \
  -d '{"applicantName":"Test User","email":"test@example.com","phone":"9876543210","courseSlug":"level-5-personal-trainer","experience":"none","consent":true,"_hp":""}'
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Can't reach database server at localhost:5433` | Start the DB: `docker start s7-academy-pg` (or recreate it — see cold start). |
| Login always fails | Run `npm run db:seed` to (re)create the admin; check `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `.env`. |
| `/admin` doesn't redirect when logged out | Ensure `AUTH_SECRET` is set in `.env` and restart `npm run dev`. |
| Application submits but isn't in the admin | Confirm `DATABASE_URL` is set; without it the app skips DB writes (Phase 1 fallback). |
| Port 3000 already in use | Stop the existing dev server, or use the alternate port Next prints. |

---

## Production notes (not for local testing)

Before deploying, do **not** reuse the local dev values:
- Generate a real `AUTH_SECRET`: `openssl rand -base64 32`
- Set a strong `ADMIN_PASSWORD` and re-seed.
- Point `DATABASE_URL` at a managed Postgres (Neon / Supabase / Railway).
- Configure `RESEND_API_KEY` + a verified `FROM_EMAIL` domain for application emails.
