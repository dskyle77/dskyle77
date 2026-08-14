// config/env.ts

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

/** Comma-separated admin emails allowed to manage blogs. */
function getAdminEmails(): string[] {
  const raw = getOptionalEnv("ADMIN_EMAILS") ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const env = {
  "firebase-admin": {
    projectId: getEnv("FIREBASE_PROJECT_ID"),
    clientEmail: getEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: getEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  },

  "firebase-client": {
    apiKey: getEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: getEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId: getOptionalEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
  },

  redis: {
    url: getEnv("UPSTASH_REDIS_REST_URL"),
    token: getEnv("UPSTASH_REDIS_REST_TOKEN"),
  },

  /** Lowercased admin emails from ADMIN_EMAILS env (comma-separated). */
  adminEmails: getAdminEmails(),
} as const;
