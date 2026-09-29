"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/about";
import {
  fileForName,
  fileForPath,
  files,
  mainFiles,
  projectsFile,
} from "./files";
import { icons } from "./icons";
import { pill, pillActive, pillIdle } from "./project";

export function WindowTitle() {
  const active = fileForPath(usePathname());
  return (
    <span className="truncate text-sm text-muted lg:text-base">
      {site.owner} — {active?.name ?? "portfolio"}
    </span>
  );
}

// Phone tabs: every main file as a pill, always shown, so they double as
// navigation. A project page highlights its parent, PROJECT REPO.
export function MobileTabs() {
  const pathname = usePathname();
  const file = fileForPath(pathname);
  const active = file?.project ? projectsFile : file;
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav
      aria-label="Pages"
      className="flex gap-2 overflow-x-auto border-b border-border px-5 pt-1 pb-3 scrollbar-none md:hidden"
    >
      {mainFiles.map((f) => {
        const isActive = f.name === active?.name;
        return (
          <Link
            key={f.name}
            ref={isActive ? activeRef : undefined}
            href={f.href}
            aria-current={f.href === pathname ? "page" : undefined}
            className={`${pill} ${isActive ? pillActive : pillIdle}`}
          >
            {f.name}
          </Link>
        );
      })}
    </nav>
  );
}

export function EditorTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const active = fileForPath(pathname);

  const [open, setOpen] = useState<string[]>(() =>
    active && active.name !== files[0].name
      ? [files[0].name, active.name]
      : [files[0].name],
  );
  const [lastPath, setLastPath] = useState(pathname);

  // Visiting a file opens its tab; a project replaces any other project tab.
  // Done during render so there's no flash.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (active && !open.includes(active.name)) {
      const keep = active.project
        ? open.filter((n) => !fileForName(n)?.project)
        : open;
      setOpen([...keep, active.name]);
    }
  }

  const close = (name: string) => {
    setOpen(open.filter((n) => n !== name));
    if (active?.name === name) router.push(files[0].href);
  };

  return (
    <nav
      aria-label="Open editors"
      className="hidden overflow-x-auto border-b border-border text-sm md:flex lg:text-lg"
    >
      {files
        .filter((f) => open.includes(f.name))
        .map((f) => {
          const isActive = f.name === active?.name;
          return (
            <div
              key={f.name}
              className={`group -mb-px flex shrink-0 items-center border-r border-b-2 border-r-border ${
                isActive
                  ? "border-b-accent text-text"
                  : "border-b-transparent text-muted hover:text-text"
              }`}
            >
              <Link
                href={f.href}
                aria-current={isActive ? "page" : undefined}
                className={`py-3 pl-5 focus-ring focus-visible:-outline-offset-2 lg:py-4 lg:pl-7 ${
                  f.closable ? "pr-2" : "pr-5 lg:pr-7"
                }`}
              >
                {f.name}
              </Link>
              {f.closable && (
                <button
                  type="button"
                  aria-label={`Close ${f.name}`}
                  onClick={() => close(f.name)}
                  className="mr-3 flex h-[1.5em] w-[1.5em] items-center justify-center rounded text-muted hover:bg-border hover:text-text focus-ring lg:mr-4"
                >
                  {icons.close}
                </button>
              )}
            </div>
          );
        })}
    </nav>
  );
}
