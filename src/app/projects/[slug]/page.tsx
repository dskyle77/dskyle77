import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // NOTE: assumes buildMetadata accepts an `image` option and wires it into
    // openGraph.images / twitter.images. If it doesn't yet, add that support
    // there, or replace this with an inline `openGraph`/`twitter` block here.
    image: project.image,
  });
}

const sections: { key: keyof typeof projects[number]; label: string }[] = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "The approach" },
  { key: "decisions", label: "Key decisions" },
  { key: "result", label: "The result" },
];

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="font-mono text-xs text-paper-dim hover:text-signal transition-colors"
      >
        ← All projects
      </Link>

      <h1 className="mt-6 font-mono font-bold text-3xl sm:text-4xl text-paper">
        {project.title}
      </h1>
      <p className="mt-3 text-lg text-paper-dim">{project.summary}</p>

      {project.image && (
        <div className="mt-8 overflow-hidden rounded-lg border border-hairline">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-hairline px-2 py-1 font-mono text-xs text-sage"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-signal px-4 py-2 font-mono text-sm font-medium text-ink hover:opacity-90 transition-opacity"
          >
            Live site
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-hairline px-4 py-2 font-mono text-sm font-medium text-paper hover:border-signal hover:text-signal transition-colors"
          >
            Source code
          </a>
        )}
      </div>

      <div className="mt-12 space-y-10">
        {sections.map(({ key, label }) => (
          <section key={key}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-2">
              {label}
            </h2>
            <p className="text-paper-dim leading-relaxed">
              {project[key] as string}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}