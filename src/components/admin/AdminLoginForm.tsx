"use client";

import { useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";

export default function AdminLoginForm() {
  const { signIn, error: authError } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-signal/40 bg-signal/10 text-signal">
          <Shield className="h-5 w-5" />
        </div>
        <h1 className="font-display text-2xl text-paper">Admin access</h1>
        <p className="mt-2 text-sm text-paper-dim">
          Sign in as admin.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-hairline bg-ink-raised/50 p-6"
      >
        <div>
          <label
            htmlFor="admin-email"
            className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-paper-dim"
          >
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/50 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-paper-dim"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/50 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
            placeholder="••••••••"
          />
        </div>

        {(error || authError) && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error || authError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-signal/40 bg-signal/15 py-2.5 font-mono text-xs uppercase tracking-wider text-signal hover:bg-signal/25 disabled:opacity-60 transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}
