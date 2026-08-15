import "server-only";

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
    decoded = await adminAuth.verifyIdToken(token);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[auth] verifyIdToken failed:", msg);

    if (
      /private key|PEM|credential|DECODER|1E08010C|invalid-credential/i.test(
        msg,
      )
    ) {
      throw new Error(
        `Firebase Admin credential error: ${msg}. Check FIREBASE_PRIVATE_KEY on Vercel.`,
      );
    }

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

  const message = error instanceof Error ? error.message : String(error);
  console.error("[auth] unexpected error:", message);

  const isConfig =
    /Missing Firebase|credential|private key|PEM|SERVICE_ACCOUNT|FIREBASE_/i.test(
      message,
    );

  return NextResponse.json(
    {
      error: isConfig
        ? message
        : "Something went wrong. Please try again later.",
      ...(isConfig ? { code: "FIREBASE_ADMIN_MISCONFIG" } : {}),
    },
    { status: 500 },
  );
}
