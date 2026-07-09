import { legacyPages, type LegacyPageKey } from "@/lib/legacy-pages";

type TemplatePartProps = {
  page: LegacyPageKey;
};

const IMAGE_ASSET_VERSION = "20260709-roadside-1";

const BRAND_LOGO_ALT_TEXT: Record<string, string> = {
  "/images/brand-logo/client-1.png": "Rapid roadside fleet partner logo",
  "/images/brand-logo/client-2.png": "Highway response partner logo",
  "/images/brand-logo/client-3.png": "Driver safety partner logo",
  "/images/brand-logo/client-4.png": "Roadside coverage partner logo",
  "/images/brand-logo/client-5.png": "Emergency towing partner logo",
  "/images/brand-logo/v-2/client-1.png": "FleetOne partner logo",
  "/images/brand-logo/v-2/client-2.png": "UrbanShift partner logo",
  "/images/brand-logo/v-2/client-3.png": "Summit roadside partner logo",
  "/images/brand-logo/v-2/client-4.png": "Battery support partner logo",
  "/images/brand-logo/v-2/client-5.png": "Flat tire assistance partner logo",
};

function getImageAltText(src: string, currentAlt: string) {
  const normalizedSrc = src.split("?")[0];
  const imagePath = normalizedSrc.toLowerCase();
  const genericAltText = new Set(["", "image", "logo", "photo", "page header", "footer image"]);

  if (imagePath.includes("/images/brand-logo/")) {
    return BRAND_LOGO_ALT_TEXT[normalizedSrc] ?? "Roadside assistance partner logo";
  }

  if (imagePath.includes("/images/logo/") || imagePath.includes("/images/icon/") || !genericAltText.has(currentAlt.toLowerCase())) {
    return currentAlt;
  }

  if (imagePath.includes("/team-member/") || imagePath.includes("/testimonial/") || imagePath.includes("/commenter/")) {
    return "Professional roadside assistance team member";
  }

  if (imagePath.includes("/blog/") || imagePath.includes("/latest-post/") || imagePath.includes("/blog-detail/")) {
    return "Roadside assistance and driver safety article";
  }

  if (imagePath.includes("/project/")) {
    return "Completed roadside assistance response for a stranded driver";
  }

  if (imagePath.includes("/service/")) {
    return "Professional roadside assistance service at a driver location";
  }

  if (imagePath.includes("/about/")) {
    return "Roadside assistance team helping a stranded driver";
  }

  if (imagePath.includes("/section-bg/page-header")) {
    return "Emergency roadside assistance page header";
  }

  if (imagePath.includes("/section-bg/footer")) {
    return "Professional roadside assistance dispatch operation";
  }

  if (imagePath.includes("/section-bg/subscribe")) {
    return "Roadside support specialist preparing an emergency response";
  }

  if (imagePath.includes("/slider/")) {
    return "Roadside technician helping a stranded driver";
  }

  return "Professional mobile roadside assistance service";
}


const ROADSIDE_IMAGE_MAP: Record<string, string> = {
  slider: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
  service: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  about: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
  project: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  blog: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  team: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
  pageHeader: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  footer: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=80",
  subscribe: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&w=1000&q=80",
};

function getRoadsideImage(src: string) {
  const path = src.split("?")[0].toLowerCase();

  if (path.includes("/images/logo/") || path.includes("/images/icon/") || path.includes("preloader")) {
    return src;
  }

  if (path.includes("page-header")) return ROADSIDE_IMAGE_MAP.pageHeader;
  if (path.includes("footer")) return ROADSIDE_IMAGE_MAP.footer;
  if (path.includes("subscribe")) return ROADSIDE_IMAGE_MAP.subscribe;
  if (path.includes("/slider/")) return ROADSIDE_IMAGE_MAP.slider;
  if (path.includes("/service/")) return ROADSIDE_IMAGE_MAP.service;
  if (path.includes("/about/")) return ROADSIDE_IMAGE_MAP.about;
  if (path.includes("/project/")) return ROADSIDE_IMAGE_MAP.project;
  if (path.includes("/blog") || path.includes("/latest-post") || path.includes("/commenter")) return ROADSIDE_IMAGE_MAP.blog;
  if (path.includes("/team-member") || path.includes("/testimonial")) return ROADSIDE_IMAGE_MAP.team;

  return src;
}

