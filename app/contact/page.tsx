import { ContactPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/contact"));

export default function Page() {
  return <ContactPageContent />;
}
