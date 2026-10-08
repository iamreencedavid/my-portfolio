"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { icons } from "./icons";

type Shot = NonNullable<Project["screenshots"]>[number];

// Thumbnail grid; a click opens the image full size in a modal <dialog>,
// which handles Escape and focus trapping natively.
export function Screenshots({ items }: { items: Shot[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Shot | null>(null);
  // Phone screenshots are shown whole in a denser grid; wide ones are
  // cropped to a uniform 16:9 so their captions line up.
  const portrait = items.every((s) => s.src.height > s.src.width);

  const show = (shot: Shot) => {
    setOpen(shot);
    dialog.current?.showModal();
  };

  return (
    <>
      <ul
        className={`grid gap-4 ${
          portrait
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : "sm:grid-cols-2"
        }`}
      >
        {items.map((shot) => (
          <li key={shot.caption}>
            <button
              type="button"
              onClick={() => show(shot)}
              className="focus-ring group block w-full cursor-zoom-in text-left"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                placeholder="blur"
                sizes={
                  portrait
                    ? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    : "(min-width: 640px) 50vw, 100vw"
                }
                className={`w-full rounded-lg border border-border transition-opacity group-hover:opacity-85 ${
                  portrait ? "h-auto" : "aspect-video object-cover object-top"
                }`}
              />
              <span className="mt-2 block text-muted">{shot.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={open?.caption}
        onClose={() => setOpen(null)}
        // A click on the backdrop lands on the <dialog> itself.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[92vh] max-w-[95vw] overflow-visible bg-transparent p-0 backdrop:bg-black/75"
      >
        {open && (
          <figure className="flex flex-col gap-3">
            <Image
              src={open.src}
              alt={open.alt}
              sizes="95vw"
              className="max-h-[82vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="flex items-center justify-between gap-4 text-sm text-white">
              {open.caption}
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close"
                className="focus-ring rounded-md p-1 text-xl text-white/80 hover:text-white"
              >
                {icons.close}
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
