import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { env } from "@/config/env";

const redis = new Redis({
  url: env.redis.url,
  token: env.redis.token,
});

export const rateLimits = {
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
