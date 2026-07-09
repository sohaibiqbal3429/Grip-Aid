import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/home-2",
  title: "Home-2 - Car Service & Repair HTML5 Template",
});


export default function Page() {
  return <LegacyPage page="home2" />;
}
