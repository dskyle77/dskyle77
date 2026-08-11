import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import Reveal from "./shared/Reveal";
import Carousel from "./shared/Carousel";
import ProjectCard from "./shared/ProjectCard";
import Aurora from "./shared/Aurora";

export default function Projects() {
  const featured = getFeaturedProjects();
  const spotlight = featured.find((p) => p.slug === "sitenix");
  const others = featured.filter((p) => p.slug !== "sitenix");

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 relative">
      <Aurora intensity={0.25} className="-left-32 top-20 animate-aurora-breathe" />


      <Aurora intensity={0.15} className="top-50 right-1/3 animate-aurora-drift" />
      {/* Header */}
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-signal">
              Projects
            </p>

            <h2 className="font-display text-2xl leading-tight text-paper sm:text-3xl">
              Things I&apos;ve shipped
            </h2>
          </div>

          <Link
            href="/projects"
            className="shrink-0 font-mono text-xs text-signal link-underline"
          >
            All projects →
          </Link>
        </div>
      </Reveal>

      {/* Sitenix spotlight */}
      {spotlight && (
        <Reveal>
          <div className="group relative mb-5 overflow-hidden rounded-lg border border-white/9 bg-ink-raised transition-colors duration-300 hover:border-signal/50">
            {/* Subtle spotlight glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/6 blur-[100px] transition-opacity duration-500 group-hover:bg-blue-500/10"
            />

            <div className="relative grid sm:grid-cols-[1.05fr_0.95fr]">
              {/* Project visual */}
              <div className="min-h-70 border-b border-white/[0.07] bg-ink sm:border-b-0 sm:border-r">
                <div className="flex h-full flex-col p-5">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />

                    <div className="ml-3 h-5 flex-1 rounded border border-white/6 bg-white/2" />
                  </div>

                  {/* Project carousel */}
                  <div className="flex flex-1 items-center justify-center py-6">
                    <Carousel
                      images={[
                        {
                          src: "/image-previews/sitenix-editor.png",
                          alt: "Sitenix website builder editor",
                        },
                        {
                          src: "/image-previews/sitenix-editor-2.png",
                          alt: "Portfolio built with Sitenix",
                        },
                        {
                          src: "/image-previews/sitenix-dashboard.png",
                          alt: "Sitenix dashboard",
                        },
                      ]}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-paper-dim">
                      SaaS · Live
                    </span>

                    <Link
                      href={`/projects/${spotlight.slug}`}
                      className="font-mono text-[10px] text-signal link-underline"
                    >
                      View project →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project information */}
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-signal sm:text-3xl">
                      {spotlight.title}
                    </h3>

                    <span className="rounded border border-signal/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-signal">
                      Spotlight
                    </span>
                  </div>

                  <p className="max-w-lg text-sm leading-7 text-paper-dim">
                    {spotlight.summary}
                  </p>

                  <div className="mt-7">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim">
                      Built with
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {spotlight.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/10 px-2.5 py-1 font-mono text-[10px] text-paper-dim transition-colors duration-300 group-hover:border-signal/30"
                        >
                          {tech}
                        </span>
                      ))}

                      {spotlight.stack.length > 5 && (
                        <span className="px-1 py-1 font-mono text-[10px] text-paper-dim/50">
                          +{spotlight.stack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
                      Built end-to-end
                    </span>

                    <Link
                      href={`/projects/${spotlight.slug}`}
                      aria-label={`View ${spotlight.title} project`}
                      className="font-mono text-sm text-signal transition-transform duration-300 hover:translate-x-1"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* Other projects */}
      {others.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {others.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
