import Link from "next/link";
import { site } from "@/content/about";
import { files } from "./files";

// macOS-style traffic lights for window title bars.
export function WindowDots() {
  return (
    <div className="flex gap-2" aria-hidden>
      <span className="h-3.5 w-3.5 rounded-full bg-light-close" />
      <span className="h-3.5 w-3.5 rounded-full bg-light-min" />
      <span className="h-3.5 w-3.5 rounded-full bg-light-max" />
    </div>
  );
}

const brandSizes = {
  lg: {
    title: "text-5xl lg:text-6xl",
    link: "focus-visible:outline-offset-4",
    status: "mt-4 gap-2.5 text-base lg:text-lg",
    dot: "h-2.5 w-2.5",
  },
  sm: {
    title: "text-3xl",
    link: "focus-visible:outline-offset-2",
    status: "mt-1 gap-2 text-sm",
    dot: "h-2 w-2",
  },
};

// Site name (links home) plus the "available for work" badge.
export function Brand({ size }: { size: keyof typeof brandSizes }) {
  const s = brandSizes[size];
  return (
    <>
      <h1
        className={`font-sans font-medium tracking-tight text-text ${s.title}`}
      >
        <Link href={files[0].href} className={`focus-ring rounded ${s.link}`}>
          {site.brand}
        </Link>
      </h1>
      {site.available && (
        <p className={`flex items-center text-online ${s.status}`}>
          <span className={`rounded-full bg-online ${s.dot}`} aria-hidden />
          available for work
        </p>
      )}
    </>
  );
}
