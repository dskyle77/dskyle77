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

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
      <Experience compact />
      <Contact />
    </>
  );
}
