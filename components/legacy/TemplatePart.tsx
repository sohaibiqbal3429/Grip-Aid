import { legacyPages, type LegacyPageKey } from "@/lib/legacy-pages";

type TemplatePartProps = {
  page: LegacyPageKey;
};

function getImageAltText(src: string, currentAlt: string) {
  const imagePath = src.toLowerCase();
  const genericAltText = new Set(["", "image", "photo", "page header", "footer image"]);

  if (imagePath.includes("/images/logo/") || imagePath.includes("/images/icon/") || !genericAltText.has(currentAlt.toLowerCase())) {
    return currentAlt;
  }

  if (imagePath.includes("/team-member/") || imagePath.includes("/testimonial/") || imagePath.includes("/commenter/")) {
    return "Professional auto repair team member";
  }

  if (imagePath.includes("/blog/") || imagePath.includes("/latest-post/") || imagePath.includes("/blog-detail/")) {
    return "Automotive repair and car care article";
  }

  if (imagePath.includes("/project/")) {
    return "Completed vehicle repair project in an auto workshop";
  }

  if (imagePath.includes("/service/")) {
    return "Professional vehicle repair service in a garage";
  }

  if (imagePath.includes("/about/")) {
    return "Auto workshop team providing vehicle repair service";
  }

  if (imagePath.includes("/section-bg/page-header")) {
    return "Auto repair workshop page header";
  }

  if (imagePath.includes("/section-bg/footer")) {
    return "Professional automotive service garage";
  }

  if (imagePath.includes("/section-bg/subscribe")) {
    return "Mechanic preparing a vehicle service estimate";
  }

  if (imagePath.includes("/slider/")) {
    return "Professional mechanic repairing a car engine";
  }

  return "Professional automotive repair service";
}

function addMeaningfulImageAltText(html: string) {
  return html.replace(/<img\b([^>]*?)\bsrc=(["'])([^"']+)\2([^>]*?)>/g, (match, beforeSrc, quote, src, afterSrc) => {
    const altMatch = match.match(/\balt=(["'])(.*?)\1/);

    if (!altMatch) {
      const altText = getImageAltText(src, "");
      return `<img${beforeSrc}src=${quote}${src}${quote}${afterSrc} alt="${altText}">`;
    }

    const [, altQuote, currentAlt] = altMatch;
    const altText = getImageAltText(src, currentAlt);

    if (altText === currentAlt) {
      return match;
    }

    return match.replace(/\balt=(["'])(.*?)\1/, `alt=${altQuote}${altText}${altQuote}`);
  });
}

/**
 * Renders HTML produced from the migrated legacy template markup.
 * The generated markup intentionally keeps the legacy class names and
 * section structure so the original theme CSS and JavaScript continue to
 * style the migrated App Router pages.
 */
export function TemplatePart({ page }: TemplatePartProps) {
  return <div dangerouslySetInnerHTML={{ __html: addMeaningfulImageAltText(legacyPages[page]) }} />;
}
