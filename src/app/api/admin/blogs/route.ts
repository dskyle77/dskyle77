import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/server/auth";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { createBlog, getAllBlogsAdmin } from "@/lib/blogs";
import type { BlogWriteInput } from "@/lib/blogs";

/** GET /api/admin/blogs — list all blogs (any status). */
export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (rateLimits?.admin) {
      const rl = await withRateLimit(rateLimits.admin, `${ip}:admin-blogs`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    await requireAdmin(req);
    const blogs = await getAllBlogsAdmin(100);

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return authErrorResponse(error);
  }
}

/** POST /api/admin/blogs — create a blog. */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (rateLimits?.admin) {
      const rl = await withRateLimit(rateLimits.admin, `${ip}:admin-blogs-write`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

    await requireAdmin(req);

    const body = (await req.json()) as BlogWriteInput;
    if (!body?.title?.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const blog = await createBlog({
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      tags: body.tags,
      coverImage: body.coverImage,
      heroImageUrl: body.heroImageUrl,
      status: body.status === "published" ? "published" : "draft",
      isFeatured: body.isFeatured,
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Title is required.") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return authErrorResponse(error);
  }
}
