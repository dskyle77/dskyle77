/**
 * Central env access. Client-safe values are under `public`.
 * Server-only secrets are never exposed to the browser.
 */

function required(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function optional(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v || undefined;
}

/** Normalize PEM private keys that were pasted with literal \n sequences. */
function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n").trim();
}

export const env = {
  /** Admin allow-list (single email or comma-separated). */
  get adminEmails(): string[] {
    const raw =
      process.env.ADMIN_EMAIL ||
      process.env.ADMIN_EMAILS ||
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      "";
    return raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  },

  isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false;
    const list = env.adminEmails;
    if (list.length === 0) return false;
    return list.includes(email.trim().toLowerCase());
  },

  /** Firebase client (browser) config — NEXT_PUBLIC_* only. */
  get firebasePublic() {
    return {
      apiKey: optional(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      authDomain: optional(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
      projectId: optional(
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
          process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      ),
      storageBucket: optional(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
      messagingSenderId: optional(
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      ),
      appId: optional(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    };
  },

  /** Firebase Admin (server) credentials. */
  get firebaseAdmin() {
    const projectId =
      optional(process.env.FIREBASE_ADMIN_PROJECT_ID) ||
      optional(process.env.FIREBASE_PROJECT_ID) ||
      optional(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

    const clientEmail =
      optional(process.env.FIREBASE_ADMIN_CLIENT_EMAIL) ||
      optional(process.env.FIREBASE_CLIENT_EMAIL);

    const privateKeyRaw =
      optional(process.env.FIREBASE_ADMIN_PRIVATE_KEY) ||
      optional(process.env.FIREBASE_PRIVATE_KEY);

    if (!projectId || !clientEmail || !privateKeyRaw) {
      return null;
    }

    return {
      projectId,
      clientEmail,
      privateKey: normalizePrivateKey(privateKeyRaw),
    };
  },

  /** Require admin credentials or throw (for routes that must work). */
  requireFirebaseAdmin() {
    const cfg = env.firebaseAdmin;
    if (!cfg) {
      throw new Error(
        "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY (or the FIREBASE_ADMIN_* variants).",
      );
    }
    return cfg;
  },

  get redis() {
    const url =
      optional(process.env.UPSTASH_REDIS_REST_URL) ||
      optional(process.env.KV_REST_API_URL);
    const token =
      optional(process.env.UPSTASH_REDIS_REST_TOKEN) ||
      optional(process.env.KV_REST_API_TOKEN);
    if (!url || !token) return null;
    return { url, token };
  },
} as const;
