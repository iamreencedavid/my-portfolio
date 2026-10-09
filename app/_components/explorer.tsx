"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { projects } from "@/content/projects";
import { hrefFor } from "./files";
import { icons } from "./icons";

// `count` shows a muted number after the label, e.g. "projects 8".
type Item = { icon: ReactNode; label: string; href?: string; count?: number };

const item = (icon: ReactNode, label: string): Item => ({
  icon,
  label,
  href: hrefFor(label),
});

const srcFiles = [
  item(icons.code, "about.ts"),
  item(icons.braces, "skills.json"),
  item(icons.doc, "experience.md"),
];
// A single row, not a folder, so the tree doesn't grow with each project.
const projectsFolder: Item = {
  icon: icons.folder,
  label: "projects",
  href: hrefFor("projects"),
  count: projects.items.length,
};
const recommendationsFile = item(icons.users, "recommendations.md");
const contactFile = item(icons.mail, "contact.sh");

const rowState = (active: boolean) =>
  active ? "bg-selected text-accent" : "text-text";
const hover = (active: boolean) => (active ? "" : "hover:bg-selected/50");

// A folder row; clicking it toggles its children.
function Folder({
  label,
  defaultOpen = false,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="focus-ring flex w-full items-center gap-3 rounded-md py-2 pr-3 pl-1 text-left text-text transition-colors hover:bg-selected/50 focus-visible:-outline-offset-2"
      >
        <span className="text-muted">
          {open ? icons.chevronDown : icons.chevronRight}
        </span>
        {label}
      </button>
      {open && <ul className="mt-0.5 space-y-0.5">{children}</ul>}
    </li>
  );
}

function TreeItem({
  icon,
  label,
  href,
  count,
  active,
  nested = false,
}: Item & { active: boolean; nested?: boolean }) {
  const className = `flex items-center gap-3 rounded-md py-2 pr-3 ${rowState(active)} ${
    nested ? "pl-[2.2em]" : "pl-1"
  }`;
  const content = (
    <>
      <span className={active ? "text-accent" : "text-muted"}>{icon}</span>
      {label}
      {count !== undefined && (
        <span className={active ? "text-accent/70" : "text-muted"}>
          {count}
        </span>
      )}
    </>
  );

  return (
    <li>
      {href ? (
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`focus-ring ${className} transition-colors ${hover(active)}`}
        >
          {content}
        </Link>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  );
}

export function Explorer() {
  const pathname = usePathname();
  const file = (f: Item, nested = true) => (
    <TreeItem
      key={f.label}
      {...f}
      nested={nested}
      active={f.href === pathname}
    />
  );
  const projectsHref = projectsFolder.href;
  // Project pages (/projects/<slug>) highlight their parent row.
  const inProjects =
    pathname === projectsHref || pathname.startsWith(`${projectsHref}/`);

  return (
    <nav aria-label="Explorer" className="mt-10 text-base lg:mt-14 lg:text-xl">
      <p className="mb-4 text-sm tracking-wider text-muted lg:text-base">
        EXPLORER
      </p>
      <ul className="space-y-0.5">
        <Folder label="src" defaultOpen>
          {srcFiles.map((f) => file(f))}
        </Folder>
        <TreeItem {...projectsFolder} active={inProjects} />
        {file(recommendationsFile, false)}
        {file(contactFile, false)}
      </ul>
    </nav>
  );
}
