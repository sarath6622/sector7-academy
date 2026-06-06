/**
 * In-memory rate limiter, shared across API form routes.
 * Resets on cold start — sufficient for Vercel serverless (per-instance).
 * For multi-instance production, swap for Vercel KV / Upstash.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/** True if the IP is allowed through; false if it has exceeded the limit. */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= LIMIT) return false;

  record.count += 1;
  return true;
}

/** Extract the real client IP from a request. */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
