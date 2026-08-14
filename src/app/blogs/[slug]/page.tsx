import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import Reveal from "@/components/shared/Reveal";
import MarkdownContent from "@/components/blogs/MarkdownContent";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { getBlogBySlug, getPublishedSlugs } from "@/lib/blogs";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Build-time env may be missing — fall through to on-demand rendering
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogBySlug(slug);
    if (!post) {
      return buildMetadata({
        title: "Article not found",
        description: "This article doesn't exist or is no longer published.",
        path: `/blogs/${slug}`,
      });
    }

    return buildMetadata({
      title: post.title,
      description: post.description,
      path: `/blogs/${post.slug}`,
      image: post.coverImage || post.heroImageUrl,
    });
  } catch {
    return buildMetadata({
      title: "Article not found",
      description: "This article doesn't exist or is no longer published.",
      path: `/blogs/${slug}`,
    });
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogBySlug(slug);
  } catch (err) {
    console.error(`Failed to load blog "${slug}":`, err);
    notFound();
  }

  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const readingTime = post.readingTimeMinutes
    ? `${post.readingTimeMinutes} min read`
    : "5 min read";

  const cover = post.coverImage || post.heroImageUrl;

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <Reveal>
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-mono text-xs text-paper-dim hover:text-signal transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to all articles
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-4 border-b border-hairline/80 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              {post.isFeatured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">
                Technical Article
              </span>
              <div className="flex items-center gap-3 font-mono text-xs text-paper-dim">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime}
                </span>
              </div>
            </div>

            <h1 className="font-display text-3xl leading-tight text-paper sm:text-5xl">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-base text-paper-dim sm:text-lg leading-relaxed">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 font-mono text-xs text-paper">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-signal/20 text-signal border border-signal/30 font-bold">
                  {site.name.charAt(0)}
                </div>
                <span>{site.name}</span>
              </div>

              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-ink-soft px-2.5 py-1 font-mono text-xs text-paper-dim"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {cover && (
          <Reveal>
            <div className="relative my-8 aspect-video w-full overflow-hidden rounded-2xl border border-hairline">
              <Image
                src={cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="pt-4">
            <MarkdownContent content={post.content ?? ""} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 rounded-xl border border-hairline bg-ink-raised/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-sm text-paper">
                Enjoyed this article?
              </h4>
              <p className="text-xs text-paper-dim mt-1">
                Explore more projects and insights on my portfolio.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs text-signal hover:bg-signal/20 transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
