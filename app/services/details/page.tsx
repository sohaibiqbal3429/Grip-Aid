import { ServiceDetailsPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/services/details"));

export default function Page() {
  return <ServiceDetailsPageContent />;
}
