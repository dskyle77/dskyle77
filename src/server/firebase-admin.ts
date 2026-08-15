import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let db: Firestore | undefined;

/**
 * Normalize the service-account private key for Vercel / most hosts.
 * Env UIs often store the PEM with literal `\n` sequences.
 */
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();

  // Strip wrapping quotes if the whole value was pasted with them.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Turn escaped newlines into real ones.
  key = key.replace(/\\n/g, "\n");

  return key;
}

function readAdminCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    throw new Error(
      [
        "Missing Firebase Admin credentials.",
        "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY",
        "in the Vercel project environment (Production + Preview).",
      ].join(" "),
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKeyRaw),
  };
}

/** Lazy Firebase Admin app. Safe to call from any server route. */
export function getAdminApp(): App {
  if (app) return app;
  if (getApps().length > 0) {
    app = getApp();
    return app;
  }

  const { projectId, clientEmail, privateKey } = readAdminCredentials();

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return app;
}

/**
 * Server-only Firestore (lazy).
 * Public routes can import this — it does not load Auth / jose / jwks-rsa.
 */
export function getDb(): Firestore {
  if (!db) db = getFirestore(getAdminApp());
  return db;
}
