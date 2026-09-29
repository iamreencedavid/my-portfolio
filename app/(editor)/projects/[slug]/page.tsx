import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Terminal } from "../../../_components/code";
import { icons } from "../../../_components/icons";
import {
  external,
  pill,
  pillIdle,
  projectHref,
} from "../../../_components/project";

// Only the projects in content/projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug}.md` };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const { items } = projects;
  const index = items.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = items[index];
  const prev = items[index - 1];
  const next = items[index + 1];

  return (
    <>
      {/* Scrolls on its own on desktop, like CodeView, so the terminal stays pinned. */}
      <div className="mb-6 md:mb-10 md:min-h-0 md:flex-1 md:overflow-y-auto">
        <article className="rounded-xl border border-border p-5 text-[13px] sm:text-sm lg:p-8 lg:text-base">
          {p.category && (
            <p className="mb-6 inline-flex gap-3 rounded-lg bg-selected px-3 py-1.5 text-text">
              <span className="text-accent">{index + 1}.</span>
              {p.category}
            </p>
          )}

          <header className="flex items-center gap-5">
            <div
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-selected text-2xl text-accent lg:h-16 lg:w-16"
            >
              {icons[p.icon]}
            </div>
            <h2 className="text-lg font-medium text-text uppercase lg:text-2xl">
              {p.name}
            </h2>
          </header>

          <p className="mt-6 text-base font-semibold text-text lg:text-lg">
            {p.description}
          </p>
          {p.summary && <p className="mt-3 text-muted">{p.summary}</p>}
          <p className="mt-5 text-syn-literal">{p.tags.join(" · ")}</p>

          {p.features && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {p.features.map((f) => (
                <li
                  key={f.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-border/40 px-3 py-1.5 text-text"
                >
                  <span className="text-accent">{icons[f.icon]}</span>
                  {f.label}
                </li>
              ))}
            </ul>
          )}

          {p.skills && (
            <section className="mt-6 border-t border-border pt-5">
              <h3 className="mb-3 text-xs tracking-wider text-muted sm:text-sm">
                SKILLS
              </h3>
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 xl:grid-cols-3">
                {p.skills.map((skill) => (
                  <li key={skill} className="flex gap-2 text-text">
                    <span className="text-syn-literal" aria-hidden>
                      -
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.live && (
            <p className="mt-6 flex justify-end">
              <a href={p.live} {...external}>
                live {icons.arrowUpRight}
              </a>
            </p>
          )}
        </article>

        {/* Previous / next project, hidden at the ends of the list. */}
        <nav aria-label="Projects" className="mt-6 flex justify-between gap-3">
          {prev ? (
            <Link
              href={projectHref(prev.slug)}
              className={`${pill} ${pillIdle} inline-flex items-center gap-2`}
            >
              {icons.arrowLeft}
              <span className="sr-only">Previous project:</span>
              {prev.slug}.md
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={projectHref(next.slug)}
              className={`${pill} ${pillIdle} inline-flex items-center gap-2`}
            >
              <span className="sr-only">Next project:</span>
              {next.slug}.md
              {icons.arrowRight}
            </Link>
          )}
        </nav>
      </div>

      <Terminal cwd="projects" command={`cat ${p.slug}.md`} />
    </>
  );
}
