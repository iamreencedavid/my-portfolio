"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/about";
import { boot } from "@/content/boot";
import { icons } from "./_components/icons";

// figlet "Rectangles": < rnzi.dev >
const LOGO = String.raw`   __                                 __
  / /               _     _           \ \
 / /    ___ ___ ___|_|  _| |___ _ _    \ \
< <    |  _|   |- _| |_| . | -_| | |    > >
 \ \   |_| |_|_|___|_|_|___|___|\_/    / /
  \_\                                 /_/`;

// A document being "assembled" from drifting dots; each "·" pulses.
const DOC = [
  "          · ·         ·    ",
  "     ·  ·   ┌──────────┐   ",
  "   ·  ·  ·  │ ──────── │   ",
  " ·  · ─ ·   │          │   ",
  "   · ─ ─ ·  │ ──────── │   ",
  "    ·   ·   │          │ · ",
  "     ·  ·   └──────────┘  ·",
];

const SEGMENTS = 10;
const TICK_MS = 240; // 10 ticks ≈ 2.4s to reach 100%
const HOLD_MS = 800; // keep the success line up before fading
const FADE_MS = 400;
const STORAGE_KEY = "booted";

const noSubscribe = () => () => {};
const readBooted = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

function Illustration() {
  return (
    <pre
      aria-hidden
      className="self-center text-[11px] leading-tight text-accent md:self-auto md:text-xs lg:text-sm"
    >
      {DOC.map((line, i) => (
        <div key={i}>
          {line.split(/(·)/).map((part, j) =>
            part === "·" ? (
              <span
                key={j}
                className="animate-pulse text-accent/70 motion-reduce:animate-none"
                style={{ animationDelay: `${((i * 7 + j * 3) % 10) * 150}ms` }}
              >
                ·
              </span>
            ) : (
              part
            ),
          )}
        </div>
      ))}
    </pre>
  );
}

// Terminal-style splash shown once per browser session, over the site.
export function BootScreen() {
  const booted = useSyncExternalStore(noSubscribe, readBooted, () => false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"run" | "fade" | "gone">("run");

  // Fill the bar, and let a click or Enter/Space/Esc skip ahead.
  useEffect(() => {
    if (booted || phase !== "run") return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(
      () => setProgress((p) => Math.min(p + 100 / SEGMENTS, 100)),
      reduce ? TICK_MS / 2 : TICK_MS,
    );
    const skip = (e: Event) => {
      if (
        e instanceof KeyboardEvent &&
        !["Enter", " ", "Escape"].includes(e.key)
      )
        return;
      setPhase("fade");
    };
    addEventListener("pointerdown", skip);
    addEventListener("keydown", skip);
    return () => {
      clearInterval(id);
      removeEventListener("pointerdown", skip);
      removeEventListener("keydown", skip);
    };
  }, [booted, phase]);

  // At 100%, hold the success line, then fade.
  useEffect(() => {
    if (progress < 100 || phase !== "run") return;
    const t = setTimeout(() => setPhase("fade"), HOLD_MS);
    return () => clearTimeout(t);
  }, [progress, phase]);

  // Remember for this session, then unmount after the fade.
  useEffect(() => {
    if (phase !== "fade") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    const t = setTimeout(() => setPhase("gone"), FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  if (booted || phase === "gone") return null;

  const user = site.owner.toLowerCase().replace(/\s+/g, "-");
  const complete = progress >= 100;
  const filled = Math.round((progress / 100) * SEGMENTS);

  return (
    <div
      aria-label="Loading portfolio"
      className={`boot-screen fixed inset-0 z-[60] flex overflow-y-auto bg-page transition-opacity duration-400 motion-reduce:transition-none md:items-center md:justify-center md:p-8 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Full-bleed on phones; a terminal window card from md up. */}
      <div className="flex min-h-full w-full flex-col md:min-h-0 md:max-w-6xl md:overflow-hidden md:rounded-xl md:border md:border-border md:bg-window md:shadow-2xl md:shadow-black/30">
        {/* Title bar */}
        <div className="hidden items-center gap-4 border-b border-border px-5 py-3.5 md:flex">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3.5 w-3.5 rounded-full bg-light-close" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-min" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-max" />
          </div>
          <span className="truncate text-sm text-muted">
            {user}@portfolio ~
          </span>
        </div>

        <div className="grid gap-10 px-6 pt-12 pb-8 sm:px-10 md:grid-cols-[1fr_auto] md:gap-0 md:py-14 lg:px-16">
          {/* Left: logo and checklist */}
          <div className="min-w-0 md:pr-12 lg:pr-16">
            <p className="flex items-center gap-2 text-sm text-text sm:text-base">
              <span className="text-online">→</span>
              {boot.prompt}
            </p>
            <pre
              role="img"
              aria-label={site.brand}
              className="mt-8 overflow-hidden text-[3.3vw] leading-tight font-semibold text-accent sm:text-sm md:mt-6 lg:text-base xl:text-lg"
            >
              {LOGO}
            </pre>
            <p className="mt-6 text-base text-muted sm:text-xl lg:text-2xl">
              {boot.tagline}
            </p>
            <ul className="mt-6 space-y-2 text-[13px] sm:text-base lg:text-lg">
              {boot.steps.map((step, i) => {
                const done = progress >= ((i + 1) * 90) / boot.steps.length;
                return (
                  <li key={step} className="flex gap-3">
                    <span
                      className={`whitespace-pre ${done ? "text-online" : "text-muted"}`}
                    >
                      [{done ? "✓" : " "}]
                    </span>
                    <span className={done ? "text-text" : "text-muted"}>
                      {step}
                    </span>
                  </li>
                );
              })}
              {complete && (
                <li className="flex gap-3 text-online">
                  <span>[✓]</span>
                  {boot.done}
                </li>
              )}
            </ul>
          </div>

          {/* Right: illustration and progress */}
          <div className="flex flex-col items-stretch justify-center md:items-center md:border-l md:border-border md:pl-12 lg:pl-16">
            <Illustration />
            <div
              className="mt-8 flex w-full gap-1 md:w-auto md:gap-1.5"
              aria-hidden
            >
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span
                  key={i}
                  className={`h-4 flex-1 md:h-5 md:w-5 md:flex-none ${
                    i < filled ? "bg-accent" : "border border-accent/40"
                  }`}
                />
              ))}
            </div>
            <p role="status" className="mt-4 text-sm text-accent sm:text-base">
              {complete ? "Ready!" : "Loading..."} {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
