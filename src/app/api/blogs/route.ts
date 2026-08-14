import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { getPublishedBlogs } from "@/lib/blogs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * GET /api/blogs
 * Public list of published blogs.
 */
export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);

    const ratelimit = await withRateLimit(rateLimits.blogs, `${ip}:blogs`);
    if (!ratelimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429, headers: CORS_HEADERS },
      );
    }

    const blogs = await getPublishedBlogs(50, { includeContent: false });

    return NextResponse.json(
      { success: true, data: blogs },
      { headers: CORS_HEADERS },
    );
  } catch (error) {
    console.error("GET /api/blogs failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
