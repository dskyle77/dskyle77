import { NextResponse } from "next/server";
import { getAdminAuth } from "@/server/firebase-admin";
import { env } from "@/config/env";

export type AdminUser = {
  uid: string;
  email: string;
};

/**
 * Verify Authorization: Bearer <Firebase ID token> and ensure the
 * signed-in user is on the ADMIN_EMAIL allow-list.
 */
export async function requireAdmin(
  req: Request,
): Promise<{ user: AdminUser } | { error: NextResponse }> {
  const header = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Missing or invalid Authorization header." },
        { status: 401 },
      ),
    };
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return {
      error: NextResponse.json({ error: "Empty bearer token." }, { status: 401 }),
    };
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(token, true);
    const email = (decoded.email || "").trim().toLowerCase();

    if (!email || !env.isAdminEmail(email)) {
      return {
        error: NextResponse.json(
          { error: "Not authorized as admin." },
          { status: 403 },
        ),
      };
    }

    return {
      user: {
        uid: decoded.uid,
        email,
      },
    };
  } catch (err) {
    console.error("Admin token verification failed:", err);
    return {
      error: NextResponse.json(
        { error: "Invalid or expired session. Sign in again." },
        { status: 401 },
      ),
    };
  }
}
