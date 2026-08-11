import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/shared/ProjectCard";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Things I've built — with the problem, approach, and tradeoffs behind each one.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="relative">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/[0.07] pb-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-7 bg-signal" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                  Portfolio · Archive
                </p>
              </div>
              <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
                Things I&apos;ve built
              </h1>
            </div>

            <span className="shrink-0 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-xs text-signal">
              {projects.length} Projects
            </span>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
