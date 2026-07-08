import { legacyPages, type LegacyPageKey } from "@/lib/legacy-pages";

type TemplatePartProps = {
  page: LegacyPageKey;
};

/**
 * Renders HTML produced from the original PHP template-parts includes.
 * The generated markup intentionally keeps the legacy class names and
 * section structure so the original theme CSS and JavaScript continue to
 * style the migrated App Router pages.
 */
export function TemplatePart({ page }: TemplatePartProps) {
  return <div dangerouslySetInnerHTML={{ __html: legacyPages[page] }} />;
}
