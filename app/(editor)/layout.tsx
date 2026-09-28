import Link from "next/link";
import { site } from "@/content/about";
import {
  EditorTabs,
  MobileTabs,
  WindowTitle,
} from "../_components/editor-tabs";
import { Explorer } from "../_components/explorer";
import { files } from "../_components/files";
import { MobileHeader } from "../_components/mobile-header";
import { Watermark } from "../_components/watermark";

export default function EditorLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex min-h-dvh md:h-dvh md:overflow-hidden">
      <div className="flex w-full flex-col bg-window">
        <MobileHeader />

        {/* Title bar */}
        <header className="hidden items-center gap-4 border-b border-border px-8 py-3.5 md:flex">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3.5 w-3.5 rounded-full bg-light-close" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-min" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-max" />
          </div>
          <WindowTitle />
        </header>

        <div className="flex flex-1 flex-col md:min-h-0 md:flex-row">
          {/* Sidebar */}
          <aside className="hidden w-80 shrink-0 border-r border-border px-8 py-10 md:block lg:w-96 xl:w-md">
            <h1 className="font-sans text-5xl font-medium tracking-tight text-text lg:text-6xl">
              <Link
                href={files[0].href}
                className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {site.brand}
              </Link>
            </h1>
            {site.available && (
              <p className="mt-4 flex items-center gap-2.5 text-base text-online lg:text-lg">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-online"
                  aria-hidden
                />
                available for work
              </p>
            )}
            <Explorer />
          </aside>

          {/* Editor */}
          <div className="flex min-w-0 flex-1 flex-col md:min-h-0">
            <MobileTabs />
            <EditorTabs />
            <section className="relative isolate flex flex-1 flex-col px-4 py-5 sm:px-8 md:min-h-0 md:py-10 lg:px-12">
              {children}
              {/* Desktop only: signed in the terminal's bottom-right corner, behind its content. */}
              <Watermark className="absolute right-8 bottom-6 -z-10 hidden w-44 md:block lg:right-12 lg:w-52" />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
