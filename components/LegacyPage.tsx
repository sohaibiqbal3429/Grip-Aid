import { type LegacyPageKey } from "@/lib/legacy-pages";
import { TemplatePart } from "@/components/legacy/TemplatePart";

type LegacyPageProps = {
  page: LegacyPageKey;
};

export default function LegacyPage({ page }: LegacyPageProps) {
  return <TemplatePart page={page} />;
}
