import { ProjectDetailsPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/projects/details"));

export default function Page() {
  return <ProjectDetailsPageContent />;
}
