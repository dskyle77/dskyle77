"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Loader2,
  Save,
  Send,
  FileText,
  Trash2,
} from "lucide-react";
import MarkdownContent from "@/components/blogs/MarkdownContent";
import { useAdminAuth } from "@/lib/auth/AdminAuthProvider";
import { adminBlogsApi, type AdminBlogInput } from "@/services/admin-blogs";
import type { Blog } from "@/types/blogs";
import { slugify } from "@/lib/blogs/slug-client";

type Props = {
  mode: "create" | "edit";
  initial?: Blog;
};

export default function BlogEditor({ mode, initial }: Props) {
  const router = useRouter();
  const { getIdToken } = useAdminAuth();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [description, setDescription] = useState(initial?.description ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tagsRaw, setTagsRaw] = useState((initial?.tags ?? []).join(", "));
  const [coverImage, setCoverImage] = useState(
    initial?.coverImage || initial?.heroImageUrl || "",
  );
  const [isFeatured, setIsFeatured] = useState(Boolean(initial?.isFeatured));
  const [status, setStatus] = useState<"draft" | "published">(
    initial?.status === "published" ? "published" : "draft",
  );
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const tags = useMemo(
    () =>
      tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsRaw],
  );

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const buildPayload = (nextStatus: "draft" | "published"): AdminBlogInput => ({
    title: title.trim(),
    slug: slug.trim() || undefined,
    description: description.trim(),
    content,
    tags,
    coverImage: coverImage.trim() || null,
    isFeatured,
    status: nextStatus,
  });

  const save = async (nextStatus: "draft" | "published") => {
    setError(null);
    setMessage(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);
    try {
      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated.");

      const payload = buildPayload(nextStatus);

      if (mode === "create") {
        const created = await adminBlogsApi.create(token, payload);
        setMessage(
          nextStatus === "published" ? "Published." : "Draft saved.",
        );
        router.replace(`/admin/blogs/${created.id}/edit`);
        router.refresh();
      } else if (initial?.id) {
        await adminBlogsApi.update(token, initial.id, payload);
        setStatus(nextStatus);
        setMessage(
          nextStatus === "published" ? "Published." : "Draft saved.",
        );
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!initial?.id) return;
    if (
      !window.confirm(
        `Delete “${initial.title}”? This cannot be undone.`,
      )
    ) {
      return;
    }

    setDeleting(true);
    setError(null);
    try {
      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated.");
      await adminBlogsApi.remove(token, initial.id);
      router.replace("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            {mode === "create" ? "New post" : "Edit post"}
          </p>
          <h1 className="mt-1 font-display text-2xl text-paper sm:text-3xl">
            {title.trim() || "Untitled"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => void onDelete()}
              disabled={deleting || saving}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300 hover:bg-red-500/20 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => void save("draft")}
            disabled={saving || deleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-ink-raised px-3 py-2 font-mono text-xs text-paper-dim hover:text-paper disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save draft
          </button>
          <button
            type="button"
            onClick={() => void save("published")}
            disabled={saving || deleting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/15 px-3 py-2 font-mono text-xs text-signal hover:bg-signal/25 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Publish
          </button>
        </div>
      </div>

      {(error || message) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-500/30 bg-red-500/10 text-red-300"
              : "border-signal/30 bg-signal/10 text-signal"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div>
            <label className="mb-1.5 block font-mono text-xs text-paper-dim">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-xl border border-hairline bg-ink-raised px-3.5 py-2.5 text-sm text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-paper-dim">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="w-full rounded-xl border border-hairline bg-ink-raised px-3.5 py-2.5 font-mono text-sm text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
              placeholder="url-slug"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-paper-dim">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-y rounded-xl border border-hairline bg-ink-raised px-3.5 py-2.5 text-sm text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
              placeholder="Short summary shown on cards and SEO"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-mono text-xs text-paper-dim">
                Content (Markdown)
              </label>
              <div className="flex rounded-lg border border-hairline p-0.5">
                <button
                  type="button"
                  onClick={() => setTab("write")}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] ${
                    tab === "write"
                      ? "bg-signal/15 text-signal"
                      : "text-paper-dim hover:text-paper"
                  }`}
                >
                  <FileText className="h-3 w-3" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] ${
                    tab === "preview"
                      ? "bg-signal/15 text-signal"
                      : "text-paper-dim hover:text-paper"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </button>
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={22}
                className="w-full resize-y rounded-xl border border-hairline bg-ink-raised px-3.5 py-3 font-mono text-sm leading-relaxed text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
                placeholder={"# Heading\n\nWrite your post in **Markdown**…"}
                spellCheck
              />
            ) : (
              <div className="min-h-[28rem] rounded-xl border border-hairline bg-ink-raised/40 px-5 py-4">
                <MarkdownContent content={content} />
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-xl border border-hairline bg-ink-raised/40 p-4 space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-paper-dim mb-2">
                Status
              </p>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-xs ${
                  status === "published"
                    ? "border-signal/40 bg-signal/10 text-signal"
                    : "border-hairline bg-ink-soft text-paper-dim"
                }`}
              >
                {status}
              </span>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                Cover image URL
              </label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-ink px-3 py-2 text-sm text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
                placeholder="https://…"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs text-paper-dim">
                Tags (comma-separated)
              </label>
              <input
                value={tagsRaw}
                onChange={(e) => setTagsRaw(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-ink px-3 py-2 text-sm text-paper focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50"
                placeholder="Next.js, Firebase, Architecture"
              />
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-ink-soft px-2 py-0.5 font-mono text-[10px] text-paper-dim"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-hairline"
              />
              <span className="font-mono text-xs text-paper-dim">
                Featured / spotlight
              </span>
            </label>
          </div>

          {mode === "edit" && initial?.slug && status === "published" && (
            <a
              href={`/blogs/${initial.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-lg border border-hairline px-3 py-2 font-mono text-xs text-paper-dim hover:text-signal hover:border-signal/40 transition-colors"
            >
              View public page ↗
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
