import { NextResponse } from "next/server";
import { requireAdmin, authErrorResponse } from "@/server/auth";
import { getClientIp } from "@/server/ip";
import { withRateLimit } from "@/server/rateLimits";
import { rateLimits } from "@/server/rateLimits/limits";

/** GET /api/admin/me — verify current user is an admin. */
export async function GET(req: Request) {
  try {
    const ip = getClientIp(req);
    if (rateLimits?.admin) {
      const rl = await withRateLimit(rateLimits.admin, `${ip}:admin-me`);
      if (!rl.success) {
        return NextResponse.json(
          { error: "Too many requests. Try again later." },
          { status: 429 },
        );
      }
    }

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
