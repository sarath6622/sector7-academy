import { PrismaClient } from "@/generated/prisma";

/**
 * Prisma client singleton.
 *
 * Phase 1 only writes to the `Application` table. The site is designed to run
 * WITHOUT a database: if DATABASE_URL is not set, `db` is `null` and callers
 * (e.g. the apply route) skip persistence and still deliver email.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  return new PrismaClient();
}

export const db: PrismaClient | null =
  globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production" && db) {
  globalForPrisma.prisma = db;
}
