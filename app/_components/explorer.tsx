"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { hrefFor } from "./files";
import { icons } from "./icons";

const projects = [
  "officeworks.md",
  "nimbus.md",
  "digital-central.md",
  "lenderhomepage.md",
  "hippocamp.md",
  "prime-hotel.md",
];

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
        className="flex w-full items-center gap-3 rounded-md py-2 pr-3 pl-1 text-left text-text transition-colors hover:bg-selected/50 focus-visible:outline-2 focus-visible:outline-accent"
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
  depth = 0,
}: {
  icon: ReactNode;
  label: string;
  depth?: number;
}) {
  const pathname = usePathname();
  const href = hrefFor(label);
  const active = href === pathname;
  const className = `flex items-center gap-3 rounded-md py-2 pr-3 ${
    active ? "bg-selected text-accent" : "text-text"
  } ${depth ? "pl-[2.2em]" : "pl-1"}`;
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
          className={`${className} transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
            active ? "" : "hover:bg-selected/50"
          }`}
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
  return (
    <nav aria-label="Explorer" className="mt-10 text-base lg:mt-14 lg:text-xl">
      <p className="mb-4 text-sm tracking-wider text-muted lg:text-base">
        EXPLORER
      </p>
      <ul className="space-y-0.5">
        <Folder label="src" defaultOpen>
          <TreeItem icon={icons.code} label="about.ts" depth={1} />
          <TreeItem icon={icons.braces} label="skills.json" depth={1} />
          <TreeItem icon={icons.doc} label="experience.md" depth={1} />
        </Folder>
        <Folder label="projects" defaultOpen>
          {projects.map((name) => (
            <TreeItem key={name} icon={icons.doc} label={name} depth={1} />
          ))}
        </Folder>
        <TreeItem icon={icons.mail} label="contact.sh" />
      </ul>
    </nav>
  );
}
