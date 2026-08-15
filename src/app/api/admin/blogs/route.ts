import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { requireAdmin } from "@/server/admin-auth";
import {
  createBlog,
  getAllBlogsAdmin,
  type BlogWriteInput,
} from "@/lib/blogs";

export async function GET(req: Request) {
  try {
    const auth = await requireAdmin(req);
    if ("error" in auth) return auth.error;

    const ip = getClientIp(req);
    if (rateLimits.admin) {
      const rl = await withRateLimit(rateLimits.admin, `${ip}:admin:blogs`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    const blogs = await getAllBlogsAdmin(100);
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("GET /api/admin/blogs failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin(req);
    if ("error" in auth) return auth.error;

    const ip = getClientIp(req);
    if (rateLimits.admin) {
      const rl = await withRateLimit(rateLimits.admin, `${ip}:admin:blogs:write`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    const body = (await req.json().catch(() => null)) as BlogWriteInput | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    const blog = await createBlog({
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      tags: body.tags,
      coverImage: body.coverImage,
      status: body.status,
      isFeatured: body.isFeatured,
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/blogs failed:", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    const status = /required|invalid/i.test(message) ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
