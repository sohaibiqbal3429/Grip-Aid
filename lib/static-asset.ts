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
    return new Response("Not found", { status: 404 });
  }
}
