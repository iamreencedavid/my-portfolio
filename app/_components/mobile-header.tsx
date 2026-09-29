"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "./chrome";
import { Explorer } from "./explorer";
import { icons } from "./icons";
import { ThemeSwitch } from "./theme-settings";
import { useDismiss } from "./use-dismiss";

// Phone-sized header: brand on the left, a menu that drops the explorer down.
export function MobileHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  useDismiss(open, setOpen);

  // Picking a file closes the menu. Done during render so there's no flash.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header className="relative z-40 flex items-start justify-between gap-4 bg-window px-5 pt-5 pb-3 md:hidden">
        <div>
          <Brand size="sm" />
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
          className="focus-ring -mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-text transition-colors hover:bg-selected/50"
        >
          {open ? <span className="text-2xl">{icons.close}</span> : icons.menu}
        </button>

        {open && (
          <div
            id="mobile-drawer"
            className="absolute inset-x-0 top-full max-h-[75dvh] overflow-y-auto border-y border-border bg-window px-5 pb-6 [&>nav]:mt-2"
          >
            <Explorer projectsOpen={false} />
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
