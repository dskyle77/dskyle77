export const site = {
  name: "David Onyema",
  handle: "dskyle77",
  role: "Founder of SiteNix · Full-Stack Developer",

  tagline:
    "Founder & sole developer of SiteNix. I build and ship web products end-to-end — from responsive interfaces to APIs, databases, and deployment.",

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
    "Building real systems with Next.js, TypeScript, Firebase, and Node.js.",
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
  "$ shipped: Sitenix mini-site editor",
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
  "$ planning: Sitenix backend",
] as const;
