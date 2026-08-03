/* eslint-disable @next/next/no-html-link-for-pages */
import { site } from "@/lib/site";
import BuildLog from "./BuildLog";
import StatCard from "./StatCard";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr] sm:items-end">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-signal mb-5">
              {site.role} · {site.location}
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="font-display text-2xl sm:text-4xl leading-normal text-paper glow-text text-balance">
              {site.name}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-paper-dim leading-relaxed">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-signal px-5 py-2.5 font-mono text-sm font-medium text-ink hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_rgba(46,158,255,0.7)]"
              >
                View GitHub
              </a>
              <a
                href="/projects"
                className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper hover:border-signal hover:text-signal transition-all duration-300"
              >
                See projects
              </a>
              <a
                href="/resume"
                className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper hover:border-signal hover:text-signal transition-all duration-300"
              >
                Resume
              </a>
              <a
                href="/David_Onyema_Resume.pdf"
                download="David_Onyema_Resume.pdf"
                className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper hover:border-signal hover:text-signal transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="space-y-4">
          <StatCard />
          <BuildLog />
        </Reveal>
      </div>
    </section>
  );
}
