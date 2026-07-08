import type { NextConfig } from "next";

const legacyRedirects = [
  ["/index.php", "/"],
  ["/index-2.php", "/home-2"],
  ["/about.php", "/about"],
  ["/services.php", "/services"],
  ["/service-details.php", "/services/details"],
  ["/projects.php", "/projects"],
  ["/project-details.php", "/projects/details"],
  ["/blog.php", "/blog"],
  ["/blog-details.php", "/blog/details"],
  ["/team-member.php", "/team"],
  ["/team-details.php", "/team/details"],
  ["/contact.php", "/contact"],
  ["/404.php", "/404"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      // Keep redirects temporary until production URL parity is confirmed.
      permanent: false,
    }));
  },
};

export default nextConfig;
