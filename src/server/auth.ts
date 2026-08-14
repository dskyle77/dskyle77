import { NextResponse } from "next/server";
import type { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth } from "@/server/firebase-admin";
import { env } from "@/config/env";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

function isAdminToken(decoded: DecodedIdToken): boolean {
  // Custom claim set in Firebase Console / Admin SDK
  if (decoded.admin === true || decoded.role === "admin") {
    return true;
  }

  const email = decoded.email?.toLowerCase();
  if (!email) return false;

  // Allowlisted emails from ADMIN_EMAILS env
  if (env.adminEmails.length > 0 && env.adminEmails.includes(email)) {
    return true;
  }

  return false;
}

/**
 * Verify Bearer ID token and ensure the user is an admin.
 * Throws AuthError on failure.
 */
export async function requireAdmin(req: Request): Promise<DecodedIdToken> {
  const header = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new AuthError("Missing or invalid Authorization header.", 401);
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    throw new AuthError("Missing auth token.", 401);
  }

  let decoded: DecodedIdToken;
  try {
    decoded = await adminAuth.verifyIdToken(token, true);
  } catch {
    throw new AuthError("Invalid or expired auth token.", 401);
  }

  if (!isAdminToken(decoded)) {
    throw new AuthError("Forbidden. Admin access required.", 403);
  }

  return decoded;
}

export function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Unexpected auth/admin error:", error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again later." },
    { status: 500 },
  );
}
