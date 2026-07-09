import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/services",
  title: "Services - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="services" />;
}
