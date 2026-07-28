"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.querySelectorAll(".skill-bar-fill").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll(".skill-bar-fill").forEach((el) => {
            el.classList.add("is-visible");
          });
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
          Stack
        </p>
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-paper mb-10">
          Tools I reach for
        </h2>
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-2">
        {Object.entries(site.stack).map(([category, skills], catIndex) => (
          <Reveal key={category} delay={(catIndex + 1) as 1 | 2}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-paper-dim mb-4">
              {category}
            </h3>
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm text-paper">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-signal">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-hairline overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full bg-signal"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
