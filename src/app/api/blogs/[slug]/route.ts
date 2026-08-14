import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { getBlogBySlug } from "@/lib/blogs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/blogs/[slug]
 * Full published blog including markdown content.
 */
export async function GET(req: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const ip = getClientIp(req);

    if (rateLimits?.blogs) {
      const ratelimit = await withRateLimit(
        rateLimits.blogs,
        `${ip}:blogs:${slug}`,
      );
      if (!ratelimit.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET /api/blogs/[slug] failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
