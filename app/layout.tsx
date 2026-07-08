import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { NewsletterFormEnhancer } from "@/components/forms/NewsletterFormEnhancer";
import { siteDescription, siteKeywords, siteName, siteUrl } from "@/lib/metadata";
import "@/styles/vendor.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Home - Car Service & Repair HTML5 Template",
    template: "%s",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "ThemeEarth" }],
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
    title: "Home - Car Service & Repair HTML5 Template",
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - Car Service & Repair HTML5 Template",
    description: siteDescription,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
