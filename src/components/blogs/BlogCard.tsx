"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, Sparkles } from "lucide-react";
import type { Blog } from "@/types/blogs";

interface BlogCardProps {
  blog: Blog;
  isFeatured?: boolean;
}

export default function BlogCard({ blog, isFeatured = false }: BlogCardProps) {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const imageUrl = blog.heroImageUrl || blog.coverImage;

  if (isFeatured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-signal/25 bg-linear-to-b from-ink-raised via-ink-raised/90 to-ink p-6 transition-all duration-300 hover:border-signal/60 hover:shadow-[0_0_30px_rgba(46,158,255,0.15)] sm:p-8">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Image preview column */}
          {imageUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-hairline lg:col-span-6">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-hairline bg-ink-soft font-mono text-sm text-paper-dim lg:col-span-6">
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="h-8 w-8 text-signal opacity-70" />
                <span>Featured Post</span>
              </div>
            </div>
          )}

          {/* Content column */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-6">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">
                  <Sparkles className="h-3 w-3" />
                  Featured Article
                </span>
                <div className="flex items-center gap-3 font-mono text-xs text-paper-dim">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-paper-dim" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-paper-dim" />
                    {blog.readingTimeMinutes || 5} min read
                  </span>
                </div>
              </div>

              <h2 className="font-display text-2xl tracking-tight text-paper transition-colors duration-200 group-hover:text-signal sm:text-3xl">
                <Link href={`/blogs/${blog.slug || blog.id}`}>
                  {blog.title}
                </Link>
              </h2>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper-dim sm:text-base">
                {blog.description}
              </p>
            </div>

            <div className="pt-2">
              <div className="mb-4 flex flex-wrap gap-2">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-hairline bg-ink/60 px-2.5 py-1 font-mono text-[11px] text-paper-dim transition-colors group-hover:border-hairline/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blogs/${blog.slug || blog.id}`}
                className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-signal hover:underline"
              >
                Read Article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-ink-raised/60 p-5 sm:p-6 transition-all duration-300 hover:border-signal/40 hover:bg-ink-raised hover:shadow-[0_0_20px_rgba(46,158,255,0.08)]">
      <div>
        {imageUrl && (
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-hairline/60">
            <Image
              src={imageUrl}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="mb-3 flex items-center justify-between font-mono text-xs text-paper-dim">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-paper-dim" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-paper-dim" />
            {blog.readingTimeMinutes || 4} min read
          </span>
        </div>

        <h3 className="font-display text-lg tracking-tight text-paper transition-colors duration-200 group-hover:text-signal sm:text-xl">
          <Link href={`/blogs/${blog.slug || blog.id}`} className="focus:outline-none">
            {blog.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-paper-dim sm:text-sm">
          {blog.description}
        </p>
      </div>

      <div className="mt-6 border-t border-hairline/60 pt-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {blog.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-ink-soft px-2 py-0.5 font-mono text-[10px] text-paper-dim"
            >
              #{tag}
            </span>
          ))}
          {blog.tags && blog.tags.length > 3 && (
            <span className="font-mono text-[10px] text-paper-dim/60">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>

        <Link
          href={`/blogs/${blog.slug || blog.id}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-signal group-hover:underline"
        >
          Read full post
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
