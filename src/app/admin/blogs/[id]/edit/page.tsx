"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, FileQuestion } from "lucide-react";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import RequireAdmin from "@/components/admin/RequireAdmin";
import BlogEditor from "@/components/admin/BlogEditor";
import { adminBlogsApi } from "@/services/admin-blogs";
import type { Blog } from "@/types/blogs";

function EditBlogContent({ id }: { id: string }) {
  const { getIdToken } = useAdminAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const token = await getIdToken();
        if (!token) throw new Error("Not authenticated.");
        const data = await adminBlogsApi.get(token, id);
        if (!cancelled) setBlog(data);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Failed to load post.";
        if (/not found/i.test(message)) {
          setNotFound(true);
        } else {
          setError(message);
        }
        setBlog(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [getIdToken, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-paper-dim">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="font-mono text-xs">Loading post…</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink-soft text-paper-dim">
          <FileQuestion className="h-6 w-6" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl text-paper">
          Post not found
        </h1>
        <p className="mt-2 text-sm text-paper-dim">
          This post may have been deleted or the id is invalid.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs text-signal hover:bg-signal/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blogs
          </Link>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-4 py-2 font-mono text-xs text-paper-dim hover:text-paper"
          >
            Create new post
          </Link>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-sm text-red-300">
          {error || "Something went wrong loading this post."}
        </div>
        <Link
          href="/admin/blogs"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-paper-dim hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blogs
        </Link>
      </div>
    );
  }

  return <BlogEditor mode="edit" initial={blog} />;
}

export default function AdminEditBlogPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <RequireAdmin>
        <div className="py-16 text-center text-sm text-paper-dim">
          Invalid post id.
        </div>
      </RequireAdmin>
    );
  }

  return (
    <RequireAdmin>
      <EditBlogContent id={id} />
    </RequireAdmin>
  );
}
