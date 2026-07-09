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

const REMOTE_IMAGE_DIRECTORIES = new Set([
  "about",
  "blog",
  "blog-detail",
  "commenter",
  "instagram",
  "latest-post",
  "project",
  "section-bg",
  "service",
  "slider",
  "team-member",
  "testimonial",
]);

const IMAGE_COLLECTIONS = {
  roadside: [
    "https://images.unsplash.com/photo-1742069029240-0590b008553a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1742069029207-0aacf8fa4401?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1742069028920-c2acf52aaa9e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1780290805819-636810fd145b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1780375107678-1552b7682958?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1529369623266-f5264b696110?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1657524241529-dc4835de4049?auto=format&fit=crop&w=1600&q=80",
  ],
  repair: [
    "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1761659111095-a11e1d2ba294?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1534380640980-4de07f642bdc?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1742069029207-0aacf8fa4401?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1529369623266-f5264b696110?auto=format&fit=crop&w=1600&q=80",
  ],
  people: [
    "https://images.unsplash.com/photo-1780290805819-636810fd145b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1780375107678-1552b7682958?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534380640980-4de07f642bdc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80",
  ],
  detail: [
    "https://images.unsplash.com/photo-1761659111095-a11e1d2ba294?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1742069028920-c2acf52aaa9e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1657524241529-dc4835de4049?auto=format&fit=crop&w=900&q=80",
  ],
  background: [
    "https://images.unsplash.com/photo-1742069029240-0590b008553a?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1742069029207-0aacf8fa4401?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1742069028920-c2acf52aaa9e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1529369623266-f5264b696110?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1657524241529-dc4835de4049?auto=format&fit=crop&w=1920&q=80",
  ],
} as const;

const DIRECTORY_IMAGE_POOLS: Record<string, readonly string[]> = {
  about: [...IMAGE_COLLECTIONS.repair, ...IMAGE_COLLECTIONS.roadside],
  blog: [...IMAGE_COLLECTIONS.roadside, ...IMAGE_COLLECTIONS.people],
  "blog-detail": [...IMAGE_COLLECTIONS.roadside, ...IMAGE_COLLECTIONS.repair],
  commenter: IMAGE_COLLECTIONS.people,
  instagram: IMAGE_COLLECTIONS.roadside,
  "latest-post": [...IMAGE_COLLECTIONS.roadside, ...IMAGE_COLLECTIONS.repair],
  project: IMAGE_COLLECTIONS.roadside,
  "section-bg": IMAGE_COLLECTIONS.background,
  service: IMAGE_COLLECTIONS.repair,
  slider: [...IMAGE_COLLECTIONS.background, ...IMAGE_COLLECTIONS.roadside],
  "team-member": [...IMAGE_COLLECTIONS.people, ...IMAGE_COLLECTIONS.repair],
  testimonial: [...IMAGE_COLLECTIONS.people, ...IMAGE_COLLECTIONS.roadside],
};

const PATH_IMAGE_OVERRIDES: Array<{ pattern: RegExp; images: readonly string[] }> = [
  { pattern: /^slider\/feature-icon-\d+\.png$/, images: IMAGE_COLLECTIONS.detail },
  { pattern: /^slider\/slider-feature-one\.png$/, images: IMAGE_COLLECTIONS.roadside },
  { pattern: /^slider\/slider-two-feature-image-(one|two)\.jpg$/, images: IMAGE_COLLECTIONS.roadside },
  { pattern: /^slider\/slider-two-shape\.png$/, images: IMAGE_COLLECTIONS.detail },
  { pattern: /^section-bg\/.+\.(png|jpg)$/, images: IMAGE_COLLECTIONS.background },
  { pattern: /^blog\/avatar\.jpg$/, images: IMAGE_COLLECTIONS.people },
  { pattern: /^commenter\/.+\.jpg$/, images: IMAGE_COLLECTIONS.people },
  { pattern: /^team-member\/.+\.jpg$/, images: IMAGE_COLLECTIONS.people },
  { pattern: /^testimonial\/.+\.jpg$/, images: IMAGE_COLLECTIONS.people },
];

function getStableImageIndex(segments: string[]) {
  return segments.join("/").split("").reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getRemoteImageCandidates(segments: string[]) {
  const [directory] = segments;
  const imagePath = segments.join("/");

  if (!directory || !REMOTE_IMAGE_DIRECTORIES.has(directory)) {
    return null;
  }

  for (const override of PATH_IMAGE_OVERRIDES) {
    if (override.pattern.test(imagePath)) {
      return override.images;
    }
  }

  return DIRECTORY_IMAGE_POOLS[directory] ?? IMAGE_COLLECTIONS.roadside;
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

export async function serveStaticAsset(
  baseDir: string,
  segments: string[],
): Promise<Response> {
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
