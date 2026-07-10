import { TeamPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/team"));

export default function Page() {
  return <TeamPageContent />;
}
