import type { Metadata } from "next";
import { recommendations } from "@/content/recommendations";
import { Terminal } from "../../_components/code";
import { icons } from "../../_components/icons";
import { external } from "../../_components/project";
import { pageMetadata } from "../../_components/seo";

export const metadata: Metadata = pageMetadata({
  title: "recommendations.md",
  description:
    "What colleagues and managers say about working with Reence David.",
  path: "/recommendations",
});

// "Jane Doe" -> "JD"; at most two letters.
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Recommendations() {
  const { items } = recommendations;

  return (
    <>
      {/* Scrolls on its own on desktop, like CodeView, so the terminal stays pinned. */}
      <div className="mb-6 md:mb-10 md:min-h-0 md:flex-1 md:overflow-y-auto">
        <div className="rounded-xl border border-border p-5 text-[13px] sm:text-sm lg:p-6 lg:text-base">
          <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-text lg:text-3xl">
              Reviews
            </h2>
            <p className="text-xs text-muted sm:text-sm">
              {items.length} approvals · 0 changes requested
            </p>
          </header>

          {/* Each recommendation as an approved review on a PR timeline. */}
          <ol className="relative space-y-6">
            <span
              aria-hidden
              className="absolute top-[1.125rem] bottom-0 left-[1.125rem] w-px bg-border"
            />
            {items.map((r, i) => (
              <li key={i} className="relative flex gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-selected text-[13px] font-medium text-accent"
                >
                  {initials(r.name)}
                </span>

                <article className="min-w-0 flex-1 overflow-hidden rounded-lg border border-border">
                  <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-border bg-selected/30 px-4 py-2.5">
                    <h3 className="font-medium text-text">{r.name}</h3>
                    <span className="text-muted">
                      {r.role} @ {r.company}
                    </span>
                  </header>

                  <div className="px-4 py-3">
                    <p className="text-online">
                      ✓ approved these changes
                      <span className="text-muted"> · {r.date}</span>
                    </p>
                    <blockquote className="mt-3 space-y-3 border-l-2 border-border pl-4 text-text">
                      {r.text.split(/\n\s*\n/).map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </blockquote>
                    <footer className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-muted">
                      <span>{r.relationship}</span>
                      {r.url && (
                        <a href={r.url} {...external}>
                          view profile {icons.arrowUpRight}
                        </a>
                      )}
                    </footer>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Terminal command="gh pr reviews --state approved | wc -l">
        <p className="text-syn-number">{items.length}</p>
      </Terminal>
    </>
  );
}
