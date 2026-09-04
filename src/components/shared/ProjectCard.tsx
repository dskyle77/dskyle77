import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group glass-card block rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-signal">
          {project.title}
        </h3>
        <span
          aria-hidden="true"
          className="-translate-x-1.5 text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          →
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-paper-dim">
        {project.summary}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-paper-dim transition-colors duration-300 group-hover:border-signal/30"
          >
            {tech}
          </li>
        ))}
        {project.stack.length > 5 && (
          <li className="px-1 py-1 text-[11px] text-paper-dim/50">
            +{project.stack.length - 5}
          </li>
        )}
      </ul>
    </Link>
  );
}
