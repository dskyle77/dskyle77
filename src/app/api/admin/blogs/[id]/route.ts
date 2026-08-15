import { NextResponse } from "next/server";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import { requireAdmin } from "@/server/admin-auth";
import {
  deleteBlog,
  getBlogByIdAdmin,
  updateBlog,
  type BlogWriteInput,
} from "@/lib/blogs";

type Context = { params: Promise<{ id: string }> };

export async function GET(req: Request, context: Context) {
  try {
    const auth = await requireAdmin(req);
    if ("error" in auth) return auth.error;

    const { id } = await context.params;
    if (!id?.trim()) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const blog = await getBlogByIdAdmin(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("GET /api/admin/blogs/[id] failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, context: Context) {
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

    const { id } = await context.params;
    if (!id?.trim()) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const body = (await req.json().catch(() => null)) as
      | Partial<BlogWriteInput>
      | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    const blog = await updateBlog(id, {
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      tags: body.tags,
      coverImage: body.coverImage,
      status: body.status,
      isFeatured: body.isFeatured,
    });

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("PATCH /api/admin/blogs/[id] failed:", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    const status = /not found/i.test(message)
      ? 404
      : /required|invalid/i.test(message)
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(req: Request, context: Context) {
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

    const { id } = await context.params;
    if (!id?.trim()) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] failed:", error);
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    const status = /not found/i.test(message) ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
