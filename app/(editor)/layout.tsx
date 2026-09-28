import { site } from "@/content/about";
import { EditorTabs, WindowTitle } from "../_components/editor-tabs";
import { Explorer } from "../_components/explorer";

export default function EditorLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex min-h-screen flex-1">
      <div className="flex w-full flex-col bg-window">
        {/* Title bar */}
        <header className="flex items-center gap-4 border-b border-border px-4 py-3.5 sm:px-8">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3.5 w-3.5 rounded-full bg-light-close" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-min" />
            <span className="h-3.5 w-3.5 rounded-full bg-light-max" />
          </div>
          <WindowTitle />
        </header>

        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="border-b border-border px-6 py-8 md:w-80 md:shrink-0 md:border-r md:border-b-0 md:px-8 md:py-10 lg:w-96 xl:w-md">
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
          <div className="flex min-w-0 flex-1 flex-col">
            <EditorTabs />
            <section className="flex flex-1 flex-col px-4 pt-8 pb-24 sm:px-8 md:py-10 lg:px-12">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
