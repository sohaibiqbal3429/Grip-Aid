import type { MetadataRoute } from "next";

import { absoluteUrl, publicRoutes } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route.path === "/" ? 1 : 0.8,
  }));
}
