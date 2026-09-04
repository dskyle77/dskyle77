export const site = {
  name: "David Onyema",
  handle: "dskyle77",
  role: "Junior Full-Stack Developer",

  tagline:
    "Founder of SiteNix. I build and ship web products end-to-end — from clean interfaces to APIs, databases, and deployment.",

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
    "SiteNix — visual website builder with AI-assisted content, reusable components, and a live editing experience. Also building Ziva, a campus commerce marketplace.",

  stack: {
    Fundamentals: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
    ],
    Frontend: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
    Backend: [
      { name: "Node.js", level: 78 },
      { name: "Next.js API", level: 85 },
      { name: "Express.js", level: 72 },
      { name: "Firebase", level: 88 },
      { name: "SQLite", level: 70 },
    ],
    "Game Dev": [
      { name: "GDevelop", level: 90 },
      { name: "Godot", level: 70 },
    ],
  },
} as const;

export const buildLog = [
  "SiteNix visual editor still iterating",
  "Shipped reusable-section editor + undo/redo",
  "AI-assisted content on SiteNix",
  "Building Ziva — campus commerce",
  "Paystack + OTP + PWA push",
  "Learning Express + Mongo patterns",
  "Shipping at Topibro",
] as const;
