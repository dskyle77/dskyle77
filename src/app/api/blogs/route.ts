import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { getPublishedBlogs } from "@/lib/blogs";

/**
 * GET /api/blogs
 * Public list of published blogs (no markdown body — use /api/blogs/[slug] or the page for full content).
 */
export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);

    if (rateLimits?.blogs) {
      const ratelimit = await withRateLimit(rateLimits.blogs, `${ip}:blogs`);
      if (!ratelimit.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    const blogs = await getPublishedBlogs(50, { includeContent: false });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("GET /api/blogs failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
