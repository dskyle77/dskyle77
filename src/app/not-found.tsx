import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: `The page you're looking for doesn't exist. Head back to ${site.name}'s portfolio.`,
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32 flex flex-col items-center text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
        404
      </p>

      <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper mb-4">
        Page not found
      </h1>

      <p className="text-paper-dim leading-relaxed max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        No worries — plenty of good stuff still here.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/projects" className="btn-secondary">
          See projects
        </Link>
        <Link href="/resume" className="btn-secondary">
          Resume
        </Link>
      </div>

      <p className="mt-16 font-mono text-xs text-paper-dim">
        {site.handle} · {site.location}
      </p>
    </section>
  );
}
