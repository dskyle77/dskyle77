import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { env } from "@/config/env";

type Limits = {
  blogs?: Ratelimit;
  contact?: Ratelimit;
  admin?: Ratelimit;
};

function createLimits(): Limits {
  const { url, token } = env.redis;
  if (!url || !token) return {};

  const redis = new Redis({ url, token });

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

export const rateLimits = createLimits();
