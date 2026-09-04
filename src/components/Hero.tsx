/* eslint-disable @next/next/no-html-link-for-pages */
import { site } from "@/lib/site";
import Reveal from "./shared/Reveal";
import BackgroundGrid from "./shared/BackgroundGrid";
import Aurora from "./shared/Aurora";

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Firebase",
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-52px)] overflow-hidden">
      <BackgroundGrid />
      <Aurora
        intensity={0.28}
        className="-right-32 -top-24 h-[28rem] w-[28rem] animate-float-slow"
      />
      <Aurora
        intensity={0.14}
        className="-left-28 top-32 h-80 w-80 animate-float-slow [animation-delay:-4s]"
      />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <p className="text-sm font-medium tracking-wide text-signal">
                {site.role} · {site.location}
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-paper text-balance sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim sm:text-xl">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                GitHub
              </a>
              <a href="/projects" className="btn-secondary">
                Projects
              </a>
              <a href="/resume" className="btn-secondary">
                Resume
              </a>
              <a
                href="/David_Onyema_Resume.pdf"
                download="David_Onyema_Resume.pdf"
                className="btn-secondary"
              >
                Download CV
              </a>
            </div>
          </Reveal>
        </div>

        {/* Focus + stack strip */}
        <Reveal delay={4}>
          <div className="mt-20 grid gap-6 border-t border-white/8 pt-8 sm:grid-cols-[1.2fr_0.8fr] sm:items-start">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-paper-dim">
                Currently
              </p>
              <p className="text-sm leading-relaxed text-paper/90 sm:text-base">
                {site.currentFocus}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-paper-dim transition-colors hover:border-signal/40 hover:text-paper"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={5}>
          <div className="mt-10 flex items-center gap-4 text-xs text-paper-dim/70">
            <span className="font-medium text-paper-dim">@{site.handle}</span>
            <span className="h-px w-6 bg-white/15" />
            <span>Available for work</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
