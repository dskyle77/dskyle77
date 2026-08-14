import { Ratelimit } from "@upstash/ratelimit";

export async function withRateLimit(rateLimit: Ratelimit, identifier: string) {
  const result = await rateLimit.limit(identifier);

  return {
    success: result.success,
    reset: result.reset,
    remaining: result.remaining,
  };
}
