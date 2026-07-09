import LegacyPage from "@/components/LegacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/projects",
  title: "Roadside Assistance Cases - Roadside Assistance Services",
});


export default function Page() {
  return <LegacyPage page="projects" />;
}
