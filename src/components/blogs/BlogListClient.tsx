"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Tag, X, Newspaper, RefreshCw } from "lucide-react";
import { blogsApi } from "@/services/blogs";
import type { Blog } from "@/types/blogs";
import BlogCard from "./BlogCard";
import BlogSkeleton from "./BlogSkeleton";
import Reveal from "@/components/shared/Reveal";

export default function BlogListClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await blogsApi.getPublishedBlogs();
      setBlogs(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError("Unable to load articles right now. Please try again.");
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);

  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((b) => {
      b.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        blog.tags?.some((t) => t.toLowerCase().includes(q));

      const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  const featuredBlog = useMemo(() => {
    if (searchQuery || selectedTag || filteredBlogs.length === 0) return null;
    return filteredBlogs.find((b) => b.isFeatured) || filteredBlogs[0];
  }, [filteredBlogs, searchQuery, selectedTag]);

  const gridBlogs = useMemo(() => {
    if (featuredBlog && !searchQuery && !selectedTag) {
      return filteredBlogs.filter((b) => b.id !== featuredBlog.id);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredBlog, searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-hairline/80 pb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-paper-dim" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, keyword, or topic..."
              className="w-full rounded-xl border border-hairline bg-ink-raised/80 py-2.5 pl-10 pr-9 font-sans text-sm text-paper placeholder:text-paper-dim/60 focus:border-signal/50 focus:outline-none focus:ring-1 focus:ring-signal/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-dim hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 font-mono text-xs text-paper-dim mr-1">
              <Tag className="h-3 w-3" />
              Tags:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-lg border px-3 py-1 font-mono text-xs transition-all ${
                selectedTag === null
                  ? "border-signal bg-signal/15 text-signal font-semibold"
                  : "border-hairline bg-ink-soft/40 text-paper-dim hover:border-paper-dim/40 hover:text-paper"
              }`}
            >
              All ({blogs.length})
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? null : tag)
                }
                className={`rounded-lg border px-3 py-1 font-mono text-xs transition-all ${
                  selectedTag === tag
                    ? "border-signal bg-signal/15 text-signal font-semibold"
                    : "border-hairline bg-ink-soft/40 text-paper-dim hover:border-paper-dim/40 hover:text-paper"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {isLoading ? (
        <BlogSkeleton />
      ) : error ? (
        <div className="rounded-xl border border-hairline bg-ink-raised/40 p-8 text-center">
          <p className="text-sm text-paper-dim">{error}</p>
          <button
            onClick={() => void fetchBlogs()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs text-signal hover:bg-signal/20 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Reloading
          </button>
        </div>
      ) : blogs.length === 0 ? (
        <Reveal>
          <div className="my-12 rounded-2xl border border-dashed border-hairline/80 bg-ink-raised/20 p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink-soft text-paper-dim">
              <Newspaper className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg text-paper">
              No articles yet
            </h3>
            <p className="mt-2 text-sm text-paper-dim max-w-md mx-auto">
              Published posts from the blog dashboard will show up here.
            </p>
          </div>
        </Reveal>
      ) : filteredBlogs.length === 0 ? (
        <Reveal>
          <div className="my-12 rounded-2xl border border-dashed border-hairline/80 bg-ink-raised/20 p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink-soft text-paper-dim">
              <Newspaper className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg text-paper">
              No articles found
            </h3>
            <p className="mt-2 text-sm text-paper-dim">
              Nothing matches &quot;{searchQuery || selectedTag}&quot;. Try a
              different search or tag.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs text-signal hover:bg-signal/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-12">
          {featuredBlog && (
            <Reveal>
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-signal">
                  Spotlight Post
                </p>
                <BlogCard blog={featuredBlog} isFeatured />
              </div>
            </Reveal>
          )}

          {gridBlogs.length > 0 && (
            <div className="space-y-4">
              {featuredBlog && (
                <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">
                  All Posts ({gridBlogs.length})
                </p>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridBlogs.map((blog, i) => (
                  <Reveal
                    key={blog.id || blog.slug}
                    delay={Math.min((i % 3) + 1, 3) as 1 | 2 | 3}
                  >
                    <BlogCard blog={blog} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
