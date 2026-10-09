import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Terminal } from "../../_components/code";
import { icons } from "../../_components/icons";
import { external, projectHref } from "../../_components/project";
import { pageMetadata } from "../../_components/seo";

export const metadata: Metadata = pageMetadata({
  title: "projects",
  description:
    "Selected work by Reence David, from e-commerce to fintech platforms.",
  path: "/projects",
});

export default function Projects() {
  const { items, sort } = projects;

  return (
    <>
      {/* Scrolls on its own on desktop, like CodeView, so the terminal stays pinned. */}
      <div className="mb-6 md:mb-10 md:min-h-0 md:flex-1 md:overflow-y-auto">
        <div className="rounded-xl border border-border p-5 text-[13px] sm:text-sm lg:p-6 lg:text-base">
          <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-text lg:text-3xl">
              Fulfilled work
            </h2>
            <p className="text-xs text-muted sm:text-sm">
              {items.length} repos · {sort}
            </p>
          </header>

          <ol className="relative">
            {/* Timeline rail behind the number badges. */}
            <span
              aria-hidden
              className="absolute top-[1.125rem] bottom-0 left-[1.125rem] w-px bg-border"
            />
            {items.map((p, i) => {
              const first = i === 0;
              const last = i === items.length - 1;
              return (
                <li key={p.slug} className="flex gap-4 sm:gap-5">
                  <div
                    className={`flex w-9 shrink-0 flex-col items-center ${first ? "" : "pt-5"}`}
                  >
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-selected text-[13px] font-medium text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!last && (
                      <span
                        aria-hidden
                        className="relative mt-8 h-1.5 w-1.5 rounded-full bg-muted/70"
                      />
                    )}
                  </div>

                  <div
                    className={`flex min-w-0 flex-1 flex-wrap gap-x-5 gap-y-3 pb-5 sm:flex-nowrap ${
                      first ? "" : "border-t border-border pt-5"
                    }`}
                  >
                    {/* Same destination as the name; mouse-only, so it's skipped by keyboard and screen readers. */}
                    <Link
                      href={projectHref(p.slug)}
                      aria-hidden
                      tabIndex={-1}
                      className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg text-2xl sm:flex lg:h-16 lg:w-16 ${
                        first
                          ? "bg-selected text-accent"
                          : "bg-border/50 text-text"
                      }`}
                    >
                      {icons[p.icon]}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-text uppercase">
                        <Link
                          href={projectHref(p.slug)}
                          className="focus-ring rounded underline-offset-4 hover:underline"
                        >
                          {p.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-muted">{p.description}</p>
                      <p className="mt-2 text-syn-literal">
                        {p.tags.join(" · ")}
                      </p>
                    </div>

                    {/* Indicator top-right, links bottom-right (one row on mobile). */}
                    <div className="flex w-full shrink-0 items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
                      {p.code ? (
                        <span />
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-muted">
                          {icons.lock} private
                        </span>
                      )}
                      <div className="flex items-center gap-4">
                        {p.live && (
                          <a href={p.live} {...external}>
                            live {icons.arrowUpRight}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <Terminal cwd="projects" command="ls">
        <p className="flex flex-wrap gap-x-[2ch] text-syn-ident">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={projectHref(p.slug)}
              className="focus-ring rounded underline-offset-4 hover:underline"
            >
              {p.name}/
            </Link>
          ))}
        </p>
      </Terminal>
    </>
  );
}
