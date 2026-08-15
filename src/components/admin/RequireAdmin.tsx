"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-paper-dim">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-mono text-xs">Checking session…</span>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminLoginForm />;
  }

  return <>{children}</>;
}
