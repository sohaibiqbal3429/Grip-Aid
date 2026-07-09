import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/contact",
  title: "Contact Us - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="contact" />;
}
