import { publicRoutes, siteDescription } from "@/lib/metadata";

export type SearchIndexEntry = {
  title: string;
  href: string;
  type: "page" | "blog" | "project";
  description: string;
  keywords: string[];
};

const pageDescriptions: Record<string, string> = {
  "/": "Fast mobile roadside assistance that comes directly to your location for vehicle emergencies.",
  "/home-2": "Emergency roadside help landing page for stranded drivers who need quick response.",
  "/about": "Learn about RoadRescue Pro, your trusted roadside assistance partner for safe driver support.",
  "/services": "Browse roadside assistance services including flat tire assistance, battery jump starts, fuel delivery, lockouts, towing, and minor roadside repairs.",
  "/services/details": "Detailed information about mobile roadside response, dispatch, arrival, and emergency vehicle support.",
  "/projects": "Explore roadside assistance experiences, highway breakdown assistance, battery rescue, emergency towing, and vehicle recovery stories.",
  "/projects/details": "Detailed roadside response case information for helping stranded drivers get safely moving again.",
  "/blog": "Roadside assistance blog with breakdown safety tips, flat tire guidance, battery advice, and long-trip road safety.",
  "/blog/details": "Detailed roadside safety article for drivers facing vehicle emergencies away from home.",
  "/team": "Meet the professional roadside technicians, dispatchers, tow drivers, and emergency response staff.",
  "/team/details": "Detailed profile for a RoadRescue Pro roadside assistance team member.",
  "/contact": "Request immediate roadside assistance with your phone number, location, and emergency message.",
};

const staticBlogEntries: SearchIndexEntry[] = [
  {
    title: "What To Do When Your Car Breaks Down On The Highway",
    href: "/blog/details",
    type: "blog",
    description: "Safety steps for staying visible, calling roadside assistance, and waiting for help after a highway breakdown.",
    keywords: ["highway breakdown", "roadside assistance", "driver safety", "emergency help"],
  },
  {
    title: "How To Handle A Flat Tire Emergency",
    href: "/blog/details",
    type: "blog",
    description: "How to stay safe during a flat tire emergency and when to request mobile tire assistance.",
    keywords: ["flat tire", "tire assistance", "roadside", "emergency"],
  },
  {
    title: "Why Every Driver Needs Roadside Assistance",
    href: "/blog/details",
    type: "blog",
    description: "Why 24/7 roadside help protects drivers from dead batteries, lockouts, no fuel, and towing emergencies.",
    keywords: ["24/7 roadside help", "battery jump start", "fuel delivery", "lockout", "towing"],
  },
];

const staticProjectEntries: SearchIndexEntry[] = [
  {
    title: "Highway Breakdown Assistance",
    href: "/projects/details",
    type: "project",
    description: "Roadside response case helping a stranded driver safely during a highway vehicle breakdown.",
    keywords: ["highway", "breakdown", "roadside assistance", "mobile response"],
  },
  {
    title: "Battery Rescue",
    href: "/projects/details",
    type: "project",
    description: "Battery jump-start assistance delivered to a driver location for a dead battery emergency.",
    keywords: ["battery jump start", "dead battery", "roadside rescue"],
  },
  {
    title: "Emergency Towing",
    href: "/projects/details",
    type: "project",
    description: "Safe towing support when a vehicle could not continue after roadside assessment.",
    keywords: ["emergency towing", "vehicle recovery", "tow truck"],
  },
];

export const searchIndex: SearchIndexEntry[] = [
  ...publicRoutes.map<SearchIndexEntry>((route) => ({
    title: route.title.replace(" - Roadside Assistance Services", ""),
    href: route.path,
    type: route.path.startsWith("/blog") ? "blog" : route.path.startsWith("/projects") ? "project" : "page",
    description: pageDescriptions[route.path] || siteDescription,
    keywords: route.title.toLowerCase().split(/\W+/).filter(Boolean),
  })),
  ...staticBlogEntries,
  ...staticProjectEntries,
];

export function searchStaticContent(query: string): SearchIndexEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return searchIndex.filter((entry) => {
    const haystack = [entry.title, entry.description, entry.href, entry.type, ...entry.keywords].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
