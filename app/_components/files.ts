// Files that open in the editor, in tab order. The first one is always open.
export const files = [
  { name: "about.ts", href: "/", closable: false },
  { name: "skills.json", href: "/skills", closable: true },
  { name: "experience.md", href: "/experience", closable: true },
  { name: "PROJECT REPO", href: "/projects", closable: true },
  { name: "contact.sh", href: "/contact", closable: true },
] as const;

export type FileName = (typeof files)[number]["name"];

export const fileForPath = (pathname: string) =>
  files.find((f) => f.href === pathname);

export const hrefFor = (name: string) =>
  files.find((f) => f.name === name)?.href;
