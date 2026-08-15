import "server-only";

import admin from "firebase-admin";

/**
 * Same pattern as the working sitenix app:
 * default `firebase-admin` import + singleton init.
 * Modular `firebase-admin/auth` subpath imports break under Turbopack
 * externals on Vercel (jwks-rsa → require jose → ERR_REQUIRE_ESM).
 */

function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  while (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }
  return key.replace(/\\n/g, "\n");
}

function readCredential() {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKeyRaw),
  };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(readCredential()),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

/** Compat alias used by lib/blogs. */
export function getDb() {
  return adminDb;
}
