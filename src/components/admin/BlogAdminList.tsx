"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import { adminBlogsApi } from "@/services/admin-blogs";
import type { Blog } from "@/types/blogs";

export default function BlogAdminList() {
  const { getIdToken } = useAdminAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated.");
      const data = await adminBlogsApi.list(token);
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (blog: Blog) => {
    if (!window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) {
      return;
    }
    setDeletingId(blog.id);
    try {
      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated.");
      await adminBlogsApi.remove(token, blog.id);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Content
          </p>
          <h1 className="mt-1 font-display text-3xl text-paper">Blogs</h1>
          <p className="mt-2 text-sm text-paper-dim">
            Create, edit, publish, and unpublish posts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-2 font-mono text-xs text-paper-dim hover:text-paper"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/15 px-3 py-2 font-mono text-xs text-signal hover:bg-signal/25"
          >
            <Plus className="h-3.5 w-3.5" />
            New post
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-paper-dim">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-xs">Loading…</span>
        </div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-hairline p-12 text-center">
          <p className="font-display text-lg text-paper">No posts yet</p>
          <p className="mt-2 text-sm text-paper-dim">
            Write your first article and publish it to the public blog.
          </p>
          <Link
            href="/admin/blogs/new"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/15 px-4 py-2 font-mono text-xs text-signal"
          >
            <Plus className="h-3.5 w-3.5" />
            Create post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-ink-soft/80 font-mono text-[11px] uppercase tracking-wider text-paper-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Status
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Updated
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => {
                const updated = new Date(blog.updatedAt).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                );
                const published = blog.status === "published";

                return (
                  <tr
                    key={blog.id}
                    className="border-b border-hairline/60 last:border-0 hover:bg-ink-raised/40"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-paper line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-paper-dim">
                        /{blog.slug}
                        {blog.isFeatured ? " · featured" : ""}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                          published
                            ? "border-signal/40 bg-signal/10 text-signal"
                            : "border-hairline bg-ink-soft text-paper-dim"
                        }`}
                      >
                        {blog.status || "draft"}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-paper-dim md:table-cell">
                      {updated}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {published && (
                          <Link
                            href={`/blogs/${blog.slug}`}
                            target="_blank"
                            className="rounded-lg border border-hairline p-1.5 text-paper-dim hover:text-signal"
                            title="View public"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="rounded-lg border border-hairline p-1.5 text-paper-dim hover:text-signal"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => void onDelete(blog)}
                          disabled={deletingId === blog.id}
                          className="rounded-lg border border-hairline p-1.5 text-paper-dim hover:border-red-500/40 hover:text-red-300 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === blog.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
