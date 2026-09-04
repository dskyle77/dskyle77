import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import Reveal from "./shared/Reveal";
import Carousel from "./shared/Carousel";
import ProjectCard from "./shared/ProjectCard";

export default function Projects() {
  const featured = getFeaturedProjects();
  const sitenix = featured.find((p) => p.slug === "sitenix");
  const ziva = featured.find((p) => p.slug === "ziva");
  const others = featured.filter(
    (p) => p.slug !== "sitenix" && p.slug !== "ziva",
  );

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-signal">
              Projects
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Things I&apos;ve shipped
            </h2>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-xs font-medium text-signal link-underline"
          >
            All projects →
          </Link>
        </div>
      </Reveal>

      {/* SiteNix spotlight */}
      {sitenix && (
        <Reveal>
          <div className="group relative mb-6 overflow-hidden rounded-2xl border border-white/8 bg-ink-raised transition-all duration-400 hover:border-signal/35 hover:shadow-[0_24px_48px_-24px_rgba(59,158,255,0.2)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/8 blur-[90px] transition-opacity duration-500 group-hover:bg-signal/12"
            />

            <div className="relative grid sm:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-64 border-b border-white/[0.06] bg-ink/80 sm:border-b-0 sm:border-r sm:border-white/[0.06]">
                <div className="flex h-full flex-col p-5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="ml-3 h-5 flex-1 rounded-md border border-white/6 bg-white/[0.03]" />
                  </div>

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

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-paper-dim">
                      SaaS · Live
                    </span>
                    <Link
                      href={`/projects/${sitenix.slug}`}
                      className="text-[11px] font-medium text-signal link-underline"
                    >
                      View project →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-signal sm:text-3xl">
                      {sitenix.title}
                    </h3>
                    <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-signal">
                      Spotlight
                    </span>
                  </div>

                  <p className="max-w-lg text-sm leading-relaxed text-paper-dim">
                    {sitenix.summary}
                  </p>

                  <div className="mt-6">
                    <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-paper-dim">
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sitenix.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-paper-dim transition-colors group-hover:border-signal/25"
                        >
                          {tech}
                        </span>
                      ))}
                      {sitenix.stack.length > 5 && (
                        <span className="px-1 py-1 text-[11px] text-paper-dim/50">
                          +{sitenix.stack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-paper-dim">
                      Built end-to-end
                    </span>
                    <Link
                      href={`/projects/${sitenix.slug}`}
                      aria-label={`View ${sitenix.title} project`}
                      className="text-sm font-medium text-signal transition-transform duration-300 hover:translate-x-1"
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

      {/* Ziva card */}
      {ziva && (
        <Reveal delay={1}>
          <Link
            href={`/projects/${ziva.slug}`}
            className="group mb-6 block overflow-hidden rounded-2xl border border-white/8 bg-ink-raised p-6 transition-all duration-400 hover:border-signal/35 hover:shadow-[0_20px_40px_-20px_rgba(59,158,255,0.18)] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-paper transition-colors group-hover:text-signal sm:text-2xl">
                    {ziva.title}
                  </h3>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300/90">
                    In progress
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-paper-dim">
                  {ziva.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ziva.stack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-paper-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm font-medium text-signal transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      {/* Other projects grid */}
      {others.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) + 1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
