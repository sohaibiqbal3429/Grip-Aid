import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NewsletterFormEnhancer } from "@/components/forms/NewsletterFormEnhancer";
import { SiteChrome } from "@/components/roadside/site";
import { defaultOgImage, siteDescription, siteKeywords, siteName, siteUrl } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "24/7 Roadside Assistance | GripAid",
    template: "%s",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
  icons: {
    icon: [{ url: "/gripaid-logo.png", type: "image/png" }],
    apple: [{ url: "/gripaid-logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName,
    title: "24/7 Roadside Assistance | GripAid",
    description: siteDescription,
    url: siteUrl,
    images: [{ url: defaultOgImage, alt: "Roadside assistance vehicle responding to a stranded driver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Roadside Assistance | GripAid",
    description: siteDescription,
    images: [defaultOgImage],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/vendor/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/vendor/css/fontawesome.min.css" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <NewsletterFormEnhancer />
      </body>
    </html>
  );
}
