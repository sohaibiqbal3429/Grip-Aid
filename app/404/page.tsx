import { NotFoundPageContent } from "@/components/roadside/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/404",
  title: "Page Not Found | GripAid",
  description: "The requested GripAid page could not be found. Browse roadside services or contact dispatch for help.",
});

export default function Page() {
  return <NotFoundPageContent />;
}
