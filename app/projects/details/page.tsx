import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/projects/details",
  title: "Roadside Response Details - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="projectDetails" />;
}
