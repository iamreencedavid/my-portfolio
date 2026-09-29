"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { projects } from "@/content/projects";
import { hrefFor } from "./files";
import { icons } from "./icons";

type Item = { icon: ReactNode; label: string; href?: string };

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
const projectFiles = projects.items.map((p) => item(icons.doc, `${p.slug}.md`));
const contactFile = item(icons.mail, "contact.sh");
const projectsHref = hrefFor("PROJECT REPO");

const rowState = (active: boolean) =>
  active ? "bg-selected text-accent" : "text-text";
const hover = (active: boolean) => (active ? "" : "hover:bg-selected/50");

// A folder row. With `href`, the label opens that page (and expands the folder)
// while the chevron only toggles; without it, the whole row toggles.
function Folder({
  label,
  href,
  active = false,
  defaultOpen = false,
  children,
}: {
  label: string;
  href?: string;
  active?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const chevron = (
    <span className={active ? "text-accent" : "text-muted"}>
      {open ? icons.chevronDown : icons.chevronRight}
    </span>
  );

  return (
    <li>
      {href ? (
        <div
          className={`flex items-center rounded-md transition-colors ${rowState(active)}`}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-label={`Toggle ${label}`}
            onClick={() => setOpen(!open)}
            className={`focus-ring rounded-md py-2 pr-3 pl-1 focus-visible:-outline-offset-2 ${hover(active)}`}
          >
            {chevron}
          </button>
          <Link
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={() => setOpen(true)}
            className={`focus-ring flex-1 rounded-md py-2 pr-3 focus-visible:-outline-offset-2 ${hover(active)}`}
          >
            {label}
          </Link>
        </div>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="focus-ring flex w-full items-center gap-3 rounded-md py-2 pr-3 pl-1 text-left text-text transition-colors hover:bg-selected/50 focus-visible:-outline-offset-2"
        >
          {chevron}
          {label}
        </button>
      )}
      {open && <ul className="mt-0.5 space-y-0.5">{children}</ul>}
    </li>
  );
}

function TreeItem({
  icon,
  label,
  href,
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

export function Explorer({ projectsOpen = true }: { projectsOpen?: boolean }) {
  const pathname = usePathname();
  const file = (f: Item, nested = true) => (
    <TreeItem
      key={f.label}
      {...f}
      nested={nested}
      active={f.href === pathname}
    />
  );

  return (
    <nav aria-label="Explorer" className="mt-10 text-base lg:mt-14 lg:text-xl">
      <p className="mb-4 text-sm tracking-wider text-muted lg:text-base">
        EXPLORER
      </p>
      <ul className="space-y-0.5">
        <Folder label="src" defaultOpen>
          {srcFiles.map((f) => file(f))}
        </Folder>
        <Folder
          label="projects"
          href={projectsHref}
          active={projectsHref === pathname}
          defaultOpen={projectsOpen}
        >
          {projectFiles.map((f) => file(f))}
        </Folder>
        {file(contactFile, false)}
      </ul>
    </nav>
  );
}
