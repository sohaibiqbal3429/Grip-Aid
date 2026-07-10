import { BlogPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/blog"));

export default function Page() {
  return <BlogPageContent />;
}
