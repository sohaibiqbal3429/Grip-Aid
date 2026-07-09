import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/team",
  title: "Roadside Assistance Team - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="team" />;
}
