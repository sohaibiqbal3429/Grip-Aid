import { AboutPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/about"));

export default function Page() {
  return <AboutPageContent />;
}
