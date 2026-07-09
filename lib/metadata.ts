import type { Metadata } from "next";

export const siteName = "RoadRescue Pro";
export const siteDescription =
  "RoadRescue Pro provides fast mobile roadside assistance, emergency towing, flat tire help, battery jump starts, fuel delivery, vehicle lockout service, and 24/7 roadside help at your location.";
export const siteKeywords = [
  "Roadside Assistance",
  "Emergency Roadside Assistance",
  "Mobile Roadside Assistance",
  "Flat Tire Assistance",
  "Battery Jump Start",
  "Fuel Delivery Service",
  "Vehicle Lockout Service",
  "Emergency Towing",
  "24/7 Roadside Help",
  "roadside help near me",
];

export type PublicRoute = {
  path: string;
  title: string;
};

function normalizeSiteUrl(value?: string): string | null {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function resolveSiteUrl(): string {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}

export const siteUrl = resolveSiteUrl();

export const publicRoutes: PublicRoute[] = [
  { path: "/", title: "Home - Roadside Assistance Services" },
  { path: "/home-2", title: "Emergency Help - Roadside Assistance Services" },
  { path: "/about", title: "About Us - Roadside Assistance Services" },
  { path: "/services", title: "Services - Roadside Assistance Services" },
  { path: "/services/details", title: "Roadside Service Details - Roadside Assistance Services" },
  { path: "/projects", title: "Roadside Assistance Cases - Roadside Assistance Services" },
  { path: "/projects/details", title: "Roadside Response Details - Roadside Assistance Services" },
  { path: "/blog", title: "Blog - Roadside Assistance Services" },
  { path: "/blog/details", title: "Blog Details - Roadside Assistance Services" },
  { path: "/team", title: "Roadside Assistance Team - Roadside Assistance Services" },
  { path: "/team/details", title: "Team Details - Roadside Assistance Services" },
  { path: "/contact", title: "Contact Us - Roadside Assistance Services" },
  { path: "/search", title: "Search - Roadside Assistance Services" },
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
