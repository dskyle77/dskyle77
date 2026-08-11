/* eslint-disable @next/next/no-html-link-for-pages */
import { site } from "@/lib/site";
import BuildLog from "./shared/BuildLog";
import StatCard from "./shared/StatCard";
import Reveal from "./shared/Reveal";
import BackgroundGrid from "./shared/BackgroundGrid";
import Aurora from "./shared/Aurora";

const stack = [
  "NEXT.JS",
  "TYPESCRIPT",
  "REACT",
  "FIREBASE",
  "NODE.JS",
  "TAILWIND",
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-52px)] overflow-hidden">
      <BackgroundGrid />
      <Aurora
        intensity={0.35}
        className="-right-40 -top-32 h-128 w-lg animate-hero-aurora"
      />

      <Aurora
        intensity={0.18}
        className="-left-40 top-20 h-96 w-96 animate-hero-aurora-reverse"
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10 sm:pt-28 sm:pb-12">
        <div className="grid gap-14 sm:grid-cols-[1.35fr_0.9fr] sm:items-center">
          {/* Main intro */}
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-signal" />

                <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                  {site.role} · {site.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="max-w-3xl font-display text-3xl leading-[1.15] text-paper glow-text text-balance sm:text-5xl lg:text-6xl">
                {site.name}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-7 max-w-xl text-base leading-8 text-paper-dim sm:text-lg">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View GitHub
                </a>

                <a href="/projects" className="btn-secondary">
                  See projects
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

          {/* Developer profile */}
          <Reveal delay={2}>
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                <span>developer.profile</span>
                <span>01</span>
              </div>

              <StatCard />

              <BuildLog />
            </div>
          </Reveal>
        </div>

        {/* Current focus */}
        <Reveal delay={4}>
          <div className="mt-16 border-y border-white/8 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                CURRENT FOCUS
              </span>

              <p className="font-mono text-xs leading-relaxed text-paper-dim sm:text-right">
                {site.currentFocus}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stack */}
        <Reveal delay={5}>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {stack.map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] tracking-widest text-paper-dim/70 transition-colors hover:text-signal"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Footer signal */}
        <Reveal delay={5}>
          <div className="mt-8 flex items-center justify-between font-mono text-[10px] text-paper-dim/50">
            <span>BUILD → SHIP → LEARN → REPEAT</span>

            <span className="hidden sm:block">
              <span className="text-signal">●</span> AVAILABLE
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
