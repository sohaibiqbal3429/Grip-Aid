import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/404",
  title: "404 - Car Service & Repair HTML5 Template",
});


export default function Page() {
  return <LegacyPage page="notFound" />;
}
