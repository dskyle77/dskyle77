import type { Ratelimit } from "@upstash/ratelimit";

export async function withRateLimit(
  rateLimit: Ratelimit | undefined,
  identifier: string,
) {
  if (!rateLimit) {
    return { success: true as const, reset: 0, remaining: Number.POSITIVE_INFINITY };
  }

  const result = await rateLimit.limit(identifier);
  return {
    success: result.success,
    reset: result.reset,
    remaining: result.remaining,
  };
}
