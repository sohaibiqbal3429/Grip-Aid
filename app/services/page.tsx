import { ServicesPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/services"));

export default function Page() {
  return <ServicesPageContent />;
}
