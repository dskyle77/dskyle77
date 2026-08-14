import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/server/auth";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";
import {
  deleteBlog,
  getBlogByIdAdmin,
  updateBlog,
  type BlogWriteInput,
} from "@/lib/blogs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/** GET /api/admin/blogs/[id] */
export async function GET(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
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
    const blog = await getBlogByIdAdmin(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return authErrorResponse(error);
  }
}

/** PATCH /api/admin/blogs/[id] */
export async function PATCH(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
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
    const blog = await updateBlog(id, body);

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    if (error instanceof Error && error.message === "Blog not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof Error && error.message === "Title is required.") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return authErrorResponse(error);
  }
}

/** DELETE /api/admin/blogs/[id] */
export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
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
    await deleteBlog(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Blog not found.") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return authErrorResponse(error);
  }
}
