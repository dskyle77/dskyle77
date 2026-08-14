import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { getPublishedBlogs } from "@/lib/blogs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);

    if (rateLimits.blogs) {
      const rl = await withRateLimit(rateLimits.blogs, `${ip}:blogs`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429, headers: CORS },
        );
      }
    }

    const blogs = await getPublishedBlogs(50, { includeContent: false });
    return NextResponse.json({ success: true, data: blogs }, { headers: CORS });
  } catch (error) {
    console.error("GET /api/blogs failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500, headers: CORS },
    );
  }
}
