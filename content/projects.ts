// Projects rendered on the PROJECT REPO page and listed under `projects/` in
// the explorer (as `<slug>.md`). Order here is the display order.
export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  icon: "cart" | "cloud" | "building" | "home" | "spark" | "bed";
  live?: string; // shows "live ↗" when set
  code?: string; // shows "code ↗" when set, otherwise "private"
};

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
