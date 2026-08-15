"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeft,
  Shield,
  X,
} from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";

/** Add new admin sections here — sidebar picks them up automatically. */
const NAV_ITEMS = [
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: FileText,
    match: (pathname: string) => pathname.startsWith("/admin/blogs"),
  },
] as const;

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, signOut } = useAdminAuth();
  const pathname = usePathname() || "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const showChrome = !loading && Boolean(user && isAdmin);

  if (!showChrome) {
    return (
      <div className="min-h-screen bg-ink text-paper">
        <main className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-12">
          {children}
        </main>
      </div>
    );
  }

  const sidebarInner = (
    <div className="flex h-full flex-col">
      <div
        className={`flex h-14 shrink-0 items-center border-b border-hairline px-3 ${
          collapsed ? "justify-center" : "justify-between gap-2"
        }`}
      >
        {!collapsed && (
          <Link
            href="/admin/blogs"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal"
          >
            <Shield className="h-4 w-4 shrink-0" />
            <span>Admin</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="hidden rounded-lg border border-hairline p-1.5 text-paper-dim hover:text-paper lg:inline-flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg border border-hairline p-1.5 text-paper-dim hover:text-paper lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        <p
          className={`mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim/70 ${
            collapsed ? "sr-only" : ""
          }`}
        >
          Content
        </p>
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-signal/15 text-signal"
                  : "text-paper-dim hover:bg-ink-soft hover:text-paper"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 space-y-1 border-t border-hairline p-2">
        <Link
          href="/"
          title="Public site"
          className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 font-mono text-xs text-paper-dim transition-colors hover:bg-ink-soft hover:text-paper ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Home className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Public site</span>}
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          title="Sign out"
          className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 font-mono text-xs text-paper-dim transition-colors hover:bg-red-500/10 hover:text-red-300 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
        {!collapsed && user?.email && (
          <p className="truncate px-2.5 pb-1 pt-1 font-mono text-[10px] text-paper-dim/70">
            {user.email}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-hairline bg-ink/95 px-4 backdrop-blur-sm lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-hairline p-2 text-paper-dim hover:text-paper"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <span className="font-mono text-xs uppercase tracking-wider text-signal">
          Admin
        </span>
        <span className="ml-auto truncate font-mono text-[11px] text-paper-dim">
          {user?.email}
        </span>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-hairline bg-ink-raised transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarInner}
      </aside>

      <div className="flex min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
        {/* Desktop sidebar */}
        <aside
          className={`sticky top-0 hidden h-screen shrink-0 border-r border-hairline bg-ink-raised transition-[width] duration-200 lg:block ${
            collapsed ? "w-[4.25rem]" : "w-56"
          }`}
        >
          {sidebarInner}
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
