"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/about";
import { ThemeSwitch } from "../theme-settings";
import { Explorer } from "./explorer";
import { icons } from "./icons";

// Phone-sized header: brand on the left, a menu that drops the explorer down.
export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Picking a file closes the menu. Done during render so there's no flash.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="relative z-40 flex items-start justify-between gap-4 bg-window px-5 pt-5 pb-3 md:hidden">
        <div>
          <h1 className="font-sans text-3xl font-medium tracking-tight text-text">
            {site.brand}
          </h1>
          {site.available && (
            <p className="mt-1 flex items-center gap-2 text-sm text-online">
              <span className="h-2 w-2 rounded-full bg-online" aria-hidden />
              available for work
            </p>
          )}
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-text transition-colors hover:bg-selected/50 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {open ? <span className="text-2xl">{icons.close}</span> : icons.menu}
        </button>

        {open && (
          <div
            id="mobile-drawer"
            className="absolute inset-x-0 top-full max-h-[75dvh] overflow-y-auto border-y border-border bg-window px-5 pb-6 [&>nav]:mt-2"
          >
            <Explorer />
            <div className="mt-6 border-t border-border pt-5">
              <ThemeSwitch />
            </div>
          </div>
        )}
      </header>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  );
}
