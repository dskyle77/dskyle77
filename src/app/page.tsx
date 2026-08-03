import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Reveal from "@/components/Reveal";
import { getFeaturedProjects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedProjects();
  const spotlight = featured.find((p) => p.slug === "sitenix");
  const others = featured.filter((p) => p.slug !== "sitenix");

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <Skills />

        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-mono text-sm uppercase tracking-widest text-paper-dim">
              Featured work
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs text-signal hover:underline"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        {/* SiteNix spotlight — full width */}
        {spotlight && (
          <Reveal>
            <Link
              href={`/projects/${spotlight.slug}`}
              className="group card-lift mb-6 block rounded-lg border border-hairline bg-ink-raised/40 p-6 sm:p-8 hover:border-signal"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-mono text-xl sm:text-2xl font-semibold text-paper group-hover:text-signal transition-colors duration-300">
                      {spotlight.title}
                    </h3>
                    <span className="rounded border border-signal/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                      Spotlight
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-paper-dim leading-relaxed max-w-2xl">
                    {spotlight.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {spotlight.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-line px-2.5 py-1 font-mono text-xs text-paper-dim group-hover:border-signal/40 transition-colors duration-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  <span
                    aria-hidden="true"
                    className="font-mono text-signal text-lg opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  >
                    →
                  </span>
                  {spotlight.liveUrl && (
                    <span className="font-mono text-[11px] text-paper-dim group-hover:text-signal transition-colors">
                      Live project
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Other featured projects — normal grid */}
        {others.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((project, i) => (
              <Reveal
                key={project.slug}
                delay={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <Experience compact />
      <Contact />
    </>
  );
}
