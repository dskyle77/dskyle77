function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() || undefined;
}

function adminEmails(): string[] {
  return (optional("ADMIN_EMAILS") ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const env = {
  /** Client SDK config — only resolved when read (browser / client modules). */
  get firebaseClient() {
    return {
      apiKey: required("NEXT_PUBLIC_FIREBASE_API_KEY"),
      authDomain: required("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
      projectId: required("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
      storageBucket: required("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
      messagingSenderId: required("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
      appId: required("NEXT_PUBLIC_FIREBASE_APP_ID"),
      measurementId: optional("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
    };
  },

  redis: {
    url: optional("UPSTASH_REDIS_REST_URL"),
    token: optional("UPSTASH_REDIS_REST_TOKEN"),
  },

  adminEmails: adminEmails(),
} as const;
