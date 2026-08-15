import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { env } from "@/config/env";

type Limits = {
  blogs?: Ratelimit;
  contact?: Ratelimit;
  admin?: Ratelimit;
};

let cached: Limits | null = null;

/**
 * Lazy rate-limit instances.
 * Returns empty object when Upstash env vars are absent — auth still works.
 */
function createLimits(): Limits {
  const redisEnv = env.redis;
  if (!redisEnv) return {};

  const redis = new Redis({
    url: redisEnv.url,
    token: redisEnv.token,
  });

  return {
    blogs: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      prefix: "portfolio:blogs",
    }),
    contact: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "portfolio:contact",
    }),
    admin: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      prefix: "portfolio:admin",
    }),
  };
}

export function getRateLimits(): Limits {
  if (!cached) cached = createLimits();
  return cached;
}

/** @deprecated Prefer getRateLimits() — kept for existing route imports. */
export const rateLimits = new Proxy({} as Limits, {
  get(_target, prop: string) {
    return getRateLimits()[prop as keyof Limits];
  },
});
