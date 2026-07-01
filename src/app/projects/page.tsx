import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "A collection of things I've built — with the problem, approach, and tradeoffs behind each one.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
        Projects
      </p>
      <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper mb-10">
        Things I&apos;ve built
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
