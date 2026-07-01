/* eslint-disable @next/next/no-html-link-for-pages */
import { site } from "@/lib/site";
import BuildLog from "./BuildLog";
import StatCard from "./StatCard";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr] sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-5">
            {site.role} · {site.location}
          </p>
          <h1 className="font-display text-2xl sm:text-4xl leading-normal text-paper glow-text text-balance">
            {site.name}
          </h1>
          <p className="mt-6 max-w-lg text-base sm:text-lg text-paper-dim leading-relaxed">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-signal px-5 py-2.5 font-mono text-sm font-medium text-ink hover:opacity-90 transition-opacity"
            >
              View GitHub
            </a>
            <a
              href="/projects"
              className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper hover:border-signal hover:text-signal transition-colors"
            >
              See projects
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <StatCard />
          <BuildLog />
        </div>
      </div>
    </section>
  );
}
