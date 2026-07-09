import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { NewsletterFormEnhancer } from "@/components/forms/NewsletterFormEnhancer";
import { siteDescription, siteKeywords, siteName, siteUrl } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Home - Roadside Assistance Services",
    template: "%s",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "RoadRescue Pro" }],
  icons: {
    icon: [{ url: "/images/logo/favicon.png", type: "image/png" }],
    apple: [
      { url: "/images/logo/apple-touch-icon.png" },
      { url: "/images/logo/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/images/logo/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/images/logo/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/images/logo/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/images/logo/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/images/logo/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/images/logo/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/images/logo/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    siteName,
    title: "Home - Roadside Assistance Services",
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - Roadside Assistance Services",
    description: siteDescription,
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
        <link rel="stylesheet" href="/vendor/css/animate.css" />
        <link rel="stylesheet" href="/vendor/css/magnific-popup.css" />
        <link rel="stylesheet" href="/vendor/css/meanmenu.css" />
        <link rel="stylesheet" href="/vendor/css/nice-select.css" />
        <link rel="stylesheet" href="/vendor/css/slick.css" />
        <link rel="stylesheet" href="/vendor/css/style.css" />
      </head>
      <body>
        {children}
        <NewsletterFormEnhancer />
        <Script src="/vendor/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/jquery.nice-select.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/slick.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/waypoints.js" strategy="afterInteractive" />
        <Script src="/vendor/js/jquery.meanmenu.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/inview.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/wow.js" strategy="afterInteractive" />
        <Script src="/vendor/js/tilt.jquery.js" strategy="afterInteractive" />
        <Script src="/vendor/js/isotope.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/jquery.imagesloaded.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/scrolltotop.min.js" strategy="afterInteractive" />
        <Script src="/vendor/js/custom.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
