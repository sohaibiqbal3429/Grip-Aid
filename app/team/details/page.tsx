import { TeamDetailsPageContent } from "@/components/roadside/site";
import { createPageMetadata, getPublicRoute } from "@/lib/metadata";

export const metadata = createPageMetadata(getPublicRoute("/team/details"));

export default function Page() {
  return <TeamDetailsPageContent />;
}
