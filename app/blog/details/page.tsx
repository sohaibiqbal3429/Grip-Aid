import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/blog/details",
  title: "Blog Details - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="blogDetails" />;
}
