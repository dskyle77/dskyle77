import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-hairline p-6 hover:border-signal transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-lg font-semibold text-paper group-hover:text-signal transition-colors">
          {project.title}
        </h3>
        <span
          aria-hidden="true"
          className="font-mono text-signal opacity-0 group-hover:opacity-100 transition-opacity"
        >
          →
        </span>
      </div>
      <p className="mt-2 text-sm text-paper-dim leading-relaxed">
        {project.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-line px-2 py-1 font-mono text-xs text-paper-dim"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
