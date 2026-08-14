"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Newspaper, Plus, Shield } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import { site } from "@/lib/site";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { admin, signOut, loading } = useAdminAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-40 border-b border-hairline bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
            <span className="hidden text-paper-dim sm:inline">·</span>
            <Link
              href="/admin/blogs"
              className={`hidden font-mono text-xs sm:inline ${
                pathname.startsWith("/admin/blogs")
                  ? "text-paper"
                  : "text-paper-dim hover:text-signal"
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Newspaper className="h-3.5 w-3.5" />
                Blogs
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {admin && !loading && (
              <>
                <Link
                  href="/admin/blogs/new"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/10 px-3 py-1.5 font-mono text-xs text-signal hover:bg-signal/20 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New post
                </Link>
                <span className="hidden font-mono text-[11px] text-paper-dim md:inline">
                  {admin.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 font-mono text-xs text-paper-dim hover:border-paper-dim/50 hover:text-paper transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </>
            )}
            <Link
              href="/"
              className="font-mono text-[11px] text-paper-dim hover:text-signal transition-colors"
            >
              ← {site.handle}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 sm:py-10">{children}</main>
    </div>
  );
}
