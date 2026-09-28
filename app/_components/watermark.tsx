import type { CSSProperties } from "react";

// The signature PNG is used as a mask, so its strokes take the theme's text
// color (faded) in both light and dark. Purely decorative.
const mask = "url(/signature.png) left bottom / contain no-repeat";
const style: CSSProperties = { mask, WebkitMask: mask };

export function Watermark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      style={style}
      className={`pointer-events-none aspect-441/184 bg-text/15 select-none ${className}`}
    />
  );
}
