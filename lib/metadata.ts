import type { Metadata } from "next";

export const siteName = "Automec";
export const siteDescription = "Automec - Car Service & Repair HTML5 Template";
export const siteKeywords = [
  "auto care",
  "auto center",
  "auto repair",
  "auto service",
  "auto shop",
  "automotive",
  "car mechanic",
  "car repair",
  "car service",
  "car shop",
  "garage",
  "mechanic",
  "mechanic auto shop",
  "mechanic workshop",
];

export type PublicRoute = {
  path: string;
  title: string;
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const publicRoutes: PublicRoute[] = [
  { path: "/", title: "Home - Car Service & Repair HTML5 Template" },
  { path: "/home-2", title: "Home-2 - Car Service & Repair HTML5 Template" },
  { path: "/about", title: "About Us - Car Service & Repair HTML5 Template" },
  { path: "/services", title: "Services - Car Service & Repair HTML5 Template" },
  { path: "/services/details", title: "Service Details - Car Service & Repair HTML5 Template" },
  { path: "/projects", title: "Projects - Car Service & Repair HTML5 Template" },
  { path: "/projects/details", title: "Project Details - Car Service & Repair HTML5 Template" },
  { path: "/blog", title: "Blog - Car Service & Repair HTML5 Template" },
  { path: "/blog/details", title: "Blog Details - Car Service & Repair HTML5 Template" },
  { path: "/team", title: "Team Member - Car Service & Repair HTML5 Template" },
  { path: "/team/details", title: "Team Details - Car Service & Repair HTML5 Template" },
  { path: "/contact", title: "Contact Us - Car Service & Repair HTML5 Template" },
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({ path, title }: PublicRoute): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description: siteDescription,
    keywords: siteKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description: siteDescription,
      siteName,
      images: [
        {
          url: absoluteUrl("/images/logo/logo.png"),
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteDescription,
      images: [absoluteUrl("/images/logo/logo.png")],
    },
  };
}
