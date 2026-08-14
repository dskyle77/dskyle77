import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import Reveal from "@/components/shared/Reveal";
import BlogListClient from "@/components/blogs/BlogListClient";

export const metadata: Metadata = buildMetadata({
  title: "Blogs & Writing",
  description:
    "Articles on full-stack web development, system design, software architecture, Next.js, and technical insights.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
        {/* Page Header */}
        <Reveal>
          <div className="mb-10 border-b border-hairline/80 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-7 bg-signal" />
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                    Writing & Insights
                  </p>
                </div>
                <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
                  Articles & Thoughts
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim sm:text-base">
                  Deep dives into software architecture, full-stack development with Next.js, database optimization, UI design systems, and lessons from building production apps.
                </p>
              </div>

              <div className="hidden sm:block shrink-0">
                <span className="rounded-full border border-signal/30 bg-signal/10 px-3.5 py-1.5 font-mono text-xs text-signal">
                  Technical Blog
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Client Side Interactive Blog List */}
        <BlogListClient />
      </section>
    </div>
  );
}
