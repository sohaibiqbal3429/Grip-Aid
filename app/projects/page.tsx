import { ProjectsPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/projects"));

export default function Page() {
  return <ProjectsPageContent />;
}
