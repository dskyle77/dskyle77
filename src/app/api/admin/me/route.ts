import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/me
 * Verify the Bearer ID token and confirm the user is an admin.
 * Intentionally has ZERO rate-limit / redis dependencies so misconfigured
 * Upstash can never break login.
 */
export async function GET(req: Request) {
  try {
    const user = await requireAdmin(req);

    return NextResponse.json({
      success: true,
      data: {
        uid: user.uid,
        email: user.email ?? null,
        name: user.name ?? null,
      },
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