function replaceImageSources(html: string) {
  return html.replace(/(<img\b[^>]*?\bsrc=)(["'])([^"']+)(\2)/g, (match, prefix, quote, src, suffix) => {
    return `${prefix}${quote}${getRoadsideImage(src)}${suffix}`;
  }).replace(/background-image:\s*url\((['"]?)(\/images\/[^)'";]+)\1\)/g, (_, quote, src) => {
    return `background-image: url('${getRoadsideImage(src)}')`;
  });
}

function transformRoadsideContent(html: string) {
  const replacements: Array<[RegExp, string]> = [
    [/Automec/g, "RoadRescue Pro"],
    [/CAR REPAIR/g, "ROADSIDE ASSISTANCE"],
    [/Mastering the Art of Auto Repair/g, "Fast Roadside Assistance When You Need It Most"],
    [/Keep Your Engine Running Smoothly/g, "Stuck on the Road? We’re Coming to You"],
    [/Comprehensive Car Maintenance!?/g, "One Call. One Location. Emergency Help."],
    [/Et purus duis sollicitudin dignissim habitant\. Egestas nulla quis venenatis cras sed Et purus duis sollicitudin dignissim habitant\. Egestas/g, "No need to go anywhere—our professional roadside assistance team comes directly to your location."],
    [/CONTACT NOW/g, "GET EMERGENCY HELP"],
    [/GET A QUOTE/g, "REQUEST SERVICE"],
    [/HOW WE WORK/g, "HOW HELP ARRIVES"],
    [/Need help\?/g, "Stranded?"],
    [/Sunday - Friday: 9 am - 8 pm/g, "24/7 Emergency Roadside Help"],
    [/Engine Diagnostics/g, "Flat Tire Assistance"],
    [/Suspension Tuning/g, "Battery Jump Start"],
    [/Transmission Service/g, "Fuel Delivery"],
    [/Auto Repair/g, "Vehicle Lockout Service"],
    [/AutoFix Solutions/g, "Emergency Towing"],
    [/Master Mechanics/g, "Minor Roadside Repairs"],
    [/car repair/gi, "roadside assistance"],
    [/auto repair/gi, "roadside assistance"],
    [/automotive repair/gi, "roadside assistance"],
    [/car service/gi, "roadside assistance service"],
    [/garage/gi, "mobile response team"],
    [/workshop/gi, "roadside response unit"],
    [/mechanic/gi, "roadside technician"],
    [/mechanics/gi, "roadside technicians"],
    [/engine/gi, "vehicle"],
    [/transmission/gi, "towing"],
    [/suspension/gi, "road safety"],
    [/Get Free Estimate/g, "Need Immediate Roadside Assistance?"],
    [/Lorem Ipsum is simply is dumiomy is text Lorem Ipsum is simply  Ipsum is simply is dumiomy is text/g, "No need to travel. Our emergency roadside assistance team comes directly to your location with fast, professional support."],
    [/Lorem Ipsum is simply is dumiomy is text Lorem Ipsum/g, "Tell us where you are and what happened. Our dispatch team will guide the closest roadside technician to you."],
    [/Satisfied Clients/g, "Drivers Helped"],
    [/Team Member/g, "Response Team"],
    [/Winning Award/g, "Service Areas"],
    [/Ckients Review/g, "5-Star Reviews"],
    [/Our All Services/g, "Roadside Services"],
    [/More Service/g, "Emergency Services"],
    [/Projects/g, "Roadside Cases"],
    [/Project Page/g, "Roadside Cases"],
    [/Project Details Page/g, "Response Details"],
    [/Team Member Page/g, "Response Team"],
    [/Team Details Page/g, "Technician Details"],
    [/Recent News/g, "Safety Articles"],
    [/About Us/g, "About RoadRescue"],
    [/Page Not Found/g, "Emergency Page Not Found"],
  ];

  return replacements.reduce((nextHtml, [pattern, replacement]) => nextHtml.replace(pattern, replacement), html);
}

function addImageAssetVersion(html: string) {
  return html.replace(
    /\/images\/([A-Za-z0-9\-_/]+?\.(?:avif|gif|jpe?g|png|svg|webp))(?!\?v=)/g,
    (_, assetPath) => `/images/${assetPath}?v=${IMAGE_ASSET_VERSION}`,
  );
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
  return <div dangerouslySetInnerHTML={{ __html: addMeaningfulImageAltText(addImageAssetVersion(replaceImageSources(transformRoadsideContent(legacyPages[page])))) }} />;
}
