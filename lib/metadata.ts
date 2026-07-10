import type { Metadata } from "next";

import {
  getRoute,
  imageLibrary,
  publicRoutes,
  siteKeywords,
  siteName,
  siteTagline,
  type PublicRoute,
} from "@/lib/roadside-content";

export { publicRoutes, siteKeywords, siteName };

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
export const siteDescription = siteTagline;
export const defaultOgImage = imageLibrary.heroPrimary;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

export function getPublicRoute(path: string): PublicRoute {
  return (
    getRoute(path) ?? {
      path,
      title: siteName,
      description: siteDescription,
    }
  );
}

export function createPageMetadata(route: PublicRoute): Metadata {
  const url = absoluteUrl(route.path);

  return {
    title: route.title,
    description: route.description,
    keywords: siteKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: route.title,
      description: route.description,
      siteName,
      images: [
        {
          url: defaultOgImage,
          alt: "Roadside assistance vehicle responding to a call",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [defaultOgImage],
    },
  };
}
