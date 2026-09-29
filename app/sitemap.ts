import type { MetadataRoute } from "next";
import { site } from "@/content/about";
import { files } from "./_components/files";

// Every page in the file registry: the main files plus each project page.
export default function sitemap(): MetadataRoute.Sitemap {
  return files.map((f) => ({
    url: `${site.url}${f.href === "/" ? "" : f.href}`,
    changeFrequency: "monthly",
    priority: f.href === "/" ? 1 : f.project ? 0.6 : 0.8,
  }));
}
