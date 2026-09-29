import type { Metadata } from "next";
import { about, site } from "@/content/about";

// Share image (app/opengraph-image.png). Next only attaches it automatically
// on the home page, so the other pages reference it explicitly.
const image = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Reence David — Full-Stack Engineer · AI Engineer · Team Leader",
};

// Open Graph fields shared by every page. A page's `openGraph` replaces the
// root one (no deep merge), so pages spread this instead of setting their own.
const openGraph = {
  type: "profile",
  siteName: site.brand,
  locale: "en_US",
  firstName: "Reence",
  lastName: "David",
  images: [image],
} satisfies Metadata["openGraph"];

// Metadata for one page: tab title, description, canonical URL and the
// matching Open Graph / Twitter tags, including the share image.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string; // file name, e.g. "skills.json"; omitted on the home page
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} · ${site.title}` : site.title;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraph, title: fullTitle, description, url: path },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

// Person structured data for the home page (schema.org via JSON-LD).
export function personJsonLd(links: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.owner,
    url: site.url,
    jobTitle: "Full-Stack Engineer",
    description: site.description,
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    sameAs: links,
    knowsAbout: about.stack,
  };
}
