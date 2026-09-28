"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The inline script in layout.tsx sets data-theme before paint; this store reads it back.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

export function ThemeSettings() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
      {open && (
        <div
          id="settings-panel"
          role="dialog"
          aria-label="Settings"
          className="absolute bottom-full left-0 mb-3 w-64 rounded-xl border border-border bg-window p-4 shadow-xl shadow-black/20"
        >
          <p className="mb-3 text-xs tracking-wider text-muted">SETTINGS</p>
          <div className="flex items-center justify-between gap-4">
            <span id="theme-label" className="text-sm text-text">
              {isDark ? "Dark" : "Light"} theme
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-labelledby="theme-label"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="relative h-7 w-12 shrink-0 rounded-full border border-border bg-selected transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                className={`absolute top-1/2 left-0.5 flex h-5.5 w-5.5 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-window transition-transform duration-200 ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M13.5 10.2A5.5 5.5 0 0 1 5.8 2.5a5.5 5.5 0 1 0 7.7 7.7Z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <circle cx="8" cy="8" r="2.75" fill="currentColor" />
                    <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label="Settings"
        aria-expanded={open}
        aria-controls="settings-panel"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-window text-muted shadow-lg shadow-black/20 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          className={`h-5.5 w-5.5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  );
}
