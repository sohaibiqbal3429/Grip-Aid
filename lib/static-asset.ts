import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_TYPES = new Map<string, string>([
  [".avif", "image/avif"],
  [".eot", "application/vnd.ms-fontobject"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".otf", "font/otf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".ttf", "font/ttf"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const RASTER_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const PEXELS = {
  advisorThumbsUp:
    "https://images.pexels.com/photos/6870320/pexels-photo-6870320.jpeg?auto=compress&cs=tinysrgb&w=1200",
  advisorWriting:
    "https://images.pexels.com/photos/6870324/pexels-photo-6870324.jpeg?auto=compress&cs=tinysrgb&w=1200",
  engineInspect:
    "https://images.pexels.com/photos/8478259/pexels-photo-8478259.jpeg?auto=compress&cs=tinysrgb&w=1600",
  engineService:
    "https://images.pexels.com/photos/8986132/pexels-photo-8986132.jpeg?auto=compress&cs=tinysrgb&w=1600",
  interiorDetail:
    "https://images.pexels.com/photos/17029940/pexels-photo-17029940.jpeg?auto=compress&cs=tinysrgb&w=1600",
  liftWide:
    "https://images.pexels.com/photos/8985667/pexels-photo-8985667.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mechanicPortrait:
    "https://images.pexels.com/photos/7807035/pexels-photo-7807035.jpeg?auto=compress&cs=tinysrgb&w=900",
  mechanicPortraitTwo:
    "https://images.pexels.com/photos/8985967/pexels-photo-8985967.jpeg?auto=compress&cs=tinysrgb&w=900",
  pressureWash:
    "https://images.pexels.com/photos/4892130/pexels-photo-4892130.jpeg?auto=compress&cs=tinysrgb&w=1600",
  spongeClean:
    "https://images.pexels.com/photos/6003/man-hand-car-black.jpg?auto=compress&cs=tinysrgb&w=1200",
  tirePressure:
    "https://images.pexels.com/photos/3807449/pexels-photo-3807449.jpeg?auto=compress&cs=tinysrgb&w=900",
  tireReplace:
    "https://images.pexels.com/photos/6870316/pexels-photo-6870316.jpeg?auto=compress&cs=tinysrgb&w=900",
  underCar:
    "https://images.pexels.com/photos/8986105/pexels-photo-8986105.jpeg?auto=compress&cs=tinysrgb&w=900",
  workshopTeam:
    "https://images.pexels.com/photos/4489776/pexels-photo-4489776.jpeg?auto=compress&cs=tinysrgb&w=1600",
} as const;

const REMOTE_IMAGE_FALLBACKS: Record<string, readonly string[]> = {
  about: [PEXELS.workshopTeam, PEXELS.engineService, PEXELS.liftWide],
  blog: [PEXELS.engineInspect, PEXELS.advisorWriting, PEXELS.pressureWash],
  "blog-detail": [PEXELS.advisorWriting, PEXELS.tireReplace, PEXELS.interiorDetail],
  commenter: [PEXELS.mechanicPortrait, PEXELS.advisorThumbsUp, PEXELS.mechanicPortraitTwo],
  instagram: [PEXELS.engineInspect, PEXELS.tireReplace, PEXELS.interiorDetail, PEXELS.spongeClean, PEXELS.pressureWash],
  "latest-post": [PEXELS.engineInspect, PEXELS.interiorDetail, PEXELS.advisorWriting],
  project: [PEXELS.tireReplace, PEXELS.underCar, PEXELS.interiorDetail, PEXELS.spongeClean],
  "section-bg": [PEXELS.workshopTeam, PEXELS.liftWide, PEXELS.advisorWriting],
  service: [PEXELS.engineInspect, PEXELS.underCar, PEXELS.workshopTeam, PEXELS.advisorThumbsUp],
  slider: [PEXELS.engineInspect, PEXELS.engineService, PEXELS.liftWide],
  "team-member": [PEXELS.mechanicPortrait, PEXELS.advisorThumbsUp, PEXELS.mechanicPortraitTwo, PEXELS.tireReplace],
  testimonial: [PEXELS.mechanicPortrait, PEXELS.advisorThumbsUp, PEXELS.mechanicPortraitTwo],
};

const REMOTE_IMAGE_EXACT_MATCHES: Record<string, readonly string[]> = {
  "about/about-1.jpg": [PEXELS.workshopTeam],
  "about/about-2.jpg": [PEXELS.engineService],
  "blog/avatar.jpg": [PEXELS.mechanicPortrait],
  "blog/b1.jpg": [PEXELS.engineInspect],
  "blog/b2.jpg": [PEXELS.liftWide],
  "blog/b3.jpg": [PEXELS.pressureWash],
  "blog/r1.jpg": [PEXELS.engineService],
  "blog/r2.jpg": [PEXELS.advisorWriting],
  "blog/rp-1.jpg": [PEXELS.engineInspect],
  "blog/rp-2.jpg": [PEXELS.workshopTeam],
  "blog/rp-3.jpg": [PEXELS.interiorDetail],
  "blog-detail/b-details-feature.jpg": [PEXELS.advisorWriting],
  "blog-detail/b-gallery-one.jpg": [PEXELS.tireReplace],
  "blog-detail/b-gallery-two.jpg": [PEXELS.interiorDetail],
  "commenter/commenter-1.jpg": [PEXELS.mechanicPortrait],
  "commenter/commenter-2.jpg": [PEXELS.advisorThumbsUp],
  "commenter/commenter-3.jpg": [PEXELS.mechanicPortraitTwo],
  "commenter/commenter-author.jpg": [PEXELS.mechanicPortrait],
  "instagram/instagram-1.jpg": [PEXELS.engineInspect],
  "instagram/instagram-2.jpg": [PEXELS.tireReplace],
  "instagram/instagram-3.jpg": [PEXELS.interiorDetail],
  "instagram/instagram-4.jpg": [PEXELS.spongeClean],
  "instagram/instagram-5.jpg": [PEXELS.pressureWash],
  "instagram/instagram-6.jpg": [PEXELS.workshopTeam],
  "latest-post/l1.jpg": [PEXELS.engineInspect],
  "latest-post/l2.jpg": [PEXELS.interiorDetail],
  "latest-post/l3.jpg": [PEXELS.engineService],
  "latest-post/v-2/l1.jpg": [PEXELS.liftWide],
  "latest-post/v-2/l2.jpg": [PEXELS.advisorWriting],
  "project/p1.jpg": [PEXELS.tireReplace],
  "project/p2.jpg": [PEXELS.tirePressure],
  "project/p3.jpg": [PEXELS.underCar],
  "project/p4.jpg": [PEXELS.interiorDetail],
  "project/p5.jpg": [PEXELS.interiorDetail],
  "project/p6.jpg": [PEXELS.spongeClean],
  "project/project-details.jpg": [PEXELS.liftWide],
  "section-bg/about-bg.png": [PEXELS.liftWide],
  "section-bg/about-sec-bg.jpg": [PEXELS.workshopTeam],
  "section-bg/appointment-bg.jpg": [PEXELS.liftWide],
  "section-bg/appointment-two-bg.jpg": [PEXELS.advisorWriting],
  "section-bg/footer-bg-one.jpg": [PEXELS.workshopTeam],
  "section-bg/footer-bg-two.jpg": [PEXELS.liftWide],
  "section-bg/page-header.jpg": [PEXELS.engineService],
  "section-bg/subscribe-bg.png": [PEXELS.advisorThumbsUp],
  "section-bg/testimonial-image.jpg": [PEXELS.advisorWriting],
  "section-bg/testimonial-image-two.jpg": [PEXELS.mechanicPortraitTwo],
  "service/gallery-one.jpg": [PEXELS.engineService],
  "service/gallery-two.jpg": [PEXELS.tireReplace],
  "service/service-1.jpg": [PEXELS.engineInspect],
  "service/service-2.jpg": [PEXELS.underCar],
  "service/service-3.jpg": [PEXELS.engineService],
  "service/service-4.jpg": [PEXELS.workshopTeam],
  "service/service-5.jpg": [PEXELS.mechanicPortrait],
  "service/service-6.jpg": [PEXELS.advisorThumbsUp],
  "service/service-details.jpg": [PEXELS.liftWide],
  "service/v-2/service-1.jpg": [PEXELS.advisorWriting],
  "service/v-2/service-2.jpg": [PEXELS.mechanicPortrait],
  "service/v-2/service-3.jpg": [PEXELS.workshopTeam],
  "service/v-2/service-4.jpg": [PEXELS.advisorThumbsUp],
  "slider/slider-1.jpg": [PEXELS.engineInspect],
  "slider/slider-feature-one.png": [PEXELS.engineService],
  "slider/slider-two-feature-image-one.jpg": [PEXELS.advisorWriting],
  "slider/slider-two-feature-image-two.jpg": [PEXELS.mechanicPortrait],
  "slider/slider-two-shape.png": [PEXELS.liftWide],
  "team-member/team-1.jpg": [PEXELS.mechanicPortrait],
  "team-member/team-2.jpg": [PEXELS.advisorThumbsUp],
  "team-member/team-3.jpg": [PEXELS.mechanicPortraitTwo],
  "team-member/team-4.jpg": [PEXELS.tireReplace],
  "team-member/team-5.jpg": [PEXELS.advisorWriting],
  "team-member/team-6.jpg": [PEXELS.underCar],
  "team-member/team-details.jpg": [PEXELS.mechanicPortrait],
  "testimonial/v-2/t-1.jpg": [PEXELS.mechanicPortrait],
  "testimonial/v-2/t-2.jpg": [PEXELS.advisorThumbsUp],
  "testimonial/v-2/t-3.jpg": [PEXELS.mechanicPortraitTwo],
  "testimonial/v-2/t-4.jpg": [PEXELS.tireReplace],
  "testimonial/v-2/t-5.jpg": [PEXELS.advisorWriting],
  "testimonial/v-2/t-6.jpg": [PEXELS.mechanicPortrait],
};

const BRAND_LOGO_DATA: Record<string, { accent: string; label: string; theme: "dark" | "light" }> = {
  "brand-logo/client-1.png": { accent: "#f97316", label: "Apex Auto", theme: "light" },
  "brand-logo/client-2.png": { accent: "#38bdf8", label: "Torque Hub", theme: "light" },
  "brand-logo/client-3.png": { accent: "#facc15", label: "Drive Line", theme: "light" },
  "brand-logo/client-4.png": { accent: "#fb7185", label: "RoadCraft", theme: "light" },
  "brand-logo/client-5.png": { accent: "#4ade80", label: "Motor Works", theme: "light" },
  "brand-logo/v-2/client-1.png": { accent: "#ef4444", label: "FleetOne", theme: "dark" },
  "brand-logo/v-2/client-2.png": { accent: "#0f172a", label: "UrbanShift", theme: "dark" },
  "brand-logo/v-2/client-3.png": { accent: "#2563eb", label: "Summit Garage", theme: "dark" },
  "brand-logo/v-2/client-4.png": { accent: "#16a34a", label: "Ignite Service", theme: "dark" },
  "brand-logo/v-2/client-5.png": { accent: "#c2410c", label: "Precision Tire", theme: "dark" },
};

function getStableImageIndex(segments: string[]) {
  return segments.join("/").split("").reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getRemoteImageCandidates(segments: string[]) {
  const imagePath = segments.join("/");
  const exactMatch = REMOTE_IMAGE_EXACT_MATCHES[imagePath];

  if (exactMatch) {
    return exactMatch;
  }

  return REMOTE_IMAGE_FALLBACKS[segments[0] ?? ""] ?? null;
}

function isPathInsideBaseDir(candidatePath: string, baseDir: string) {
  const relativePath = path.relative(baseDir, candidatePath);

  return relativePath !== ".." && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
}

function getFallbackImageLabel(segments: string[]) {
  const imagePath = segments.join("/").toLowerCase();

  if (imagePath.includes("team-member") || imagePath.includes("testimonial") || imagePath.includes("commenter")) {
    return "Professional auto repair team";
  }

  if (imagePath.includes("blog") || imagePath.includes("latest-post")) {
    return "Car care and repair news";
  }

  if (imagePath.includes("project")) {
    return "Completed auto repair project";
  }

  if (imagePath.includes("service")) {
    return "Vehicle repair service";
  }

  if (imagePath.includes("about")) {
    return "Auto workshop and mechanics";
  }

  if (imagePath.includes("appointment")) {
    return "Garage appointment service";
  }

  if (imagePath.includes("slider")) {
    return "Master auto repair service";
  }

  return "Professional automotive service";
}

function getFallbackSvg(segments: string[]) {
  const label = getFallbackImageLabel(segments);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="garageSky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#121820"/>
      <stop offset=".55" stop-color="#28323b"/>
      <stop offset="1" stop-color="#111318"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3c4147"/>
      <stop offset="1" stop-color="#1f2227"/>
    </linearGradient>
    <linearGradient id="carPaint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#a91221"/>
      <stop offset=".45" stop-color="#e72838"/>
      <stop offset="1" stop-color="#8f101b"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#000" flood-opacity=".45"/>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#garageSky)"/>
  <path d="M0 490h1200v310H0z" fill="url(#floor)"/>
  <path d="M0 800l395-310M190 800l315-310M390 800l220-310M815 490l220 310M700 490l120 310M1000 490l200 170" stroke="#5f6870" stroke-width="3" opacity=".42"/>
  <rect x="118" y="130" width="36" height="520" fill="#d7192a"/>
  <rect x="1044" y="130" width="36" height="520" fill="#d7192a"/>
  <rect x="154" y="228" width="890" height="18" rx="9" fill="#d7192a"/>
  <ellipse cx="350" cy="94" rx="72" ry="25" fill="#ffc857" opacity=".9"/>
  <ellipse cx="600" cy="94" rx="72" ry="25" fill="#ffc857" opacity=".9"/>
  <ellipse cx="850" cy="94" rx="72" ry="25" fill="#ffc857" opacity=".9"/>
  <g filter="url(#softShadow)">
    <path d="M220 500c26-89 103-139 214-139h226c108 0 181 45 222 139l68 17c40 10 70 46 70 88v31H180v-40c0-39 26-73 63-83l-23-13z" fill="url(#carPaint)"/>
    <path d="M403 383h269c74 0 134 42 167 105H300c21-63 57-105 103-105z" fill="#dfe8ef" opacity=".96"/>
    <path d="M423 405h116v83H333c18-44 47-73 90-83zM573 405h95c52 0 96 31 123 83H573z" fill="#263744"/>
    <rect x="305" y="530" width="574" height="41" rx="20" fill="#f4f6f8" opacity=".22"/>
    <circle cx="352" cy="634" r="74" fill="#101216"/>
    <circle cx="352" cy="634" r="34" fill="#c9d0d6"/>
    <circle cx="847" cy="634" r="74" fill="#101216"/>
    <circle cx="847" cy="634" r="34" fill="#c9d0d6"/>
  </g>
  <g transform="translate(254 286)">
    <circle cx="0" cy="0" r="33" fill="#d6a06e"/>
    <path d="M-36 44c0-31 17-52 44-52 30 0 50 21 50 52v115H-36z" fill="#1d67a8"/>
    <path d="M46 46l149 82" stroke="#d6a06e" stroke-width="22" stroke-linecap="round"/>
    <path d="M-12 159l-44 118M27 159l55 118" stroke="#1b1e22" stroke-width="24" stroke-linecap="round"/>
  </g>
  <g transform="translate(808 276)">
    <circle cx="0" cy="0" r="28" fill="#d6a06e"/>
    <path d="M-30 42c0-28 17-47 41-47 25 0 42 19 42 47v104h-83z" fill="#2c3440"/>
    <path d="M-25 54l-112 83" stroke="#d6a06e" stroke-width="18" stroke-linecap="round"/>
  </g>
  <rect x="70" y="48" width="1060" height="74" rx="18" fill="#050608" opacity=".72"/>
  <text x="600" y="96" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#ffffff" letter-spacing="1.5">${label.toUpperCase()}</text>
</svg>`;
}

function getBrandLogoSvg(segments: string[]) {
  const brandData = BRAND_LOGO_DATA[segments.join("/")];

  if (!brandData) {
    return null;
  }

  const textColor = brandData.theme === "light" ? "#f8fafc" : "#0f172a";
  const mutedColor = brandData.theme === "light" ? "rgba(248,250,252,0.82)" : "rgba(15,23,42,0.68)";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 140" role="img" aria-label="${brandData.label} partner logo">
  <rect width="420" height="140" fill="none"/>
  <g transform="translate(24 26)">
    <rect x="0" y="0" width="88" height="88" rx="24" fill="${brandData.accent}" opacity=".16"/>
    <path d="M20 64l23-31 17 18 18-23 14 17-32 42-17-19-14 18z" fill="${brandData.accent}"/>
    <circle cx="72" cy="29" r="9" fill="${brandData.accent}" opacity=".88"/>
  </g>
  <text x="132" y="66" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" letter-spacing=".8">${brandData.label}</text>
  <text x="132" y="96" fill="${mutedColor}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" letter-spacing="2.4">TRUSTED AUTOMOTIVE PARTNER</text>
</svg>`;
}

export async function serveStaticAsset(
  baseDir: string,
  segments: string[],
): Promise<Response> {
  const brandLogoSvg = getBrandLogoSvg(segments);

  if (brandLogoSvg) {
    return new Response(brandLogoSvg, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Type": "image/svg+xml",
      },
    });
  }

  const remoteImageCandidates = getRemoteImageCandidates(segments);

  if (remoteImageCandidates) {
    const startIndex = getStableImageIndex(segments) % remoteImageCandidates.length;

    for (let index = 0; index < remoteImageCandidates.length; index += 1) {
      const imageUrl = remoteImageCandidates[(startIndex + index) % remoteImageCandidates.length];

      try {
        const remoteResponse = await fetch(imageUrl, {
          headers: {
            Accept: "image/*",
            "User-Agent": "Grip-Aid/1.0",
          },
          next: { revalidate: 60 * 60 * 24 },
        });

        if (!remoteResponse.ok) {
          continue;
        }

        const contentType = remoteResponse.headers.get("content-type") ?? "image/jpeg";
        const cacheControl =
          remoteResponse.headers.get("cache-control") ?? "public, max-age=86400, stale-while-revalidate=604800";

        return new Response(remoteResponse.body, {
          status: 200,
          headers: {
            "Cache-Control": cacheControl,
            "Content-Type": contentType,
          },
        });
      } catch {
        continue;
      }
    }
  }

  const assetPath = path.resolve(baseDir, ...segments);

  if (!isPathInsideBaseDir(assetPath, baseDir)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(assetPath);
    const extension = path.extname(assetPath).toLowerCase();
    const contentType = CONTENT_TYPES.get(extension) ?? "application/octet-stream";

    return new Response(file, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType,
      },
    });
  } catch {
    const extension = path.extname(assetPath).toLowerCase();

    if (RASTER_IMAGE_EXTENSIONS.has(extension)) {
      return new Response(getFallbackSvg(segments), {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
          "Content-Type": "image/svg+xml",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  }
}
