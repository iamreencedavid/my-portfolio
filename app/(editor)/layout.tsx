import { Brand, WindowDots } from "../_components/chrome";
import {
  EditorTabs,
  MobileTabs,
  WindowTitle,
} from "../_components/editor-tabs";
import { Explorer } from "../_components/explorer";
import { MobileHeader } from "../_components/mobile-header";
import { Watermark } from "../_components/watermark";

export default function EditorLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex min-h-dvh md:h-dvh md:overflow-hidden">
      <div className="flex w-full flex-col bg-window">
        <MobileHeader />

        {/* Title bar */}
        <header className="hidden items-center gap-4 border-b border-border px-8 py-3.5 md:flex">
          <WindowDots />
          <WindowTitle />
        </header>

        <div className="flex flex-1 flex-col md:min-h-0 md:flex-row">
          {/* Sidebar */}
          <aside className="hidden w-80 shrink-0 border-r border-border px-8 py-10 md:block md:overflow-y-auto lg:w-96 xl:w-md">
            <Brand size="lg" />
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
