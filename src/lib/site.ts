export const site = {
  name: "David Onyema",
  handle: "dskyle77",
  role: "Junior Web Developer",
  tagline:
    "I ship web products that actually work — company sites, admin systems, the whole stack — from Lagos, Nigeria.",
  location: "Lagos, Nigeria",
  email: "dskyle77@gmail.com",
  links: {
    github: "https://github.com/dskyle77",
    linkedin: "https://www.linkedin.com/in/dskyle77/",
    portfolio: "https://dskyle77.vercel.app",
    facebook: "https://www.facebook.com/dskyle77/",
    itch: "https://dskyle77.itch.io",
    twitter: "https://x.com/dskyle77",
  },
  currentFocus:
    "Shipping real systems end-to-end with Next.js, TypeScript, and Firebase. Currently writing a lot of .ts at Topibro.",
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
  "$ optimized: LCP 2.4s → 0.7s",
  "$ refactored: App Router migration",
  "$ learning: Express.js fundamentals",
  "$ built: REST API with Express",
  "$ added: JWT auth middleware",
  "$ connected: MongoDB",
  "$ fixed: CORS issues in prod",
  "$ created: reusable Express middleware",
  "$ integrated: Firebase Admin SDK",
  "$ debugging: async route handlers",
  "$ writing: a lot of .ts at Topibro",
  "$ planning: Quicksite backend",
] as const;
