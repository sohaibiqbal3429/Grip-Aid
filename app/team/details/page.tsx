import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/team/details",
  title: "Team Details - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="teamDetails" />;
}
