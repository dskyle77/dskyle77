export const site = {
  name: "David Onyema",
  handle: "dskyle77",
  role: "Full-Stack Developer",
  tagline:
    "I build fast, scalable web products — from company sites to admin systems — and ship them from Lagos, Nigeria.",
  location: "Lagos, Nigeria",
  email: "dskyle77@gmail.com",
  links: {
    github: "https://github.com/dskyle77",
    linkedin: "https://www.linkedin.com/in/david-onyema-1abb77378/",
    portfolio: "https://dskyle77.vercel.app",
    facebook: "https://www.facebook.com/dskyle77/",
    itch: "https://dskyle77.itch.io",
    twitter: "https://x.com/dskyle77",
  },
  currentFocus:
    "Building complete systems end-to-end — from idea to deployment — with Next.js, TypeScript, and Firebase.",
  stack: {
    "Web Development": [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "React / Next.js", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "Git", level: 75 },
    ],
    "Game Development": [
      { name: "Gdevelop", level: 90 },
      { name: "Godot", level: 70 },
      { name: "Unity", level: 65 },
    ],
  },
} as const;

export const buildLog = [
  "$ shipped: Quicksite mini-site editor",
  "$ deployed: Blog Dashboard v2",
  "$ optimized: LCP 2.4s -> 0.7s",
  "$ refactored: Next.js App Router migration",
  "$ learning: TypeScript generics, deep dive",
  "$ fixed: hydration mismatch on project cards",
] as const;
