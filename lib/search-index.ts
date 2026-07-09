import { publicRoutes, siteDescription } from "@/lib/metadata";

export type SearchIndexEntry = {
  title: string;
  href: string;
  type: "page" | "blog" | "project";
  description: string;
  keywords: string[];
};

const pageDescriptions: Record<string, string> = {
  "/": "Automec home page for car repair, maintenance, diagnostics, and auto service information.",
  "/home-2": "Alternative Automec landing page for automotive repair and service offerings.",
  "/about": "Learn about Automec's automotive repair team, service values, and garage expertise.",
  "/services": "Browse auto repair services including diagnostics, suspension tuning, transmission service, and maintenance.",
  "/services/details": "Detailed information about Automec service process and vehicle repair solutions.",
  "/projects": "Explore automotive repair projects, service work, and garage case studies.",
  "/projects/details": "Detailed project information for vehicle repair and maintenance work.",
  "/blog": "Automotive blog with car maintenance tips, vehicle safety advice, and repair guidance.",
  "/blog/details": "Detailed automotive article covering maintenance, service, and repair advice.",
  "/team": "Meet the Automec mechanics, automotive specialists, and service team.",
  "/team/details": "Detailed profile for an Automec team member and automotive service expert.",
  "/contact": "Contact Automec for estimates, appointments, and automotive service questions.",
};

const staticBlogEntries: SearchIndexEntry[] = [
  {
    title: "10 Essential Car Maintenance Tips to Keep Your Vehicle Running Smoothly",
    href: "/blog/details",
    type: "blog",
    description: "Maintenance tips for keeping vehicles running smoothly and preventing repair issues.",
    keywords: ["maintenance", "tips", "vehicle", "smoothly", "car care"],
  },
  {
    title: "How Regular Servicing Extends the Life of Your Car",
    href: "/blog/details",
    type: "blog",
    description: "How routine service appointments protect vehicle performance and longevity.",
    keywords: ["regular servicing", "car life", "maintenance", "service"],
  },
  {
    title: "5 Warning Signs Your Car Needs Immediate Attention",
    href: "/blog/details",
    type: "blog",
    description: "Warning signs that indicate your vehicle should be inspected by a mechanic.",
    keywords: ["warning signs", "immediate attention", "repair", "mechanic"],
  },
  {
    title: "Top 7 Agency of Choosing a Professional Car Service",
    href: "/blog/details",
    type: "blog",
    description: "Guidance for choosing a professional automotive service provider.",
    keywords: ["professional", "car service", "auto repair", "garage"],
  },
];

const staticProjectEntries: SearchIndexEntry[] = [
  {
    title: "Engine Diagnostics",
    href: "/projects/details",
    type: "project",
    description: "Automotive diagnostic project focused on identifying and resolving engine issues.",
    keywords: ["engine", "diagnostics", "repair", "performance"],
  },
  {
    title: "Suspension Tuning",
    href: "/projects/details",
    type: "project",
    description: "Suspension service work to improve ride quality, handling, and vehicle safety.",
    keywords: ["suspension", "tuning", "handling", "safety"],
  },
  {
    title: "Transmission Service",
    href: "/projects/details",
    type: "project",
    description: "Transmission maintenance and repair project for reliable vehicle operation.",
    keywords: ["transmission", "service", "repair", "maintenance"],
  },
];

export const searchIndex: SearchIndexEntry[] = [
  ...publicRoutes.map<SearchIndexEntry>((route) => ({
    title: route.title.replace(" - Car Service & Repair HTML5 Template", ""),
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
