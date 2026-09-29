// Projects rendered on the PROJECT REPO page, listed under `projects/` in the
// explorer (as `<slug>.md`), and each given its own page at /projects/<slug>.
// Order here is the display order and the prev/next order.
export type Project = {
  slug: string;
  name: string;
  description: string; // one-liner; the bold tagline on the project page
  tags: string[];
  icon: "cart" | "cloud" | "building" | "home" | "spark" | "bed";
  live?: string; // shows "live ↗" when set
  code?: string; // repo URL; without it the project is marked "private"
  // Project page only; each part is hidden until set.
  category?: string; // badge, e.g. "Product-focused" → "1. Product-focused"
  summary?: string; // longer paragraph under the tagline
  // Highlight chips, e.g. { icon: "bolt", label: "50ms ingest" }
  features?: { icon: FeatureIcon; label: string }[];
  skills?: string[]; // full skills list, shown under "Skills"
};

export type FeatureIcon =
  "bolt" | "realtime" | "cube" | "chart" | "shield" | "users";

export const projects: { sort: string; items: Project[] } = {
  sort: "sorted by impact",
  items: [
    {
      slug: "officeworks",
      name: "officeworks",
      description: "E-commerce platform development and maintenance.",
      tags: [
        "typescript",
        "react",
        "node.js",
        "aws",
        "microservices",
        "postgres",
        "no-sql",
      ],
      icon: "cart",
      live: "https://officeworks.com.au",
      skills: [
        "React.js",
        "Node.js",
        "Amazon Web Services (AWS)",
        "Jenkins",
        "Microservices",
        "Jest",
        "Mocha (JavaScript Framework)",
        "Express.js",
        "Cypress",
        "Continuous Integration and Continuous Delivery (CI/CD)",
        "Adobe Analytics",
        "TypeScript",
        "Full-Stack Development",
        "fapi",
        "Agile Environment",
        "Agile Methodologies",
        "APIs",
        "PostgreSQL",
        "Docker",
        "Git",
        "API Development",
        "Redux.js",
        "Next.js",
        "Prisma ORM",
        "GraphQL",
        "Algolia",
        "AI(Gemini OpenAI Claude)",
        "Python (Programming Language)",
      ],
    },
    {
      slug: "nimbus",
      name: "nimbus",
      description: "Fintech company.",
      tags: ["typescript", "aws", "react", "vue.js", "php", "laravel"],
      icon: "cloud",
      live: "https://nimbus.emersion.com/",
    },
    {
      slug: "digital-central",
      name: "digital-central",
      description: "Real estate and property management platform.",
      tags: ["javascript", "react", "php", "laravel", "aws", "mysql"],
      icon: "building",
      live: "https://digitalcentral.com.au",
    },
    {
      slug: "lenderhomepage",
      name: "lenderhomepage",
      description: "Fintech company.",
      tags: ["php", "laravel", "aws", "mysql", "javascript", "vue.js"],
      icon: "home",
      live: "https://lenderhomepage.com.au",
    },
    {
      slug: "hippocamp",
      name: "hippocamp",
      description: "Fintech company.",
      tags: ["php", "laravel", "aws", "aws", "mysql"],
      icon: "spark",
    },
    {
      slug: "prime-hotel",
      name: "prime-hotel",
      description: "Hotel booking platform.",
      tags: ["php", "mysql", "wordpress"],
      icon: "bed",
    },
  ],
};
