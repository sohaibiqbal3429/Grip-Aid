import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/blog/details",
  title: "Blog Details - Car Service & Repair HTML5 Template",
});


export default function Page() {
  return <LegacyPage page="blogDetails" />;
}
