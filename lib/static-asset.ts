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

function isPathInsideBaseDir(candidatePath: string, baseDir: string) {
  const relativePath = path.relative(baseDir, candidatePath);

  return relativePath !== ".." && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
}

export async function serveStaticAsset(
  baseDir: string,
  segments: string[],
): Promise<Response> {
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
