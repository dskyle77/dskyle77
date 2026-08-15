/**
 * Server-side environment access.
 *
 * Rules:
 * - Never import this file from client components.
 * - Redis / rate-limits are optional — missing Upstash vars must not break auth.
 * - Admin allowlist is optional when you use custom claims (`admin: true`).
 */

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() || undefined;
}

function adminEmails(): string[] {
  return (optional("ADMIN_EMAILS") ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const env = {
  /** Optional. When unset, rate limiting is a no-op. */
  get redis() {
    const url = optional("UPSTASH_REDIS_REST_URL");
    const token = optional("UPSTASH_REDIS_REST_TOKEN");
    if (!url || !token) return null;
    return { url, token } as const;
  },

  /** Lowercased allowlist. Empty = rely on Firebase custom claims only. */
  get adminEmails() {
    return adminEmails();
  },
} as const;
