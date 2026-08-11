import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: `Resume of ${site.name} — Software Engineer based in ${site.location}. Projects, skills, and education.`,
  path: "/resume",
});

const profileText =
  "Self-taught software engineer building production-ready, full-stack web platforms solo — from SaaS tools to client-facing systems. Comfortable owning a project end to end: architecture, frontend, backend integration, and deployment. Incoming Software Engineering student at Obafemi Awolowo University, with a growing interest in game development.";

const projects = [
  {
    title: "SiteNix",
    type: "SOLO",
    href: "https://dskyle77.vercel.app/projects/sitenix",
    description:
      "A platform enabling Nigerian businesses to launch SEO-optimized mini-sites in minutes, with reusable page sections, live editing, custom branding, and WhatsApp-based lead capture.",
    stack: "Next.js, TypeScript, Firebase, Tailwind CSS",
  },
  {
    title: "Benzene Plus Academy",
    type: "SOLO",
    href: "https://dskyle77.vercel.app/projects/benzene-plus-academy",
    description:
      "Full-stack enrollment platform and content management system for a Lagos-based JAMB/WAEC/NECO tutorial academy, engineered to convert visiting parents into registered students.",
    stack: "Next.js, TypeScript, Firebase, Tailwind CSS",
  },
  {
    title: "Legal Baby Distribution",
    type: "FREELANCE",
    href: "https://dskyle77.vercel.app/projects/legal-baby-distribution",
    description:
      "Paid client project (2026): a music distribution platform for independent artists, featuring a modern frontend and a scalable content structure.",
    stack: "Next.js, Tailwind CSS, shadcn/ui",
  },
];

const whatIBring = [
  "Ships complete products alone — from idea to deployed, working software.",
  "Real freelance client experience delivering to a brief and a deadline.",
  "Consistent modern stack across projects: Next.js, TypeScript, Tailwind, Firebase.",
  "Actively learning outside web development, including Godot for game development.",
];

const skills = [
  {
    category: "Languages & Core",
    items: ["TypeScript", "JavaScript"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend & Data",
    items: ["Firebase"],
  },
  {
    category: "Tools",
    items: ["Git", "Vercel", "VS Code"],
  },
  {
    category: "Exploring",
    items: ["Godot / Game Dev"],
  },
];

const education = [
  {
    school: "Obafemi Awolowo University",
    detail: "Software Engineering — Incoming",
    extra: "JAMB UTME Score: 314",
  },
  {
    school: "Devesels School, Ijeododo",
    detail: "Senior Secondary Certificate — 2025",
  },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Header actions */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 print:hidden">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Resume
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/David_Onyema_Resume.pdf"
              download="David_Onyema_Resume.pdf"
              className="btn-primary !text-xs !uppercase !tracking-wider !px-4 !py-2"
            >
              Download PDF
            </a>
            <PrintButton />
            <Link
              href="/"
              className="btn-secondary !text-xs !uppercase !tracking-wider !px-4 !py-2 text-paper-dim"
            >
              ← Back
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Resume content */}
      <article className="resume space-y-10">
        {/* Name + contact */}
        <Reveal delay={1}>
          <header className="border-b border-hairline pb-6">
            <h1 className="font-mono font-bold text-3xl sm:text-4xl text-paper">
              David Onyema
            </h1>
            <p className="mt-1 font-mono text-sm text-signal">
              Software Engineer
            </p>
            <p className="mt-1 font-mono text-xs text-paper-dim">
              Lagos, Nigeria
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-paper-dim">
              <a
                href="mailto:dskyle77@gmail.com"
                className="hover:text-signal transition-colors"
              >
                dskyle77@gmail.com
              </a>
              <a
                href="tel:+2348161592059"
                className="hover:text-signal transition-colors"
              >
                +234 816 159 2059
              </a>
              <a
                href="https://github.com/dskyle77"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-signal transition-colors"
              >
                github.com/dskyle77
              </a>
              <a
                href="https://www.linkedin.com/in/dskyle77/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-signal transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://dskyle77.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-signal transition-colors"
              >
                Portfolio
              </a>
            </div>
          </header>
        </Reveal>

        {/* Profile */}
        <Reveal delay={2}>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
              Profile
            </h2>
            <p className="text-sm sm:text-base text-paper-dim leading-relaxed">
              {profileText}
            </p>
          </section>
        </Reveal>

        {/* Projects */}
        <Reveal delay={3}>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-5">
              Projects
            </h2>
            <div className="space-y-7">
              {projects.map((project) => (
                <div key={project.title}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-mono text-sm font-semibold text-paper">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                        {project.type}
                      </span>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-signal hover:underline"
                    >
                      View project →
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-paper-dim leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-paper-dim">
                    {project.stack}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* What I Bring */}
        <Reveal delay={4}>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              What I Bring
            </h2>
            <ul className="space-y-2">
              {whatIBring.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-paper-dim leading-relaxed"
                >
                  <span className="text-signal shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Skills */}
        <Reveal delay={5}>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              Skills
            </h2>
            <div className="space-y-4">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-xs text-paper mb-1.5">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-line px-2.5 py-1 font-mono text-[11px] text-paper-dim"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Education */}
        <Reveal delay={5}>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
              Education
            </h2>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.school}>
                  <h3 className="font-mono text-sm font-semibold text-paper">
                    {edu.school}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-signal">
                    {edu.detail}
                  </p>
                  {edu.extra && (
                    <p className="mt-0.5 font-mono text-[11px] text-paper-dim">
                      {edu.extra}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </article>

      {/* Print tip */}
      <p className="mt-12 text-center font-mono text-[11px] text-paper-dim print:hidden">
        Tip: Use the Print / Save PDF button above, or Ctrl/Cmd + P → Save as
        PDF.
      </p>
    </div>
  );
}
