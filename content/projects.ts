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
      tags: ["typescript", "react", "node.js", "aws", "microservices"],
      icon: "cart",
      live: "https://officeworks.com.au",
    },
    {
      slug: "nimbus",
      name: "nimbus",
      description: "Project summary coming soon.",
      tags: ["typescript", "aws"],
      icon: "cloud",
      live: "https://nimbus.emersion.com/",
    },
    {
      slug: "digital-central",
      name: "digital-central",
      description: "Real estate and property management platform.",
      tags: ["typescript", "react", "laravel", "aws"],
      icon: "building",
      live: "https://digitalcentral.com.au",
    },
    {
      slug: "lenderhomepage",
      name: "lenderhomepage",
      description: "Project summary coming soon.",
      tags: ["php", "laravel"],
      icon: "home",
      live: "https://lenderhomepage.com.au",
    },
    {
      slug: "hippocamp",
      name: "hippocamp",
      description: "Project summary coming soon.",
      tags: ["python", "ai"],
      icon: "spark",
    },
    {
      slug: "prime-hotel",
      name: "prime-hotel",
      description: "Project summary coming soon.",
      tags: ["php", "mysql"],
      icon: "bed",
    },
  ],
};
