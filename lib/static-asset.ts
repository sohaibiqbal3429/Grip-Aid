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

const REAL_IMAGE_SOURCES = [
  "Auto_Repair_shop.jpg",
  "Car_repair_shop.jpg",
  "Car_Repair_1.jpg",
  "Auto_Mechanic.jpg",
  "Car_repair.jpg",
  "Mechanic_repairing_car_engine.jpg",
  "Car_mechanic_worker_repairing_suspension_of_lifted_automobile_at_auto_repair_garage_shop.jpg",
  "Car_lift_in_an_auto_repair_shop_with_vehicles_and_tools_present.jpg",
  "South_Park,_Seattle_-_Warner's_Auto_Repair.jpg",
  "Cars_in_a_local_mechanic_workshop_in_Nigeria.jpg",
];

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

function getStableImageIndex(segments: string[]) {
  return segments.join("/").split("").reduce((total, character) => total + character.charCodeAt(0), 0) % REAL_IMAGE_SOURCES.length;
}

function getRemoteImageUrl(segments: string[]) {
  const [directory] = segments;

  if (!directory || !REMOTE_IMAGE_DIRECTORIES.has(directory)) {
    return null;
  }

  const source = REAL_IMAGE_SOURCES[getStableImageIndex(segments)];
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(source)}`;
}

function isPathInsideBaseDir(candidatePath: string, baseDir: string) {
  const relativePath = path.relative(baseDir, candidatePath);

  return relativePath !== ".." && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
}

export async function serveStaticAsset(
  baseDir: string,
  segments: string[],
): Promise<Response> {
  const remoteImageUrl = getRemoteImageUrl(segments);

  if (remoteImageUrl) {
    return Response.redirect(remoteImageUrl, 302);
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
