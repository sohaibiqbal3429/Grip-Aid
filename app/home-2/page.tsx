import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/home-2",
  title: "Emergency Help - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="home2" />;
}
