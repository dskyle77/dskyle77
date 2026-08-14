/**
 * getClientIp.ts
 *
 * Reusable helper to extract the client's IP address in Next.js,
 * for use in rate limiting, logging, geo lookups, etc.
 *
 * Works with:
 *  - App Router Route Handlers (Request object)
 *  - Middleware (NextRequest)
 *  - Pages Router API routes (NextApiRequest) — see getClientIpFromNodeReq below
 *
 * Why this is needed: `request.ip` (App Router) / `req.socket.remoteAddress`
 * (Node) usually reflects your load balancer / proxy, NOT the real client,
 * once you're behind Vercel, Cloudflare, Nginx, etc. You have to read the
 * forwarded headers those proxies set.
 */

// Headers checked in priority order. Most specific / trustworthy first.
const IP_HEADERS = [
  "x-vercel-forwarded-for", // Vercel-specific, most reliable on Vercel
  "cf-connecting-ip", // Cloudflare
  "x-real-ip", // common with Nginx
  "x-client-ip",
  "x-forwarded-for", // standard, may contain a comma-separated list
  "fastly-client-ip",
  "true-client-ip",
] as const;

/**
 * Very light IP shape validation — just enough to reject garbage values
 * (e.g. "unknown", empty strings) without pulling in a full IP-parsing lib.
 */
function isPlausibleIp(value: string): boolean {
  if (!value) return false;
  const v = value.trim();
  if (!v || v.toLowerCase() === "unknown") return false;
  // crude IPv4 / IPv6 sanity check
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^[0-9a-fA-F:]+$/;
  return ipv4.test(v) || ipv6.test(v);
}

/**
 * Extract client IP from a Headers-like object (works for both the Fetch
 * `Headers` class used in App Router / Middleware, and a plain object).
 */
export function getClientIpFromHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
): string | null {
  const getHeader = (name: string): string | undefined => {
    if (typeof (headers as Headers).get === "function") {
      return (headers as Headers).get(name) ?? undefined;
    }
    const value = (headers as Record<string, string | string[] | undefined>)[
      name
    ];
    return Array.isArray(value) ? value[0] : value;
  };

  for (const header of IP_HEADERS) {
    const raw = getHeader(header);
    if (!raw) continue;

    // x-forwarded-for can be "client, proxy1, proxy2" — client is first
    const candidate = raw.split(",")[0].trim();

    if (isPlausibleIp(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * App Router / Middleware usage:
 *
 *   import { getClientIp } from "@/lib/getClientIp";
 *
 *   export async function GET(request: Request) {
 *     const ip = getClientIp(request);
 *     ...
 *   }
 */
export function getClientIp(request: Request): string {
  const fromHeaders = getClientIpFromHeaders(request.headers);
  if (fromHeaders) return fromHeaders;

  // NextRequest (App Router / Middleware) exposes `.ip` on some runtimes
  const maybeIp = (request as unknown as { ip?: string }).ip;
  if (maybeIp && isPlausibleIp(maybeIp)) return maybeIp;

  return "127.0.0.1"; // safe local fallback — never throw for a missing IP
}

/**
 * Pages Router API route usage:
 *
 *   import type { NextApiRequest } from "next";
 *   import { getClientIpFromNodeReq } from "@/lib/getClientIp";
 *
 *   export default function handler(req: NextApiRequest, res: NextApiResponse) {
 *     const ip = getClientIpFromNodeReq(req);
 *     ...
 *   }
 */
export function getClientIpFromNodeReq(req: {
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  connection?: { remoteAddress?: string };
}): string {
  const fromHeaders = getClientIpFromHeaders(req.headers);
  if (fromHeaders) return fromHeaders;

  const socketIp = req.socket?.remoteAddress || req.connection?.remoteAddress;
  if (socketIp && isPlausibleIp(socketIp)) return socketIp;

  return "127.0.0.1";
}
