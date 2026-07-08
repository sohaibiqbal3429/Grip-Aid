import path from "node:path";

import { serveStaticAsset } from "@/lib/static-asset";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { path: assetSegments } = await context.params;

  return serveStaticAsset(path.join(process.cwd(), "fonts"), assetSegments);
}
