import type { MetadataRoute } from "next";
import { templates } from "@/lib/pdf/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://logopedia-eosin.vercel.app";
  const now = new Date();
  const slugs = Object.keys(templates);
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/kreator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pobierz`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...slugs.map((slug) => ({
      url: `${base}/podglad/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...slugs.map((slug) => ({
      url: `${base}/api/pdf/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
