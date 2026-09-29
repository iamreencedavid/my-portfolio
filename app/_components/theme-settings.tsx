"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { icons } from "./icons";
import { useDismiss } from "./use-dismiss";

type Theme = "light" | "dark";

// The inline script in layout.tsx sets data-theme before paint; this store reads it back.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const getServerTheme = (): Theme => "dark";

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const labelId = useId();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between gap-4">
      <span id={labelId} className="text-sm text-text">
        {isDark ? "Dark" : "Light"} theme
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-labelledby={labelId}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="focus-ring relative h-7 w-12 shrink-0 rounded-full border border-border bg-selected transition-colors focus-visible:outline-offset-2"
      >
        <span
          className={`absolute top-1/2 left-0.5 flex h-5.5 w-5.5 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-window transition-transform duration-200 ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {isDark ? icons.moon : icons.sun}
        </span>
      </button>
    </div>
  );
}

export function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useDismiss(open, setOpen, rootRef);

  return (
    <div ref={rootRef} className="fixed bottom-6 left-6 z-50 hidden md:block">
      {open && (
        <div
          id="settings-panel"
          role="dialog"
          aria-label="Settings"
          className="absolute bottom-full left-0 mb-3 w-64 rounded-xl border border-border bg-window p-4 shadow-xl shadow-black/20"
        >
          <p className="mb-3 text-xs tracking-wider text-muted">SETTINGS</p>
          <ThemeSwitch />
        </div>
      )}

      <button
        type="button"
        aria-label="Settings"
        aria-expanded={open}
        aria-controls="settings-panel"
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-window text-muted shadow-lg shadow-black/20 transition-colors hover:text-text focus-visible:outline-offset-2"
      >
        {/* Rotate a wrapper, not the SVG itself. */}
        <span
          className={`flex transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
        >
          {icons.cog}
        </span>
      </button>
    </div>
  );
}
