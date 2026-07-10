import { HomeTwoPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/home-2"));

export default function Page() {
  return <HomeTwoPageContent />;
}
