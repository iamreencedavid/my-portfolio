// Shared by the projects page, the project pages and the file registry.
export const projectHref = (slug: string) => `/projects/${slug}`;

// Props for an external link that opens in a new tab (e.g. "live ↗").
export const external = {
  target: "_blank",
  rel: "noopener noreferrer",
  className:
    "focus-ring inline-flex items-center gap-1 text-accent underline-offset-4 hover:underline",
};

// Rounded pill link, as in the phone navbar (MobileTabs).
export const pill =
  "focus-ring shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors";
export const pillIdle = "border-border text-text hover:bg-selected/50";
export const pillActive = "border-accent/40 bg-selected text-accent";
