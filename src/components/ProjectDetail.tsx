"use client";

import Link from "next/link";
import Carousel from "@/components/shared/Carousel";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import type { projects } from "@/lib/projects";

type Project = (typeof projects)[number];

interface ProjectDetailProps {
  project: Project;
}

const sections: {
  key: keyof Project;
  label: string;
  number: string;
}[] = [
  { key: "problem", label: "The problem", number: "01" },
  { key: "approach", label: "The approach", number: "02" },
  { key: "decisions", label: "Key decisions", number: "03" },
  { key: "result", label: "The result", number: "04" },
];

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="relative">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <article className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">

      {/* Back */}
      <Reveal>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          All projects
        </Link>
      </Reveal>

      {/* Hero */}
      <header className="relative mt-10 max-w-4xl">
        <Reveal delay={1}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
              Case study
            </span>

            <span className="h-px w-8 bg-white/15" />

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
              {project.slug}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-paper-dim sm:text-lg">
            {project.summary}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-white/[0.07] py-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim/60">
                Stack
              </p>

              <p className="mt-1 font-mono text-xs text-paper">
                {project.stack.slice(0, 3).join(" · ")}
              </p>
            </div>

            {project.liveUrl && (
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim/60">
                  Status
                </p>

                <p className="mt-1 font-mono text-xs text-signal">Live</p>
              </div>
            )}
          </div>
        </Reveal>
      </header>

      {/* Hero image / Carousel */}
      {project.images && (
        <Reveal delay={2}>
          <div className="relative mt-10 overflow-hidden rounded-xl border border-white/10 bg-ink-raised shadow-[0_30px_100px_-40px_rgba(46,158,255,0.35)]">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-signal/60 to-transparent"
            />
            <Carousel images={project.images} />
          </div>
        </Reveal>
      )}

      {/* Actions + stack */}
      <Reveal delay={3}>
        <div className="mt-7 flex flex-col gap-6 border-b border-white/[0.07] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/2 px-2.5 py-1.5 font-mono text-[10px] text-paper-dim transition-colors hover:border-signal/30 hover:text-paper"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Live site ↗
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Source ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>

      {/* Case study */}
      <div className="mt-16 grid gap-14 sm:grid-cols-[180px_1fr]">
        <aside className="hidden sm:block">
          <p className="sticky top-8 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim/50">
            Build notes
          </p>
        </aside>

        <div className="space-y-8">
          {sections.map(({ key, label, number }, idx) => (
            <Reveal key={key} delay={idx + 1}>
              <section className="rounded-xl border border-white/8 bg-ink-raised/50 p-6 sm:p-8 backdrop-blur-xs transition-colors hover:border-signal/30">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-signal font-bold">
                    {number}
                  </span>

                  <span className="h-px w-6 bg-signal/30" />

                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                    {label}
                  </h2>
                </div>

                <p className="max-w-2xl text-base leading-8 text-paper-dim">
                  {project[key] as string}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <Reveal>
        <div className="mt-20 border-t border-white/[0.07] pt-6">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to all projects
          </Link>
        </div>
      </Reveal>
    </article>
    </div>
  );
}
