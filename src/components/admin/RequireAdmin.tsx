"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-paper-dim">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-mono text-xs">Checking session…</span>
      </div>
    );
  }

  // Signed in with Firebase but not on the admin allow-list
  if (user && !isAdmin) {
    return (
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
          <p className="font-display text-lg text-paper">Not an admin account</p>
          <p className="mt-2 text-sm text-paper-dim">
            <span className="font-mono text-paper">{user.email}</span> is signed
            in, but it is not on the admin allow-list.
          </p>
          <p className="mt-3 text-xs text-paper-dim/80">
            Set both <code className="text-signal">ADMIN_EMAIL</code> and{" "}
            <code className="text-signal">NEXT_PUBLIC_ADMIN_EMAIL</code> to the
            same address in your environment.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-hairline px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper-dim hover:text-paper"
          >
            Sign out and try another account
          </button>
        </div>
        <AdminLoginForm />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLoginForm />;
  }

  return <>{children}</>;
}
