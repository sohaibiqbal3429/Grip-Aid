import { BlogDetailsPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/blog/details"));

export default function Page() {
  return <BlogDetailsPageContent />;
}
