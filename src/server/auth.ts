import { NextResponse } from "next/server";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "@/server/firebase-auth";
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
  // Prefer custom claims when present.
  if (decoded.admin === true || decoded.role === "admin") return true;

  const email = decoded.email?.toLowerCase();
  if (!email) return false;

  const allowlist = env.adminEmails;
  return allowlist.length > 0 && allowlist.includes(email);
}

/**
 * Verify Bearer ID token and ensure the caller is an admin.
 *
 * Admin if either:
 * - custom claim `admin: true` or `role: "admin"`, or
 * - email is listed in ADMIN_EMAILS (comma-separated env).
 */
export async function requireAdmin(req: Request): Promise<DecodedIdToken> {
  const header =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!header?.startsWith("Bearer ")) {
    throw new AuthError("Missing or invalid Authorization header.", 401);
  }

  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    throw new AuthError("Missing auth token.", 401);
  }

  let decoded: DecodedIdToken;
  try {
    // checkRevoked = true rejects tokens after password change / disable.
    decoded = await getAdminAuth().verifyIdToken(token, true);
  } catch (err) {
    // Log server-side only — never leak verify details to the client.
    console.error("[auth] verifyIdToken failed:", err);
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

  // Common misconfig surface on Vercel: missing FIREBASE_* or bad private key.
  const message = error instanceof Error ? error.message : String(error);
  if (
    message.includes("Missing Firebase Admin credentials") ||
    message.includes("Failed to parse private key") ||
    message.includes("error:1E08010C") // OpenSSL PEM parse
  ) {
    console.error("[auth] Firebase Admin misconfiguration:", message);
    return NextResponse.json(
      {
        error:
          "Server auth is misconfigured. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY on Vercel.",
      },
      { status: 500 },
    );
  }

  console.error("[auth] unexpected error:", error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again later." },
    { status: 500 },
  );
}
