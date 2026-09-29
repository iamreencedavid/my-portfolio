import { projects } from "@/content/projects";
import { projectHref } from "./project";

export type File = {
  name: string;
  href: string;
  closable: boolean;
  project?: boolean; // a /projects/<slug> page; at most one is open as a tab
};

// Main files, in tab order. The first one is always open.
export const mainFiles: File[] = [
  { name: "about.ts", href: "/", closable: false },
  { name: "skills.json", href: "/skills", closable: true },
  { name: "experience.md", href: "/experience", closable: true },
  { name: "PROJECT REPO", href: "/projects", closable: true },
  { name: "contact.sh", href: "/contact", closable: true },
];

const projectFiles: File[] = projects.items.map((p) => ({
  name: `${p.slug}.md`,
  href: projectHref(p.slug),
  closable: true,
  project: true,
}));

export const files = [...mainFiles, ...projectFiles];

// Mobile pills show only the main files; on a project page, PROJECT REPO.
export const projectsFile = mainFiles.find((f) => f.href === "/projects")!;

export const fileForPath = (pathname: string) =>
  files.find((f) => f.href === pathname);

export const fileForName = (name: string) => files.find((f) => f.name === name);

export const hrefFor = (name: string) => fileForName(name)?.href;
