"use client";

import { site } from "@/lib/site";
import Reveal from "./shared/Reveal";

export default function Skills() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-signal">
          Stack
        </p>
        <h2 className="mb-14 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          What I build with
        </h2>
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-2">
        {Object.entries(site.stack).map(([category, skills], catIndex) => (
          <Reveal key={category} delay={(catIndex + 1) as 1 | 2 | 3 | 4}>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-paper-dim">
                  {category}
                </h3>
                <span className="h-px flex-1 bg-white/8" />
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group rounded-full border border-white/8 bg-ink-raised px-4 py-2.5 transition-all duration-300 hover:border-signal/35 hover:bg-white/[0.04] hover:shadow-[0_0_20px_-6px_rgba(59,158,255,0.25)]"
                  >
                    <span className="text-sm font-medium text-paper transition-colors group-hover:text-paper">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={5}>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-paper-dim">
          Fundamentals first — HTML, CSS, and JavaScript — then frameworks and
          tools. I care more about shipping something that works than collecting
          logos.
        </p>
      </Reveal>
    </section>
  );
}
