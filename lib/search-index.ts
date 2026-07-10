import {
  blogArticles,
  coverageScenarios,
  publicRoutes,
  services,
  siteTagline,
} from "@/lib/roadside-content";

export type SearchIndexEntry = {
  title: string;
  href: string;
  type: "page" | "blog" | "project" | "service";
  description: string;
  keywords: string[];
};

const pageEntries: SearchIndexEntry[] = publicRoutes.map((route) => ({
  title: route.title.replace(" | GripAid", ""),
  href: route.path,
  type: "page",
  description: route.description,
  keywords: route.title.toLowerCase().split(/\W+/).filter(Boolean),
}));

const serviceEntries: SearchIndexEntry[] = services.map((service) => ({
  title: service.title,
  href: `/services/details#${service.id}`,
  type: "service",
  description: service.detail,
  keywords: [service.title, service.short, service.detail, "roadside assistance", "mobile service"]
    .join(" ")
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean),
}));

const blogEntries: SearchIndexEntry[] = blogArticles.map((article) => ({
  title: article.title,
  href: "/blog/details",
  type: "blog",
  description: article.excerpt,
  keywords: [article.category, article.readTime, article.excerpt, "roadside tips"]
    .join(" ")
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean),
}));

const coverageEntries: SearchIndexEntry[] = coverageScenarios.map((scenario) => ({
  title: scenario.title,
  href: "/projects",
  type: "project",
  description: scenario.copy,
  keywords: [scenario.title, scenario.copy, "coverage area", "dispatch"].join(" ").toLowerCase().split(/\W+/).filter(Boolean),
}));

export const searchIndex: SearchIndexEntry[] = [...pageEntries, ...serviceEntries, ...blogEntries, ...coverageEntries];

export function searchStaticContent(query: string): SearchIndexEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return searchIndex.filter((entry) => {
    const haystack = [entry.title, entry.description || siteTagline, entry.href, entry.type, ...entry.keywords]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
