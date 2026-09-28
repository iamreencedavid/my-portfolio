import { site } from "@/content/about";
import {
  EditorTabs,
  MobileTabs,
  WindowTitle,
} from "../_components/editor-tabs";
import { Explorer } from "../_components/explorer";
import { MobileHeader } from "../_components/mobile-header";

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
              {site.brand}
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
            <section className="flex flex-1 flex-col px-4 py-5 sm:px-8 md:min-h-0 md:py-10 lg:px-12">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
