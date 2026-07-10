import { HomePageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/"));

export default function Page() {
  return <HomePageContent />;
}
